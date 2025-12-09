import Login from '../pageObjects/login.ts'
import Home from "../pageObjects/home.ts";

describe("Skip Login", () => {
    it("should be able to skip the login successfully", async () => {
        await Login.skipLogin();
        await Home.assertHomePage();
    })
})