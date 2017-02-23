/**
 * Applies video.js to all audio and video dynamically
 * @param  {object} options Options object
 * @return {null}
 */
export default function (options) {
  if (options.plyr) {
    if (!options.plugins.plyr) throw new ReferenceError("You have enabled plyr but you haven't loaded the library.Find it at https://plyr.io/")
    let plyr = options.plugins.plyr
    plyr.setup('.ejs-plyr', options.plyrOptions)
  }
}
