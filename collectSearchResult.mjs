import puppeteer from "puppeteer";

// creating browser
const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: { width: 1520, height: 1000 },
  slowMo: 50,
});

// creating page (browser tab)
const page = await browser.newPage();

// entering in a url
await page.goto("https://duckduckgo.com/", {
  waitUntil: "networkidle2",
  timeout: 5000,
});

// selecting search-input
const searchBox = await page.waitForSelector("#searchbox_input");

// type in search-input
await searchBox.type("puppeteer");

// selecting search button
const searchButton = await page.waitForSelector("button[type='submit']");

// click on the search button
await searchButton.click();

// selecting an element
const myGithubLink = await page.waitForSelector(".ikg2IXiCD14iVX7AdZo1");

const collectedData = await page.$$eval(".ikg2IXiCD14iVX7AdZo1 a", (elms) =>
  elms.map((elm) => {
    return {
      title: elm.innerText.trim(),
      link: elm.href,
    };
  })
);
console.log({ collectedData });

// closing browser
await browser.close();
