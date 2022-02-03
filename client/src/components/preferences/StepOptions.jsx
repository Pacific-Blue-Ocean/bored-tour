import React from 'react';
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
import groupByParent from '../../helpers/groupByParent.js';


const StepOptions= ({
  steps,
  stepIndex,
  userPreferences,
  setUserPreferences
}) => {


  const handlePreferenceCheckboxOnChange = (evt) => {
    const preferenceId = parseInt(evt.target.value);

    const isCurrentlyChecked = userPreferences.includes(preferenceId);
    let newPreferences = [];

    if (isCurrentlyChecked) {
      newPreferences = userPreferences.filter(prefId =>  prefId !== preferenceId);
    } else {
      newPreferences = [...userPreferences, preferenceId];
    }

    setUserPreferences(newPreferences);
  }


  const preferences =  groupByParent(steps[stepIndex].preferences);

  if (!preferences) {
    return null;
  }

  return (
    <List spacing={3} mb={4}>
      {preferences.map(pref => (
        <ListItem  mb={8} alignItems="center" key={pref.id}>
          <Checkbox
            display="flex" alignItems='flex-start'
            isChecked={userPreferences.includes(pref.id)}
            spacing='1rem'
            onChange={handlePreferenceCheckboxOnChange}
            value={pref.id}
          >
            <Heading fontSize='lg'>{pref.label}</Heading>
            {pref.description &&
             <Text fontSize='lg'>{pref.description}</Text>
            }
          </Checkbox>

          { pref.child && pref.child.length > 0 && (
            <List spacing={3} mb={4} ml={16} mt={4}>
              {pref.child.map(child => (
                <ListItem display="flex" alignItems="center" key={child.id}>
                  <Checkbox
                    isChecked={userPreferences.includes(child.id)}
                    spacing='1rem'
                    onChange={handlePreferenceCheckboxOnChange}
                    value={child.id}
                  >
                    {child.label}
                  </Checkbox>
                </ListItem>
              ))}
            </List>
            )
          }

        </ListItem>
      ))}
    </List>
  )
}

export default StepOptions;