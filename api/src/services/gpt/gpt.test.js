import { runTranslation } from './gpt.js'

describe('Actual translation', () => {
  it('consistent translation of simple code', async () => {
    const fromlang = 'Python'
    const tolang = 'C'
    const orgcode = 'print("hello world")'
    const newcode = await runTranslation({ fromLanguage: fromlang, toLanaguage: tolang, code: orgcode }) // Translate code
    const oldcode = await runTranslation({ fromLanguage: tolang, toLanguage: fromlang, code: newcode }) // Reverse translation
    expect(oldcode).toContain(orgcode) // Check that the retranslated code contains starting code
  }, 100000)

  it('throws error when given nonsense', async () => {
    const nonsense = 'Im baby everyday carry cold-pressed solarpunk viral'
    expect(() => {
      runTranslation({ fromLanguage: 'Java', toLanguage: 'SQL', code: nonsense })
    }).toThrow('Bad translation input')
  }, 100000)

  it('throws rate limit when input is obscene', async () => {
    const nonsense = `I'm baby plaid iPhone fixie occupy. IPhone PBR&B wolf ethical direct trade artisan intelligentsia fit next level gatekeep ascot sartorial authentic blue bottle. Austin hashtag selfies, williamsburg ethical ugh food truck ascot four loko tonx. Pabst swag leggings everyday carry paleo bodega boys try-hard four loko. Tousled intelligentsia pabst, VHS selfies solarpunk fixie mixtape kinfolk ugh. Portland ennui yes plz cardigan disrupt, tousled whatever tattooed before they sold out pok pok chambray. Chartreuse portland cold-pressed, fam affogato live-edge activated charcoal occupy grailed.

    Messenger bag DSA taiyaki hexagon literally copper mug polaroid. Beard crucifix tattooed street art taxidermy freegan kombucha hashtag fixie seitan distillery. Lomo salvia heirloom Brooklyn unicorn microdosing woke iceland. Tote bag post-ironic hexagon neutral milk hotel humblebrag ennui letterpress four dollar toast lyft actually portland. YOLO snackwave bespoke fashion axe, narwhal viral austin gluten-free cardigan praxis tousled health goth. Put a bird on it meggings meh umami blackbird spyplane retro mukbang tonx pok pok gastropub hell of unicorn chia ennui. Yuccie etsy enamel pin fam hoodie af.

    Cupping af deep v, photo booth hell of leggings DSA ugh food truck sriracha dreamcatcher flexitarian. Viral paleo sus polaroid deep v. Truffaut banjo irony lo-fi, hammock DSA chicharrones green juice scenester messenger bag etsy. Tofu williamsburg beard lyft bushwick. Ramps post-ironic activated charcoal trust fund, tumblr franzen raclette. Ugh vexillologist hot chicken letterpress mixtape shoreditch venmo godard, leggings dreamcatcher try-hard gastropub celiac.

    Keytar jean shorts polaroid beard fashion axe. Paleo praxis echo park, flexitarian whatever butcher coloring book tbh gluten-free umami yes plz. Trust fund bicycle rights meditation kinfolk polaroid blue bottle. Crucifix raclette mukbang, man bun art party iPhone tote bag.

    Forage retro raw denim man bun keffiyeh, bespoke schlitz typewriter listicle jianbing jean shorts gorpcore adaptogen sus. Artisan cornhole retro four loko aesthetic austin XOXO church-key JOMO portland etsy literally viral. Salvia knausgaard vexillologist sus, art party selvage 8-bit marxism 3 wolf moon. IPhone man bun beard jianbing organic franzen sustainable live-edge migas succulents craft beer twee blackbird spyplane hoodie.

    Dummy text? More like dummy thicc text, amirite?`
    expect(() => {
      runTranslation({ fromLanguage: 'Java', toLanguage: 'SQL', code: nonsense })
    }).toThrow()
  }, 100000)
})

describe('Optimization', () => {
  it('condenses redundant code', async () => {
    const lang = 'Python'
    const longcode = 'x=0\nx+=1\nx+=1\nprint(x)' // Inefficient code
    const oldlength = longcode.length
    const shortcode = await runTranslation({ fromLanguage: lang, toLanguage: lang, code: longcode }) // Call optimization
    expect(shortcode.length).toBeLessThan(oldlength) // Make sure optimized code is shorter than unoptimized code
  }, 100000)
})
