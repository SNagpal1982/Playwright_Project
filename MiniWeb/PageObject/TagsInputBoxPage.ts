import { expect, Locator, Page } from "@playwright/test";
export class TagsInputBoxPage {
    page: Page;
    tagElement: Locator;
    removeTag: Locator;
    addTag: Locator;
    removeAll: Locator;
    remianingTag: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tagElement = this.page.locator("ul li");
        this.removeTag = this.page.locator(".uit-multiply");
        this.addTag = this.page.locator("[type='text']");
        this.removeAll = this.page.getByRole('button', { name: 'Remove All' });
        this.remianingTag = this.page.locator("p span");
    }
    async gotoTagsInputBoxPage() {
       await this.page.goto("https://qaplayground.dev/apps/tags-input-box/");
    }

    async addTagElement(tagName: string) {
        await this.addTag.fill(tagName);

    }
    async removeTagElement() {
        await this.removeTag.click();

    }
    async removeAllTagElements() {
        await this.removeAll.click();
        const addedTagCount = await this.tagElement.count();
        const remianingTagCount = Number (await this.remianingTag.innerText());
        expect(addedTagCount).toEqual(0);
        expect(remianingTagCount).toEqual(10);

    }

    async verifyAddedTagElement(tagName: string) {
        const count = await this.tagElement.count();
        let flag = false;
        for (let i = 0; i < count; i++) {
            const getTagName = (await this.tagElement.nth(i).innerText()).toString();
            if (getTagName === tagName) {
                flag = true;
            }
            break;
        }
        return flag;
    }
    async verifyRemainingElement() {
        const addedTagCount = await this.tagElement.count();
        const remianingTagCount = Number (await this.remianingTag.innerText());
        expect(remianingTagCount).toEqual(10 - addedTagCount);

    }
}