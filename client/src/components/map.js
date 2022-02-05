import { Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import Geocode from 'react-geocode';

const Map = ({ address }) => {
  const mapStyles = {
    height: '100%',
    width: '100%',
    float: 'right',
  };

  const [location, setLocation] = useState({});
  const [api, getApi] = useState();
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    axios.get('/google/auth').then(
      (res) => {
        getApi((res.data));
        isLoading(false);
      },
    );
  }, []);

  if (!loading) {
    Geocode.setApiKey(api);
  }

  useEffect(() => {
    Geocode.fromAddress(address)
      .then((response) => {
        setLocation(response.results[0].geometry.location);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [address]);

  const center = {
    lat: parseFloat(location.lat),
    lng: parseFloat(location.lng),
  };

  if (!loading) {
    return (
      <LoadScript googleMapsApiKey={api}>
        <Flex
          h={{ base: '40vw', md: '50vh' }}
          w={{ base: '80vw', md: '100%' }}
          marginBottom={{ base: '5vw' }}
        >
          <GoogleMap mapContainerStyle={mapStyles} zoom={12} center={center}>
            <Marker position={center} />
          </GoogleMap>
        </Flex>
      </LoadScript>
    );
  }
  return null;
};

export default Map;
