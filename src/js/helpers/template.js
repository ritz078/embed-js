/**
 * Common template for vimeo and youtube iframes
 * @param  {string} url     URL of the embedding video
 * @param  {object} options Options object
 * @return {string}         compiled template with variables replaced
 */
export default function template (url, options) {
  return options.template.vimeo(url, options) || options.template.youtube(url, options)
}
