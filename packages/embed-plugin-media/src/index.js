import extend from "just-extend"
import base from "embed-plugin-base"

const id = "media"

const image = ["gif", "jpg", "jpeg", "tiff", "png", "svg", "webp"]
const video = ["ogv", "webm", "mp4"]
const audio = ["wav", "mp3", "ogg"]

export default function basicImage(opts) {
  const defaultOptions = {
    id,
    regex: new RegExp(
      `(?:https?)://\\S*\\.(?:${image.concat(video, audio).join("|")})`,
      "gi"
    ),
    template(args) {
      const url = args[0]
      const ext = url.split(".").slice(-1)[0]
      if (image.indexOf(ext) >= 0) {
        return `<img class="ejs-embed" src="${url}"/>`
      } else if (video.indexOf(ext) >= 0) {
        return `<video src="${url}" controls class="ejs-video"></video>`
      } else if (audio.indexOf(ext) >= 0) {
        return `<audio src="${url}" controls class="ejs-audio"></audio>`
      }
    }
  }
  const pluginOptions = extend({}, defaultOptions, opts)
  return base(pluginOptions)
}

basicImage.id = id
