import { Locator, Page, expect } from "@playwright/test";
export class SortableListPage {
    page: Page;
    dragableElement: Locator;
    personName: Locator;
    constructor(page: Page) {
        this.page = page;
        this.dragableElement = this.page.locator(".draggable")
        this.personName = this.page.locator(".person-name");
    }

    async gotoSortableListPage() {
        await this.page.goto("https://qaplayground.dev/apps/sortable-list/");
    }
    async sortPersonName() {

        const count = await this.personName.count();
        let personSortedList = [
            "Jeff Bezos",
            "Bill Gates",
            "Warren Buffett",
            "Bernard Arnault",
            "Carlos Slim Helu",
            "Amancio Ortega",
            "Larry Ellison",
            "Mark Zuckerberg",
            "Michael Bloomberg",
            "Larry Page"];

        console.log("Before Soting....");
        for (let i = 0; i < count; i++) {
            console.log("i : " + i + "; Actual : " + await this.personName.nth(i).innerText() + "; Expected : " + personSortedList[i]);
        }
        // await this.page.pause();
        for (let i = 0; i < count; i++) {

            // const source = await this.dragableElement.getByText(personSortedList[i]).innerText();
            // const target = await this.dragableElement.nth(i).innerText();
            // console.log("i=" + i + ", source : " + source + "; target : " + target);

            const source = this.dragableElement.filter({ hasText: personSortedList[i] }).first();
            const target = this.dragableElement.nth(i);
            // await source.dragTo(target);
            // await this.page.waitForSelector(".draggable");

            // const targetXY = await target.boundingBox();
            // let targetX=0; 
            // let targetY=0;
            // if (targetXY != null) {
            //      targetX = targetXY.x + targetXY.width / 2;
            //      targetY = targetXY.y + targetXY.height / 2;
            // }
            await source.dragTo(target);

            // await source.dragTo(
            //     target, {targetPosition: { x: targetX, y: targetY }}
            // );

            // for (let j = 0; j < count; j++) {
            //     console.log("i=" + i + ", j=" +j +" ; Actual : " + await this.personName.nth(j).innerText() + "; Expected : " + personSortedList[j]);
            // }
        }
        console.log("After Soting....");
        for (let i = 0; i < count; i++) {
            console.log("i : " + i + "; Actual : " + await this.personName.nth(i).innerText() + "; Expected : " + personSortedList[i]);
            await expect(this.personName.nth(i)).toContainText(personSortedList[i]);
        }
    }
}