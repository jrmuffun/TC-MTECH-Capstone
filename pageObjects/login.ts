// noinspection SpellCheckingInspection

import Base from "./base.ts";

class Login extends Base {
    get skipBttn() {
        return $('android=new UiSelector().text("Skip")')
    }
    get skipRegContinueBttn() {
        return $('android=new UiSelector().text("Continue")')
    }
    get skipRegFirstName() {
        return $('android=new UiSelector().text("First Name")')
    }
    get skipRegLastName() {
        return $('android=new UiSelector().text("Last Name")')
    }

    async skipLogin(firstName:string="Test",lastName:string="Testerson") {
        await this.skipBttn.click();
        await this.skipRegContinueBttn.click();
        await this.skipRegFirstName.setValue(firstName);
        await this.skipRegLastName.setValue(lastName);
        await this.skipRegContinueBttn.click();
    }
}

export default new Login();