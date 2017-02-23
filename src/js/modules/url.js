import {urlRegex, lastElement} from './utils'

export default function (input, options) {
  const config = options.linkOptions
  return input.replace(urlRegex(), function (match) {
    if (lastElement(match) === ')') return match // hack for markdown image
    let extension = lastElement(match.split('.'))
    if ((lastElement(match) === '/')) { match = match.slice(0, -1) }
    if (config.exclude.indexOf(extension) === -1) { return options.template.url(match, options) }
    return match
  })
}
