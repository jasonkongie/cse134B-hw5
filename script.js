class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-block; width: 280px; margin: 16px; }
        .card { background: #fff; color: #333; border-radius: 8px; padding: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.15); font-family: Arial, sans-serif; }
        h2 { margin-top: 0; font-size: 1.2rem; }
        img { max-width: 100%; border-radius: 4px; }
        a { display: inline-block; margin-top: 0.5rem; color: #007acc; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
      <article class="card">
        <h2></h2>
        <picture>
          <img src="" alt="">
        </picture>
        <p></p>
        <a href="">Learn More</a>
      </article>
    `;
    this._titleElem = this.shadowRoot.querySelector("h2");
    this._imgElem = this.shadowRoot.querySelector("img");
    this._descElem = this.shadowRoot.querySelector("p");
    this._linkElem = this.shadowRoot.querySelector("a");
  }
  static get observedAttributes() {
    return ["title", "img", "alt", "description", "link", "linktext"];
  }
  attributeChangedCallback() {
    this.updateCard();
  }
  connectedCallback() {
    this.updateCard();
  }
  updateCard() {
    this._titleElem.textContent = this.getAttribute("title") || "No Title Provided";
    this._imgElem.src = this.getAttribute("img") || "";
    this._imgElem.alt = this.getAttribute("alt") || "Project image";
    this._descElem.textContent = this.getAttribute("description") || "No description provided.";
    this._linkElem.href = this.getAttribute("link") || "#";
    this._linkElem.textContent = this.getAttribute("linktext") || "Learn More";
  }
}
customElements.define("project-card", ProjectCard);

function initLocalData() {
  if (!localStorage.getItem("myProjects")) {
    const defaultData = [
      { 
        title: "Addiction Research Initiative", 
        img: "https://www.nih.gov/sites/default/files/news-events/research-matters/2007/20070716-brain.jpg", 
        alt: "Brain imaging representing addiction research", 
        description: "Here's a NIH project that I suggest looking into for understanding addiction and its impact on the Chinese community.", 
        link: "https://jasonkongie.com", 
        linkText: "View Project" 
      },
      { 
        title: "Community Outreach Program", 
        img: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", 
        alt: "Community event representing outreach", 
        description: "This program engages with the local Chinese community through mental health initiatives!!", 
        link: "https://google.com", 
        linkText: "Learn More" 
      },
      { 
        title: "Destress with Hiking", 
        img: "https://outdoorbeginner.com/wp-content/uploads/2019/10/img_2835.jpg?w=1000", 
        alt: "Community event representing outreach", 
        description: "One of my most recommended hobbies is to hike at Torrey Pines State Park near La Jolla and UC San Diego!", 
        link: "https://google.com", 
        linkText: "Learn More" 
      }

    ];
    localStorage.setItem("myProjects", JSON.stringify(defaultData));
  }
}

function loadLocal() {
  const container = document.getElementById("cardsContainer");
  container.innerHTML = "";
  const data = localStorage.getItem("myProjects");
  if (data) {
    JSON.parse(data).forEach(item => {
      const card = document.createElement("project-card");
      card.setAttribute("title", item.title);
      card.setAttribute("img", item.img);
      card.setAttribute("alt", item.alt);
      card.setAttribute("description", item.description);
      card.setAttribute("link", item.link);
      card.setAttribute("linktext", item.linkText);
      container.appendChild(card);
    });
  }
}

function loadRemote() {
  const container = document.getElementById("cardsContainer");
  container.innerHTML = "";
  fetch("https://my-json-server.typicode.com/jasonkongie/CSE134BHW5/projects")
    .then(res => res.json())
    .then(data => {
      data.forEach(item => {
        const card = document.createElement("project-card");
        card.setAttribute("title", item.title);
        card.setAttribute("img", item.img);
        card.setAttribute("alt", item.alt);
        card.setAttribute("description", item.description);
        card.setAttribute("link", item.link);
        card.setAttribute("linktext", item.linkText);
        container.appendChild(card);
      });
    })
    .catch(err => console.error(err));
}

window.addEventListener("DOMContentLoaded", () => {
  initLocalData();
  document.getElementById("loadLocal").addEventListener("click", loadLocal);
  document.getElementById("loadRemote").addEventListener("click", loadRemote);
});