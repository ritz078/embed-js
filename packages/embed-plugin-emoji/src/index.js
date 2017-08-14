import extend from "just-extend"
import emojiRegex from "regex-emoji"
import kebab from "just-kebab-case"

const id = "emoji"

// You need emoji.css to run with this plugin. Else you need to pass the
// template suitable to your needs.
export default function emoji(opts) {
  const defaultOptions = {
    id,
    regex: emojiRegex(),
    template(emojiName) {
      return `<span class="ec ec-${kebab(emojiName)}"></span>`
    }
  }

  const pluginOptions = extend({}, defaultOptions, opts)
  return {
    transform(options) {
      return Promise.resolve(
        extend({}, options, {
          result: options.result.replace(
            pluginOptions.regex,
            (match, emojiName) => {
              options._services.push({ id, match })
              return pluginOptions.template(emojiName, options, pluginOptions)
            }
          )
        })
      )
    }
  }
}

emoji.id = id
