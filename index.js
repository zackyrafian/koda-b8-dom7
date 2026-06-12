const container = document.querySelector(".grid-container");
const search = document.getElementById("search");
let list = [];

const render = (data) => {
  const fragment = document.createDocumentFragment();
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = `<p class="empty-msg">No characters found.</p>`;
    return;
  }

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

    fragment.appendChild(card);
  });
  container.appendChild(fragment);
};

const fetchData = async () => {
  try {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    if (!res.ok) throw new Error("Failed to fetch data from server")
    const data = await res.json();
    list = data.results;
    render(list);
  } catch (error) {
    console.log("error fetching data: ", error);
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
