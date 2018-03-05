import {AppPage} from './app.po';
import {browser, protractor, element, by} from 'protractor';
import {Key} from 'selenium-webdriver';

describe('angular-spark-lab', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should load', () => {
        AppPage.navigateTo();
    });

    it('should have a select emoji button ', () => {
        AppPage.navigateTo();
        expect(page.buttonExists()).toBeTruthy();
    });

/* 'home' relates to home.component.ts file that lets test know when dialog is opened
   Doesn't work yet!

    it('Should open a dialog box when select emoji button is clicked', () => {
        AppPage.navigateTo();
        expect(element(by.css('home')).isPresent()).toBeFalsy('There should not be a modal window yet');
        element(by.id('selectEmoji')).click();
        expect(element(by.css('home')).isPresent()).toBeTruthy('There should be a modal window now');
    });
    */

    it('Should click on an emoji', () => {
        AppPage.navigateTo();
        page.clickSelectEmojiButton();
        element(by.id('Radiant'));
    });
});
