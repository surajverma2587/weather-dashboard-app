const getFromLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem("cities"));

  if (localStorageData === null) {
    return [];
  } else {
    return localStorageData;
  }
};

const onSubmit = (event) => {
  event.preventDefault();

  const cityName = $("#city-input").val();
  const cities = getFromLocalStorage();

  cities.push(cityName);

  localStorage.setItem("cities", JSON.stringify(cities));

  renderCitiesFromLocalStorage();

  $("#city-input").val("");
};

const renderCitiesFromLocalStorage = () => {
  $("#searched-cities").empty();

  const cities = getFromLocalStorage();

  const ul = $("<ul>").addClass("list-group");

  const appendListItemToUl = (city) => {
    const li = `<li class="list-group-item">${city}</li>`;
    ul.append(li);
  };

  cities.forEach(appendListItemToUl);

  $("#searched-cities").append(ul);
};

const onReady = () => {
  renderCitiesFromLocalStorage();
};

$("#search-by-city-form").on("submit", onSubmit);
$(document).ready(onReady);
