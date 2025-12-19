import { Locator, Page, expect } from "@playwright/test";
export class MultiLevelDropdownPage {
    page: Page;
    dropDown: Locator;
    menuItem: Locator;
    subMenuItem: Locator;
    constructor(page: Page) {
        this.page = page;
        this.dropDown = this.page.locator(".icon-button");
        this.menuItem = this.page.locator(".menu-item");
        this.subMenuItem = this.page.locator(".menu-secondary-enter-done .menu-item");
    }

    async gotoMultiLevelDropdownPage() {
        await this.page.goto("https://qaplayground.dev/apps/multi-level-dropdown/");
    }

    async verifyMenuitems() {
        let menuItemsList = ["My Profile", "Settings", "Animals"];
        let subMenuMyProfile = undefined;
        let subMenuSetting = ["My Tutorial", "HTML", "CSS", "JavaScript", "Awesome!",];

        await this.dropDown.last().click();
        expect(await this.menuItem.first().isVisible()).toBeTruthy();
        const count = await this.menuItem.count();
        for (let i = 0; i < count; i++) {
            expect(await this.menuItem.nth(i).innerText()).toContain(menuItemsList[i]);
        }

        //Validation of sub menu item list of "Setting" Menu 
        await this.menuItem.nth(1).click();
        await this.subMenuItem.first().waitFor({ state: 'visible' });
        expect(await this.subMenuItem.first().isVisible()).toBeTruthy();
        const itemList = await this.subMenuItem.allTextContents();
        expect(itemList).toEqual(subMenuSetting);
    }
}