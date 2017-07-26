import extend from "just-extend"
import unfetch from "isomorphic-unfetch"
import basic from './basic'

export async function getCoordinate (location) {
	const res = await unfetch(`http://maps.googleapis.com/maps/api/geocode/json?address=${location}&sensor=false`);
	const data = await res.json()
	return data.results[0].geometry.location
}

export default function (opts) {
	const defaultOptions = {
		regex: /@\((.+)\)/gi,
		mode: 'place',
		height: 300,
		gAuthKey: '',

		async template(args, options, {mode, gAuthKey, height}) {
			const location = args[1]
			const { lat, lng } = await getCoordinate(location)

			const base = `https://www.google.com/maps/embed/v1/${mode}?key=${gAuthKey}`

			let src
			if(mode === 'place') {
				src = `${base}&q=${location}`
			} else if (mode === 'streetview') {
				src = `${base}&location=${lat},${lng}&heading=210&pitch=10&fov=35`
			} else if (mode === 'view') {
				src = `${base}&center=${lat},${lng}&zoom=18&maptype=satellite`
			}

			return `<iframe class="ejs-embed ejs-map" height="${height}" src="${src}"></iframe>`
		}
	}

	const pluginOptions = extend({}, defaultOptions, opts)
	return basic(pluginOptions)
}
