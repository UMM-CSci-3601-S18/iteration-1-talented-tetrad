import {browser, element, by, promise, ElementFinder} from 'protractor';
import {Key} from 'selenium-webdriver';

export class AboutPage {
    static navigateTo() {
        return browser.get('/about');
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

    emojiSourceLinkExists(): promise.Promise<boolean> {
        this.highlightElement(by.id('emojiSource'));
        return element(by.id('emojiSource')).isPresent();
    }

    clickEmojiSourceLink(): promise.Promise<void> {
        this.highlightElement(by.id('emojiSource'));
        return element(by.id('emojiSource')).click();
    }

    menuButtonExists(): promise.Promise<boolean> {
        this.highlightElement(by.id('menuButton'));
        return element(by.id('menuButton')).isPresent();
    }

    clickMenuButton(): promise.Promise<void> {
        this.highlightElement(by.id('menuButton'));
        return element(by.id('menuButton')).click();
    }
}
