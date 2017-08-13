import isBrowser from "is-in-browser"
import jsonP from "fetch-jsonp"

let unfetch
if (!isBrowser) {
	unfetch = require("node-fetch")
}

export default unfetch || jsonP
