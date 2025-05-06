document.addEventListener("DOMContentLoaded", function () {
  // Die JSON-Datei laden und die Artikel anzeigen
  fetch('articles.json')
    .then(response => response.json())
    .then(articles => {
      // Wenn wir auf der Startseite sind, zeigen wir nur die neuesten 4 Artikel an
      if (document.body.classList.contains('home')) {
        loadArticles(articles, 4); // Zeigt nur die neuesten 4 Artikel an (Startseite)
      } else if (document.body.classList.contains('themen')) {
        loadArticles(articles); // Zeigt alle Artikel an (Themen-Seite)
      }

      // Filter-Buttons aktivieren
      const filterBtns = document.querySelectorAll(".filter-btn");
      filterBtns.forEach(btn => {
        btn.addEventListener("click", function () {
          filterArticles(this.dataset.category, articles);
        });
      });
    });
});

function loadArticles(articles, limit = 0) {
  const container = document.getElementById("artikel-uebersicht");

  // Wenn Limit gesetzt ist (Startseite), nur die ersten 'limit' Artikel anzeigen
  const articlesToShow = limit > 0 ? articles.slice(0, limit) : articles;

  articlesToShow.forEach(article => {
    const articleElement = document.createElement("div");
    articleElement.classList.add("article-card");
    articleElement.innerHTML = `
      <img src="${article.image}" alt="${article.title}">
      <h3>${article.title}</h3>
      <p>${article.content.slice(0, 100)}...</p>
      <a id="weiterlesen2" href="artikel.html?id=${article.id}">Weiterlesen</a>
    `;
    container.appendChild(articleElement);
  });
}

function filterArticles(category, articles) {
  const filteredArticles = category === "all" ? articles : articles.filter(a => a.category === category);
  const container = document.getElementById("artikel-uebersicht");
  container.innerHTML = ""; // Vorherige Artikel entfernen
  filteredArticles.forEach(article => {
    const articleElement = document.createElement("div");
    articleElement.classList.add("article-card");
    articleElement.innerHTML = `
      <img src="${article.image}" alt="${article.title}">
      <h3>${article.title}</h3>
      <p>${article.content.slice(0, 100)}...</p>
      <a href="artikel.html?id=${article.id}">Weiterlesen</a>
    `;
    container.appendChild(articleElement);
  });

  // Die aktive Klasse für die Filter-Buttons aktualisieren
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.category === category) {
      btn.classList.add("active");
    }
  });
}

//video
// Beispiel JSON-Daten (ersetze dies mit den tatsächlichen Daten oder einem API-Aufruf)
const posts = [
  {
      "id": 10,
      "title": "Videotutorial: HTML Grundlagen",
      "content": "<p>In diesem Video erklären wir die Grundlagen von HTML:</p><iframe width='100%' height='315' src='https://www.youtube.com/embed/UB1O30fR-EE' title='HTML Tutorial' frameborder='0' allowfullscreen></iframe>",
      
      "author": "Laura Weber",
      "authorImage": "images/authors/laura.jpg",
      "date": "10.11.2023",
      "category": "programmierung"
  },
];

// Container für die Artikelübersicht
const artikelUebersicht = document.getElementById('artikel-uebersicht');

// Funktion zum Erstellen und Hinzufügen eines Artikels
function createPost(post) {
  const postElement = document.createElement('article');
  postElement.classList.add('post');  // Optionale Klasse für Styling

  postElement.innerHTML = `
      <h3>${post.title}</h3>
      <img src="${post.image}" alt="${post.title}">
      <p>Autor: <strong>${post.author}</strong></p>
      <p><em>${post.date}</em></p>
      <p>${post.content}</p>
  `;

  artikelUebersicht.appendChild(postElement);  // Artikel in den Container einfügen
}

// Alle Artikel durchgehen und hinzufügen
posts.forEach(createPost);
