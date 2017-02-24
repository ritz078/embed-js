import { ifEmbed } from '../modules/utils'
import base from '../modules/base'

export default function baseEmbed (input, output, embeds, options, regex, service, flag) {
  return ifEmbed(options, service) || (ifEmbed(options, service) && flag) ? base(input, output, embeds, options, regex, service) : [output, embeds]
}
