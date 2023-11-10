const puppeteer = require("puppeteer")
const Sentiment = require("sentiment")
const sentiment = new Sentiment()


const SentimentData = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(
    "https://www.nytimes.com/live/2020/08/16/us/election-trump-vs-biden?action=click&module=Top%20Stories&pgtype=Homepage"
  )
  const text = await page.$eval("*", (el) => el.innerText)
  const result = await sentiment.analyze(text)
  console.log(result)
  //alert("hello");
  await browser.close()
}
//alert("hello");
SentimentData()