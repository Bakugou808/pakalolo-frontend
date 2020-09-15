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
          location: usersLocation,
          autoCompleteService: autoCompleteService,
          geoCoderService: geoCoderService,
        })
      })


  // Runs a search on the current value as the user types in the AutoComplete field.
  const handleSearch = ((value) => {
    const { autoCompleteService, location } = state;
    
    // Search only if there is a string
    if (value.length > 0) {
      const searchQuery = {
        input: value,
        location: location, // Search within user's
        radius: 30000, // in Meters. 30km
      };
      autoCompleteService.getQueryPredictions(searchQuery, ((response) => {
        // The name of each GoogleMaps place suggestion is in the "description" field
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
    state.geoCoderService.geocode({ address: value }, ((response) => {
      const { location } = response[0].geometry;
      addMarker(location.lat(), location.lng(), markerName);
    }))
  });

  
    const { dataSource } = state;
    return (
      <AutoComplete
        dataSource={dataSource}
        onSearch={handleSearch}
        onSelect={onSelect}
        placeholder="Address"
      />
    )
  
}

export default MapAutoComplete