import {AppPage} from './app.po';
import {browser, protractor, element, by} from 'protractor';
import {Key} from 'selenium-webdriver';

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
        expect(page.buttonExists()).toBeTruthy();
    });

    // makes sure it clicks on the radiant labeled emoji
    it('Should click on an emoji', () => {
        AppPage.navigateTo();
        page.clickSelectEmojiButton();
        element(by.id('Radiant'));
    });

    // makes sure it clicks on the happy labeled emoji
    it('Should click on an emoji', () => {
        AppPage.navigateTo();
        page.clickSelectEmojiButton();
        element(by.id('Happy'));
    });

    // makes sure it clicks on the meh labeled emoji
    it('Should click on an emoji', () => {
        AppPage.navigateTo();
        page.clickSelectEmojiButton();
        element(by.id('Meh'));
    });

    // makes sure it clicks on the down labeled emoji
    it('Should click on an emoji', () => {
        AppPage.navigateTo();
        page.clickSelectEmojiButton();
        element(by.id('Down'));
    });

    // makes sure it clicks on the sad labeled emoji
    it('Should click on an emoji', () => {
        AppPage.navigateTo();
        page.clickSelectEmojiButton();
        element(by.id('Sad'));
    });

    // makes sure it clicks on the anxious labeled emoji
    it('Should click on an emoji', () => {
        AppPage.navigateTo();
        page.clickSelectEmojiButton();
        element(by.id('Anxious'));
    });


    // makes sure it clicks on menu button
    it('should click on menu button', () => {
        AppPage.navigateTo();
        page.clickMenuButton();
        element(by.id('summaryButton'));
    });


});
