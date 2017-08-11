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
	return sortEmbeds(embeds)
		.map(({ content }) => content)
		.join(" ")
}

/**
 * Add the embed code at the end of string and return the new string
 * @param text - original string
 * @param _embeds - Array of embed code
 * @returns {string}
 */
export default function appendEmbedsAtEnd({ result, _embeds }) {
	return `${result} ${combineEmbedsText(_embeds)}`
}