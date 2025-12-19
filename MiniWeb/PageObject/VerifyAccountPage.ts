import { Page, Locator, expect } from "@playwright/test";
export class VerifyAccountPage {
    page: Page;
    codeTextBox: Locator;
    codeContainer: Locator;
    success : Locator;

    constructor(page: Page) {
        this.page = page;
        this.codeTextBox = this.page.locator(".code");
        this.codeContainer = this.page.locator(".info")
        this.success = this.page.locator(".success");
    }

    async gotoVerifyAccountPage() {
        await this.page.goto("https://qaplayground.dev/apps/verify-account/");
    }

    async getConfirmationCode() {
        const codeText = await this.codeContainer.innerText();
        const digitsArray = codeText.match(/\d/g) ?? [];
        return digitsArray;

    }

    async fillConfirmationCodeVerify() {
        const getCode = await this.getConfirmationCode();
        console.log("Code Value : " + getCode);
        const count = await this.codeTextBox.count();
        for (let i = 0; i < count; i++) {
            await this.codeTextBox.nth(i).press(getCode[i]);
        }
        await this.codeTextBox.last().press("Tab");
        expect (await this.success.isVisible()).toBeTruthy();

    }

}