import Login from '../pageObjects/login.ts'
import Home from '../pageObjects/home.ts'
import Journal from '../pageObjects/journal.ts'

describe("Journal Page Testing", () => {
    beforeEach(async () => {
        await Login.skipLogin();
    })
    it("Create Journal Entry", async () => {
        await Home.clickRandJournalEntryMood();
        await Journal.clickRandActivity();
        await Journal.writeJournalNote("This is a test of the journal");
        await Journal.saveJournal();
        await Home.assertAlertBoxText("Journal entry created")
        await driver.reloadSession();
    })
    it("Cancel Journal Entry", async () => {
        await Home.clickRandJournalEntryMood();
        await Journal.clickRandActivity();
        await Journal.writeJournalNote("This is another test of the journal");
        await Journal.cancelJournalEntry();
        await expect(Journal.journalText).toHaveText("Write something here");
    })
})