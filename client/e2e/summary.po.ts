import {browser, element, by, promise} from 'protractor';
import {Key} from 'selenium-webdriver';

export class SummaryPage {
    static navigateTo(): promise.Promise<any> {
        return browser.get('summary');
    }

    static backspace() {
        browser.actions().sendKeys(Key.BACK_SPACE).perform();
    }

    }

    // http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
  /*  highlightElement(byObject) {
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
*/
  /*
     buttonExists(): promise.Promise<boolean> {
        this.highlightElement(by.id('selectEmoji'));
        return element(by.id('selectEmoji')).isPresent();
    }

    clickSelectEmojiButton(): promise.Promise<void> {
        this.highlightElement(by.id('selectEmoji'));
        return element(by.id('selectEmoji')).click();
    }
*/
