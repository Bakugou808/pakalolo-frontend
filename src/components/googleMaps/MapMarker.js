
import React from 'react';
import RoomTwoToneIcon from '@material-ui/icons/RoomTwoTone';
import { green } from '@material-ui/core/colors';
import SvgIcon from '@material-ui/core/SvgIcon';

const MapMarker = (({ name, key }) => {
  return (
    <div key={key}>
      <span className="brand-red">{name}</span>
      <RoomTwoToneIcon style={{color: green[500]}} />
    </div>
  );
});

export default MapMarker;