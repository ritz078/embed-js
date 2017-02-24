import regex from './regex'

export default function (input, options) {
  const mRegex = regex.mentions
  return input.replace(mRegex, (match, $1, $2) => {
    const username = $2.split('@')[1]
    return $1 + options.mentionsUrl(username)
  })
}
