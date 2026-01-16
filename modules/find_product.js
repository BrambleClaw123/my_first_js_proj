import {render} from "./render.js";
import { fetch_api } from "./fetch_api.js";
import { setState, state } from "./state.js";
export async function find_product() {
    const ele = document.querySelector(".searcher .search-bar");
    const products = await fetch_api("http://localhost:3000/products");
    const handleFind = () => {
        let kw = new FormData(ele).get("keyword").toLowerCase().trim();
        if (!kw) {
            setState("NORMAL");
            render(products);
            return;
        }
        render(
            products.filter(p =>
                String(p.title).toLowerCase().includes(kw)
            )
        );
    };
    if (state === "FINDING") handleFind();
    ele.addEventListener("submit", e => {
        e.preventDefault();
        handleFind();
        setState("FINDING");
    });
}