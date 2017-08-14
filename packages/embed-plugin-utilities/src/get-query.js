export default function(params) {
  const esc = encodeURIComponent
  return Object.keys(params).map(k => `${esc(k)}=${esc(params[k])}`).join("&")
}
