"use strict";
const apiKey = "sWie0nqphB0xnsS26IndXTwAVp35qjsiB3ElCH8y";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function getParks(abbr) {
  const url = `${searchURL}?stateCode=${abbr}&limit=50&api_Key=${apiKey}`;
  const loadingAnimation = $(".loading");
  fetch(url)
    .then(loadingAnimation.removeClass("hidden"))
    .then(response => {
      if (response.ok) {
        loadingAnimation.addClass("hidden");
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
  const stateInput = $("#state-search").val();
  $("#state").append(`<h2 id="state">${stateInput}</h2>`);
  for (let i = 0; i < parkInfo.length; i++) {
    $(".results").append(
      `<div class="park-container">
      <h2 class="park-name">${parkInfo[i].fullName}</h2>  
      <h3 class="designation">${parkInfo[i].designation}</h3>
      <div class="icon-container">
      <li><a href='${parkInfo[i].directionsUrl}'target="_blank"><i class="fas fa-map-signs icon"></i></a></li> 
      <li><i class="fas fa-cloud-sun icon" onclick = $(".weather-info").toggleClass("hidden")></i></a></li>
      </div>  
      <div class="weather-info hidden"><p id="weather-info">${parkInfo[i].weatherInfo}</p></div>
      <div class="description"
        <li><p>${parkInfo[i].description}</p></li>
      </div>
        <li><h3><a href='${parkInfo[i].url}' class="link-btn" target="_blank">Website</a></h3></li></div>`
    );
  }

  //prepares form for another search
  $(".results").removeClass("hidden");
  $("input[type=text]").val("");
  $("input[type=text]").attr("placeholder", "Search again?");
  $("form").addClass("flex");
}

function watchForm() {
  $("form").submit(e => {
    e.preventDefault();
    let stateInput = $("#state-search").val();
    if (stateInput === "") {
      $("#error-message").removeClass("hidden");
    } else {
      getParks(convertRegion(stateInput));

      //empties previous search results
      $("#error-message").empty();
      $("#state").empty();
      $(".results").empty();
    }
  });
}
// Displays options for autocomplete
const statesList = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "District Of Columbia",
  "US Virgin Islands",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachussetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New hampshire",
  "New Jersey",
  "New Mexico",
  "New york",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];
$("#state-search").autocomplete({
  source: statesList,
  classes: {
    "ui-autocomplete": "highlight"
  },
  autoFocus: true,
  delay: 50
});

$("#state-search").autocomplete({
  select: function(event, ui) {
    $("#error-message").addClass("hidden");
  }
});

// Converts states names to abbreivations as they appear in the JSON data

function convertRegion(input) {
  var statesAndAbbreviations = [
    ["Alabama", "AL"],
    ["Alaska", "AK"],
    ["American Samoa", "AS"],
    ["Arizona", "AZ"],
    ["Arkansas", "AR"],
    ["California", "CA"],
    ["Colorado", "CO"],
    ["Connecticut", "CT"],
    ["Delaware", "DE"],
    ["District Of Columbia", "DC"],
    ["Florida", "FL"],
    ["Georgia", "GA"],
    ["Hawaii", "HI"],
    ["Idaho", "ID"],
    ["Illinois", "IL"],
    ["Indiana", "IN"],
    ["Iowa", "IA"],
    ["Kansas", "KS"],
    ["Kentucky", "KY"],
    ["Louisiana", "LA"],
    ["Maine", "ME"],
    ["Maryland", "MD"],
    ["Massachusetts", "MA"],
    ["Michigan", "MI"],
    ["Minnesota", "MN"],
    ["Mississippi", "MS"],
    ["Missouri", "MO"],
    ["Montana", "MT"],
    ["Nebraska", "NE"],
    ["Nevada", "NV"],
    ["New Hampshire", "NH"],
    ["New Jersey", "NJ"],
    ["New Mexico", "NM"],
    ["New York", "NY"],
    ["North Carolina", "NC"],
    ["North Dakota", "ND"],
    ["US Virgin Islands", "VI"],
    ["Ohio", "OH"],
    ["Oklahoma", "OK"],
    ["Oregon", "OR"],
    ["Pennsylvania", "PA"],
    ["Puerto Rico", "PR"],
    ["Rhode Island", "RI"],
    ["South Carolina", "SC"],
    ["South Dakota", "SD"],
    ["Tennessee", "TN"],
    ["Texas", "TX"],
    ["US Virgin Islands", "VI"],
    ["Utah", "UT"],
    ["Vermont", "VT"],
    ["Virginia", "VA"],
    ["Washington", "WA"],
    ["West Virginia", "WV"],
    ["Wisconsin", "WI"],
    ["Wyoming", "WY"]
  ];

  var i;
  for (i = 0; i < statesAndAbbreviations.length; i++) {
    if (statesAndAbbreviations[i][0] == input) {
      return statesAndAbbreviations[i][1];
    }
  }
}

function renderPage() {
  watchForm();
}
$(renderPage);
