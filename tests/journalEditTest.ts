import Login from "../pageObjects/login.ts";
import JournalEdit from "../pageObjects/journalEdit.ts";
import Home from "../pageObjects/home.ts";

describe("Editing Journal Page", () => {
    before(async () => {
        await Login.skipLogin();
        await Home.enterJournal();
        await JournalEdit.editJournal();
    })
    describe("CRUD Test Moods", () => {
        it("Create new Mood", async () => {
            await JournalEdit.addJournalElement("Test","Mood");
            await JournalEdit.saveJournal();
            await JournalEdit.assertJournalElementName("Test", "Mood");
        })
        it("Update Mood", async () => {
            await JournalEdit.editJournal();
            await JournalEdit.updateJournalElement("Test","somethingElse","Mood");
            await JournalEdit.saveJournal();
            await JournalEdit.assertJournalElementName("somethingElse","Mood");
        })
        it("Delete Mood", async () => {
            await JournalEdit.editJournal();
            await JournalEdit.deleteJournalElement("somethingElse","Mood");
            await JournalEdit.saveJournal();
            await JournalEdit.assertJournalElementName("somethingElse", "Mood", true);
        })
    })
    describe("CRUD Test Activities", () => {
        it("Create New Activity", async () => {
            await JournalEdit.editJournal();
            await JournalEdit.addJournalElement("newActivity","Activity");
            await JournalEdit.saveJournal();
            await JournalEdit.assertJournalElementName("newActivity", "Activity");
        })
        it("Update Activity", async () => {
            await JournalEdit.editJournal();
            await JournalEdit.updateJournalElement("newActivity","anotherActivity","Activity");
            await JournalEdit.saveJournal();
            await JournalEdit.assertJournalElementName("anotherActivity", "Activity");
        })
        it("Delete Activity", async () => {
            await JournalEdit.editJournal();
            await JournalEdit.deleteJournalElement("anotherActivity","Activity");
            await JournalEdit.saveJournal();
            await JournalEdit.assertJournalElementName("anotherActivity", "Activity", true);
        })
    })
    describe("CRUD Test Categories", () => {
        it("Create New Category", async () => {
            await JournalEdit.editJournal();
            await JournalEdit.addJournalElement("newCategory","Category");
            await JournalEdit.saveJournal();
            await JournalEdit.assertJournalElementName("newCategory", "Category");
        })
        it("Update Category", async () => {
            await JournalEdit.editJournal();
            await JournalEdit.updateJournalElement("newCategory","anotherCategory", "Category");
            await JournalEdit.saveJournal();
            await JournalEdit.assertJournalElementName("anotherCategory", "Category");
        })
        it("Delete Category", async () => {
            await JournalEdit.editJournal();
            await JournalEdit.deleteJournalElement("anotherCategory", "Category");
            await JournalEdit.saveJournal();
            await JournalEdit.assertJournalElementName("anotherCategory", "Category", true);
        })
    })
    describe("Cancel Changed Edits", () => {
        it("Cancel/Discard Edits", async () => {
            await JournalEdit.editJournal();
            // Add a mood, activity, and category
            await JournalEdit.addJournalElement("newMood","Mood");
            await JournalEdit.addJournalElement("newActivity","Activity");
            await JournalEdit.addJournalElement("newCategory","Category");
            // Assert they all got created
            await JournalEdit.assertJournalElementName("newMood","Mood");
            await JournalEdit.assertJournalElementName("newActivity","Activity");
            await JournalEdit.assertJournalElementName("newCategory","Category");
            // Cancel Journal Edits
            await JournalEdit.cancelJournalEdits();
            // Wait to not be on edit page so asserts actually work
            await JournalEdit.waitForEditPage(true);
            // Assert all elements are not there
            await JournalEdit.assertJournalElementName("newMood","Mood",true);
            await JournalEdit.assertJournalElementName("newActivity","Activity",true);
            await JournalEdit.assertJournalElementName("newCategory","Category",true);
        })
    })
})