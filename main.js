'use strict'

const apiKey ='5635I1at0oEGTyAiNhUCT5J6pfnt0d3OWp8v2J3d';
const searchURL = 'https://api.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        console.log(queryItems)
    return queryItems.join('&');
}



function getParks(stateSearch) {
    const params = {
        stateCode: stateSearch,
        limit:10,
        api_key: apiKey,
    };


    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
    fetch(url)
        .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => showResults(responseJson))
    .catch(err => {
        $('.results').text(`${err.message}`);
        
    });   
}

//function changeMaxResults(params) {
  //  params.limit=maxResults;
//}

//append results to DOM

function showResults(responseJson) {
    const parkInfo=responseJson.data;
   console.log(responseJson);
    for (let i = 0; i < parkInfo.length; i++) {

    //NEED TO LEARN HOW TO PAGINATE API RESPONSE
        $('header').remove();
        $('.results').append(
            `<li><h2>${parkInfo[i].name}</h2></li>
            <li><p>${parkInfo[i].description}</p></li>
            <li><h3><a href='${parkInfo[i].url}'>Website</a></h3></li>`
            
        );
    };  
    //prepares form for another search
    $('input[type=text]').val("")
    $('label').remove();
    $('input[type=text]').attr('placeholder','Search again?');
  
}


function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const stateSearch = $('#state-search').val();
        //const maxResults = $('#max-results').val();
        getParks(stateSearch);
        //empties previous search results
        $('.results').empty();
    });
}

function renderPage(){
watchForm();
}
$(renderPage);