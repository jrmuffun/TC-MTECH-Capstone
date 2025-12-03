import Base from './base.ts';
import Utils from "./utils.ts";
import JournalCommon from "./journalCommon.ts";

export class JournalPage extends Base {

    get journalText() {
        return $('android=new UiSelector().text("Write something here")')
    }

    async randActivity() {
        return await Utils.chooseRandomElement(JournalCommon.allActivities);
    }

    async clickRandActivity() {
        await this.journalText.waitForDisplayed();
        await (await this.randActivity()).click();
    }
    async writeJournalNote(journalText:string) {
        await this.journalText.setValue(journalText);
    }
    async cancelJournalEntry() {
        await JournalCommon.cancelJournalBttn.click();
        await JournalCommon.discardEntryPopup.click();
    }


}

export default new JournalPage();