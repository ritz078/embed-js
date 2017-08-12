import isServer from "is-server"

export default (isServer()
	? require("node-fetch")
	: window.fetch || window.unfetch)
