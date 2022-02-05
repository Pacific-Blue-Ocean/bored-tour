import React from 'react';
import { Select, Box } from '@chakra-ui/react';

const StepLocation = ({ userLocation, locations, setUserLocation }) => {
  const handleLocationChange = (evt) => {
    setUserLocation(evt.target.value);
  };

  const selectedLocation = () => {
    const selected = locations.filter((l) => l.id === userLocation);
    return selected.label;
  };

  if (locations.length === 0) {
    return '...loading';
  }

  return (
    <Box mb={16} mt={16}>
      <Select
        placeholder={selectedLocation()}
        onChange={handleLocationChange}
      >
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.label}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default StepLocation;
