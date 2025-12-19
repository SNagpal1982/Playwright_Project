import { Download, Locator, Page, expect } from "@playwright/test";
import path from 'path';
import fs from 'fs';

export class DownloadPage {
    page: Page;
    downloadpPage: Locator;
    downloadBtn: Locator;
    constructor(page: Page) {
        this.page = page;
        this.downloadpPage = this.page.locator("[href*='/download/']");
        this.downloadBtn = this.page.locator("[download='sample']");
    }
    async gotoDownloadPage() {
        await this.page.goto("https://qaplayground.dev/apps/download/");
    }
    async downlaodFileVerify() {
        const downloadsDir = path.join(process.cwd(), 'artifacts', 'downloads');
        fs.mkdirSync(downloadsDir, { recursive: true });

        // Set up listener before the click
        const [download] = await Promise.all([
            this.page.waitForEvent("download"),
            this.downloadBtn.click(),
        ]);

        // const suggested = download.suggestedFilename();  // Inspect filename suggested by the server
        const suggested = "Sample_" + Date.now().toString() + ".pdf";
        const filePath = path.join(downloadsDir, suggested);

        // Save explicitly to your folder
        await download.saveAs(filePath);

        // Optional: verify the file is there
        expect(fs.existsSync(filePath)).toBeTruthy();
        console.log('Saved at:', filePath);
    }
}