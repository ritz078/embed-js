import fetchJsonp from 'fetch-jsonp'
import isBrowser from 'is-in-browser'

let unfetch
if (!isBrowser) {
	unfetch = require('isomorphic-unfetch')
}

export default (unfetch || fetchJsonp)
