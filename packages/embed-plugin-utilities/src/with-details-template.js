import truncate from "just-truncate"

export default function(
  { url, title, embedUrl, description, thumbnail },
  thumbClassName,
  showPlayIcon = false
) {
return `<div class="ejs-preview ejs-embed"><div class="ejs-thumb ${thumbClassName}" data-url="${embedUrl}" style="background-image:url(${thumbnail})">${showPlayIcon ? '<span>&#9658;</span>' : ''}</div><div class="ejs-info"><h4 class="ejs-title"><a href="${url}">${title}</a></h4><div class="ejs-desc">${truncate(
    description,
    150
  )}</div></div></div>`
}
