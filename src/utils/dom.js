import extend from "just-extend";

const anchorRegex = /<a[^>]*>([^<]+)<\/a>/gi;

/**
 * Returns the matched regex data or whether the text has any matching string
 * @param regex Regex of the matching pattern
 * @param text String which has to be searched
 * @param test Return boolean or matching array
 * @returns {*} Boolean|Array
 */
function isMatchPresent(regex, text, test = false) {
  return test ? regex.test(text) : text.match(regex);
}

/**
 * Tells wheteher the matching string is present inside an anchor tag
 * @param regex
 * @param text
 * @returns {*} Boolean
 */
function isMatchInAnchor(regex, text) {
  let isPresent = false;
  text.replace(anchorRegex, (match, url) => {
    const x = isMatchPresent(regex, url, true);
    if (x) isPresent = true;
    return match;
  });
  return isPresent;
}

/**
 * Sort all the saved embeds by the position index they are present in the string.
 * @param embeds
 * @returns {Array.<T>}
 */
function sortEmbeds(embeds) {
  return embeds.sort((a, b) => a.index - b.index);
}

/**
 * Returns the embed code to be added at the end of original string.
 * @param embeds
 * @returns {string}
 */
function combineEmbedsText(embeds) {
  const sortedEmbeds = sortEmbeds(embeds);
  const contents = sortedEmbeds.map(({ content }) => content);
  return contents.join(" ");
}

/**
 * Add the embed code at the end of string and return the new string
 * @param text - original string
 * @param _embeds - Array of embed code
 * @returns {string}
 */
export function appendEmbedsAtEnd({ input, _embeds }) {
  return `${input} ${combineEmbedsText(_embeds)}`;
}

function pushEmbedContent(text, regex, options, template, index) {
  text.replace(regex, (...args) => {
    options._embeds.push({
      content: template(args),
      index: index || args.find(x => typeof x === "number")
    });
  });
  return options;
}

/**
 * Save the embed code into an array that can be added later to the end of original string
 * @param regex
 * @param template
 * @param options
 */
function saveEmbedData(regex, template, opts) {
  let options = extend({}, opts);

  if (isMatchInAnchor(regex, options.input)) {
    options.input.replace(anchorRegex, (match, url, index) => {
      options = pushEmbedContent(url, regex, options, template, index);
      return match;
    });
  } else {
    options = pushEmbedContent(options.input, regex, options, template);
  }

  return options;
}

function normalizeArguments(url, args) {
  args.unshift(url);
  return args;
}

/**
 * Insert the embed code in the original string.
 * @param regex
 * @param template
 * @param options
 * @returns options
 */
export function insert(regex, template, options) {
  const { input, replaceUrl, inlineEmbed, _embeds } = options;

  if (!inlineEmbed) {
    return saveEmbedData(regex, template, { input, _embeds });
  }

  const output = !isMatchInAnchor(regex, input)
    ? input.replace(
        regex,
        (...args) =>
          replaceUrl ? template(args) : args[0] + " " + template(args)
      )
    : input.replace(anchorRegex, (match, url) => {
        if (!replaceUrl) {
          const args = url.match(regex);
          return args ? match + template(normalizeArguments(url, args)) : match;
        }
        return url.replace(regex, (...args) => template(args));
      });

  return extend({}, options, {
    input: output
  });
}
