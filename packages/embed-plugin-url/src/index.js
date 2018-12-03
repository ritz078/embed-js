import extend from "just-extend"
import linkify from 'linkifyjs/string'

const id = "url"

export default function url(opts) {
  const defaultOptions = { }

	const defaults = extend({}, defaultOptions, opts)
  return {
    id,
    async transform(options) {
      return extend({}, options, {
        result: linkify(options.result, defaults)
      })
    }
  }
}

url.id = id
