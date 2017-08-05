import {
	highlight,
	emoji,
	github,
	noEmbed,
	url,
	youtube,
	facebook,
	media,
	instagram
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
