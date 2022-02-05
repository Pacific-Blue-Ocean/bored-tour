![image](https://user-images.githubusercontent.com/32132177/152610003-514ab037-6384-4b64-83bd-3da3670a0b37.png)

# Bored Tour
Fullstack application to help people find things to do with their time. Features allow users to discover events:
- Browse events and refine by searching or filtering by date, duration, or category.
- See event details including location and map.
- Create an account to RSVP to events and add/invite friends.
- Fill out a preferences survey to record their interests.
- Browse events in a mobile-friendly interface.

## Setup
1. Install dependencies:
```
npm install
```
2. Setup Postgres database to match settings in `/database/index.js`.
3. Copy `.env.example`, rename the copy to `.env`, and fill in the environment variables.
4. Copy `config.example.js`, rename the copy to `config.js`, and fill in the [Firebase config](https://firebase.google.com/docs/web/setup).
5. Run `bash schema.sh` to create and populate the database schemas.
6. Build scripts:
```
npm run build
```
7. Start the server:
```
npm start
```
8. Open the site:
```
http://localhost:3000
```

## Dependencies
- [React](https://reactjs.org)
- [Router](https://reactrouter.com)
- [react-day-picker](https://react-day-picker.js.org/)
- [Geocode](https://github.com/shukerullah/react-geocode)
- [Chakra UI](https://chakra-ui.com)
- [Moment.js](https://momentjs.com)
- [Axios](https://axios-http.com)
- [Node.js](https://nodejs.org/en) / [Express](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org)
- [Firebase](https://firebase.google.com)
- [Webpack](https://webpack.js.org) / [Babel](https://babeljs.io)

## Team
- [Andrew Lam](https://github.com/awhlam)
- [Cat Chiu](https://github.com/the-trash-panda)
- [Eric Baldwin](https://github.com/EricBaldwinn)
- [Nanda Silva](https://github.com/fernanda1411)
- [Sean Welch](https://github.com/seanpwelch90)
- [Yulan Rong](https://github.com/yulanrong)
