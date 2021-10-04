import { IncomingMessage, ServerResponse } from "http";
import fetch from "isomorphic-fetch";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    //@ts-ignore
    const {urlToBeEmbeded} = req.body || {};
    const iframelyResponse = await fetch(
      `https://iframe.ly/api/iframely?url=${urlToBeEmbeded}&api_key=544a860eda25e85cbbe2c1&iframe=card&omit_script=1
    `
    );
    const { html,url, meta, links} = await iframelyResponse.json();
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
    res.statusCode = 200;
    res.setHeader("Content-Type", `application/json`);
    res.end(JSON.stringify({html, url, meta, links}));
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e, "server");
  }
};