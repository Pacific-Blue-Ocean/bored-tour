# Bored Tour
Helping people find things to do with their time.

## Setup
1. Install dependencies:
```
npm install
```
2. Setup Postgres database to match settings in `/database/index.js`.
3. Copy `.env.example`, rename the copy to `.env`, and fill in the environment variables.
4. Build scripts:
```
npm run build
```
5. Start the server:
```
npm start
```
6. Open the site:
```
http://localhost:3000
```

## Team
- Andrew Lam
- Cat Chiu
- Eric Baldwin
- James Song
- Nanda Silva
- Sean Welch
- Yulan Rong

## Note
To access the google map content, you need a Googlemap API key, store your API key as:
module.exports = {
  GOOGLE_API: your key,
};
then name it '.googleConfig.js'. Now you can access the map.