export default function (data, fullData, embedUrl, options) {
  if (data.host === 'vimeo') {
    return options.template.detailsVimeo(data, fullData, embedUrl, options)
  } else if (data.host === 'youtube') {
    return options.template.detailsYoutube(data, fullData, embedUrl, options)
  }
}
