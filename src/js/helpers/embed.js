import { ifInline, matches } from '../modules/utils'

function inlineEmbed (_) {
  let regexInline = _.options.link ? new RegExp(`([^>]*${_.regex.source})<\/a>`, 'gm') : new RegExp(`([^\\s]*${_.regex.source})`, 'gm')
  _.output = _.output.replace(regexInline, function (match) {
    let url = _.options.link ? match.slice(0, -4) : match
    if (_.options.served.indexOf(url) === -1) {
      _.options.served.push(url)
      if (_.options.link) {
        return !_.options.inlineText ? _.template(match.slice(0, -4)) + '</a>' : match + _.template(match.slice(0, -4))
      } else {
        return !_.options.inlineText ? _.template(match) : match + _.template(match)
      }
    } else {
      return match // TODO : check whether this should be `match`
    }
  })
  return [_.output, _.embeds]
}

function normalEmbed (_) {
  let match
  while ((match = matches(_.regex, _.input)) !== null) {
    let url = match[0]
    if (!(_.options.served.indexOf(url) === -1) || (_.options.served.length && _.options.singleEmbed)) continue
    _.options.served.push(url)
    let text = _.template(url)
    _.embeds.push({
      text: text,
      index: match.index
    })
  }
  return [_.output, _.embeds]
}

export default function embed (_) {
  return (ifInline(_.options, _.service)) ? inlineEmbed(_) : normalEmbed(_)
}
