import Utils from "./utils.ts";
import JournalCommon from "./journalCommon.ts"
import Base from "./base.ts";
import journalCommon from "./journalCommon.ts";

class JournalEditPage extends Base {

    //**Selectors**\\
    get addMoodBttn() {
        // Bad selector but I don't have another option currently
        return $('android=new UiSelector().text("+ Add").instance(0)')
    }
    get addCategoryBttn() {
        return $('android=new UiSelector().description("+ New Category")')
    }
    get addActivityBttn() {
        // Bad selector but I don't have another option currently
        return $('android=new UiSelector().text("+ Add").instance(1)')
    }
    get deleteBttn() {
        return $('android=new UiSelector().text("Delete")')
    }
    get confirmDeleteBttn() {
        return $('android=new UiSelector().text("DELETE")')
    }
    get journalElementTextBox() {
        return $('android=new UiSelector().className("android.widget.EditText")')
    }
    get emojiSelectBttn() {
        return $('//android.view.ViewGroup[@content-desc="Delete"]/preceding-sibling::android.view.ViewGroup')
    }
    get emojiList() {
        return $$('//android.widget.TextView[@text="SMILEYS & EMOTION"]/../*')
    }
    get emojiListTitle() {
        return $('android=new UiSelector().text("SMILEYS & EMOTION")')
    }
    async randEmoji() {
        await this.emojiListTitle.waitForExist();
        return await Utils.chooseRandomElement(await this.emojiList);
    }

    //**Methods**\\
    async addJournalElement(newElementName:string,elementType:string) {
        await this.waitForEditPage();
        // Convert elementType to all caps for comparison
        elementType = elementType.toUpperCase();

        if(elementType == "MOOD") {
            await this.addMoodBttn.click();
            await this.journalElementTextBox.setValue(newElementName);
            // Keeping this method random emojis only for now, might change later
            await this.emojiSelectBttn.click();
            await (await this.randEmoji()).click();
        }
        else if (elementType == "ACTIVITY") {
            await this.addActivityBttn.click();
            await this.journalElementTextBox.setValue(newElementName);
            // Keeping this method random emojis only for now, might change later
            await this.emojiSelectBttn.click();
            await (await this.randEmoji()).click();
        }
        else if (elementType == "CATEGORY") {
            await this.addCategoryBttn.click();
            await this.journalElementTextBox.setValue(newElementName);
        }
        else throw("addJournalElement: elementType given was not expected");
        await JournalCommon.journalTitle.click();
    }
    async updateJournalElement(oldElementName:string,newElementName:string,elementType:string) {
        await this.waitForEditPage();
        // Convert elementType to all caps for comparison
        elementType = elementType.toUpperCase();

        // wait for the page to finish its animation
        await this.addMoodBttn.waitForExist();
        // Check different types and click the element by its name
        if(elementType == 'MOOD') {
            await Utils.clickElementByName(oldElementName,journalCommon.allMoods);
        }
        else if(elementType == 'ACTIVITY') {
            await Utils.clickElementByName(oldElementName,journalCommon.allActivities);
        }
        else if(elementType == 'CATEGORY') {
            // temp solution since I dont have a selector to find categories
            const foundElement = await Base.findElementByText(oldElementName);
            await foundElement.click();
            // await Utils.clickElementByName(oldElementName,journalCommon.allCategories);
        }
        else throw("updateJournalElement: elementType given was not expected")
        await this.journalElementTextBox.setValue(newElementName);
        // click the journal title to clear the input
        await JournalCommon.journalTitle.click();
    }
    async deleteJournalElement(elementName:string,elementType:string) {
       await this.waitForEditPage();
        // Convert elementType to all caps for comparison
        elementType = elementType.toUpperCase();

       await this.addActivityBttn.waitForExist();
       // Check elementType for expected types
       if(elementType == "MOOD"){
           await Utils.clickElementByName(elementName,JournalCommon.allMoods);
       }
       else if(elementType == "ACTIVITY"){
           await Utils.clickElementByName(elementName,JournalCommon.allActivities);
       }
       else if(elementType == "CATEGORY"){
           // temp solution since I don't have a selector to find categories
           const foundElement = await Base.findElementByText(elementName);
           await foundElement.click();
           // await Utils.clickElementByName(elementName,JournalCommon.allCategories);
       }
       // Throw error if elementType was not expected
       else throw("deleteJournalElement: elementType given was not expected");
       // Click delete and confirm
       await this.deleteBttn.click();
       await this.confirmDeleteBttn.click();
    }
    async assertJournalElementName(expectedElementName:string, elementType:string, reverse: boolean = false) {
        // Convert elementType string to all caps
        elementType = elementType.toUpperCase();

        if(elementType == "MOOD") {
            // Map names of categories to an array of strings for comparison
            const moodNames = await JournalCommon.allMoods
                .map(async mood => await mood.getAttribute('content-desc'));
            // if reverse is true, expect it to not contain the name
            if(reverse) await expect(moodNames).not.toContain(expectedElementName);
            else await expect(moodNames).toContain(expectedElementName);
        }
        else if(elementType == "ACTIVITY") {
            // Map names of categories to an array of strings for comparison
            const activityNames = await JournalCommon.allActivities
                .map(async mood => await mood.getAttribute('content-desc'));
            // if reverse is true, expect it to not contain the name
            if(reverse) await expect(activityNames).not.toContain(expectedElementName);
            else await expect(activityNames).toContain(expectedElementName);
        }
        else if(elementType == "CATEGORY") {
            // Once the category selector gets fixed these lines will be un-commented
            // Map names of categories to an array of strings for comparison
            // const categoryNames = await JournalCommon.allCategories
            //     .map(async mood => await mood.getAttribute('content-desc'));
            // if reverse is true, expect it to not contain the name

            // temp solution since I don't have a selector to find categories
            const foundElement = await Base.findElementByText(expectedElementName);
            if(reverse) await expect(foundElement).not.toExist();
            else await expect(foundElement).toHaveText(expectedElementName);
        }
        else throw("assertJournalElementName: elementType given was not expected")
    }
    async cancelJournalEdits() {
        await JournalCommon.cancelJournalBttn.click();
        await JournalCommon.discardEntryPopup.click();
    }
    async waitForEditPage(reverse?:boolean) {
        if(reverse) await JournalCommon.editJournalBttn.waitForExist({
            reverse: false,
            timeoutMsg: "JournalEditPage.waitForEditPage: Timeout",
            timeout: 10000
        });
        else await this.addMoodBttn.waitForExist({
            reverse: reverse,
            timeoutMsg: "JournalEditPage.waitForEditPage: Timeout",
            timeout: 10000
        });
    }

}

export default new JournalEditPage();