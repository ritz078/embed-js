import extend from "just-extend"
import base from "embed-plugin-base"
import { withDetailsTemplate } from "embed-plugin-utilities"

const id = "github"

async function _process(args, { fetch }) {
  const [, user, repo] = args

  try {
    const res = await fetch(`https://api.github.com/repos/${user}/${repo}`)
    return res.json()
  } catch (e) {
    return {}
  }
}

export default function github(opts) {
  const defaultOptions = {
    id,
    regex: /[^\.]github.com\/([\w\.\-]+)\/([\w\.\-]+[^\.])/gi,

    async template(
      args,
      options,
      pluginOptions,
      { owner, description, html_url, full_name }
    ) {
      return withDetailsTemplate({
        thumbnail: owner.avatar_url,
        url: html_url,
        description,
        title: full_name
      })
    }
  }

  const pluginOptions = extend({}, defaultOptions, opts, {
    _process
  })
  return base(pluginOptions)
}

github.id = id
