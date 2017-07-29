import {
	highlight,
	basicAudio,
	plunker,
	emoji,
	github,
	basicImage,
	map,
	noEmbed,
	url,
	basicVideo,
	youtube
} from "../plugins/index"
import extend from "just-extend"
import compact from "just-compact"

export default function(options) {
	const defaultOptions = {
		exclude: []
	}

	const presetOptions = extend({}, defaultOptions, options)

	const pluginNames = [
		url,
		emoji,
		basicAudio,
		basicVideo,
		plunker,
		github,
		basicImage,
		map,
		noEmbed,
		highlight,
		youtube
	]
	const plugins = pluginNames.map(plugin => {
		if (presetOptions.exclude.indexOf(plugin.pluginName) === -1) {
			if (plugin.pluginName === "youtube" || plugin.pluginName === "map") {
				return plugin(
					extend(
						{},
						{
							gAuthKey: options.gAuthKey
						},
						presetOptions[plugin.pluginName]
					)
				)
			}
			if (plugin.pluginName === 'noEmbed') {
				return plugin(extend({}, plugin.pluginName, {
					exclude: 'youtube'
				}))
			}
			return plugin(presetOptions[plugin.pluginName])
		}
		return null
	})

	return compact(plugins)
}
