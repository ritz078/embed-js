import EmbedJS from "../src"
import test from "ava"
import prismjs from "prismjs"
import basic from "embed-preset-basic"

const input = `
Sunt eraes Cum habitio messis, omnes rectores resuscitabo brevis, bassus gabaliumes.Altus cliniass ducunt ad extum.Sunt habitioes imperium brevis, https://github.com/ritz078/embed.js bassus elogiumes.Pol, a bene fides.Calceus varius lacta est.Nunquam prensionem detrius.Verpa raptus abactus est.Eleates crederes, tanquam rusticus fuga.Cur classis cantare?Bassus musa rare attrahendams bursa est.Pol, mirabilis gallus!Accelerare sensim ducunt ad raptus onus.Bubos peregrinatione! imitari :smile: dexter, https://soundcloud.com/traphousemusic1/despacito-luis-fonsi-daddy-yankee fatalis parses.Mineraliss sunt parss de pius finis.Hippotoxotas ire in quadrata!Ionicis tormentos congregabo in copinga!Fluctuis peregrinatione!Navis, pulchritudine, et devatio.Calceuss cadunt in dexter gandavum!Amor, solitudo, et
\`\`\`js
.ejs-embed iframe {
	width: 100%;
}
\`\`\`
	olla.Animaliss resistere!Stella, lacta, et genetrix.Pol, ferox exsul!Ubi est primus capio?Cur mortem peregrinationes?Exemplar congregabos, tanquam mirabilis nix.Hercle, eleates neuter!.Camerarius, http://www.iitr.ac.in/Main/assets/images/topold.jpg teres exsuls diligenter convertam de pius, magnum luna.Sunt homoes talem primus, flavum fiscinaes.Clemens humani generis grauiter dignuss exemplar est.Finis, fermium, et acipenser.Acipenser neuter fraticinida est.A falsis, finis regius spatii.Ecce, https://vimeo.com/227437799 barbatus valebat!Est domesticus torus, cesaris.Nunquam amor lumen.A falsis, bulla salvus luna.Nunquam aperto luna.Zeta raptus agripeta est. Est nobilis absolutio, cesaris.Cur cannabis accelerare?Caesiums sunt fraticinidas de domesticus lumen.Pol, a bene habena, navis!Est peritus lixa, cesaris.Ubi est salvus cursus?Cum eleates accelerare, omnes scutumes magicae rusticus, noster acipenseres.Sunt aonideses https://instagram.com/p/BVzwRqQlUdV visum albus, altus indexes.A falsis, nix albus gallus.Vae.Cum resistentia resistere, omnes accentores contactus gratis, noster sectames.A falsis, bulla bi-color fortis.Abactus de bi-color cedrium, aperto cotta!Pol, alter visus!Ubi est fidelis triticum?Altus assimilatio satis magicaes bubo est.Noster liberi sensim tractares boreas est.Regius ausus cito promissios absolutio est.
`

test("EmbedJS - should return correct result", async t => {
  const ejs = new EmbedJS({
    input,
    preset: basic({
      gAuthKey: "AIzaSyCqFouT8h5DKAbxlrTZmjXEmNBjC69f0ts",
      highlight: {
        prismjs
      }
    }),
    fetch: require("isomorphic-unfetch"),
    inlineEmbed: true,
    replaceUrl: true
  })

  const { result } = await ejs.text()
  t.snapshot(result)
})
