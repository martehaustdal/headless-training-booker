const puppeteer = require('puppeteer');
const creds = require('./creds');

module.exports = {
    bookTrainingClass: async function(buttonSelector, name) {
        try {
            const browser = await puppeteer.launch();
            /*const browser = await puppeteer.launch({
                headless: false
            });*/
            const page = await browser.newPage();
            const nextDay = '#panel1 > div > section > div.calendarHeader > div.row > div.col-lg-4.col-md-6 > div > a:nth-child(3)';

            // goto stamina
            await page.goto('https://www.staminatrening.no/finnoss/ski/stamina-ski/');

            // login
            await login(page);
            await page.waitForNavigation();

            // find correct day - 4 days in the future
            for (var i = 0; i < 4; i++) {
                page.click(nextDay); // no await beacause of race cond with next line
                await page.waitForNavigation();
            }

            // submit to trainingclass
            await page.click(buttonSelector);

            // evaluate result
            //const eval = await page.$eval(buttonSelector, e => e.innerHTML);


            // if a ss is desired
            await page.screenshot({path: 'screenshots/stamina.png'});

            browser.close();
        } catch (err) {
            // many things may change on
            console.error("Failed to submit to training " + name, err);
            browser.close();
        }
    }
};

async function login(page) {
    const loginPageSelector = 'body > div > header > nav > div > div > ul > li:nth-child(3) > a';
    const userNameSelector = '#LoginViewModel_Email';
    const passwordSelector = '#LoginViewModel_Password';
    const loginButtonSelector = '#login > div > div > form > div:nth-child(4) > button';
    
    await page.click(loginPageSelector);
    await page.click(userNameSelector);
    await page.keyboard.type(creds.username);
    await page.click(passwordSelector);
    await page.keyboard.type(creds.password);
    await page.click(loginButtonSelector);
}