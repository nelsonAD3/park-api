'use strict';

// put your own value below!
const apiKey = 'JhJzQ7WzjruZB54ywmiqPa3Ps5K14RKYt6CgdDck'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=&';

// ex curl -X GET "https://developer.nps.gov/api/v1/parks?parkCode=&stateCode=&limit=10&q=adf"


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}'> ${responseJson.data[i].url}</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getYouTubeVideos(query, limit=10) {
  const params = {
    api_key: apiKey,
    q: query,
    limit,
  };
  const url = formatQueryParams(params)
  const final_url = searchURL + url;

  console.log(final_url);

  fetch(final_url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const limit = $('#js-max-results').val();
    getYouTubeVideos(searchTerm, limit);
  });
}

$(watchForm);