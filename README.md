# Bored Tour
Helping people find things to do with their time.

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

## Team
- Andrew Lam
- Cat Chiu
- Eric Baldwin
- Nanda Silva
- Sean Welch
- Yulan Rong