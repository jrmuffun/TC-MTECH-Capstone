import Base from './base.ts'
import Utils from './utils.ts'

class HomePage extends Base {
    private get homeTitle() {
        return $('new UiSelector().textContains("Hello")')
    }
    private get journalEntryBttn() {
        return $('android=new UiSelector().description("How\'s it going?")')
    }
    private get journalEntryMoods() {
        return $$('//android.view.ViewGroup[@content-desc]/android.widget.ImageView/..')
    }
    private async getRandJournalEntryMood() {
        return Utils.chooseRandomElement(this.journalEntryMoods);
    }

    async clickRandJournalEntryMood() {
        await this.journalEntryBttn.waitForDisplayed();
        await (await this.getRandJournalEntryMood()).click();
    }
    async assertAlertBoxText(expectedAlertText:string) {
        const selector:string = "android=new UiSelector().text(\"" + expectedAlertText + "\")"
        const alertBoxElement = $(selector)
        await expect(alertBoxElement).toHaveText(expectedAlertText)
    }
    async enterJournal() {
        await this.journalEntryBttn.click();
    }
    async assertHomePage(reverse:boolean = false) {
        if(reverse) await expect(this.homeTitle).not.toExist();
    }
}

export default new HomePage();