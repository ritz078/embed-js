import extend from "just-extend"
import pWaterfall from "p-waterfall"
import isDom from "is-dom"
import isBrowser from "is-in-browser"

/**
 * Returns the embed code to be added at the end of original string.
 * @param embeds
 * @returns {string}
 */
function combineEmbedsText(embeds) {
  return embeds
    .sort((a, b) => a.index - b.index)
    .map(({ content }) => content)
    .join(" ")
}

/**
 * Add the embed code at the end of string and return the new string
 * @param text - original string
 * @param _embeds - Array of embed code
 * @returns {string}
 */
function appendEmbedsAtEnd({ result, _embeds }) {
  return `${result} ${combineEmbedsText(_embeds)}`
}

function isElementPresent({ input, target }) {
  return isDom(input) || (target && isDom(target))
}

export default class EmbedJS {
  constructor(options) {
    const defaultOptions = {
      plugins: [],
      preset: null,

      // By default this plugin supports client side. If you want to use this
      // on both client and server side, you need to pass a custom isomorphic
      // implementation of fetch.
      // Eg: fetch: require('isomorphic-unfetch')

      // This hasn't been included as part of the plugin so that the browser build is small.
      fetch: isBrowser && (window.fetch || window.unfetch),

      inlineEmbed: true,
      replaceUrl: false,
      _embeds: [],
      _services: []
    }

    let { input, plugins = [], preset } = options
    if (!input) {
      throw new Error(
        "You need to pass input element or string in the options object."
      )
    }

    const inputString = isDom(input) ? input.innerHTML : input

    this.options = extend({}, defaultOptions, options, {
      result: inputString,
      plugins: preset ? plugins.concat(preset) : plugins,
      inputString
    })
  }

  text() {
    const options = this.resetOptions()
    const transformers = options.plugins.map(p => p.transform)
    return pWaterfall(transformers, options)
  }

  resetOptions() {
    return extend({}, this.options, {
      _embeds: []
    })
  }

  load() {
    this.options.plugins.forEach(p => p.onLoad && p.onLoad(this.options))
  }

  async render() {
    const { input, target, inlineEmbed } = this.options
    if (!isElementPresent(this.options)) {
      throw new Error("You haven't passed the input as an element.")
    }

    let options
    if (isDom(input) && input.classList.contains("ejs-applied")) {
      options = this.options
    } else {
      options = await this.text()

      const element = target || input
      element.innerHTML = inlineEmbed
        ? options.result
        : appendEmbedsAtEnd(options)
      element.classList.add("ejs-applied")
    }

    this.load()
    return options
  }

  destroy() {
    const { inputString, input, target } = this.options
    if (!isElementPresent(this.options)) {
      throw new Error("You haven't passed the input as an element.")
    }
    const element = target || input
    element.innerHTML = inputString
    element.classList.remove("ejs-applied")
    return this.options
  }
}
