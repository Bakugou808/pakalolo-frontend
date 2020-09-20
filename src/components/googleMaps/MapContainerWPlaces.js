import React, { useState, useEffect } from 'react'

import GoogleMapReact from 'google-map-react';
import MapAutoComplete from './MapAutoComplete'
import MapMarker from './MapMarker'
import PlaceCard from './PlaceCard'
import Slider from '@material-ui/core/Slider';


import { makeStyles } from '@material-ui/core/styles';
import { Button, Input, Divider, message } from 'antd';
import TextField from '@material-ui/core/TextField';
import { ContactSupportTwoTone } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';


const API_KEY = 'AIzaSyAn899KmcxNfZ5RGR7o0KbaHhhRHJtjFEw'



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    width: '100%',
    // py: 4,
    justifyContent: 'center'
  },
  nothing: {

  },  
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  title: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 'auto',
    width: '100%'
  },
  mapContainer: {
    height: '35rem',
    width: '40rem'
  },
  searchBtn: {
    height: '30px'
  }
}));



function MapsContainer(props) {

  const classes = useStyles()

  const { location, defaultLocation } = props

  const [state, setState] = React.useState({
    constraints: [{ name: '', time: 0 }],
    searchResults: [],
    mapsLoaded: false,
    markers: [],
    map: {},
    mapsApi: {},
    usersLocation: {},
    autoCompleteService: {},
    placesService: {},
    geoCoderService: {},
    directionService: {},
    renderMarkersNow: true
  })

  const { constraints, mapsLoaded, markers, searchResults, map, mapsApi, usersLocation, autoCompleteService, placesService, geoCoderService, directionService, renderMarkersNow } = state;


  useEffect(() => {

  }, [searchResults, markers])

  // Runs once when the Google Maps library is ready
  // Initializes all services that we need
  const apiHasLoaded = ((map, mapsApi) => {

    let lat = location.lat
    let lng = location.lng

    setState(prev => ({
      ...prev,
      markers: [{ lat: lat, lng: lng, name: 'Current Location' }],
      mapsLoaded: true,
      map,
      mapsApi,
      usersLocation: new mapsApi.LatLng(lat, lng),
      autoCompleteService: new mapsApi.places.AutocompleteService(),
      placesService: new mapsApi.places.PlacesService(map),
      geoCoderService: new mapsApi.Geocoder(),
      directionService: new mapsApi.DirectionsService(),
    }));
    // addMarker(lat, lng, 'Current Location')
  });

  // Update name for constraint with index === key
  const updateConstraintName = ((event, key) => {
    event.preventDefault();
    
    const prevConstraints = state.constraints;
    const constraints = Object.assign([], prevConstraints);
    constraints[key].name = event.target.value;
    setState(prev => ({ ...prev, constraints }));
  });

  // Updates distance (in KM) for constraint with index == key  
  const updateConstraintTime = ((key, value, event) => {
    const prevConstraints = state.constraints;
    const constraints = Object.assign([], prevConstraints);

    constraints[key].time = value;
    setState(prev => ({ ...prev, constraints }));
  });


  // geocode 2 --> DIDN'T NEED THIS CUZ I FIGURED OUT A BETTER WAY ==== BUT NOW I KNOW MORE ABOUT ASYNC AND AWAIT KEYWORDS + PROMISES!
  // function geoCode(array) {

  //   array.forEach(store => {
  //     geoCodeAsync(store)
  //   })
  // }



  // async function geoCodeAsync(store) {
  //   let promise = new Promise((resolve, reject) => {
  //     geoCoderService.geocode({ address: store.address }, ((response) => {
  //       const { location } = response ? response[0].geometry : false

  //       let coord = location && { lat: location.lat(), lng: location.lng(), name: store.name }

  //       resolve(coord)
  //     }))
  //   })

  //   let result = await promise
  //   if (result != undefined) {
      
  //     if (markers.some(marker => marker.name === result.name)) {
        
  //     } else {
  //       setState(prev => ({ ...prev, ...{ markers: [...prev.markers, result] } }))
  //     }
  //   }
  // }

  const renderMarkers = () => {
    let newArr = markers
    let finalObj = {}
    let finalArr = []
    // prevent duplicates from being displayed
    newArr = newArr.forEach(store => finalObj[store.name] = store)
    finalArr = Object.values(finalObj)

    return finalArr.map((marker, key) => {
      const { name, lat, lng } = marker
      return (<MapMarker key={key} name={name} lat={lat} lng={lng} />)
    })
  }



  // With the constraints, find some places serving ice-cream
  const handleSearch = (() => {
    // const { markers, constraints, placesService, directionService, mapsApi } = state;

    if (markers.length === 0) {
      message.warn('Add a constraint and try again!');
      return;
    }
    const filteredResults = [];
    const newMarkers = markers;
    const marker = markers[0];
    const timeLimit = constraints[0].time;
    const markerLatLng = new mapsApi.LatLng(marker.lat, marker.lng);

    const placesRequest = {
      location: markerLatLng,
      // radius: '30000', // Cannot be used with rankBy. Pick your poison!
      type: ['store', 'dispensary', 'medical', 'retail'], // List of types: https://developers.google.com/places/supported_types
      query: 'cannabis',
      rankBy: mapsApi.places.RankBy.DISTANCE, // Cannot be used with radius.
    };

    // First, search for weed shops.
    placesService.textSearch(placesRequest, ((response) => {
      // Only look at the nearest top 5.
      const responseLimit = Math.min(10, response.length);
      
      for (let i = 0; i < responseLimit; i++) {
        const weedShop = response[i];
        const priceLevel = weedShop.price_level
        // Second, For each weedShop, grab info with place_id
        placesService.getDetails({ placeId: weedShop.place_id }, ((resp, status) => {
          if (status !== 'OK') {return }
          const { business_status, formatted_address, formatted_phone_number, geometry, icon, name, opening_hours, photos, rating, reviews, user_ratings_total, website, url } = resp
          const coordinates = { lat: geometry.location.lat(), lng: geometry.location.lng() }
          let openNow = false
          let weekday_hours = opening_hours.weekday_text
          const googleUrl = url
          const address = formatted_address
          if (resp.opening_hours) {
            openNow = resp.opening_hours.isOpen(); // e.g true/false
          }
          // Third, For each weedShop, check if it is within acceptable travelling distance
          const directionRequest = {
            origin: markerLatLng,
            destination: address, // Address of ice cream place
            travelMode: 'DRIVING',
          }
          directionService.route(directionRequest, ((result, status) => {
            // if so determine the duration of travel and push the data as an object into filteredResults
            if (status !== 'OK') { return }
            const travellingRoute = result.routes[0].legs[0]; // { duration: { text: 1mins, value: 600 } }
            const travellingTimeInMinutes = travellingRoute.duration.value / 60;
            if (travellingTimeInMinutes < timeLimit) {
              const distanceText = travellingRoute.distance.text; // 6.4km
              const timeText = travellingRoute.duration.text; // 11 mins
              filteredResults.push({
                name,
                rating,
                address,
                openNow,
                weekday_hours,
                photos,
                distanceText,
                timeText,
                reviews,
                business_status,
                formatted_phone_number,
                user_ratings_total,
                website,
                googleUrl,
              });
              // and while in the same if statement push the store's marker info as an object into the newMarkers
              newMarkers.push({...coordinates, ...{name: name}})
            }
            // set the state for both searchResults and markers
            let filteredResults2 = filteredResults.sort((a, b) => {return parseInt(a.distanceText.split(' ')[0], 10) - parseInt(b.distanceText.split(' ')[0], 10)})
            console.log(filteredResults2)
            setState(prev => ({ ...prev, ...{ searchResults: filteredResults, markers: newMarkers } }))
          }));
        }))
      }
    }));
  });





  return (
    <div className={classes.nothing}>
      <h1 className={classes.title}>Find A Dispensary</h1>
      {/* Constraints section */}
      <section className={classes.nothing}>

        {mapsLoaded ?
          <div>
            {constraints.map((constraint, key) => {
              const { name, time } = constraint;
              return (
                <div key={key} className={classes.nothing}>
                  {/* "d-flex mb-2" */}
                  <div className={classes.nothing}>
                  </div>
                  < section className="" >
                    <span className="">Minutes away by car</span>
                    <div className="">
                      <Slider className="" value={time} min={0} max={60} onChange={(event, value) => updateConstraintTime(key, value, event)} valueLabelDisplay="auto" />
                    </div>
                  </section >
                  <Divider />
                </div>
              );
            })}
          </div>
          : null
        }
      </section>

      {/* Maps Section */}
      <section className={classes.mapContainer}>
        {<GoogleMapReact
          bootstrapURLKeys={{
            key: API_KEY,
            libraries: ['places', 'directions']
          }}
          defaultZoom={11}
          defaultCenter={{ lat: location.lat, lng: location.lng }}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)} // "maps" is the mapApi. Bad naming but that's their library.
        >
          {/* Pin markers on the Map*/}

          {markers && renderMarkers()}

        </GoogleMapReact>}
      </section>

      {/* Search Button */}
      <Button className={classes.searchBtn} type="primary" size="small" onClick={handleSearch}>Search!</Button>

      {/* Results section */}
      {(searchResults && searchResults.length > 0) ?
        <>
          <Divider />
          <section className={classes.nothing}>
            {/* "d-flex flex-column justify-content-center" */}
            {/* <div className={classes.nothing}> */}
              {/* "mb-4 fw-md" */}
              <h1 className={classes.nothing}>Tadah! Cannabis Stores!</h1>
              {/* "d-flex flex-wrap" */}
              <div className={classes.nothing}>
                {searchResults.map((result, key) => (
                  <>
                  <PlaceCard storeInfo={result} key={key} />
                  <br/>
                  </>
                ))}
              </div>
            {/* </div> */}
          </section>
        </>
        : null}
    </div>
  )

}

export default MapsContainer
