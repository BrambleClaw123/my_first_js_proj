import { get_category } from "./get_category.js";
import { fetch_api } from "./fetch_api.js";
import { render } from "./render.js";
import { find_product } from "./find_product.js";
import { state } from "./state.js";
import { sort_product } from "./sort_product.js";
import { type_product } from "./type_product.js";
async function create_category() {
    let html = ``;
    let data = await fetch_api("http://localhost:3000/products");
    let categories = get_category(data);
    categories.forEach(element => {
        html += `<div class="col-2">
                    <button class="inner-cate" value="${element}">
                        ${element}
                    </button>
                </div>`
    });
    let element = document.querySelector(".category .container .row");
    element.innerHTML = html;
}

async function initProducts() {
    let allProducts = await fetch_api("http://localhost:3000/products");
    render(allProducts);
}
async function eventListener() {
    let data = await fetch_api("http://localhost:3000/products");
    let sizeNormal = Math.ceil(data.length / 18);
    document.querySelector(".products-section .previous").addEventListener("click", (e) => {
        let num = parseInt(document.querySelector(".products-section .page").textContent);
        if (num != 1) {
            document.querySelector(".products-section .page").textContent = num - 1;
            if (state === "NORMAL") render(data);
            else if (state === "FINDING") {
                find_product();
            }
            else sort_product();
        }
    });
    document.querySelector(".products-section .next").addEventListener("click", (e) => {
        let num = parseInt(document.querySelector(".products-section .page").textContent);
        let sizeFinding = Math.ceil(data.filter(p =>
            String(p.title).toLowerCase().includes(new FormData(document.querySelector(".searcher .search-bar")).get("keyword").toLowerCase().trim())
        ).length / 18);
        if (num >= sizeFinding) return;
        if (num < sizeNormal) {
            document.querySelector(".products-section .page").textContent = num + 1;
            if (state === "NORMAL") render(data);
            else if (state === "FINDING") find_product();
            else sort_product();
            console.log(state);
        }
    });
}
initProducts();
create_category();
eventListener();
find_product();
sort_product();
type_product();