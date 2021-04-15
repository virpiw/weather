import React from 'react'

const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const apiKey = 'a4382cb8a2ba16680ee17d1806dfafae';

export default class Weather extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      temperature: 0,
      wind_speed: 0,
      wind_direction: 0,
      description: '',
      icon: '',
      feels:0,
      min: 0,
      max:0,
      isLoaded: false
    }
  }

  componentDidMount(){
    const url = apiUrl +
      'lat=' + this.props.lat +
      '&lon=' + this.props.lng +
      '&units=metric' +
      '&appid=' + apiKey;
      
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        this.setState({
          temperature: result.main.temp,
          feels: result.main.feels_like,
          min: result.main.temp_min,
          max: result.main.temp_max,
          wind_speed: result.wind.speed,
          wind_direction: result.wind.deg,
          description: result.weather[0].description,
          icon: result.weather[0].icon,
          isLoaded: true
        })
      },
      (error) => {
        alert(error);
      }
    )
  }


  render() {
    const {isLoaded, temperature, feels, min, max, wind_speed, wind_direction, description, icon } = this.state;
    const icon_url = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
    console.log(icon_url);

    if (isLoaded) {
      return (
        <div>
          <h3>Weather at the location</h3>
          
          <p>Description: {description}</p>
          <p>Temperature: {temperature} &#176;C, &nbsp;feels like {feels} &#176;C</p>
          <p> &nbsp; &nbsp; min: {min} &#176;C, &nbsp; max: {max} &#176;C</p>
          
          <p>Wind: speed {wind_speed} m/s, direction {wind_direction} degrees</p>
          <figure>
            <img src={icon_url} alt='' />
          </figure>
        </div>
      ) 
    } else {
        return (
        <p>Loading...</p>
      )
    }
  }
}


// "coord":{"lon":25.748,"lat":61.924},
// "weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],
// "base":"stations",
// "main":{"temp":2.8,"feels_like":1.38,"temp_min":2,"temp_max":3.33,"pressure":1025,"humidity":48},
// "visibility":10000,
// "wind":{"speed":1.54,"deg":280},
// "clouds":{"all":0},
// "dt":1618423592,
// "sys":{"type":1,"id":1333,"country":"FI","sunrise":1618369002,"sunset":1618421844},
// "timezone":10800,
// "id":647522,
// "name":"Luhanka",
// "cod":200

// GPS coordinates of Oulu, Finland. 
// Latitude: 65.0124 Longitude: 25.4682

// http://api.openweathermap.org/data/2.5/weather?lat=61.924&lon=25.748&units=metric&appid=a4382cb8a2ba16680ee17d1806dfafae
