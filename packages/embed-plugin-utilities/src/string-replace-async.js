import extend from "just-extend"

function matchAll(str, re) {
  const matches = []
  let res = re.exec(str)

  while (res) {
    matches.push(res)

    if (!re.global) {
      break
    }

    res = re.exec(str)
  }
  return matches
}

function replaceAll(str, matches) {
  return matches.reverse().reduce(function(res, match) {
    const prefix = res.slice(0, match.index)
    const postfix = res.slice(match.index + match[0].length)

    return prefix + match.replacement + postfix
  }, str)
}

function assignReplacement(match, replacer) {
  const args = match.concat([match.index, match.input])

  return replacer.apply(null, args).then(function(res) {
    return extend({}, match, { replacement: res })
  })
}

function concurrency(matches, replacer) {
  const promises = matches.map(function(match) {
    return assignReplacement(match, replacer)
  })

  return Promise.all(promises)
}

function processString(str, re, replacer) {
  const matches = matchAll(str, re)
  const processor = concurrency

  return processor(matches, replacer).then(function(matches) {
    return replaceAll(str, matches)
  })
}

function stringReplaceAsync(str, re, replacer) {
  re.lastIndex = 0
  try {
    return Promise.resolve(processString(str, re, replacer))
  } catch (e) {
    return Promise.reject(e)
  }
}

export default stringReplaceAsync
