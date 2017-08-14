import extend from "just-extend"
import highlight from "embed-plugin-highlight"
import emoji from "embed-plugin-emoji"
import github from "embed-plugin-github"
import noEmbed from "embed-plugin-noembed"
import url from "embed-plugin-url"
import youtube from "embed-plugin-youtube"
import facebook from "embed-plugin-facebook"
import media from "embed-plugin-media"
import instagram from "embed-plugin-instagram"

export default function(options) {
  const defaultOptions = {
    exclude: []
  }

  const presetOptions = extend({}, defaultOptions, options)

  const pluginNames = [
    url,
    emoji,
    github,
    noEmbed,
    youtube,
    facebook,
    highlight,
    media,
    instagram
  ]
  const plugins = pluginNames.map(plugin => {
    const { id } = plugin
    const pluginOptions = presetOptions[id]

    if (presetOptions.exclude.indexOf(plugin.id) === -1) {
      if (id === "youtube" || id === "map") {
        return plugin(
          extend(
            {},
            {
              gAuthKey: options.gAuthKey
            },
            pluginOptions
          )
        )
      } else if (id === "noEmbed") {
        return plugin(
          extend({}, pluginOptions, {
            exclude: ["youtube"]
          })
        )
      }
      return plugin(pluginOptions)
    }
    return null
  })

  return plugins.filter(plugin => !!plugin)
}
