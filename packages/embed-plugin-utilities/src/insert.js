import extend from "just-extend"
import stringReplaceAsync from "./string-replace-async"

const anchorRegex = /<a[^>]*>([^<]+)<\/a>/gi

function getAnchorRegex(regex) {
  return new RegExp(`<a[^>]*>(${regex.source})<\\/a>`, "gi")
}

/**
 * Returns the matched regex data or whether the text has any matching string
 * @param regex Regex of the matching pattern
 * @param text String which has to be searched
 * @param test Return boolean or matching array
 * @returns {*} Boolean|Array
 */
function isMatchPresent(regex, text, test = false) {
  return test ? regex.test(text) : text.match(regex)
}

/**
 * Tells wheteher the matching string is present inside an anchor tag
 * @param text
 * @returns {*} Boolean
 * @param regex
 */
function isAnchorTagApplied({ result, plugins = [] }, { regex }) {
  return (
    getAnchorRegex(regex).test(result) ||
    plugins.filter(plugin => plugin.id === "url").length
  )
}

function saveServiceName({ _services }, { id }, match) {
  if (!_services.filter(x => x.match === match).length) {
    _services.push({ id, match })
  }
}

async function pushEmbedContent(text, options, pluginOptions, index) {
  const { regex } = pluginOptions
  await stringReplaceAsync(text, regex, async (...args) => {
    options._embeds.push({
      content: await getTemplate(args, options, pluginOptions),
      index: index || args.find(x => typeof x === "number")
    })
    saveServiceName(options, pluginOptions, args[0])
  })
  return options
}

/**
 * Save the embed code into an array that can be added later to the end of original string
 * @param opts
 * @param pluginOptions
 */
async function saveEmbedData(opts, pluginOptions) {
  const { regex } = pluginOptions
  let options = extend({}, opts)

  if (isAnchorTagApplied(options, { regex })) {
    await stringReplaceAsync(
      options.result,
      anchorRegex,
      async (match, url, index) => {
        if (!isMatchPresent(regex, match, true)) return match
        saveServiceName(options, pluginOptions, match)
        options = await pushEmbedContent(url, options, pluginOptions, index)
        return match
      }
    )
  } else {
    options = pushEmbedContent(options.result, options, pluginOptions)
  }

  return options
}

function getMatch(regex, string) {
  regex.lastIndex = 0
  const matches = regex.exec(string)
  regex.lastIndex = 0
  return matches
}

async function getTemplate(args, options, pluginOptions) {
  const { _process, template } = pluginOptions
  let data
  if (_process) {
    data = await _process(args, options, pluginOptions)
  }
  return template(args, options, pluginOptions, data)
}

async function basicReplace(options, pluginOptions) {
  const { result, replaceUrl } = options
  const { regex, _replaceAnyways } = pluginOptions
  return stringReplaceAsync(result, regex, async (...args) => {
    saveServiceName(options, pluginOptions, args[0])
    return replaceUrl || _replaceAnyways
      ? getTemplate(args, options, pluginOptions)
      : `${args[0]} ${await getTemplate(args, options, pluginOptions)}`
  })
}

async function anchorReplace(options, pluginOptions) {
  const { result, replaceUrl } = options
  const { regex, _replaceAnyways } = pluginOptions

  return stringReplaceAsync(result, anchorRegex, async (match, url) => {
    if (!isMatchPresent(regex, url, true)) {
      return match
    }

    if (!(replaceUrl || _replaceAnyways)) {
      const args = getMatch(regex, url)
      saveServiceName(options, pluginOptions, args[0])
      const t = await getTemplate(args, options, pluginOptions)
      return args ? match + t : match
    }
    return stringReplaceAsync(url, regex, async (...args) => {
      saveServiceName(options, pluginOptions, args[0])
      return getTemplate(args, options, pluginOptions)
    })
  })
}

/**
 * Insert the embed code in the original string.
 * @param options
 * @param pluginOptions
 * @returns options
 */
export default async function(options, pluginOptions) {
  const { inlineEmbed } = options
  const { _ignoreAnchorCheck, _ignoreInlineCheck, regex } = pluginOptions

  if (!inlineEmbed && !_ignoreInlineCheck) {
    return saveEmbedData(options, pluginOptions)
  }

  let output

  output =
    isAnchorTagApplied(options, { regex }) && !_ignoreAnchorCheck
      ? await anchorReplace(options, pluginOptions)
      : await basicReplace(options, pluginOptions)

  return extend({}, options, {
    result: output
  })
}
