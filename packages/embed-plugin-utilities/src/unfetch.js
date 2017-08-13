import isBrowser from "is-in-browser"

export default (!isBrowser
	? require("node-fetch")
	: window.fetch || window.unfetch)
