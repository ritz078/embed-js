import isServer from "is-server"

let count = 0

function jsonP(url) {
	return new Promise(resolve => {
		const cb = `__c${count++}`
		const param = "callback"
		const query = `${param}=${cb}`
		const script = document.createElement("script")

		const cleanup = () => {
			document.head.removeChild(script)
			window[cb] = () => {}
		}

		window[cb] = data => {
			resolve(data)
			cleanup()
		}

		script.src = `${url}&${query}`
		document.head.appendChild(script)
	})
}

let unfetch
if (isServer()) {
	unfetch = require("node-fetch")
}

export default unfetch || jsonP
