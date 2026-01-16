export function get_category(data) {
    let result = [];
    data.forEach(element => {
        element.tags.forEach(element => {
            if (!result.includes(element)) {
            result.push(element);
            }
        })
    });
    return result;
}