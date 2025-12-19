import { test, Page, expect } from "@playwright/test";
import { DashboardPage } from "../PageObject/DashboardPage";



test("Verify Functionality of Download", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.gotoDashBoardPage();
    
    const downloadPage = dashboardPage.getDownloadPage();
    await downloadPage.gotoDownloadPage();
    await downloadPage.downlaodFileVerify();
    
});

test("Verify Functionality of Dynamic Table", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const superHeroName = "Ant-Man";
    const superHeroRealName = "Eric O'Grady";

    //Get List of All Super Hero Details
    const dynamicTablePage = dashboardPage.getDynamicTablePage();
    await dynamicTablePage.gotoDynamicTablePage();

    //Verify Super Hero is active
    await dynamicTablePage.getSuperHeroDetails();
    const isActive = await dynamicTablePage.isSuperHeroActive(superHeroName);
    expect(isActive).toBeTruthy();

    //Get Real Name of Super Hero
    const realName = await dynamicTablePage.getRealNameSuperHero(superHeroName);
    expect(realName).toContain(superHeroRealName);
});

test("Verify Functionality of Verify Account", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const verifyAccountPage = dashboardPage.getVerifyAccountPage();
    await verifyAccountPage.gotoVerifyAccountPage();
    await verifyAccountPage.fillConfirmationCodeVerify();
});

test("Verify Functionality of Multilevel Drop Down", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const multiLevelDropdownPage = dashboardPage.getMultiLevelDropdownPage();
    await multiLevelDropdownPage.gotoMultiLevelDropdownPage();
    await multiLevelDropdownPage.verifyMenuitems();

});

test("Verify Functionality of Sorting List", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const sortableListPage = dashboardPage.getSortableListPage();
    await sortableListPage.gotoSortableListPage();
    await sortableListPage.sortPersonName();
});

test("Verify Functionality of Tags Input", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const tagsInputBoxPage = dashboardPage.getTagsInputBoxPage();
    await tagsInputBoxPage.gotoTagsInputBoxPage();
    await tagsInputBoxPage.addTagElement("Java");
    await tagsInputBoxPage.verifyAddedTagElement("Java");
    await tagsInputBoxPage.verifyRemainingElement();
    await tagsInputBoxPage.removeAllTagElements();

});