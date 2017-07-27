import unfetch from 'unfetch'
import isBrowser from 'is-in-browser'

let serverFetch
if(!isBrowser) {
	serverFetch = require('isomorphic-unfetch')
}

export default (serverFetch || unfetch)
