import {browser, element, by, promise, ElementFinder} from 'protractor';
import {Key} from 'selenium-webdriver';

export class AppPage {
    static navigateTo() {
        return browser.get('/');
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

    buttonExists(): promise.Promise<boolean> {
        this.highlightElement(by.id('selectEmoji'));
        return element(by.id('selectEmoji')).isPresent();
    }

    clickSelectEmojiButton(): promise.Promise<void> {
        this.highlightElement(by.id('selectEmoji'));
        return element(by.id('selectEmoji')).click();
    }



    clickMenuButton(): promise.Promise<void> {
        this.highlightElement(by.id('menuButton'));
        return element(by.id('menuButton')).click();
    }
}
