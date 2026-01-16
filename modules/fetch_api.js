export async function fetch_api(url) {
    var data = await fetch(url);
    return data.json();
}