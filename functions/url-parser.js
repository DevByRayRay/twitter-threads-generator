// import { headers } from '../functions-lib/cors'
const puppeteer = require('puppeteer');

// export async function getUrlHtml() {
(async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto('https://betterprogramming.pub/how-promises-actually-work-in-javascript-1c80b1af7193')

    // console.log('page: ', page)

    // const result = await page.evaluate(() => {
    //     let temperature = document.querySelectorAll('article section')
    //     return {
    //         temperature,
    //         width: document.documentElement.clientWidth,
    //         height: document.documentElement.clientHeight,
    //         deviceScaleFactor: window.devicePixelRatio,
    //     }
    // })

    page.mainFrame()
        .waitForSelector('h1')
        .then((data) => console.log('First URL with image: ' + data)).catch((err) => console.error('error: ' + err))

    // const dimensions = await page.evaluate(() => {
    //     let sections = $('h1')
    //     return {
    //         sections,
    //         width: document.documentElement.clientWidth,
    //         height: document.documentElement.clientHeight,
    //         deviceScaleFactor: window.devicePixelRatio,
    //     };
    // });


    // console.log('dimensions: ', dimensions)

    browser.close()
})()

// return result
// }

// exports.handler = async function (event, context) {

//     if (event.httpMethod === 'OPTIONS') {
//         return { statusCode: 200, headers, body: 'Ok' }
//     }

//     if (event.httpMethod !== "GET") {
//         return { statusCode: 405, headers, body: JSON.stringify({ message: "Method Not Allowed" }) };
//     }

//     try {
//         const page = await getUrlHtml()

//         return {
//             statusCode: 200,
//             headers,
//             body: JSON.stringify({
//                 data: page
//             })
//         }
//     } catch (error) {
//         return {
//             statusCode: 500,
//             headers,
//             body: JSON.stringify({
//                 message: 'Something went wrong',
//                 error
//             })
//         }

//     }
// }