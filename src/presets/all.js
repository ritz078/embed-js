import {
	highlight,
	basicAudio,
	plunker,
	emojiImage,
	github,
	basicImage,
	map,
	noEmbed,
	url,
	basicVideo,
	markdown
} from "../plugins/index"
import extend from "just-extend"
import compact from "just-compact"

export default function(options) {
	const defaultOptions = {
		exclude: ["markdown"]
	}

	const presetOptions = extend({}, defaultOptions, options)

	const pluginNames = [
		url,
		emojiImage,
		basicAudio,
		basicVideo,
		plunker,
		github,
		basicImage,
		map,
		noEmbed,
		highlight,
		markdown
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
			return plugin(presetOptions[plugin.name])
		}
		return null
	})

	return compact(plugins)
}
