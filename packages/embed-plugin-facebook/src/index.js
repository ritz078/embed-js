import extend from "just-extend"
import { withoutDetailsTemplate } from "embed-plugin-utilities"
import base from "embed-plugin-base"

const id = "facebook"

export default function facebook(opts) {
  const defaultOptions = {
    id,
    regex: /(https?:\/\/)?www\.facebook\.com\/(?:(videos|posts)\.php\?v=\d+|.*?\/(videos|posts)\/\d+\/?)/gi,
    height: 225,
    template(args, options, { height }) {
      const url = args[0]
      const type = url.indexOf("/videos/") < 0 ? "post" : "video"
      return withoutDetailsTemplate(
        `https://www.facebook.com/plugins/${type}.php?href=${url}`,
        height,
        id
      )
    }
  }

  const pluginOptions = extend({}, defaultOptions, opts)
  return base(pluginOptions)
}

facebook.id = id
