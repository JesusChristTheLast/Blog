function loadArticleDetails() {
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get("id");

  const article = articles.find(a => a.id == articleId);
  
  if (article) {
    document.getElementById("article-title").innerText = article.title;
    document.getElementById("article-image").src = article.image;
    document.getElementById("article-text").innerHTML = article.content;
    document.getElementById("author-img").src = article.authorImage || "images/default-author.jpg";
    document.getElementById("author-name").innerText = article.author;
    document.getElementById("publish-date").innerText = `Veröffentlicht am: ${article.date}`;
    document.getElementById("category-tag").innerText = article.category;

    loadRelatedArticles(article.category);
  } else {
    document.getElementById("article-detail").innerHTML = "<p>Artikel nicht gefunden.</p>";
  }
}

function loadRelatedArticles(category) {
  const relatedContainer = document.getElementById("related-articles");
  const relatedArticles = articles.filter(a => a.category === category && a.id !== parseInt(new URLSearchParams(window.location.search).get("id")));
  
  relatedArticles.forEach(article => {
    const relatedArticleEl = document.createElement("div");
    relatedArticleEl.classList.add("article-card");
    relatedArticleEl.innerHTML = `
      <a href="artikel.html?id=${article.id}">
        <img src="${article.image}" alt="${article.title}">
        <h3>${article.title}</h3>
      </a>
    `;
    relatedContainer.appendChild(relatedArticleEl);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  if (document.getElementById("article-detail")) {
    loadArticleDetails();
  }
});
