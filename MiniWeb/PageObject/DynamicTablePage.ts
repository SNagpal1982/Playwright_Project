import { Locator, Page } from "@playwright/test";
import { get } from "http";
import { stringify } from "querystring";


type SuperHeroDetails = {
    name: string;
    status: string;
    realName: string;
};
export class DynamicTablePage {
    page: Page;
    dynamicTablePage: Locator;
    superHeroTable: Locator;
    row: Locator;
    superHeroName: Locator;
    superHeroEmail: Locator;
    superHeroStatus: Locator;
    superHeroRealName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dynamicTablePage = this.page.locator("[href*='/dynamic-table/']");
        this.superHeroTable = this.page.locator("#tbody");
        this.row = this.page.locator("tbody tr");
        this.superHeroName = this.page.locator(".ml-4 .text-white-900");
        this.superHeroEmail = this.page.locator(".ml-4 .text-gray-500");
        this.superHeroStatus = this.page.locator("span.text-green-800");
        this.superHeroRealName = this.page.locator("td");
    }

    async gotoDynamicTablePage() {
        await this.page.goto("https://qaplayground.dev/apps/dynamic-table/");
        await this.superHeroTable.waitFor();
    }
    async isSuperHeroActive(name: string) {

        const count = await this.row.count();
        let getHeroName: string;
        let getHeroStatus: string;
        let getHeroRealName: string;
        let active = "Active";
        let flag = false;
        let isActive = false;
        for (let i = 0; i < count; i++) {
            getHeroName = (await this.row.nth(i).locator(".ml-4 .text-white-900").innerText()).trim();
            getHeroStatus = (await this.row.nth(i).locator("span.text-green-800").innerText()).trim();
            getHeroRealName = (await this.row.nth(i).locator("td").nth(2).innerText()).trim();
            if (getHeroName.toLowerCase().trim() === name.toLowerCase()) {
                // console.log("Found, name: " + getHeroName + "; status: " + getHeroStatus + "; Real Name: " + getHeroRealName);
                flag = true;
                if (getHeroStatus.toLowerCase().trim() === active.toLowerCase()) {
                    isActive = true;
                }
                break;
            }
        }
        if (!flag) {
            console.log("Please check the input, requested hero name does not exist.");
        }


        return isActive;
    }

    async getRealNameSuperHero(name: string) {

        const count = await this.row.count();
        let getHeroName: string;
        let getHeroStatus: string;
        let getHeroRealName: string;
        let flag = false;
        for (let i = 0; i < count; i++) {
            getHeroName = (await this.row.nth(i).locator(".ml-4 .text-white-900").innerText()).trim();
            getHeroStatus = (await this.row.nth(i).locator("span.text-green-800").innerText()).trim();
            getHeroRealName = (await this.row.nth(i).locator("td").nth(2).innerText()).trim();
            if (getHeroName.toLowerCase().trim() === name.toLowerCase()) {
                // console.log("Found, name: " + getHeroName + "; status: " + getHeroStatus + "; Real Name: " + getHeroRealName);
                flag = true;
                return getHeroRealName;
            }
        }
        if (!flag) {
            console.log("Please check the input, requested hero name does not exist.");
        }

    }
    async getSuperHeroDetails() {
        const count = await this.row.count();
        console.log("List of Super Heros : ");
        for (let i = 0; i < count; i++) {
            const getHeroName = (await this.row.nth(i).locator(".ml-4 .text-white-900").innerText()).trim();
            const getHeroStatus = (await this.row.nth(i).locator("span.text-green-800").innerText()).trim();
            const getHeroRealName = (await this.row.nth(i).locator("td").nth(2).innerText()).trim();
            const details: SuperHeroDetails = {
                name: getHeroName,
                status: getHeroStatus,
                realName: getHeroRealName,
            };
            console.log("name: " + details.name + "; status: " + details.status + "; Real Name: " + details.realName);
        }
    }
}