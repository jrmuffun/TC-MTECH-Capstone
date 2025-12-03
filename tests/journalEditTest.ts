import LoginPage from "../pageObjects/loginPage.ts";
import JournalEditPage from "../pageObjects/journalEditPage.ts";
import HomePage from "../pageObjects/homePage.ts";
import JournalCommon from "../pageObjects/journalCommon.ts";
import journalEditPage from "../pageObjects/journalEditPage.ts";

describe("Editing Journal Page", () => {
    before(async () => {
        await LoginPage.skipLogin();
        await HomePage.enterJournal();
        await JournalCommon.editJournal();
    })
    describe("CRUD Test Moods", () => {
        it("Create new Mood", async () => {
            await JournalEditPage.addJournalElement("Test","Mood");
            await JournalCommon.saveJournal();
            await JournalEditPage.assertJournalElementName("Test", "Mood");
        })
        it("Update Mood", async () => {
            await JournalCommon.editJournal();
            await JournalEditPage.updateJournalElement("Test","somethingElse","Mood");
            await JournalCommon.saveJournal();
            await JournalEditPage.assertJournalElementName("somethingElse","Mood");
        })
        it("Delete Mood", async () => {
            await JournalCommon.editJournal();
            await JournalEditPage.deleteJournalElement("somethingElse","Mood");
            await JournalCommon.saveJournal();
            await JournalEditPage.assertJournalElementName("somethingElse", "Mood", true);
        })
    })
    describe("CRUD Test Activities", () => {
        it("Create New Activity", async () => {
            await JournalCommon.editJournal();
            await JournalEditPage.addJournalElement("newActivity","Activity");
            await JournalCommon.saveJournal();
            await JournalEditPage.assertJournalElementName("newActivity", "Activity");
        })
        it("Update Activity", async () => {
            await JournalCommon.editJournal();
            await JournalEditPage.updateJournalElement("newActivity","anotherActivity","Activity");
            await JournalCommon.saveJournal();
            await journalEditPage.assertJournalElementName("anotherActivity", "Activity");
        })
        it("Delete Activity", async () => {
            await JournalCommon.editJournal();
            await JournalEditPage.deleteJournalElement("anotherActivity","Activity");
            await JournalCommon.saveJournal();
            await journalEditPage.assertJournalElementName("anotherActivity", "Activity", true);
        })
    })
    describe("CRUD Test Categories", () => {
        it("Create New Category", async () => {
            await JournalCommon.editJournal();
            await JournalEditPage.addJournalElement("newCategory","Category");
            await JournalCommon.saveJournal();
            await JournalEditPage.assertJournalElementName("newCategory", "Category");
        })
        it("Update Category", async () => {
            await JournalCommon.editJournal();
            await JournalEditPage.updateJournalElement("newCategory","anotherCategory", "Category");
            await JournalCommon.saveJournal();
            await JournalEditPage.assertJournalElementName("anotherCategory", "Category");
        })
        it("Delete Category", async () => {
            await JournalCommon.editJournal();
            await JournalEditPage.deleteJournalElement("anotherCategory", "Category");
            await JournalCommon.saveJournal();
            await JournalEditPage.assertJournalElementName("anotherCategory", "Category", true);
        })
    })
    describe("Cancel Changed Edits", () => {
        it("Cancel/Discard Edits", async () => {
            await JournalCommon.editJournal();
            // Add a mood, activity, and category
            await JournalEditPage.addJournalElement("newMood","Mood");
            await JournalEditPage.addJournalElement("newActivity","Activity");
            await JournalEditPage.addJournalElement("newCategory","Category");
            // Assert they all got created
            await JournalEditPage.assertJournalElementName("newMood","Mood");
            await JournalEditPage.assertJournalElementName("newActivity","Activity");
            await JournalEditPage.assertJournalElementName("newCategory","Category");
            // Cancel Journal Edits
            await JournalEditPage.cancelJournalEdits();
            // Wait to not be on edit page so asserts actually work
            await JournalEditPage.waitForEditPage(true);
            // Assert all elements are not there
            await JournalEditPage.assertJournalElementName("newMood","Mood",true);
            await JournalEditPage.assertJournalElementName("newActivity","Activity",true);
            await JournalEditPage.assertJournalElementName("newCategory","Category",true);
        })
    })
})