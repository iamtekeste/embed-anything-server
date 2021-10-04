import chrome from "chrome-aws-lambda";
interface Options {
  args: string[];
  executablePath: string;
  headless: boolean;
}

export async function getOptions() {
  let options: Options;

  options = {
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  };
  return options;
}
