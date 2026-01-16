import { fetch_api } from "./fetch_api.js";
import { render } from "./render.js";
import { setState, state } from "./state.js";
export async function sort_product() {
    let element = document.querySelector(".searcher #selector");
    let nor = await fetch_api("http://localhost:3000/products");
    let asc = await fetch_api("http://localhost:3000/products?_sort=price");
    let desc = await fetch_api("http://localhost:3000/products?_sort=-price");
    let dis_desc = await fetch_api("http://localhost:3000/products?_sort=-discountPercentage");
    let handleSort = () => {
        setState("SORTING");
        let key = element.value;
        switch (key) {
            case "asc":
                render(asc);
                break;
            case "desc":
                render(desc);
                break;
            case "dis-desc":
                render(dis_desc);
                break;
            case "default":
                render(nor);
                setState("NORMAL");
                break;
        }
    }
    if (state === "SORTING") {
        handleSort();
    }
    element.addEventListener("change", () => {
        handleSort();
    });
}