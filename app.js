/* variables */
const typeColor = {
  electric: "#F7D02C", // Yellow
  ice: "#6DD3F5", // Light Blue
  fire: "#FF6B6B", // Red
  grass: "#5DBE62", // Green
  water: "#5DADE2", // Blue
  psychic: "#FFA500", // Orange
  ground: "#D2B48C", // Tan
  rock: "#A9A9A9", // Gray
  ghost: "#7B68EE", // Purple
  dragon: "#7038F8", // Indigo
  dark: "#707070", // Dark Gray
  steel: "#B8B8D0", // Steel Gray
  fairy: "#FFB6C1", // Pink
  poison: "#A040A0",
  bug: "#A8B820",
};

const btn = document.getElementById("btn");
const result = document.getElementById("result");
const url = "https://pokeapi.co/api/v2/pokemon/";

const getPokemon = async () => {
  const id = Math.floor(Math.random() * 150) + 1;
  const endpoint = `${url}${id}`;
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const data = await response.json();
      generateCard(data);
    } else {
      console.log("Request failed!");
    }
  } catch (error) {
    console.log(error);
  }
};

const generateCard = (data) => {
  const hp = data.stats[0].base_stat;
  const imgSrc = data.sprites.other.dream_world.front_default;
  const pokemonName = data.name;
  const statsAttack = data.stats[1].base_stat;
  const statsDefense = data.stats[2].base_stat;
  const statsSpeed = data.stats[5].base_stat;

  const themeColor = typeColor[data.types[0].type.name];

  result.innerHTML = `<p class="hp">hp <span>${hp}</span></p>
  <img id="pokemon-pic"
    src=${imgSrc}
  />
  <h2>${pokemonName}</h2>
  <div class="types">
  </div>
  <div class="abilities">
    <div class="attack ability-item">
      <p>${statsAttack}</p>
      <h4>Attack</h4>
    </div>
    <div class="defense ability-item">
      <p>${statsDefense}</p>
      <h4>Defense</h4>
    </div>
    <div class="speed ability-item">
      <p>${statsSpeed}</p>
      <h4>Speed</h4>
    </div>
  </div>`;
  appendTypes(data.types);
  styleCard(themeColor);
};

const appendTypes = (types) => {
  types.forEach((item) => {
    let typeOne = document.createElement("p");
    typeOne.id = "typeOne";
    typeOne.textContent = item.type.name;
    console.log(typeOne);
    document.querySelector(".types").appendChild(typeOne);
  });
};

const styleCard = (color) => {
  result.style.background = `${color}`;
};

btn.onclick = getPokemon;
