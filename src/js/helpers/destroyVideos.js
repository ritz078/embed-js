/**
 * Destroys the onclick event for opening the video template from the details template
 * @param  {className} className
 * @return {null}
 */
export default function (className) {
  const classes = document.getElementsByClassName(className)
  for (let i = 0; i < classes.length; i++) {
    classes[i].onclick = null
  }
}
