import extend from "just-extend"
import isBrowser from "is-in-browser"
import isDom from "is-dom"
import getRegex, { isServicePresent } from "./noembed-regex"
import base from "embed-plugin-base"

const id = "noEmbed"

/**
 * Fetches the data from the noembed API
 * @param args
 * @returns {Promise.<*>}
 */
async function _process(args, { fetch }) {
  const url = args[0]
  try {
    const res = await fetch(`https://noembed.com/embed?url=${url}`)
    return await res.json()
  } catch (e) {
    return {
      html: url
    }
  }
}

function noEmbed(opts = {}) {
  const defaultOptions = {
    id,
    // Regex to be used to identify noembed supported services.
    // By default it takes from noembed-regex.js
    regex: null,

    // In case you want to exclude a few services, you can do it here.
    // It accepts an array of service names in lowercase.
    exclude: [],

    twttr: isBrowser ? window.twttr : null,

    onLoad() {},

    async template(args, options, pluginOptions, { html }) {
      return `<div class="ejs-embed">${html}</div>`
    },

    _onLoadInternal({ input, result }, { twttr, onLoad }) {
      if (isServicePresent("twitter", result) && twttr && isDom(input)) {
        twttr.widgets.load(input)
        twttr.events.bind("loaded", onLoad)
      }
    }
  }

  const pluginOptions = extend({}, defaultOptions, opts, {
    _process
  })

  if (!opts.regex) {
    pluginOptions.regex = getRegex(pluginOptions.exclude)
  }

  return base(pluginOptions)
}

noEmbed.id = id

export default noEmbed
