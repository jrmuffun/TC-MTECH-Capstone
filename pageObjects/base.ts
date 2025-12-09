export default class Base {
    //**Selectors**\\
    get allJournalMoods() {
        return $$('//android.widget.TextView[@text="Overall Mood"]/../..//android.view.ViewGroup[@content-desc]')
    }
    get allJournalActivities() {
        return $$('//android.widget.TextView[@text="What have you been up to?"]/following-sibling::android.view.ViewGroup//android.view.ViewGroup[@content-desc]')
    }

    //**Methods**\\
    static findElementByText(text:string) {
        return $(`android=new UiSelector().text("${text}")`)
    }
    // Randomly select an index in an array
    // @ts-ignore
    async chooseRandomElement(elementArray: ChainablePromiseArray<WebdriverIO.ElementArray>) {
        const resolvedArray:ChainablePromiseArray = await elementArray;
        const arrayLength = await resolvedArray.length;
        const randomIndex = Math.floor(Math.random() * arrayLength);
        return resolvedArray[randomIndex];
    }
    // Select an element based on its name from an inputted array
    // @ts-ignore
    async clickElementFromArray(elementName:string, elementArray: ChainablePromiseArray<WebdriverIO.ElementArray>) {
        if(elementArray.length == 1) {
            await elementArray[0].click();
        }
        const targetElement = await elementArray.find(async (element:any) => {
            const name = await element.getAttribute('content-desc');
            return name === elementName;
        })
        await targetElement.click();
    }
}