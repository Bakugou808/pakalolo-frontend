
import React from 'react';
import RoomTwoToneIcon from '@material-ui/icons/RoomTwoTone';
import { green } from '@material-ui/core/colors';
import SvgIcon from '@material-ui/core/SvgIcon';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';



const MapMarker = (({ name, place_id }) => {
  return (
    <a href={`#${place_id}`}>
      <Tooltip title={name} aria-label={name} interactive >
        <IconButton aria-controls="simple-menu" aria-haspopup="true" >
          {name === 'Current Location' ? <RoomTwoToneIcon style={{ color: green[900] }} /> : <RoomTwoToneIcon style={{ color: green[500] }} />}
        </IconButton>
      </Tooltip>
      {/* <span className="brand-red">{name}</span>
      {name === 'Current Location' ? <RoomTwoToneIcon style={{color: green[1000]}} /> : <RoomTwoToneIcon style={{color: green[500]}} />} */}
      {/* <RoomTwoToneIcon style={{color: green[500]}} /> */}
    </a>
  );
});

export default MapMarker;

