import { Flex, extendTheme, ChakraProvider } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import Geocode from "react-geocode";

const Map = ({ address }) => {
  const mapStyles = {
    height: "60vh",
    width: "100%",
    float: "right"
  };

  const theme = extendTheme({
    colors: {
      brand: {
        100: "#2E2F30",  //black
        200: "#8DD8E0",  //blue
        300: "#E3444B",  //red
        400: "#EC7C71",  //orange
        500: "#FBFAFA",  //white
      },
    },
  })


  const [location, setLocation] = useState({});

  Geocode.setApiKey(config.GOOGLE_API);
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
      googleMapsApiKey={config.GOOGLE_API}>
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

