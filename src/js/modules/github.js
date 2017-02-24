import { asyncEmbed } from '../helpers'
import regex from './regex'
import fetch from 'unfetch'

function template (data, options) {
  return options.template.github(data, options)
}

function fetchRepo (data) {
  let api = `https://api.github.com/repos/${data.user}/${data.repo}`
  return new Promise((resolve) =>
		fetch(api)
			.then(data => data.json())
			.then(json => resolve(json))
	)
}

function urlToText (_this, match, url, normalEmbed) {
  let data = !normalEmbed ? ({
    user: match[2],
    repo: match[3]
  }) : ({
    user: match[1],
    repo: match[2]
  })

  if (!data.repo) return
  return new Promise(function (resolve) {
    fetchRepo(data)
			.then(function (response) {
  return resolve(template(response, _this.options))
})
  })
}

export default function (input, output, options, embeds) {
  const args = {
    input,
    output,
    options,
    embeds,
    service: 'github',
    regex: regex.github
  }

  return new Promise((resolve) => asyncEmbed(args, urlToText).then((data) => resolve(data)))
}
