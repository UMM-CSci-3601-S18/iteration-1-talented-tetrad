import {AboutPage} from './about.po';
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
         return protractor.promise.delayed(50);
 });

     return origFn.apply(browser.driver.controlFlow(), args);
 };

describe('angular-spark-lab', () => {
    let page: AboutPage;

    beforeEach(() => {
        page = new AboutPage();
    });

    // loads page
    it('should load', () => {
        AboutPage.navigateTo();
    });

    // make sure there is an emoji source link
    it('should have an emoji source link ', () => {
        AboutPage.navigateTo();
        expect(page.emojiSourceLinkExists()).toBeTruthy();
    });

    // makes sure it clicks on the emoji source link
    it('Should click on the emoji source link ', () => {
        AboutPage.navigateTo();
        page.clickEmojiSourceLink();
    });

    // make sure there is a menu button
    it('should have a menu button ', () => {
        AboutPage.navigateTo();
        expect(page.menuButtonExists()).toBeTruthy();
    });

    // makes sure it clicks on menu button and then summary page
    it('should click on menu button then summary tab ', () => {
        AboutPage.navigateTo();
        page.clickMenuButton();
        element(by.id('summaryButton')).click();
    });

    // makes sure it clicks on menu button and then homepage
    it('should click on menu button then home tab ', () => {
        AboutPage.navigateTo();
        page.clickMenuButton();
        element(by.id('homeButton')).click();
    });

    // makes sure it clicks on menu button and then about page
    it('should click on menu button then about tab ', () => {
        AboutPage.navigateTo();
        page.clickMenuButton();
        element(by.id('aboutButton')).click();
    });

});
