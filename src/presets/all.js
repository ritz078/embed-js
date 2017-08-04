import {
	highlight,
	emoji,
	github,
	map,
	noEmbed,
	url,
	youtube,
	facebook,
	twitter,
	media
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
		github,
		map,
		noEmbed,
		youtube,
		facebook,
		twitter,
		highlight,
		media
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
