import {AppPage} from './app.po';
import {browser, protractor, element, by} from 'protractor';
import {Key} from 'selenium-webdriver';

const origFn = browser.driver.controlFlow().execute;

// https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
    let args = arguments;

//     // queue 100ms wait between test
//     // This delay is only put here so that you can watch the browser do its thing.
//     // If you're tired of it taking long you can remove this call
    origFn.call(browser.driver.controlFlow(), function () {
         return protractor.promise.delayed(100);
 });

     return origFn.apply(browser.driver.controlFlow(), args);
 };

describe('angular-spark-lab', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    // loads page
    it('should load', () => {
        AppPage.navigateTo();
    });

    // make sure there is a selected emoji button
    it('should have a select emoji button ', () => {
        AppPage.navigateTo();
        expect(page.selectEmojiButtonExists()).toBeTruthy();
    });

    // make sure there is a confirm emoji selection button
    it('should have a confirm button in emoji popup ', () => {
        AppPage.navigateTo();
        page.clickSelectEmojiButton();
        expect(page.confirmButtonExists());
    });

    // makes sure it clicks on the radiant labeled emoji and confirms it
    it('Should click on radiant emoji and then confirm button ', () => {
        AppPage.navigateTo();
        page.clickSelectEmojiButton();
        element(by.className('emojiRadiant')).click();
        page.clickConfirmButton();
    });

    // makes sure it clicks on the happy labeled emoji and confirms it
    it('Should click on happy emoji and then confirm button ', () => {
        AppPage.navigateTo();
        page.clickSelectEmojiButton();
        element(by.className('emojiHappy')).click();
        page.clickConfirmButton();
    });

    // makes sure it clicks on the meh labeled emoji and confirms it
    it('Should click on meh emoji and then confirm button ', () => {
        AppPage.navigateTo();
        page.clickSelectEmojiButton();
        element(by.className('emojiMeh')).click();
        page.clickConfirmButton();
    });

    // makes sure it clicks on the down labeled emoji and confirms it
    it('Should click on down emoji and then confirm button ', () => {
        AppPage.navigateTo();
        page.clickSelectEmojiButton();
        element(by.className('emojiDown')).click();
        page.clickConfirmButton();
    });

    // makes sure it clicks on the sad labeled emoji and confirms it
    it('Should click on sad emoji and then confirm button ', () => {
        AppPage.navigateTo();
        page.clickSelectEmojiButton();
        element(by.className('emojiSad')).click();
        page.clickConfirmButton();
    });

    // makes sure it clicks on the anxious labeled emoji and confirms it
    it('Should click on anxious emoji and then confirm button ', () => {
        AppPage.navigateTo();
        page.clickSelectEmojiButton();
        element(by.className('emojiAnxious')).click();
        page.clickConfirmButton();
    });

    // make sure there is a menu button
    it('should have a menu button ', () => {
        AppPage.navigateTo();
        expect(page.menuButtonExists()).toBeTruthy();
    });

    // makes sure it clicks on menu button and then summary page
    it('should click on menu button then summary tab ', () => {
        AppPage.navigateTo();
        page.clickMenuButton();
        element(by.id('summaryButton')).click();
    });

    // makes sure it clicks on menu button and then about page
    it('should click on menu button then about tab ', () => {
        AppPage.navigateTo();
        page.clickMenuButton();
        element(by.id('aboutButton')).click();
    });

    // makes sure it clicks on menu button and then homepage
    it('should click on menu button then home tab ', () => {
        AppPage.navigateTo();
        page.clickMenuButton();
        element(by.id('homeButton')).click();
    });


});
