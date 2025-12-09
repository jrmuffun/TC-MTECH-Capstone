import Base from "./base.ts";

class JournalEdit extends Base {

    //**Selectors**\\
    get addMoodBttn() {
        return $('android=new UiSelector().text("+ Add").instance(0)')
    }
    get addCategoryBttn() {
        return $('android=new UiSelector().description("+ New Category")')
    }
    get addActivityBttn() {
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
        return await this.chooseRandomElement(this.emojiList);
    }

    //**Methods**\\
    async addJournalElement(newElementName:string,elementType:string) {
        await this.waitForEditPage();
        elementType = elementType.toUpperCase();

        if(elementType == "MOOD") {
            await this.addMoodBttn.click();
            await this.journalElementTextBox.setValue(newElementName);
            await this.emojiSelectBttn.click();
            await (await this.randEmoji()).click();
        }
        else if (elementType == "ACTIVITY") {
            await this.addActivityBttn.click();
            await this.journalElementTextBox.setValue(newElementName);
            await this.emojiSelectBttn.click();
            await (await this.randEmoji()).click();
        }
        else if (elementType == "CATEGORY") {
            await this.addCategoryBttn.click();
            await this.journalElementTextBox.setValue(newElementName);
        }
        else throw("addJournalElement: elementType given was not expected");
        await Base.findElementByText("How are you today?").click();
    }
    async updateJournalElement(oldElementName:string,newElementName:string,elementType:string) {
        await this.waitForEditPage();
        elementType = elementType.toUpperCase();

        await this.addMoodBttn.waitForExist();
        if(elementType == 'MOOD') {
            await this.clickElementFromArray(oldElementName,this.allJournalMoods);
        }
        else if(elementType == 'ACTIVITY') {
            await this.clickElementFromArray(oldElementName,this.allJournalActivities);
        }
        else if(elementType == 'CATEGORY') {
            const foundElement = Base.findElementByText(oldElementName);
            await foundElement.click();
        }
        else throw("updateJournalElement: elementType given was not expected")
        await this.journalElementTextBox.setValue(newElementName);
        await Base.findElementByText("How are you today?").click();
    }
    async deleteJournalElement(elementName:string,elementType:string) {
       await this.waitForEditPage();
       elementType = elementType.toUpperCase();

       await this.addActivityBttn.waitForExist();
       if(elementType == "MOOD"){
           await this.clickElementFromArray(elementName,this.allJournalMoods);
       }
       else if(elementType == "ACTIVITY"){
           await this.clickElementFromArray(elementName,this.allJournalActivities);
       }
       else if(elementType == "CATEGORY"){
           const foundElement = Base.findElementByText(elementName);
           await foundElement.click();
       }
       else throw("deleteJournalElement: elementType given was not expected");
       await this.deleteBttn.click();
       await this.confirmDeleteBttn.click();
    }
    async assertJournalElementName(expectedElementName:string, elementType:string, reverse: boolean = false) {
        elementType = elementType.toUpperCase();

        if(elementType == "MOOD") {
            const moodNames = await this.allJournalMoods
                .map(async mood => await mood.getAttribute('content-desc'));
            if(reverse) await expect(moodNames).not.toContain(expectedElementName);
            else await expect(moodNames).toContain(expectedElementName);
        }
        else if(elementType == "ACTIVITY") {
            const activityNames = await this.allJournalActivities
                .map(async mood => await mood.getAttribute('content-desc'));
            if(reverse) await expect(activityNames).not.toContain(expectedElementName);
            else await expect(activityNames).toContain(expectedElementName);
        }
        else if(elementType == "CATEGORY") {
            const foundElement = Base.findElementByText(expectedElementName);
            if(reverse) await expect(foundElement).not.toExist();
            else await expect(foundElement).toHaveText(expectedElementName);
        }
        else throw("assertJournalElementName: elementType given was not expected")
    }
    async saveJournal() {
        await Base.findElementByText("Save").click();
    }
    async editJournal() {
        await Base.findElementByText("Edit Mode").waitForExist();
        await Base.findElementByText("Edit Mode").click();
    }
    async cancelJournalEdits() {
        await Base.findElementByText("Cancel").click();
        await Base.findElementByText("DISCARD").click();
    }
    async waitForEditPage(reverse?:boolean) {
        if(reverse) await Base.findElementByText("Edit Mode").waitForExist({
            reverse: false,
            timeoutMsg: "JournalEdit.waitForEditPage: Timeout",
            timeout: 10000
        });
        else await this.addMoodBttn.waitForExist({
            reverse: false,
            timeoutMsg: "JournalEdit.waitForEditPage: Timeout",
            timeout: 10000
        });
    }
}

export default new JournalEdit();