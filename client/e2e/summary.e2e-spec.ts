import {SummaryPage} from './summary.po';
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
    let page: SummaryPage;

    beforeEach(() => {
        page = new SummaryPage();
    });

    // loads page
    it('should load', () => {
        SummaryPage.navigateTo();
    });

    // make sure there is an emotions dropdown button
    it('should have an emotion dropdown ', () => {
        SummaryPage.navigateTo();
        expect(page.selectEmotionDropdown()).toBeTruthy();
    });

    // make sure it clicks emotion dropdown
    it('should click the emotion dropdown ', () => {
        SummaryPage.navigateTo();
        page.clickEmotionDropdown();
    });

    // makes sure it clicks on the radiant labeled emotion dropdown
    it('Should click on radiant dropdown ', () => {
        SummaryPage.navigateTo();
        page.clickEmotionDropdown();
        element(by.id('dropdownRadiant')).click();
    });

    // makes sure it clicks on the happy labeled emotion dropdown
    it('Should click on happy dropdown ', () => {
        SummaryPage.navigateTo();
        page.clickEmotionDropdown();
        element(by.id('dropdownHappy')).click();
    });

    // makes sure it clicks on the meh labeled emotion dropdown
    it('Should click on meh dropdown ', () => {
        SummaryPage.navigateTo();
        page.clickEmotionDropdown();
        element(by.id('dropdownMeh')).click();
    });

    // makes sure it clicks on the down labeled emotion dropdown
    it('Should click on down dropdown ', () => {
        SummaryPage.navigateTo();
        page.clickEmotionDropdown();
        element(by.id('dropdownDown')).click();
    });

    // makes sure it clicks on the sad labeled emotion dropdown
    it('Should click on sad dropdown ', () => {
        SummaryPage.navigateTo();
        page.clickEmotionDropdown();
        element(by.id('dropdownSad')).click();
    });

    // makes sure it clicks on the anxious labeled emotion dropdown
    it('Should click on anxious dropdown ', () => {
        SummaryPage.navigateTo();
        page.clickEmotionDropdown();
        element(by.id('dropdownAnxious')).click();
    });

    // makes sure it clicks on the radiant labeled emotion dropdown and then all emotions dropdown
    it('Should click on radiant dropdown and then do process again with the all emotions dropdown  ', () => {
        SummaryPage.navigateTo();
        page.clickEmotionDropdown();
        element(by.id('dropdownRadiant')).click();
        page.clickEmotionDropdown();
        element(by.id('dropdownAllEmotions')).click();
    });

    // makes sure there is a start date text field
    it('should be a start date text field ', () => {
        SummaryPage.navigateTo();
        expect(page.selectStartDate()).toBeTruthy();
    });

    // makes sure it clicks on the choose a start date text field
    it('should click on the choose a start date text field ', () => {
        SummaryPage.navigateTo();
        page.clickStartDate();
        element(by.id('startDate')).click();
    });

    // makes sure there is an end date text field
    it('should be an end date text field ', () => {
        SummaryPage.navigateTo();
        expect(page.selectEndDate()).toBeTruthy();
    });

    // makes sure it clicks on the choose an end date text field
    it('should click on the choose an end date text field ', () => {
        SummaryPage.navigateTo();
        page.clickEndDate();
        element(by.id('endDate')).click();
    });

    // makes sure there is a more info button
    it('should be a more info button ', () => {
        SummaryPage.navigateTo();
        expect(page.selectMoreInfoButton()).toBeTruthy();
    });

    // makes sure it clicks on the more info button
    it('should click on the more info button ', () => {
        SummaryPage.navigateTo();
        page.clickMoreInfoButton();
    });

});