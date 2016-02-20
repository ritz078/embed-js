import { ifEmbed } from '../modules/utils'
import Base from '../modules/Base'

export default function baseEmbed(input, output, embeds, options, regex, service, flag){
	return ifEmbed(options, service) || (ifEmbed(options, service) && flag) ? new Base(input, output, embeds, options, regex, service).process() : [output, embeds]
}
