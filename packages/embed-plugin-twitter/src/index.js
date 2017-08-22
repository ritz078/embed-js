import extend from "just-extend"
import isDom from "is-dom"
import isBrowser from "is-in-browser"
import base from "embed-plugin-base"
import { getQuery } from "embed-plugin-utilities"
import jsonp from "fetch-jsonp"

const id = "twitter"

/**
 * Fetch the html content from the API
 * @param url
 * @param args
 * @param omitScript
 * @param maxWidth
 * @param hideMedia
 * @param hideThread
 * @param align
 * @param lang
 * @param theme
 * @param linkColor
 * @param widgetType
 * @returns {Promise.<*>}
 */
async function _process(
  args,
  { fetch },
  {
    _omitScript,
    maxWidth,
    hideMedia,
    hideThread,
    align,
    lang,
    theme,
    linkColor,
    widgetType
  }
) {
  const params = {
    url: args[0],
    omitScript: _omitScript,
    maxWidth,
    hideMedia,
    hideThread,
    align,
    lang,
    theme,
    linkColor,
    widgetType
  }
  try {
    const apiUrl = `https://api.twitter.com/1/statuses/oembed.json?${getQuery(
      params
    )}`
    const res = await (isBrowser ? jsonp : fetch)(apiUrl)
    return await res.json()
  } catch (e) {
    return {
      html: ""
    }
  }
}

function renderTweet({ input, _services }, { twttr, onLoad }) {
  if (!isDom(input)) {
    throw new Error("input should be a DOM element to embed tweet.")
  }
  if (_services.filter(service => service.id === "twitter").length) {
    twttr.widgets.load(input)
    twttr.events.bind("loaded", onLoad)
  }
}

export default function twitter(opts) {
  const defaultOptions = {
    id,
    // Regex that matches the string and sends to the template method.
    regex: /https:\/\/twitter\.com\/\w+\/\w+\/\d+/gi,

    // The maximum width of a rendered Tweet in whole pixels.
    // This value must be between 220 and 550 inclusive. A supplied
    // value under or over the allowed range will be returned as the
    // minimum or maximum supported width respectively; the reset width
    // value will be reflected in the returned width property. Note that
    // Twitter does not support the oEmbed maxheight parameter. Tweets
    // are fundamentally text, and are therefore of unpredictable height
    // that cannot be scaled like an image or video. Relatedly, the
    // oEmbed response will not provide a value for height. Implementations
    // that need consistent heights for Tweets should refer to the hide_thread
    // and hide_media parameters below.
    maxWidth: 550,

    // When set to true , t, or 1 links in a Tweet are not expanded to photo,
    // video, or link previews
    hideMedia: false,

    // When set to true , t, or 1 a collapsed version of the previous Tweet
    // in a conversation thread will not be displayed when the requested Tweet
    // is in reply to another Tweet
    hideThread: false,

    // Specifies whether the embedded Tweet should be floated left,
    // right, or center in the page relative to the parent element.
    // Valid values are left, right, center, and none
    align: "none",

    // Request returned HTML and a rendered Tweet in the specified Twitter
    // language supported by embedded Tweets. https://dev.twitter.com/web/overview/languages
    lang: "en",

    // When set to dark, the Tweet is displayed with light text over a dark background
    theme: "light",

    // Adjust the color of Tweet text links with a hexadecimal color value
    linkColor: "#355acee",

    // Set to video to return a Twitter Video embed for the given Tweet
    widgetType: "",

    /**
		 * It accepts the matching url and returns the html
		 * content that replaces or appends to the URL based
		 * on options. This can return a asynchronous response.
		 * @param args
		 * @param options
		 * @param pluginOptions
		 * @param html
		 * @returns {Promise.<*>}
		 */
    template(args, options, pluginOptions, { html }) {
      return html
    },

    // If you want to load the twitter widget script with the tweet itself
    // turn this option to false. Else you have to load it externally.
    _omitScript: true,

    // The twitter object loaded from widgets.js. By default it takes twttr
    // from window object.
    twttr: isBrowser ? window.twttr : null,

    // This is for internal use only. Executes when
    // the tweet has been loaded
    // and rendered on the client side
    _onLoadInternal(options, pluginOptions) {
      renderTweet(options, pluginOptions)
    },

    // executed when the tweet has been loaded
    // and rendered on the client side
    onLoad() {}
  }

  const pluginOptions = extend({}, defaultOptions, opts, {
    _process
  })
  return base(pluginOptions)
}

twitter.id = id
