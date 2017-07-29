import EmbedJS from '../src/embed'
import test from 'ava'
import embedAll from '../src/presets/embed-all'

const input = `
	<div id="a">
		Sunt eraes Cum habitio messis, omnes rectores resuscitabo brevis, bassus gabaliumes.Altus cliniass ducunt ad extum.Sunt habitioes imperium brevis, https://github.com/ritz078/embed.js bassus elogiumes.Pol, a bene fides.Calceus varius lacta est.Nunquam prensionem detrius.Verpa raptus abactus est.Eleates crederes, tanquam rusticus fuga.Cur classis cantare?Bassus musa rare attrahendams bursa est.Pol, mirabilis gallus!Accelerare sensim ducunt ad raptus onus.Bubos peregrinatione! imitari :smile: dexter, fatalis parses.Mineraliss sunt parss de pius finis.Hippotoxotas ire in quadrata!Ionicis tormentos congregabo in copinga!Fluctuis peregrinatione!Navis, pulchritudine, et devatio.Calceuss cadunt in dexter gandavum!Amor, solitudo, et
\`\`\`js
.ejs-embed iframe {
	width: 100%;
}
\`\`\`
	olla.Animaliss resistere!Stella, lacta, et genetrix.Pol, ferox exsul!Ubi est primus capio?Cur mortem peregrinationes?Exemplar https://www.youtube.com/watch?v=wXrqtC81ztA congregabos, tanquam mirabilis nix.Hercle, eleates neuter!.Camerarius, http://www.iitr.ac.in/Main/assets/images/topold.jpg teres exsuls diligenter convertam de pius, magnum luna.Sunt homoes talem primus, flavum fiscinaes.Clemens humani generis grauiter dignuss exemplar est.Finis, fermium, et acipenser.Acipenser neuter fraticinida est.A falsis, finis regius spatii.Ecce, https://vimeo.com/227437799 barbatus valebat!Est domesticus torus, cesaris.Nunquam amor lumen.A falsis, bulla salvus luna.Nunquam aperto luna.Zeta raptus agripeta est.
	</div>
`

test('EmbedJS - should ', async (t) => {
	const ejs = new EmbedJS({
		input,
		preset: embedAll({
			gAuthKey: "AIzaSyCqFouT8h5DKAbxlrTZmjXEmNBjC69f0ts"
		}),
		inlineEmbed: true,
		replaceUrl: true
	})

	const { result } = await ejs._process()
	t.snapshot(result)
})
