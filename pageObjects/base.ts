export default class Base {
    static async findElementByText(text:string) {
        return $(`android=new UiSelector().text("${text}")`)
    }
}