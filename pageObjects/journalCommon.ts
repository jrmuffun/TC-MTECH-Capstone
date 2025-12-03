import Base from "./base.ts";

class JournalCommon extends Base {
    get editJournalBttn() {
        return $('android=new UiSelector().text("Edit Mode")')
    }
    get journalTitle() {
        return $('android=new UiSelector().text("How are you today?")')
    }
    get saveJournalBttn() {
        return $('android=new UiSelector().text("Save")');
    }
    get cancelJournalBttn() {
        return $('android=new UiSelector().text("Cancel")')
    }
    get discardEntryPopup() {
        return $('android=new UiSelector().text("DISCARD")')
    }
    get allMoods() {
        return $$('//android.widget.TextView[@text="Overall Mood"]/../..//android.view.ViewGroup[@content-desc]')
    }
    get allActivities() {
        return $$('//android.widget.TextView[@text="What have you been up to?"]/following-sibling::android.view.ViewGroup//android.view.ViewGroup[@content-desc]')
    }
    get allCategories() {
        // This selector doesnt even come close to working, actually good selectors are on the way
        // https://github.com/Journaly-io/Journaly/issues/42
        return $$('//android.widget.TextView[@text="Overall Mood"]/../../../following-sibling::android.view.ViewGroup//android.widget.TextView[@text]')
    }

    async saveJournal() {
        await this.saveJournalBttn.click();
    }
    async editJournal() {
        await this.editJournalBttn.click();
    }
}

export default new JournalCommon();