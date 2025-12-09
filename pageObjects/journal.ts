import Base from './base.ts';

export class Journal extends Base {

    //**Selectors**\\
    get journalText() {
        return $('android=new UiSelector().text("Write something here")')
    }
    async randActivity() {
        return await this.chooseRandomElement(this.allJournalActivities);
    }

    //**Methods**\\
    async clickRandActivity() {
        await this.journalText.waitForDisplayed();
        await (await this.randActivity()).click();
    }
    async writeJournalNote(journalText:string) {
        await this.journalText.setValue(journalText);
    }
    async cancelJournalEntry() {
        await Base.findElementByText("Cancel").click();
        await Base.findElementByText("DISCARD").click();
    }
    async saveJournal() {
        await Base.findElementByText("Save").click();
    }


}

export default new Journal();