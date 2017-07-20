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
export function appendEmbedsAtEnd({ input, _embeds }) {
	return `${input} ${combineEmbedsText(_embeds)}`
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

	if (isAnchorTagApplied(options.input)) {
		await stringReplaceAsync(
			options.input,
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
			options.input,
			regex,
			template,
			options,
			pluginOptions
		)
	}

	return options
}

function normalizeArguments(url, args) {
	args.unshift(url)
	return args
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
	const { input, replaceUrl, inlineEmbed } = options

	if (!inlineEmbed) {
		return saveEmbedData(regex, template, options, pluginOptions)
	}

	let output

	if (isAnchorTagApplied(input)) {
		output = await stringReplaceAsync(input, anchorRegex, async (match, url) => {
			if (!isMatchPresent(regex, url, true)) {
				return match
			}

			if (!(replaceUrl || pluginOptions.replace)) {
				const args = url.match(regex)
				const t = await template(
					normalizeArguments(url, args),
					options,
					pluginOptions
				)
				return args ? match + t : match
			}
			return stringReplaceAsync(url, regex, async (...args) =>
				template(args, options, pluginOptions)
			)
		})
	} else {
		output = await stringReplaceAsync(
			input,
			regex,
			async (...args) =>
				replaceUrl || pluginOptions.replace
					? template(args, options, pluginOptions)
					: `${args[0]} ${await template(args, options, pluginOptions)}`
		)
	}

	return extend({}, options, {
		input: output
	})
}
