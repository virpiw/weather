import React from 'react'
import Weather from './Weather'

export default class Location extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
      isLoaded: false
    }
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(location => {
        this.setState({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
          isLoaded: true
        });
      }, (error) => {
        alert(error);
      })
    } else {
        alert('Your browser does not support geolocation!')
    }
  }

  render() {
    const { lat, lng, isLoaded } = this.state;
    console.log(lat);
    if (isLoaded) {
      return (
        <div>
          <div>
            <h3>Location</h3>
            <p>You are at lat {lat.toFixed(3)}, lng {lng.toFixed(3)}</p>
            <Weather lat={lat} lng={lng} />
          </div>
          
          <div>
            <h3>Oulu</h3>
            <p>lat 65.012, lng 25.468</p>
            <Weather lat={65.012} lng={25.468} />
          </div>
        </div>
      )
    } else {
      return (<p>Loading...</p>)
    }
  }
}