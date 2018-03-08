import {browser, element, by, promise, ElementFinder} from 'protractor';
import {Key} from 'selenium-webdriver';

export class SummaryPage {
    static navigateTo() {
        return browser.get('/summary');
    }

    // http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
    highlightElement(byObject) {
        function setStyle(element, style) {
            const previous = element.getAttribute('style');
            element.setAttribute('style', style);
            setTimeout(() => {
                element.setAttribute('style', previous);
            }, 200);
            return 'highlighted';
        }

        return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
    }

    selectMoodDropdown(): promise.Promise<boolean> {
        this.highlightElement(by.id('summaryMood'));
        return element(by.id('summaryMood')).isPresent();
    }

    clickMoodDropdown(): promise.Promise<void> {
        this.highlightElement(by.id('summaryMood'));
        return element(by.id('summaryMood')).click();
    }

    selectStartDate(): promise.Promise<boolean> {
        this.highlightElement(by.id('startDate'));
        return element(by.id('startDate')).isPresent();
    }

    clickStartDate(): promise.Promise<void> {
        this.highlightElement(by.id('startDate'));
        return element(by.id('startDate')).click();
    }

    selectEndDate(): promise.Promise<boolean> {
        this.highlightElement(by.id('endDate'));
        return element(by.id('endDate')).isPresent();
    }

    clickEndDate(): promise.Promise<void> {
        this.highlightElement(by.id('endDate'));
        return element(by.id('endDate')).click();
    }

    clickMenuButton(): promise.Promise<void> {
        this.highlightElement(by.id('menuButton'));
        return element(by.id('menuButton')).click();
    }
}
