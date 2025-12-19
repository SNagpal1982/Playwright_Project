import { Page } from "@playwright/test";
import { DownloadPage } from "./DownloadPage";
import { DynamicTablePage } from "./DynamicTablePage";
import { MultiLevelDropdownPage } from "./MultiLevelDropdownPage";
import { SortableListPage } from "./SortableListPage";
import { TagsInputBoxPage } from "./TagsInputBoxPage";
import { VerifyAccountPage } from "./VerifyAccountPage";

export class DashboardPage {

    page: Page;
    downloadPage: DownloadPage;
    dynamicTablePage: DynamicTablePage;
    multiLevelDropdownPage: MultiLevelDropdownPage;
    sortableListPage: SortableListPage;
    tagsInputBoxPage: TagsInputBoxPage;
    verifyAccountPage: VerifyAccountPage;
    constructor(page: Page) {
        this.page = page;
        this.downloadPage = new DownloadPage(this.page);
        this.dynamicTablePage = new DynamicTablePage(this.page);
        this.multiLevelDropdownPage = new MultiLevelDropdownPage(this.page);
        this.sortableListPage = new SortableListPage(this.page);
        this.tagsInputBoxPage = new TagsInputBoxPage(this.page);
        this.verifyAccountPage = new VerifyAccountPage(this.page);
    }

    getDownloadPage() {
        return this.downloadPage;
    }
    getDynamicTablePage() {
        return this.dynamicTablePage;
    }
    getMultiLevelDropdownPage() {
        return this.multiLevelDropdownPage;
    }
    getSortableListPage() {
        return this.sortableListPage;
    }

    getTagsInputBoxPage() {
        return this.tagsInputBoxPage;
    }    
    getVerifyAccountPage() {
        return this.verifyAccountPage;
    }

    async gotoDashBoardPage(){        
        await this.page.goto("https://qaplayground.dev/");
    }

}