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

    // makes sure it clicks on menu button
    it('should click on menu button', () => {
        AppPage.navigateTo();
        page.clickMenuButton();
        element(by.id('summaryButton'));
    });


});
