import React, { useState, useEffect } from 'react'

import GoogleMapReact from 'google-map-react';
import MapAutoComplete from './MapAutoComplete'
import MapMarker from './MapMarker'
import PlaceCard from './PlaceCard'
import ConstraintSlider from './ConstraintSlider'

import { makeStyles } from '@material-ui/core/styles';
import { Button, Input, Divider, message } from 'antd';

const API_KEY = 'AIzaSyAn899KmcxNfZ5RGR7o0KbaHhhRHJtjFEw'



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 'auto'
    },
    mapContainer: {
        height: '35rem',

    }
}));



function MapsContainer(props) {
    
    const classes = useStyles()

      const [state1, setState1] = React.useState({
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
        location: null
      })

      useEffect(()=> {
          props.location && setState1({location})
          
      },[props.location])
    
  
    // Update name for constraint with index === key
    const updateConstraintName = ((event, key) => {
      event.preventDefault();
      const prevConstraints = state1.constraints;
      const constraints = Object.assign([], prevConstraints);
      constraints[key].name = event.target.value;
      setState1({ constraints });
    });
  
    // Updates distance (in KM) for constraint with index == key
    const updateConstraintTime = ((key, value) => {
      const prevConstraints = state1.constraints;
      const constraints = Object.assign([], prevConstraints);
      constraints[key].time = value;
      setState1({ constraints });
    });
  
    // Adds a Marker to the GoogleMaps component
    const addMarker = ((lat, lng, name) => {
      const prevMarkers = state1.markers;
      const markers = Object.assign([], prevMarkers);
  
      // If name already exists in marker list just replace lat & lng.
      let newMarker = true;
      for (let i = 0; i < markers.length; i++) {
        if (markers[i].name === name) {
          newMarker = false;
          markers[i].lat = lat;
          markers[i].lng = lng;
          message.success(`Updated "${name}" Marker`);
          break;
        }
      }
      // Name does not exist in marker list. Create new marker
      if (newMarker) {
        markers.push({ lat, lng, name });
        message.success(`Added new "${name}" Marker`);
      }
  
      setState1({ markers });
    });
  
    // Runs once when the Google Maps library is ready
    // Initializes all services that we need
    const apiHasLoaded = ((map, mapsApi, props) => {
      setState1({
        mapsLoaded: true,
        map,
        mapsApi,
        usersLocation: new mapsApi.LatLng(location.lat, location.lng),
        autoCompleteService: new mapsApi.places.AutocompleteService(),
        placesService: new mapsApi.places.PlacesService(map),
        geoCoderService: new mapsApi.Geocoder(),
        directionService: new mapsApi.DirectionsService(),
      });
    });
  
    // With the constraints, find some places serving ice-cream
    const handleSearch = (() => {
      const { markers, constraints, placesService, directionService, mapsApi } = state1;
      if (markers.length === 0) {
        message.warn('Add a constraint and try again!');
        return;
      }
      const filteredResults = [];
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
  
      // First, search for ice cream shops.
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
            openNow = weedShop.opening_hours.open_now; // e.g true/false
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
          directionService.route(directionRequest, ((result, status) => {
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
            // Finally, Add results to state1
            setState1({ searchResults: filteredResults });
          }));
        }
      }));
    });
  
 
      const { constraints, mapsLoaded, usersLocation, markers, searchResults, location } = state1;
      const { autoCompleteService, geoCoderService } = state1; // Google Maps Services
      return (
        <div className="w-100 d-flex py-4 flex-wrap justify-content-center">
          <h1 className="w-100 fw-md">Find Some Ice-Creams!</h1>
          {/* Constraints section */}
          <section className="col-4">
            {mapsLoaded ?
              <div>
                {constraints.map((constraint, key) => {
                  const { name, time } = constraint;
                  return (
                    <div key={key} className="mb-4">
                      <div className="d-flex mb-2">
                        <Input className="col-4 mr-2" placeholder="Name" onChange={(event) => updateConstraintName(event, key)} />
                        {/* <MapAutoComplete
                          autoCompleteService={autoCompleteService}
                          geoCoderService={geoCoderService}
                          usersLocation={usersLocation}
                          markerName={name}
                          addMarker={addMarker}
                        /> */}
                      </div>
                      <ConstraintSlider
                        iconType="car"
                        value={time}
                        onChange={(value) => updateConstraintTime(key, value)}
                        text="Minutes away by car"
                      />
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
            {location && <GoogleMapReact
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
              {markers.map((marker, key) => {
                const { name, lat, lng } = marker;
                return (
                  <MapMarker key={key} name={name} lat={lat} lng={lng} />
                );
              })}
            </GoogleMapReact>}
          </section>
  
          {/* Search Button */}
          <Button className="mt-4 fw-md" type="primary" size="large" onClick={handleSearch}>Search!</Button>
  
          {/* Results section */}
          {(searchResults && searchResults.length > 0 )?
            <>
              <Divider />
              <section className="col-12">
                <div className="d-flex flex-column justify-content-center">
                  <h1 className="mb-4 fw-md">Tadah! Ice-Creams!</h1>
                  <div className="d-flex flex-wrap">
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
  
  export default MapsContainer;

// const MapContainer = (props) => {

//     const classes = useStyles()
//     const { setApiState, location, defaultLocation } = props
    // const [location, setLocation] = React.useState(null)
      // default set to NYC
    // const [defaultLocation, setDefaultLocation] = React.useState({ lat: 40.7128, lng: -74.0060 })
    // const [autoCompleteService, setAutoCompleteService] = React.useState(null)
    // const [placesService, setPlacesService] = React.useState(null)
    // const [directionService, setDirectionService] = React.useState(null)
    // const [geoCoderService, setGeoCoderService] = React.useState(null)
    // const [apiState, setApiState] = React.useState({})
  
 


    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(getPosition);
    //     }
    //     function getPosition(position) {
    //         console.log(position, 'setting location');
    //         setLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
    //     }
    // }, [])

//     const apiHasLoaded = (map, mapsApi) => {
//         console.log(map, mapsApi, 'in apihasloaded')
//         // setAutoCompleteService( new mapsAPI.places.autoCompleteService())
//         // setPlacesService( new mapsAPI.places.PlacesService(map))
//         // setDirectionService( new mapsAPI.DirectionsService())
//         // setGeoCoderService( new mapsAPI.Geocoder())
//         setApiState({
//             mapsApi,
//             autoCompleteService: new mapsApi.places.AutocompleteService(),
//             placesService: new mapsApi.places.PlacesService(map),
//             directionService: new mapsApi.DirectionsService(),
//             geoCoderService: new mapsApi.Geocoder(),
//             locationLatLng: new mapsApi./LatLng(location)
//         })
//     }

//     return (
//         // <Paper className={classes.paper}>
//         <section className={classes.mapContainer}>
//             {console.log('im in the google maps component')}
//             <GoogleMapReact
//                 bootstrapURLKeys={{
//                     key: API_KEY,
//                     libraries: ['places', 'directions']
//                 }}
//                 defaultZoom={11} // Supports DP, e.g 11.5
//                 defaultCenter={(location ? location : defaultLocation)}
//                 yesIWantToUseGoogleMapApiInternals={true}
//                 onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
//             >
//             </GoogleMapReact>
//         </section>
//         // </Paper>
//     );

// }

// export default MapContainer