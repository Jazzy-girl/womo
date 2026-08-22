export function block () {
    document.body.textContent = "";
    let header = document.createElement("h1");
    header.textContent = "This is a blocked site!";
    document.body.appendChild(header);
}