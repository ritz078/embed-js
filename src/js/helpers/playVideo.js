import template from './template'

/**
 * Plays the video after clicking on the thumbnail
 * @param  {object} options   Options object
 * @return {null}
 */
export default function playVideo (options) {
	/** Execute the customVideoClickHandler if the user wants to handle it on his own. */
  if (options.customVideoClickHandler) return options.videoClickHandler(options, template)

  let classes = document.getElementsByClassName(options.videoClickClass)
  for (let i = 0; i < classes.length; i++) {
    classes[i].onclick = function () {
      options.onVideoShow()
      let url = this.getAttribute('data-ejs-url') + '?autoplay=true'
      this.parentNode.parentNode.innerHTML = template(url, options)
    }
  }
}
