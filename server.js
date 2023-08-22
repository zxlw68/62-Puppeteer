const express = require('express')
const puppeteer = require('puppeteer')
const absolutify = require('absolutify')

const app = express()

app.get('/', async (req, res) => {
  const { url } = req.query

  if (!url) {
    return res.send('No url provided')
  } else {
    try {
      const browser = await puppeteer.launch({ headless: 'new' })
      const page = await browser.newPage()
      await page.goto(`https://${url}`)
      // await page.goto('https://www.render.com')
      // assuming address starts from https

      let document = await page.evaluate(
        () => document.documentElement.outerHTML
      )

      // document = absolutify(document, `/?url=${url.split('/')[0]}`)
      // convert url from /business to /?url=github.com/business
      document = absolutify(document, `/?url=${url}`)

      return res.send(document)
    } catch (err) {
      return res.send(err)
    }
  }
})

app.listen(process.env.PORT)
// app.listen(3000)
