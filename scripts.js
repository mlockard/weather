//location api key
// 669eb52ab06df389337364gtzff1b95
// api call format https://geocode.maps.co/search?postalcode=26623&country=US&api_key=669eb52ab06df389337364gtzff1b95

function defaultzip() {
  getDataIP();
}

async function getDataIP() {
  const ipurl = "http://ip-api.com/json/";
  try {
    const response = await fetch(ipurl);
    if (!response.ok) {
      throw new Error('Response status: ${response.status}');
    }

    const jsonip = await response.json();
    const iplat = jsonip.lat;
    const iplon = jsonip.lon;

    const url2 = "https://api.weather.gov/points/" + iplat + ","+ iplon;
    try {
      const response2 = await fetch(url2);
      if (!response2.ok) {
        throw new Error('Response status url2: ${response2.status}');
      }
      const json2 = await response2.json();
      const reloc = json2['properties'].relativeLocation.properties.city + ", " + json2['properties'].relativeLocation.properties.state;
      const url3 = json2['properties'].forecast;
      document.getElementById('intro').innerHTML = '<h3>The weather for '+ reloc + '</h3>';
      //console.log('forecast is ' + url3);
      try {
        const response3 = await fetch(url3);
        if (!response3.ok) {
          throw new Error('Response status url3: ${response3.status}');
        }
        const json3 = await response3.json();
        const days = json3['properties'].periods;
        //console.log(days);
        for (day in days) {
          //console.log(day);
          const theID = 'day' + day;
          document.getElementById(theID).innerHTML = '<date>' + days[day].name + '</date>' + '<br />' + '<img src="' + days[day].icon + '" /><br />' 
                                                      + '<span class="o-weather__results--temp">'+ days[day].temperature +"&deg;"+ days[day].temperatureUnit  + '</span><br />'
                                                      + '<span class="o-weather__results--wind">Wind ' + days[day].windSpeed + ' from the ' + days[day].windDirection  + '</span><br />'
                                                      + '<span class="o-weather__results--outlook">' +days[day].shortForecast+ '</span>';
        }
  
      } catch (error) {
        console.error(error.message);
      }
    } catch (error) {
      console.error(error.message);
    }

  } catch (error) {
    console.error(error.message);
  }
}


document.addEventListener('DOMContentLoaded', defaultzip);

function formClick(event) {
  event.preventDefault(); // prevents the form from reloading the page
  const form = event.currentTarget;
  // your logic goes here
  const zipcode = (form['0']['value']);
  getData(zipcode);
}

document.getElementById('location').addEventListener('submit', formClick);

async function getData(zipcode) {
    const url = "https://geocode.maps.co/search?postalcode=" + zipcode + "&country=US&api_key=669eb52ab06df389337364gtzff1b95";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Response status: ${response.status}');
      }
  
      const json = await response.json();
      const lat = json['0'].lat;
      const lon = json['0'].lon;
      console.log('latitude is ' + lat);
      console.log('longitude is ' + lon);
      const url2 = "https://api.weather.gov/points/" + lat + ","+ lon;
      try {
        const response2 = await fetch(url2);
        if (!response2.ok) {
          throw new Error('Response status url2: ${response2.status}');
        }
        const json2 = await response2.json();
        const reloc = json2['properties'].relativeLocation.properties.city + ", " + json2['properties'].relativeLocation.properties.state;
        const url3 = json2['properties'].forecast;
        document.getElementById('intro').innerHTML = '<h3>The weather for '+ reloc + '</h3>';
        //console.log('forecast is ' + url3);
        try {
          const response3 = await fetch(url3);
          if (!response3.ok) {
            throw new Error('Response status url3: ${response3.status}');
          }
          const json3 = await response3.json();
          const days = json3['properties'].periods;
          //console.log(days);
          for (day in days) {
            //console.log(day);
            const theID = 'day' + day;
            document.getElementById(theID).innerHTML = '<date>' + days[day].name + '</date>' + '<br />' + '<img src="' + days[day].icon + '" /><br />' 
            + '<span class="o-weather__results--temp">'+ days[day].temperature +"&deg;"+ days[day].temperatureUnit  + '</span><br />'
            + '<span class="o-weather__results--wind">Wind ' + days[day].windSpeed + ' from the ' + days[day].windDirection  + '</span><br />'
            + '<span class="o-weather__results--outlook">' +days[day].shortForecast+ '</span>';
          }
    
        } catch (error) {
          console.error(error.message);
        }
      } catch (error) {
        console.error(error.message);
      }

    } catch (error) {
      console.error(error.message);
    }
  }