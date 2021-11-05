import { IncomingMessage, ServerResponse } from "http";
import { getScreenshot } from "./_lib/chromium";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    //@ts-ignore
    const {html} = req.query || {};
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    res.setHeader(
      "Accept-Encoding",
      "gzip, br"
    );
    if (req.method === "OPTIONS") {
      res.statusCode = 200;
      res.end();
      return;
    }
    const fileType = "jpeg";
    const file = await getScreenshot(html, fileType);
    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${fileType}`);
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
};