import core from "puppeteer-core";
import { getOptions } from "./options";
import { FileType } from "./types";
let _page: core.Page | null;

async function getPage() {
  if (_page) {
    return _page;
  }
  const options = await getOptions();
  const browser = await core.launch(options);
  _page = await browser.newPage();
  return _page;
}

export async function getScreenshot(html: string, type: FileType) {
  const page = await getPage();
  const htmlContent = `<style>.iframely-embed {max-width: 900px}</style>${html}`
    .replace(new RegExp('\\"', "g"), '"')
    .replace(new RegExp("//cdn.iframe.ly", "g"), "https://cdn.iframe.ly");
  await page.setContent(htmlContent, { waitUntil: ["load", "networkidle0"] });
  await page.addScriptTag({ url: "https://cdn.iframe.ly/embed.js" });
  await page.waitForSelector("iframe");
  const element = await page.$("iframe");
  if (!element) throw new Error("iframe not loading");
  const file = await element.screenshot({ type });
  return file;
}
