import { fetch_api } from "./fetch_api.js";
export async function create_box(id) {
    let product = await fetch_api(`http://localhost:3000/products/${id}`);
    return `
        <div class="col-2">
            <a class="product" href="#">
                <img class="inner-img" src="${product.images[0]}">
                <span class="discount-text">${product.discountPercentage}%</span>
                <div class="name-product">${product.title}</div>
                <div style="display:flex; justify-content: space-between;">
                    <div class="price">$${product.price}</div>
                    <div class="status">Còn lại: ${product.stock}</div>
                </div>
            </a>
        </div>
    `;
}
export async function render(filteredProducts) {
    let currentPage = document.querySelector(".products-section .page").textContent;
    const start = (currentPage - 1) * 18;
    const end = start + 18;
    let html = `<div class="row">`;
    for (let i = start; i < end && i < filteredProducts.length; i++) {
        html += await create_box(filteredProducts[i].id);
        if ((i - start + 1) % 6 === 0) {
            html += `</div><div class="row">`;
        }
    }
    html += `</div>`;
    document.querySelector(".product-list").innerHTML = html;
}
