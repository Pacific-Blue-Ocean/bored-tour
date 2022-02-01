import { Flex, extendTheme, ChakraProvider } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import Geocode from "react-geocode";
import api from "../../../.googleConfig.js";

const Map = ({ address }) => {
  const mapStyles = {
    height: "60vh",
    width: "100%",
    float: "right",
  };

  const theme = extendTheme({
    colors: {
      brand: {
        100: "#2E2F30", //black {header}
        200: "#8DD8E0", //blue {border color}
        300: "#E3444B", //red  {buttons}
        400: "#EC7C71", //orange {button border}
        500: "#FBFAFA", //white {subheaders, text}
      },
    },
  });

  const [location, setLocation] = useState({});

  axios.get('/google/auth').then((res) => {
    console.log(res.data);
  })

  Geocode.setApiKey(api.GOOGLE_API);
  useEffect(() => {
    Geocode.fromAddress(address)
      .then((response) => {
        setLocation(response.results[0].geometry.location);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [address]);

  let center = {
    lat: parseFloat(location.lat),
    lng: parseFloat(location.lng),
  };
  return (
    <LoadScript googleMapsApiKey={api.GOOGLE_API}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={12} center={center}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
