const axios = require('axios')

process.env.UV_THREADPOOL_SIZE = 128

Feature('Modafucker downloads')

Scenario('Make the downloads automatically and fast', async (I) => {

  //I.amOnPage(`https://egghead.io/browse/frameworks/react-native`)
  I.amOnPage(`https://egghead.io/browse/frameworks/react-native`)
  const urlToLinkDownload = name => `https://egghead.io/api/v1/series/${name}`

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
        }
      })
    }
  })

  pause()
})

Scenario('down', (I) => {
  pause()
})