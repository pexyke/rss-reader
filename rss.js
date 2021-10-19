function parseXml(str){
const parse = new DOMParser();
return parse.parseFromString(str, "text/xml");
}

function parseHtml(str){
    const parse = new DOMParser();
    return parse.parseFromString(str, "text/html");
    }

function renderFeed(feed) {
   const news = document.getElementById("news");
   const items = feed.getElementsByTagName("item");
   for (const item of items) {
       const title = item.getElementsByTagName("title")[0].textContent;
       const description = item.getElementsByTagName("description")[0].textContent;
       const link = item.getElementsByTagName("link")[0].textContent;
       const article = document.createElement("article");
       const titleEl = document.createElement("h1");
       const shortDesc = parseHtml(description).body.textContent.substring(0, 128);
       const descEl = document.createElement("p");
       const linkEl = document.createElement("a");
       titleEl.textContent = title;
       descEl.textContent = shortDesc;
       linkEl.textContent = link;
       linkEl.href = link;
       article.append(titleEl, descEl, linkEl);
       news.append(article);
   }
}
fetch("https://dev.to/feed").then(r => r.text()).then(parseXml).then(renderFeed);