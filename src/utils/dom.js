import extend from "just-extend"
import stringReplaceAsync from "../utils/string-replace-async"

const anchorRegex = /<a[^>]*>([^<]+)<\/a>/gi

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
 */
function isAnchorTagApplied(text) {
	return anchorRegex.test(text)
}

/**
 * Sort all the saved embeds by the position index they are present in the string.
 * @param embeds
 * @returns {Array.<T>}
 */
function sortEmbeds(embeds) {
	return embeds.sort((a, b) => a.index - b.index)
}

/**
 * Returns the embed code to be added at the end of original string.
 * @param embeds
 * @returns {string}
 */
function combineEmbedsText(embeds) {
	const sortedEmbeds = sortEmbeds(embeds)
	const contents = sortedEmbeds.map(({ content }) => content)
	return contents.join(" ")
}

/**
 * Add the embed code at the end of string and return the new string
 * @param text - original string
 * @param _embeds - Array of embed code
 * @returns {string}
 */
export function appendEmbedsAtEnd({ result, _embeds }) {
	return `${result} ${combineEmbedsText(_embeds)}`
}

async function pushEmbedContent(
	text,
	regex,
	template,
	options,
	pluginOptions,
	index
) {
	await stringReplaceAsync(text, regex, async (...args) => {
		options._embeds.push({
			content: await template(args, options, pluginOptions),
			index: index || args.find(x => typeof x === "number")
		})
	})
	return options
}

/**
 * Save the embed code into an array that can be added later to the end of original string
 * @param regex
 * @param template
 * @param opts
 * @param pluginOptions
 */
async function saveEmbedData(regex, template, opts, pluginOptions) {
	let options = extend({}, opts)

	if (isAnchorTagApplied(options.result)) {
		await stringReplaceAsync(
			options.result,
			anchorRegex,
			async (match, url, index) => {
				if (!isMatchPresent(regex, match, true)) return match
				options = await pushEmbedContent(
					url,
					regex,
					template,
					options,
					pluginOptions,
					index
				)
				return match
			}
		)
	} else {
		options = pushEmbedContent(
			options.result,
			regex,
			template,
			options,
			pluginOptions
		)
	}

	return options
}

function getMatch(regex, string) {
	regex.lastIndex = 0;
	const matches = regex.exec(string)
	regex.lastIndex = 0;
	return matches
}

/**
 * Insert the embed code in the original string.
 * @param regex
 * @param template
 * @param options
 * @param pluginOptions
 * @returns options
 */
export async function insert(regex, template, options, pluginOptions) {
	const { result, replaceUrl, inlineEmbed } = options

	if (!inlineEmbed) {
		return saveEmbedData(regex, template, options, pluginOptions)
	}

	let output

	if (isAnchorTagApplied(result)) {
		output = await stringReplaceAsync(result, anchorRegex, async (match, url) => {
			if (!isMatchPresent(regex, url, true)) {
				return match
			}

			if (!(replaceUrl || pluginOptions.replace)) {
				const args = getMatch(regex, url)
				const t = await template(args, options, pluginOptions)
				return args ? match + t : match
			}
			return stringReplaceAsync(url, regex, async (...args) => {
				return template(args, options, pluginOptions)
			})
		})
	} else {
		output = await stringReplaceAsync(
			result,
			regex,
			async (...args) =>
				replaceUrl || pluginOptions.replace
					? template(args, options, pluginOptions)
					: `${args[0]} ${await template(args, options, pluginOptions)}`
		)
	}

	return extend({}, options, {
		result: output
	})
}
