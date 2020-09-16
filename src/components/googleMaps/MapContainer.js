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
    console.log(searchResults, 'search results')
    console.log(markers, 'markers, in useEffect')

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
    console.log(key, 'in update contraint name')
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


  // geocode 2
  async function geoCode(array){
    const holderArray = markers
    // console.log(holderArray, 'holderArray1')

    await array.forEach(store => {
      geoCodeAsync(store).then(res => res && holderArray.push(res))
    })
    // console.log(holderArray, 'holderArray2')
    // return holderArray
  }



  async function geoCodeAsync(store) {
    let promise = new Promise((resolve, reject) => {
      geoCoderService.geocode({ address: store.address }, ((response) => {
        const { location } = response ? response[0].geometry : { location: false }

        let coord = location && { lat: location.lat(), lng: location.lng(), name: store.name }

        resolve(coord)
      }))
    })

    let result = await promise
    if (result != undefined){
      setState(prev => ({...prev, ...{markers: [...prev.markers, result]}}))
      return result
    }
  }

  const renderMarkers = () => {
    let newArr = markers 
    let finalObj = {}
    let finalArr = []
    console.log(newArr, 'newArr', markers, 'markers state')

    console.log(finalObj, 'finalObj BEFORE filter', finalArr, 'finalArr')

    newArr = newArr.forEach(store => finalObj[store.name] = store)
    finalArr = Object.values(finalObj)

    console.log(finalObj, 'finalObj after filter', finalArr, 'finalArr')
    return finalArr.map((marker, key) => {
      const { name, lat, lng } = marker 
      return ( <MapMarker key={key} name={name} lat={lat} lng={lng} />)
    })
  }
  


  Array.prototype.unique = function () {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
      if (!arr.includes(this[i])) {
        arr.push(this[i]);
      }
    }
    return arr;
  }

  // Adds a Marker to the GoogleMaps component
  const addMarker00 = ((lat, lng, name) => {
    const prevMarkers = state.markers;
    const markers = Object.assign([], prevMarkers);
    console.log("prv markers", prevMarkers, "markers", markers)
    // If name already exists in marker list just replace lat & lng.
    let newMarker = true;
    for (let i = 0; i < markers.length; i++) {
      // debugger
      if (markers[i].name === name) {
        newMarker = false;
        markers[i].lat = lat;
        markers[i].lng = lng;
        message.success(`Updated "${name}" Marker`);
        break;
      }
    }
    // newMarker = markers.includes({lat: lat, lng: lng, name: name }) ? false : true

    // Name does not exist in marker list. Create new marker
    if (newMarker) {
      markers.push({ lat: lat, lng: lng, name: name });
      // setState(prev => ({...prev, markers: [...prev.markers, {lat, lng, name }]}))
      message.success(`Added new "${name}" Marker`);
    }
    console.log(markers, 'in addMarker, right before setState')
    setState(prev => ({ ...prev, ...{ markers: markers } }));
  });


  // With the constraints, find some places serving ice-cream
  const handleSearch = (() => {
    // const { markers, constraints, placesService, directionService, mapsApi } = state;

    if (markers.length === 0) {
      message.warn('Add a constraint and try again!');
      return;
    }
    const filteredResults = [];
    let newMarkers = []
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
      const responseLimit = Math.min(5, response.length);

      for (let i = 0; i < responseLimit; i++) {
        const weedShop = response[i];
        const { rating, name } = weedShop;
        const address = weedShop.formatted_address; // e.g 80 mandai Lake Rd,
        const priceLevel = weedShop.price_level; // 1, 2, 3...
        let photoUrl = '';
        let openNow = false;
        if (weedShop.opening_hours) {
          openNow = weedShop.opening_hours.isOpen(); // e.g true/false
        }
        if (weedShop.photos && weedShop.photos.length > 0) {
          photoUrl = weedShop.photos[0].getUrl();
        }

        // Second, For each weedShop, check if it is within acceptable travelling distance
        const directionRequest = {
          origin: markerLatLng,
          destination: address, // Address of ice cream place
          travelMode: 'DRIVING',
        }
        directionService.route(directionRequest, (async (result, status) => {
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
              priceLevel,
              photoUrl,
              distanceText,
              timeText,
            });
          }
          // Finally, Add results to state
          // console.log(filteredResults, 'filtered results')
          // console.log(newMarkers, 'newMarkers')
          // filteredResults.forEach(res => geoCode(res))
          // const newMarkers = geoCode(filteredResults)
          newMarkers = await geoCode(filteredResults)
          console.log(newMarkers, 'new Markers line 280')
          // REMOVE Duplicates
          // setTheMarkersState(newMarkers)
          if(i === responseLimit - 1){
            setState(prev => ({ ...prev, ...{ searchResults: filteredResults, markers: newMarkers, renderMarkersNow: true } }))
          } else {
            setState(prev => ({ ...prev, ...{ searchResults: filteredResults, markers: newMarkers, renderMarkersNow: false } }))
          }
          

        }));
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
          {/* {(markers && renderMarkersNow) && renderMarkers()} */}
          {markers && renderMarkers()}
          {/* {markers && markers.map((marker, key) => {
      const { name, lat, lng } = marker 
      return ( <MapMarker key={key} name={name} lat={lat} lng={lng} />)
    })} */}
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
            <div className={classes.nothing}>
              {/* "mb-4 fw-md" */}
              <h1 className={classes.nothing}>Tadah! Cannabis Stores!</h1>
              {/* "d-flex flex-wrap" */}
              <div className={classes.nothing}>
                {searchResults.map((result, key) => (
                  <PlaceCard info={result} key={key} />
                ))}
              </div>
            </div>
          </section>
        </>
        : null}
    </div>
  )

}

export default MapsContainer
