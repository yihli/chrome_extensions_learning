const article = document.querySelector("article");
const style = document.createElement("style");
style.textContent += `
    .styling {
        border: 1px solid red;
    }
`
document.head.appendChild(style);
if (article) {
    const text = article.textContent;
    const wordMatchRegExp = /[^\s]+/g;
    const words = text.matchAll(wordMatchRegExp);

    const wordCount = [...words].length;
    const readingTime = Math.round(wordCount / 200);
    const badge = document.createElement("p");

    badge.classList.add("color-secondary-text", "type--caption", "styling");
    badge.textContent = `⏱️ ${readingTime} min read`;

    const heading = article.querySelector("h1");

    const date = article.querySelector("time")?.parentNode;

    (date ?? heading).insertAdjacentElement("afterend", badge);
}