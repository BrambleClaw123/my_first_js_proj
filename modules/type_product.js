import { fetch_api } from "./fetch_api.js";
import { render } from "./render.js";

export async function type_product() {
    let products = await fetch_api("http://localhost:3000/products");
    document.querySelector(".category .row").addEventListener("click", (e) => {
        if (!e.target.classList.contains("inner-cate")) return;
        let value = e.target.value;
        let filted = [];
        products.forEach((element) => {
            if (element.tags.includes(value)) filted.push(element);
        });
        render(filted);
    });
}