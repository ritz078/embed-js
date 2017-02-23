import { urlRegex } from './utils'
import { asyncEmbed } from '../helpers'
import fetch from 'unfetch'

function fetchData (url, _) {
  url = encodeURIComponent(url)
  let api = new Function('url', 'return `' + _.options.openGraphEndpoint + '`')(url)
  return new Promise((resolve) => {
    fetch(api)
			.then((res) => res.json())
			.then((json) => resolve(_.options.onOpenGraphFetch(json) || json))
  })
}

function urlToText (_, match, url) {
  if (url.match(_.excludeRegex)) return Promise.resolve()

  return new Promise((resolve) => {
    fetchData(url, _).then((data) => resolve(data && data.success ? _.template(data) : ''))
  })
}

export default function (input, output, options, embeds) {
  const args = {
    input,
    output,
    options,
    embeds,
    service: 'opengraph',
    regex: urlRegex(),
    excludeRegex: new RegExp(['.mp4|.mp3|.gif|.pdf|.doc|.ppt|.docx|.jpg|.jpeg|.ogg'].concat(options.openGraphExclude).join('|'), 'gi'),
    template (data) {
      return this.options.template.openGraph(data, this.options)
    }
  }

  return new Promise((resolve) => asyncEmbed(args, urlToText).then((data) => resolve(data)))
}
