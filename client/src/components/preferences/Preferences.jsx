import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  extendTheme,
  ChakraProvider,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Text,
  Checkbox,
  CheckboxGroup
} from '@chakra-ui/react';
import StepLocation from './StepLocation.jsx';
import StepOptions from './StepOptions.jsx';


const Preferences = ({userId}) => {
  const navigate = useNavigate();
  // Whether the data to render this component is available
  const [isLoading, setIsLoading] = useState(false);
  // all steps available
  const [steps, setSteps] = useState([]);
  // all locations available
  const [locations, setLocations] = useState([]);
  // Index of the current step
  const [stepIndex, setStepIndex] = useState(0);
  // current user selected preferences
  const [userPreferences, setUserPreferences] = useState([]);
  // current user selected location
  const [userLocation, setUserLocation] = useState(null);


  /**
   * DidInsertElement
   * This method runs only when the Preferences component is loaded
   * Fetch all steps and locations that are on the DB + user preferences options location.
   * Set this component state with the data from the backend.
   */
  useEffect(async () => {
    setIsLoading(true);

    // Fetch all steps and locations.
    // Set locations and preferencesSteps state
    const locations = await axios.get('/api/locations');
    setLocations(locations.data);
    // Fetch user data to get the user location + the user preferences
    // Set userPrefences and userLocation state.
    const user = await axios(`/api/users/${userId}`);
    setUserLocation(user.data[0].location_id);

    const preferencesSteps = await axios('/api/preferences');
    const userPreferences = await axios(`/api/users/${userId}/preferences`);
    setUserPreferences(userPreferences.data);
    setSteps(preferencesSteps.data);

    setIsLoading(false);
  }, []);

  /**
   * Go to previous step
   */
  const handlePrevious = () => {
    setStepIndex(stepIndex - 1);
  }

  /**
   * Go to next step
   */
  const handleNext = () => {
    setStepIndex(stepIndex + 1);
  }

  /**
   * Handle submit preferences
   */
  const handleFinish = async () => {
    const sortedUserPreferences = userPreferences.sort((a,b) => a - b)
    await axios.post(`/api/users/${userId}/preferences`, userPreferences);

    await axios.put(`/api/users/${userId}/location`, {locationId: parseInt(userLocation)});

    const hasUserCompletedSurvey = await axios.get(`/api/users/${userId}/has-completed-survey`);


    if (!hasUserCompletedSurvey.data[0].has_completed_survey) {
      await axios.post(`/api/users/${userId}/has-completed-survey`);
    }

    navigate(`/`);
  }

  /**
   * Renders step
   *
   * It will choose whether to render the options step component or the locatin step component based on the current step type ('location', 'options')
   *
   * @param {} stepData
   * @returns
   */
  const renderStep = (stepIndex) => {
    const currentStepData = steps[stepIndex];

    if (!currentStepData) {
      return null;
    }

    return (
      <div>
        <Box bg='tomato' w='100%' p={4} mt={2} mb={4} color='white'>
          <Heading>{currentStepData.label}</Heading>
          <p>{currentStepData.question}</p>
        </Box>

        { currentStepData.type === 'location' && (
          <StepLocation
            userLocation={userLocation}
            locations={locations}
            setUserLocation={setUserLocation}
          />
        ) }


        { currentStepData.type === 'options' && (
          <StepOptions
            steps={steps}
            stepIndex={stepIndex}
            userPreferences={userPreferences}
            setUserPreferences={setUserPreferences}
          />
        ) }
      </div>
    )
  }

  if (isLoading) {
    return 'isLoading...'
  }

  return (
    <div className="preferences">
      <div className="step-content">
        <p>Step {stepIndex + 1} of {steps.length}</p>
        {renderStep(stepIndex)}
      </div>

      <div className="controls">
        {stepIndex > 0 &&
          <Box as='button' onClick={handlePrevious} borderRadius='md' bg='tomato' color='white' mr={2} px={4} h={8}>
           Previous
          </Box>
        }
        {stepIndex < steps.length - 1 &&
          <Box as='button' onClick={handleNext} borderRadius='md' bg='tomato' color='white' px={4} h={8}>
            Next
          </Box>
        }
        {stepIndex === steps.length - 1 &&
          <Box as='button' onClick={handleFinish} borderRadius='md' bg='tomato' color='white' px={4} h={8}>
            Finish
          </Box>
        }
      </div>
    </div>
  )
}

export default Preferences;
