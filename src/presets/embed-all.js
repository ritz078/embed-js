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
		if (presetOptions.exclude.indexOf(plugin.name) === -1) {
			if (plugin.name === "youtube" || plugin.name === "map") {
				return plugin(
					extend(
						{},
						{
							gAuthKey: options.gAuthKey
						},
						presetOptions[plugin.name]
					)
				)
			}
			if(plugin.name === 'noEmbed') {
				return plugin(extend({}, plugin.name, {
					exclude: 'youtube'
				}))
			}
			return plugin(presetOptions[plugin.name])
		}
		return null
	})

	return compact(plugins)
}
