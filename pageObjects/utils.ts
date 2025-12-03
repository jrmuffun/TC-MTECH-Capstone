export default class Utils {
    // Randomly select an index in an array
    // @ts-ignore
    static async chooseRandomElement(elementArray: ChainablePromiseArray<WebdriverIO.ElementArray>) {
        const resolvedArray:ChainablePromiseArray = await elementArray;
        const arrayLength = await resolvedArray.length;
        const randomIndex = Math.floor(Math.random() * arrayLength);
        return resolvedArray[randomIndex];
    }
    // Select an element based on its name
    // @ts-ignore
    static async clickElementByName(elementName:string, elementArray: ChainablePromiseArray<WebdriverIO.ElementArray>) {
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