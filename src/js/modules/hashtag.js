import regex from './regex'

export default function (input, options) {
  const hRegex = regex.hashtag
  return input.replace(hRegex, (match, $1, $2) => {
    const username = $2.split('#')[1]
    return $1 + options.hashtagUrl(username)
  })
}
