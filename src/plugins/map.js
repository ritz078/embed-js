import extend from "just-extend"
import unfetch from "../utils/fetch"
import basic from "./basic"

async function getCoordinate(location) {
	const res = await unfetch(
		`http://maps.googleapis.com/maps/api/geocode/json?address=${location}&sensor=false`
	)
	const data = await res.json()
	return data.results[0].geometry.location
}

async function _process(args) {
	const location = args[1]
	return getCoordinate(location)
}

export default function(opts) {
	const defaultOptions = {
		name: 'map',
		regex: /@\((.+)\)/gi,
		mode: "place",
		height: 300,
		gAuthKey: "",

		async template(args, options, { mode, gAuthKey, height }, { lat, lng }) {
			const location = args[1]
			const base = `https://www.google.com/maps/embed/v1/${mode}?key=${gAuthKey}`

			let src
			if (mode === "place") {
				src = `${base}&q=${location}`
			} else if (mode === "streetview") {
				src = `${base}&location=${lat},${lng}&heading=210&pitch=10&fov=35`
			} else if (mode === "view") {
				src = `${base}&center=${lat},${lng}&zoom=18&maptype=satellite`
			}

			return `<iframe class="ejs-embed ejs-map" height="${height}" src="${src}"></iframe>`
		}
	}

	const pluginOptions = extend({}, defaultOptions, opts, {
		_process,
		_ignoreAnchorCheck: true
	})
	return basic(pluginOptions)
}

