import test from 'ava'
import isPromise from 'p-is-promise'
import slideShare from '../src/plugins/slide-share'

const options = {
	result: 'Cum zelus credere, https://www.slideshare.net/AatifAwan/how-linkedin-built-a-community-of-half-a-billion omnes terrores.'
}

test('Plugin: slideShare - should return a promise', t=> {
	t.true(isPromise(slideShare().transform(options)))
})
