import isBrowser from "is-in-browser"
import jsonP from "fetch-jsonp"

let serverFetch
if (!isBrowser) {
  serverFetch = require("node-fetch")
}

export default serverFetch || jsonP
