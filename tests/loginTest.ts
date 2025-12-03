import LoginPage from '../pageObjects/loginPage.ts'
import HomePage from "../pageObjects/homePage.ts";

// Put tests related to the login page/process here
// May end up negative testing skipping the login, pushing cancel in places to make sure they function properly

describe("Skip Login", () => {
    it("should be able to skip the login successfully", async () => {
        await LoginPage.skipLogin();
        await HomePage.assertHomePage();
    })
})