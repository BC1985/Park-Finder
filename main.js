"use strict";
const apiKey = "sWie0nqphB0xnsS26IndXTwAVp35qjsiB3ElCH8y";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  console.log(queryItems);
  return queryItems.join("&");
}

function getParks(stateSearch) {
  const params = {
    stateCode: stateSearch,
    limit: 10,
    api_key: apiKey
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => showResults(responseJson))
    .catch(err => {
      throw new Error(err.message);
    });
}

//append results to DOM

function showResults(responseJson) {
  const parkInfo = responseJson.data;
  console.log(responseJson.data);
  $("#state").append(
    `<h2 id="state">
      ${capitalizeFirstLetter(getStateName(parkInfo[0].states))}</h2>`
  );

  for (let i = 0; i < parkInfo.length; i++) {
    // $(".container").hide();
    $(".results").append(
      `<h2 class='park-name'>${parkInfo[i].fullName}</h2>  
      <h3 class="designation">${parkInfo[i].designation}</h3>
      <div class="icon-container">
      <li><i class="fas fa-map-signs icon"></i></li>
      <li><i class="fas fa-cloud-sun icon"></i></li>
      </div>  
      <div class="description-container"
        <li><p>${parkInfo[i].description}</p></li>
      </div>
        <li><h3><a href='${parkInfo[i].url}' target="_blank">Website</a></h3></li>`
    );
  }
  //prepares form for another search
  $(".results").removeClass("hidden");
  $("input[type=text]").val("");
  $("input[type=text]").attr("placeholder", "Search again?");
  $("form").addClass("flex");
}

function capitalizeFirstLetter(string) {
  if (!string) {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    let stateSearch = $("#state-search").val();
    if (stateSearch.length > 2) {
      stateSearch = getAbbreviation(stateSearch);
    }
    if (validateState(stateSearch)) {
      getParks(stateSearch);
      //empties previous search results
      $("#error-message").empty();
    }
    $(".results").empty();
  });
}
function validateState(stateSearch) {
  const stateAbb = [
    "al",
    "ak",
    "az",
    "ar",
    "ca",
    "co",
    "ct",
    "de",
    "fl",
    "ga",
    "hi",
    "id",
    "il",
    "in",
    "ia",
    "ks",
    "ky",
    "la",
    "me",
    "md",
    "ma",
    "mi",
    "mn",
    "ms",
    "mo",
    "mt",
    "ne",
    "nv",
    "nh",
    "nj",
    "nm",
    "ny",
    "nc",
    "nd",
    "oh",
    "ok",
    "or",
    "pa",
    "ri",
    "sc",
    "sd",
    "tn",
    "tx",
    "ut",
    "vt",
    "va",
    "wa",
    "wv",
    "wi",
    "wy"
  ];
  if (!stateAbb.includes(stateSearch.toLowerCase())) {
    $("#error-message").html(
      "Please make sure you have the correct state abbreviation."
    );
    $("input[type=text]").val("");
    return false;
  } else {
    return true;
  }
} //make the full state names equivelant to the abbreviations
const states = {
  al: "alabama",
  ak: "alaska",
  az: "arizona",
  ar: "arkensas",
  ca: "california",
  co: "colorado",
  ct: "connecticut",
  de: "delaware",
  fl: "florida",
  ga: "georgia",
  hi: "hawaii",
  id: "idaho",
  il: "illinois",
  in: "indiana",
  ia: "iowa",
  ks: "kansas",
  ky: "kentucky",
  la: "louisiana",
  me: "maine",
  md: "maryland",
  ma: "massachussetts",
  mi: "michigan",
  mn: "minnesota",
  ms: "mississippi",
  mo: "misouri",
  mt: "montana",
  ne: "nebraska",
  nv: "nevada",
  nh: "new hampshire",
  nj: "new jersey",
  nm: "new mexico",
  ny: "new york",
  nc: "north carolina",
  nd: "north dakota",
  oh: "ohio",
  ok: "oklahoma",
  or: "oregon",
  pa: "pennsylvania",
  ri: "rhode island",
  sc: "south carolina",
  sd: "south dacota",
  tn: "tennessee",
  tx: "texas",
  ut: "utah",
  vt: "vermont",
  va: "virginia",
  wa: "washington",
  wv: "west virginia",
  wi: "wisconsin",
  wy: "wyoming"
};

function getAbbreviation(state) {
  const _states = Object.keys(states).reduce((acc, current) => {
    acc[states[current]] = current;

    return acc;
  }, {});

  return _states[state];
}

function getStateName(state) {
  return states[state.toLowerCase()];
}

function renderPage() {
  watchForm();
}
$(renderPage);
