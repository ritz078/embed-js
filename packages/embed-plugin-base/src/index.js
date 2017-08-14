import extend from "just-extend"
import { insert } from "embed-plugin-utilities"

export default opts => {
  const defaultOptions = {
    _replaceAnyways: false,
    _ignoreAnchorCheck: false,
    _ignoreInlineCheck: false,
    onLoad() {}
  }

  const pluginOptions = extend({}, defaultOptions, opts)

  const { _onLoadInternal, onLoad, regex, template, id } = pluginOptions

  if (!regex) {
    throw new Error("regex not passed.")
  }
  if (!template) {
    throw new Error("template not passed.")
  }

  return {
    id,

    async transform(options) {
      return extend({}, options, await insert(options, pluginOptions))
    },

    onLoad(options) {
      if (_onLoadInternal) {
        _onLoadInternal(options, pluginOptions)
      }
      if (onLoad) {
        onLoad(options, pluginOptions)
      }
    }
  }
}
