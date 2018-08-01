const cheerio = require('cheerio')

Feature('Modafucker downloads')

Scenario('Make the downloads automatically and fast', async (I) => {

  I.amOnPage('https://egghead.io/')
  const homeHTML = await I.grabTextFrom('body')

  I.wait(3)
  if (homeHTML.includes('Sign in')) {
    I.click('Sign in')
    I.wait(5)
    I.click('.btn.btn.custom-btn.custom-btn-secondary.custom-btn-blue')
    I.wait(3)
  }

  const urls = [
    //'https://egghead.io/browse/libraries/d3',
    //'https://egghead.io/lessons' - next
  ]

  const urlToLinkDownload = name => `https://egghead.io/api/v1/series/${name}`

  await Promise.all(urls.map(async url => {
    I.amOnPage(url)

    //I.click('#App-react-component > div > div.flex.flex-column.items-stretch.bg-gray > div > div > div > div:nth-child(2) > div:nth-child(3) > div > div > div.flex.justify-center.items-center.br2.ba.black-90.grow.f6.ttu.lh-copy.pv3.ph4.mt4.mt5-l.fw6.pointer.b--transparent.tc.eh-shadow-1.bg-white.eh-transition')
    const links = await I.grabAttributeFrom('a', 'href')

    let courses = links.filter(anchor => anchor.includes('courses'))
    courses = Array.from(new Set(courses))
  
    courses.map(course => {
      if (course.includes('courses\/')) {
        I.amOnPage(urlToLinkDownload(course.split('/')[course.split('/').length - 1]))
  
        I.grabAttributeFrom('body', 'innerText').then(function (response) {
          let urlToDownload = JSON.parse(response)
  
          if (urlToDownload.download_url) {
            console.log('​urlToDownload.download_url', urlToDownload.download_url)
            I.amOnPage(urlToDownload.download_url)
          } else {
            console.log('no url to download')
          }
        })
      }
    })
    
  }))

  pause()
})

Scenario('down', (I) => {
  pause()
})