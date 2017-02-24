import { matches, ifInline } from '../modules/utils'

/**
 * This is a private function which is used to get the actual text to be replaced for
 * a particular url in inline embedding. This returns a promise
 * @param  {object} _     reference to this
 * @param  {function} urlToText The function that converts url to replaceable text
 * @param  {object} match     object containing info of matching string
 * @return {Promise}           resolves to the text
 */
function getInlineData (_, urlToText, match) {
  let url = (_.options.link ? match[0].slice(0, -4) : match[0]) || match[1]
  if (_.options.served.indexOf(url) >= 0) return Promise.resolve(null)

  return new Promise((resolve) => {
    urlToText(_, match, url).then((text) => {
      if (!text) return resolve()
      _.options.served.push(url)
      resolve(text)
    })
  })
}

/**
 * A helper function for inline embedding
 * @param _
 * @param urlToText
 * @returns Promise
 */
function inlineAsyncEmbed (_, urlToText) {
  let regexInline = _.options.link ? new RegExp(`([^>]*${_.regex.source})<\/a>`, 'gi') : new RegExp(`([^\\s]*${_.regex.source})`, 'gi')
  let match, promises = []

  while ((match = matches(regexInline, _.output)) !== null) {
    promises.push(getInlineData(_, urlToText, match))
  }

  return new Promise((resolve) => {
    if (promises.length) {
      Promise.all(promises).then((data) => {
        let i = 0
        _.output = _.output.replace(regexInline, (matched) => {
          if (_.options.link) {
            return !_.options.inlineText ? data[i++] + '</a>' : matched + data[i++]
          } else {
            return !_.options.inlineText ? data[i++] : matched + data[i++]
          }
        })
        resolve(_.output)
      })
    } else {
      resolve(_.output)
    }
  })
}

function getNormalData (_, urlToText, match) {
  let url = match[0]
  if (_.options.served.indexOf(url) >= 0) return

  return new Promise((resolve) => {
    urlToText(_, match, url, true).then(function (text) {
      if (!text) resolve()
      _.options.served.push(url)
      _.embeds.push({
        text: text,
        index: match.index
      })
      resolve()
    })
  })
}

/**
 * A helper function for normal embedding
 * @param  {object} _
 * @param  {function} urlToText
 * @return {Promise}
 */
function normalAsyncEmbed (_, urlToText) {
  let match, promises = []
  while ((match = matches(_.regex, _.input)) !== null) {
    promises.push(getNormalData(_, urlToText, match))
  }
  return new Promise(function (resolve) {
    Promise.all(promises).then(function () {
      resolve(_.embeds)
    })
  })
}

export default function asyncEmbed (_, urlToText) {
  return new Promise(function (resolve) {
    if (ifInline(_.options, _.service)) {
      inlineAsyncEmbed(_, urlToText).then((output) => resolve([output, _.embeds]))
    } else {
      normalAsyncEmbed(_, urlToText).then((embeds) => resolve([_.output, embeds]))
    }
  })
}
