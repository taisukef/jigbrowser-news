import { SJIS } from "https://js.sabae.cc/SJIS.js";
import { fix0 } from "https://js.sabae.cc/fix0.js";
import { escapeURL } from "./escapeURL.js";
import { DOMParser } from "https://js.sabae.cc/DOMParser.js";
import { writeData } from "https://js.sabae.cc/writeData.js";

const base = "http://br.jig.jp/pc/info.html?month=";
const list = [];
for (let i = 2004; i <= 2022; i++) {
  for (let j = 1; j <= 12; j++) {
    //j = 10;
    const url = base + i + fix0(j, 2);
    //console.log(url);
    const name = escapeURL(url);
    const bin = await Deno.readFile("temp/" + name);
    const html = SJIS.decode(bin);
    const dom = new DOMParser().parseFromString(html, "text/html");
    const trs = dom.querySelectorAll("#mainbody #normal_body table tr");
    const items = trs.map(tr => {
      const tds = tr.querySelectorAll("td");
      if (tds.length == 0) {
        return null;
      }
      return {
        date: tds[0].text.replace(/\./g, "-"),
        body: tds[1].text,
      };
    }).filter(i => i);
    const items2 = [];
    for (let j = 0; j < items.length; j++) {
      const it = {
        date: items[j].date,
        title: "お知らせ",
        body: items[j].body,
      };
      items2.push(it);
      if (j + 1 < items.length && items[j + 1].date.trim() == "") {
        j++;
        it.title = it.body;
        it.body = items[j].body;
        console.log(j, it);
      }
    }
    items2.forEach(i => list.push(i));
    console.log(url, items.length)
    //Deno.exit();
  }
}
list.sort((a, b) => a.date.localeCompare(b.date));
console.log(list);
await writeData("jigbrowser-news", list);

