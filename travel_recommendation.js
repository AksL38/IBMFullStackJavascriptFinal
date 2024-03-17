let cities = [];
let beaches = [];
let temples = [];
let results = [];

fetch('./travel_recommendation_api.json')
  .then((data) => data.json())
  .then((data) => {
    data.countries.forEach((country) => {
      cities = cities.concat(country.cities);
    });
    data.temples.forEach((temple) => temples.push(temple));
    data.beaches.forEach((beach) => beaches.push(beach));
  })
  .catch((err) => console.log(err));

const generateSearchResults = () => {
  clearSearch();
  const search = document.getElementById('keywordInput').value.toLowerCase();

  switch (search) {
    case 'beach':
    case 'beaches':
      results = results.concat(beaches);
      break;
    case 'temple':
    case 'temples':
      results = results.concat(temples);
      break;
    case 'country':
    case 'countries':
      results = results.concat(cities);
      break;
    default:
      const searchRegex = new RegExp(`.*${search}.*`);
      results = results.concat(
        cities.filter(
          (city) =>
            searchRegex.test(city.name.toLowerCase()) ||
            searchRegex.test(city.description.toLowerCase())
        )
      );
      results = results.concat(
        temples.filter(
          (temple) =>
            searchRegex.test(temple.name.toLowerCase()) ||
            searchRegex.test(temple.description.toLowerCase())
        )
      );
      results = results.concat(
        beaches.filter(
          (beach) =>
            searchRegex.test(beach.name.toLowerCase()) ||
            searchRegex.test(beach.description.toLowerCase())
        )
      );
      break;
  }

  displaySearchResults();
};

const displaySearchResults = () => {
  const searchDiv = document.getElementById('searchResults');
  searchDiv.setAttribute('hidden', 'false');

  if (results.length === 0) {
    const newElem = document.createElement('div');
    const name = document.createElement('h3');
    name.textContent = 'No results matching the search query.';
    newElem.appendChild(name);
    newElem.style.backgroundColor = 'rgba(99,99,99,0.5)';
    newElem.style.padding = '10px';
    searchDiv.appendChild(newElem);
  }

  results.forEach((result) => {
    const newElem = document.createElement('div');
    const image = document.createElement('img');
    image.setAttribute('src', result.imageUrl);
    image.setAttribute('width', '100%');
    image.setAttribute('height', '100px');
    newElem.appendChild(image);
    const name = document.createElement('h3');
    name.textContent = result.name;
    newElem.appendChild(name);
    const description = document.createElement('p');
    description.textContent = result.description;
    newElem.appendChild(description);
    newElem.style.backgroundColor = 'rgba(99,99,99,0.5)';
    newElem.style.padding = '10px';
    searchDiv.appendChild(newElem);
  });
};

const clearSearch = () => {
  results = [];
  const searchDiv = document.getElementById('searchResults');
  searchDiv.replaceChildren();
  searchDiv.setAttribute('hidden', 'true');
};
