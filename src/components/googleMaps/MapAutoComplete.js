import React, { Component, useState, useEffect } from 'react'
import { AutoComplete } from 'antd';



const MapAutoComplete = (props) => {

    const { usersLocation, autoCompleteService, geoCoderService, addMarker, markerName } = props
    const [state, setState] = React.useState({
        suggestions: [],
          dataSource: [],
          location: null,
          autoCompleteService: null,
          geoCoderService: null,
    })
    useEffect(() => {
        setState({
          suggestions: [],
          dataSource: [],
          location: null,
          autoCompleteService: autoCompleteService,
          geoCoderService: geoCoderService,
        })
      }, [])


  // Runs a search on the current value as the user types in the AutoComplete field.
  const handleSearch = ((value) => {
    const { location } = state;
    
    // Search only if there is a string
    console.log(usersLocation, 'users location')
    if (value.length > 0) {
      const searchQuery = {
        input: value,
        location: usersLocation, // Search within user's location
        radius: 30000, // in Meters. 30km
      };
      console.log(searchQuery, 'inhandleSearch')
      autoCompleteService.getQueryPredictions(searchQuery, ((response) => {
        // The name of each GoogleMaps place suggestion is in the "description" field
        console.log(response)
        if (response) {
          const dataSource = response.map((resp) => resp.description);
          setState({ dataSource, suggestions: response });
        }
      }));
    }
  });

  // Runs after clicking away from the input field or pressing 'enter'.
  // GeocoderService helps us get the lng & lat given an address name.
  const onSelect = ((value) => {
    debugger
    geoCoderService.geocode({ address: value }, ((response) => {
      const { location } = response[0].geometry;
      addMarker(location.lat(), location.lng(), markerName);
    }))
  });

  
    const { dataSource } = state;
    return (
      <AutoComplete
        options={dataSource}
        onSearch={handleSearch}
        onSelect={onSelect}
        placeholder="City, State, Zip"
      />
    )
  
}

export default MapAutoComplete