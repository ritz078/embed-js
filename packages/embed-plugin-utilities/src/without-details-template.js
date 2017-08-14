export default function(embedUrl, height, name) {
  return `<iframe class="ejs-embed ejs-${name}" src="${embedUrl}" frameBorder="0" height="${height}"></iframe>`
}
