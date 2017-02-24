import { embed } from '../helpers'

export default function (input, output, embeds, options, regex, service) {
  const args = {
    input,
    output,
    options,
    embeds,
    regex,
    service,
    template (match) {
      return this.options.template[this.service](match, this.options)
    }
  }

  return embed(args)
}
