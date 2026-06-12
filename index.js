const container = document.querySelector(".grid-container");
const search = document.getElementById("search");
let list = [];

const render = (data) => {
  container.innerHTML = "";
  data.forEach((item) => {
    const card = document.createElement("article");
    const content = document.createElement("div");
    const name = document.createElement("h4");
    const img = document.createElement("img");

    card.classList.add("card");
    img.classList.add("card-image");
    img.src = item.image;
    img.alt = item.name;
    content.classList.add("card-content");
    name.textContent = item.name;

    content.appendChild(name);
    card.appendChild(img);
    card.appendChild(content);

    container.appendChild(card);
  });
};

const fetchData = async () => {
  try {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const data = await res.json();
    list = data.results;
    render(list);
  } catch (error) {
    console.log(error);
  }
};

search.addEventListener("input", (e) => {
  const k = e.target.value.toLowerCase();
  const f = list.filter((v) =>
    v.name.toLowerCase().includes(k)
  );
  render(f);
});

fetchData();
