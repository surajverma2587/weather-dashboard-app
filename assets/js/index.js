const API_KEY = "60b4fb66103f9e3c6f93920a7d7f1377";

const getFromLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem("cities"));

  if (localStorageData === null) {
    return [];
  } else {
    return localStorageData;
  }
};

const fetchData = (cityName) => {
  const functionForJSON = (responseObject) => {
    return responseObject.json();
  };
  const functionForApplication = (dataFromServer) => {
    console.log(dataFromServer);
  };
  const functionToHandleError = (errorObject) => {
    // TODO
    console.log(errorObject);
  };

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

  fetch(url)
    .then(functionForJSON)
    .then(functionForApplication)
    .catch(functionToHandleError);
};

const getDataByCityName = (event) => {
  const target = $(event.target);
  if (target.is("li")) {
    const cityName = target.data("city");
    fetchData(cityName);
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

  fetchData(cityName);
};

const renderCitiesFromLocalStorage = () => {
  $("#searched-cities").empty();

  const cities = getFromLocalStorage();

  const ul = $("<ul>").addClass("list-group");

  const appendListItemToUl = (city) => {
    const li = $("<li>")
      .addClass("list-group-item")
      .attr("data-city", city)
      .text(city);

    ul.append(li);
  };

  cities.forEach(appendListItemToUl);

  ul.on("click", getDataByCityName);

  $("#searched-cities").append(ul);
};

const onReady = () => {
  renderCitiesFromLocalStorage();
};

$("#search-by-city-form").on("submit", onSubmit);

$(document).ready(onReady);
