/**
 * Applies video.js to all audio and video dynamically
 * @param  {object} options Options object
 * @return {null}
 */
export default function applyVideoJS (options) {
  options.videojsOptions.width = options.videoWidth
  options.videojsOptions.height = options.videoHeight
  if (options.videoJS) {
    if (!options.plugins.videojs) throw new ReferenceError("You have enabled videojs but you haven't loaded the library.Find it at http://videojs.com/")
    let VideoJS = options.plugins.videojs
    let elements = options.input.getElementsByClassName('ejs-video-js')
    for (let i = 0; i < elements.length; i++) {
      VideoJS(elements[i], options.videojsOptions, () => options.videojsCallback())
    }
  }
}
