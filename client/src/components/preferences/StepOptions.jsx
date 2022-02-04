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
  const currentStep = steps[stepIndex];
  const currentStepPreferences = currentStep.preferences;
  const currentStepPreferencesGroupedByParent =  groupByParent(currentStepPreferences); // preferences

  const handleCheckboxChange = (evt) => {
    const clickedPreferenceId = parseInt(evt.target.value);
    const clickedPreference = currentStepPreferences.find(el => el.id === clickedPreferenceId);
    const isParent = !clickedPreference.parent_preference_id;
    const children = clickedPreference.child;
    const childrenIds = children.map(child => child.id);
    const hasChild = children.length > 0;
    const isChild = !isParent;
    const isCurrentlyChecked = userPreferences.includes(clickedPreferenceId);
    const parentId = clickedPreference.parent_preference_id;
    let newPreferences = [];

    if (isParent) {
      if(hasChild) {
        if (isCurrentlyChecked) {
          // uncheck parent and uncheck children
          newPreferences = userPreferences.filter(prefId => {
            return prefId !== clickedPreferenceId && !childrenIds.includes(prefId);
          });
        } else {
          // check parent and check children
          newPreferences = [...userPreferences, clickedPreferenceId, ...childrenIds];
        }
      } else {
        if (isCurrentlyChecked) {
          newPreferences = userPreferences.filter(prefId =>  prefId !== clickedPreferenceId);
        } else {
          newPreferences = [...userPreferences, clickedPreferenceId];
        }
      }
    }

    if (isChild) {
      const parent = currentStep.preferences.find(el => el.id === parentId);
      const siblingsCount = parent.child.length;
      const siblingsIds = parent.child.map(el => el.id);
      const isParentChecked = userPreferences.includes(parentId);

      if (isParentChecked) {
        // if parent is checked, that means all children should be checked
        // unselecting a child, should unselect parent
        newPreferences = userPreferences.filter(prefId => {
          return prefId !== parentId && prefId !== clickedPreferenceId;
        })
      } else {

        //      T1    T2     T3     T4     T5     T6
        //  C1     C2     C3     C4     C5     C6     C7
        //  O      O      O      X      O      O      O
        //   [O]     X      X     [X]     O      O      O
        //    O     [O]     X      X     [X]     O      O
        //    O      O     [O]     X      X     [X]     O

        const currentCheckedSiblings = userPreferences.filter(id => siblingsIds.includes(id));
        const parentHasOnlyOneChildUnchecked = currentCheckedSiblings.length === siblingsIds.length - 1; // C3 C5
        const isLastUncheckedSibling = parentHasOnlyOneChildUnchecked && !isCurrentlyChecked;

        // if parent is unselected, selecting last unselect child should select parent
        if (isLastUncheckedSibling) {
          newPreferences = [...userPreferences, clickedPreferenceId, parentId];
        } else {
          if (isCurrentlyChecked) {
            newPreferences = userPreferences.filter(prefId =>  prefId !== clickedPreferenceId);
          } else {
            newPreferences = [...userPreferences, clickedPreferenceId];
          }
        }
      }
    }

    setUserPreferences(newPreferences);
  }

  if (!currentStepPreferencesGroupedByParent) {
    return null;
  }

  return (
    <List spacing={3} mb={4}>
      {currentStepPreferencesGroupedByParent.map(pref => (
        <ListItem  mb={8} alignItems="center" key={pref.id}>
          <Checkbox
            display="flex" alignItems='flex-start'
            isChecked={userPreferences.includes(pref.id)}
            spacing='1rem'
            onChange={handleCheckboxChange}
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
                    onChange={handleCheckboxChange}
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
