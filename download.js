import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { fix0 } from "https://js.sabae.cc/fix0.js";

const base = "http://br.jig.jp/pc/info.html?month=";
for (let i = 2004; i <= 2022; i++) {
  for (let j = 1; j <= 12; j++) {
    const url = base + i + fix0(j, 2);
    console.log(url);
    const bin = new Uint8Array(await (await fetch(url)).arrayBuffer());
    const name = escapeURL(url);
    await Deno.writeFile("temp/" + name, bin);
    //const txt = await fetchOrLoad(url);
    //const txt = new TextDecoder().decode(bin);
    console.log(name);
  }
}
