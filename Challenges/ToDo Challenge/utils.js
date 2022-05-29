function createHTMLElement(tag, attribute = "id", attributeValue = "", innerHTML = "") {
    let node = document.createElement(tag);
    node.setAttribute(attribute, attributeValue);
    node.innerHTML = innerHTML;
    return node;
}

function addToLS(id, taskObject) {
    localStorage.setItem(id, JSON.stringify(taskObject));
}

function getFromLS(id) {
    return JSON.parse(localStorage.getItem(id));
}


function removeFromLS(id) {
    return localStorage.removeItem(id);
}

export { createHTMLElement, addToLS, getFromLS, removeFromLS }