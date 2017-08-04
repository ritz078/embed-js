import {
	highlight,
	basicAudio,
	emoji,
	github,
	basicImage,
	map,
	noEmbed,
	url,
	basicVideo,
	youtube,
	facebook,
	twitter
} from "../plugins"
import extend from "just-extend"

export default function (options) {
	const defaultOptions = {
		exclude: []
	}

	const presetOptions = extend({}, defaultOptions, options)

	const pluginNames = [
		url,
		emoji,
		basicAudio,
		basicVideo,
		github,
		basicImage,
		map,
		noEmbed,
		youtube,
		facebook,
		twitter,
		highlight
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
