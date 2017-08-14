import extend from "just-extend"
import base from "embed-plugin-base"

const id = "instagram"

export default function instagram(opts) {
  const defaultOptions = {
    id,
    height: 440,
    regex: /((https?:\/\/)(www\.)?instagram.com\/p\/[a-zA-Z0-9_\-\=]+)(\/\?[a-zA-Z0-9_\-\=]+)?/gi,
    template(args, options, { width, height }) {
      return `<iframe class="ejs-embed ejs-instagram" src="${args[1]}/embed" height="${height}"></iframe>`
    }
  }

  const pluginOptions = extend({}, defaultOptions, opts)
  return base(pluginOptions)
}

instagram.id = id
