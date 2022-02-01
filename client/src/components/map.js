import { Flex, extendTheme } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import Geocode from "react-geocode";
import firebaseConfig from '../../../config';

const Map = ({ address }) => {
  const mapStyles = {
    height: "60vh",
    width: "100%",
    float: "right"
  };


  const [location, setLocation] = useState({});

  Geocode.setApiKey(firebaseConfig.GOOGLE_API);
  useEffect(() => {
    Geocode.fromAddress(address).then(
      (response) => {
        setLocation(response.results[0].geometry.location);
      }).catch((err) => { console.log(err)});
  }, []);

 let center = {
   lat: parseFloat(location.lat),
   lng: parseFloat(location.lng)
 };
  return (
    <LoadScript
      googleMapsApiKey={firebaseConfig.GOOGLE_API}>
      <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={center}>
          <Marker position={center}/>
     </GoogleMap>
    </LoadScript>
  );
};

export default Map;

