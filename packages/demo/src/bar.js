export default function bar() {
    const element = document.createElement('div');
    element.innerHTML = "hello webpack";
    document.body.appendChild(element)
}