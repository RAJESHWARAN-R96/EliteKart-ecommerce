import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log('BROWSER ERROR:', msg.text());
        }
    });

    page.on('pageerror', error => {
        console.log('PAGE ERROR STR:', error.toString());
    });

    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });

    await browser.close();
})();
