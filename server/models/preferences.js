const db = require('../../database');

const getSurvey = () => {
  const query = `select * from steps`;

  // return db.pool.query(query);

  // Sample response
  return [
    {
      stepId: 1,
      label: 'About Me',
      description: 'What best describes you?',
      options: [
        {optionId: 1, parentId: null, label: 'Students', description: 'Teens in the summer or college students looking for a weekend activity with friends'},
        {optionId: 2, parentId: null, label: 'Young Adults', description: 'People at a new city or those looking to spice up their day to day'},
        {optionId: 3, parentId: null, label: 'Empty Nesters', description: 'Parents who no longer have the responsibility of kids and want a new hobby'},
      ]
    },
    {
      stepId: 2,
      label: 'My Interests',
      description: 'What type of activities are you interested on?',
      options: [
        {optionId: 4, parentId: null, label: 'Outdoor - Active', description: null},
        {optionId: 5, parentId: 4, label: 'Sports leagues and/or places to play', description: null},
      ]
    },
    {
      stepId: 3,
      label: 'My Location',
      description: 'Where would you like to go out?',
      options: []
    },
  ];
}

const postUserPreferences = (preferences) => {
  // TODO
}

module.exports = {
  getSurvey,
  postUserPreferences
};