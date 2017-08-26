import extend from "just-extend"
import isDom from "is-dom"
import ytRegex from "youtube-regex"
import base from "embed-plugin-base"
import {
  withDetailsTemplate,
  withoutDetailsTemplate
} from "embed-plugin-utilities"

const id = "youtube"
const baseUrl = "https://www.youtube.com/"

/**
 * Decorate data into a simpler structure
 * @param data
 * @returns {{title, thumbnail, rawDescription, views: *, likes: *, description: *, url: string, id, host: string}}
 */
function formatData({ snippet, id }) {
  return {
    title: snippet.title,
    thumbnail: snippet.thumbnails.medium.url,
    description: snippet.description,
    url: `${baseUrl}watch?v=${id}`,
    embedUrl: `${baseUrl}embed/${id}`
  }
}

/**
 * Fetch details of a particular youtube video
 * @param id
 * @param gAuthKey
 * @returns {Promise.<*>}
 */
async function fetchDetails(id, fetch, gAuthKey) {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${gAuthKey}&part=snippet,statistics`
    )
    const data = await res.json()
    return data.items[0]
  } catch (e) {
    console.log(e)
    return {}
  }
}

/**
 * Function executed when a content is rendered on the client site.
 * @param input
 * @param clickClass
 * @param onVideoShow
 * @param height
 */
function onLoad({ input }, { clickClass, onVideoShow, height }) {
  if (!isDom(input)) {
    throw new Error("input should be a DOM Element.")
  }
  let classes = document.getElementsByClassName(clickClass)
  for (let i = 0; i < classes.length; i++) {
    classes[i].onclick = function() {
      let url = this.getAttribute("data-url")
      onVideoShow(url)
      url += "?autoplay=1"
      this.parentNode.innerHTML = withoutDetailsTemplate(url, height, id)
    }
  }
}

function _process(args, { fetch }, { gAuthKey, details }) {
  return details ? fetchDetails(args[1], fetch, gAuthKey) : Promise.resolve()
}

function youtube(opts) {
  const defaultOptions = {
    id,
    regex: ytRegex(),
    gAuthKey: "",
    details: true,
    height: 300,
    clickClass: "ejs-video-thumb",
    onVideoShow() {},
    _onLoadInternal(options, pluginOptions) {
      onLoad(options, pluginOptions)
    },
    onLoad() {},
    async template(args, options, { details, height, clickClass }, data) {
      const embedUrl = `${baseUrl}embed/${args[1]}`
      return details
        ? withDetailsTemplate(formatData(data), clickClass, true)
        : withoutDetailsTemplate(embedUrl, height, id)
    }
  }

  if (!opts.gAuthKey) {
    throw new Error("You need to pass google auth key.")
  }

  const pluginOptions = extend({}, defaultOptions, opts, {
    _process
  })
  return base(pluginOptions)
}

youtube.id = id

export default youtube
