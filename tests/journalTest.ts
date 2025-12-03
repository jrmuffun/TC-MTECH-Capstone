import LoginPage from '../pageObjects/loginPage.ts'
import HomePage from '../pageObjects/homePage.ts'
import JournalPage from '../pageObjects/journalPage.ts'
import JournalCommon from "../pageObjects/journalCommon.ts";

// Put tests related to the journal page here

describe("Journal Page Testing", () => {
    beforeEach(async () => {
        await LoginPage.skipLogin();
    })
    it("Create Journal Entry", async () => {
        await HomePage.clickRandJournalEntryMood();
        await JournalPage.clickRandActivity();
        await JournalPage.writeJournalNote("This is a test of the journal");
        await JournalCommon.saveJournal();
        await HomePage.assertAlertBoxText("Journal entry created")
        await driver.reloadSession();
    })
    it("Cancel Journal Entry", async () => {
        await HomePage.clickRandJournalEntryMood();
        await JournalPage.clickRandActivity();
        await JournalPage.writeJournalNote("This is another test of the journal");
        await JournalPage.cancelJournalEntry();
        await expect(JournalPage.journalText).toHaveText("Write something here");
    })
    it("Cancel and Close Journal Entry", async () => {
        // This will remain undeveloped until a selector gets made for closing the journal
        // https://github.com/Journaly-io/Journaly/issues/48
    })
    // afterEach("Tear Down", async () => {
    //     // Just deleting the session for now until I have a better way of tearing down
    //     await driver.reloadSession();
    // })
})