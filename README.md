# greenfield-my-basket-diaries

This project is a web application for making diary entries about food. The diary entries are shared with everybody and can be added/deleted/edited (CRUD) on the website.

## Tech Stack

- Project Structure: Monolith/ MVC
- Programming Language: JavaScript
- Frontend Library: React
- Backend Framework: Node.js
- Database: PostgreSQL, Firebase (picture storage)
- Styling: CSS, MUI
- Build Tools: Vite
- Testing: Jest

## Installation

- Prerequisites: Firebase account (https://firebase.google.com/)
- Create a PostgreSQL database with the name: `cc_greenfield`
- Install dependencies
  - Server: `npm install`
  - Client: `npm install`
- Change `env.example` to `.env` and replace the placeholders

- Development:
  - Server: `npm run express-dev`
  - Client: `npm run dev`
  - Test: `npm test`

## Documentation

The backend utilizes the MVC (Model-View-Controller) structure.

Middlewares used:

- express.json: parsing incoming requests and responses
- cors: managing cross-origin requests and responses
- auth: protecting endpoints with JSON WEBTOKENS stored in LOCAL STORAGE

Model:

- Using Knex to connect to the PostgreSQL database

View:

- Login/Creating User endpoints
- The DIARY endpoints are all protected by the authentication middleware that utilizes the cookie session

Controller:

- Handling verification of requests like valid email or already existing users

Testing:


- For Testing, we use Jest to run tests for User creation. Further tests will be added soon.
- For Testing Login, there is a bug that the test is failing upon entering correct user data. This is not the case as it has been manually tested. We suspect some race condition happening in the Controller.

Front-end:

- We have used the Web bundler with Vanilla JavaScript and React.
- The application structure is the following:

```
Client
    -MAIN JSX
        -"/",LOGIN.jsx
        -"diary" , App.jsx
        -"*", Error.jsx

APP - Header - User profile
    - Dashboard - File Upload
                - Masonry
                    - Edit Modal
                    - Card
                        -Love
                        -EDIT
                        -DELETE

```

Styling:


- We are using a 3rd Party Library: Material-UI (MUI)
- Pre-built CSS components to style the pages
- You are able to configure the components: https://mui.com/

Additional Information:

- The backend follows the Model-View-Controller (MVC) architectural pattern, which separates the application logic into three interconnected components: the Model (data access layer), the View (user interface layer), and the Controller (application logic layer).
- The middleware functions are used to handle various tasks, such as session management, request parsing, CORS handling, and authentication.
- The Model layer uses Knex.js, a SQL query builder for Node.js, to interact with the PostgreSQL database.
- The View layer handles the rendering of the user interface, including the login/signup pages and the protected diary endpoints.
- The Controller layer manages the application logic, including user authentication and request validation.
- The testing framework used is Jest, which is a popular JavaScript testing framework.
- The front-end is built using React.js, a popular JavaScript library for building user interfaces, and Vanilla JavaScript for additional functionality.
- The application structure follows a standard React application structure, with separate components for different parts of the application.
- The styling is handled using Material-UI (MUI), a popular React UI framework that provides pre-built components and styles.
- The documentation mentions that you can configure the MUI components according to your needs by visiting the official MUI documentation.


## Acknowledgments

Special thanks to everybody at Code Chrysalis and

- **[Manu] (https://github.com/lmanul)**
- **[Chad](https://github.com/chadgrover)**
- **[Michael] (https://github.com/vyridian17)**

You have not only helped us solve difficult problems but also challenged us to aim higher to achieve more than we could have thought.

### Contributors

- **[Ter](https://github.com/DepartureLV)**
  - UI/UX Designer: Lead Frontend Engineer (Styling the website)
- **[Deana](https://github.com/deanachou)**
  - Product Owner: Frontend and Backend Engineer (Firebase setup)
- **[Dominik](https://github.com/dmnkvn)**
  - Tech Lead: Backend Implementation Engineer (User Verification)
- **[Jacob](https://github.com/Flumanuck)**
  -Additional Contributor: Full Stack Engineer (Displays IDs as avatar)
- **[Jarrod](https://github.com/J-Ariola)**
  -Additional Contributor: Front End Engineer (User Dashboard and Main Dashboard)
- **[Ning](https://github.com/NChang55)**
  -Additional Contributor: Front End + Firebase (Delete Entries from Firebase and favorite button on entries)

### Libraries and Packages

This project wouldn't be possible without the following open-source libraries and packages:

- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - A library for hashing passwords
- **[JSON Web Token (JWT)](https://github.com/expressjs/cookie-session)** - Local Storage Authentication for Sessions
- **[cors](https://github.com/expressjs/cors)** - A Node.js package for providing a Connect/Express middleware for handling CORS
- **[dotenv](https://github.com/motdotla/dotenv)** - A zero-dependency module for loading environment variables from a `.env` file
- **[express](https://expressjs.com/)** - A fast and minimalist web application framework for Node.js
- **[express-session](https://github.com/expressjs/session)** - Simple session middleware for Express
- **[knex](https://knexjs.org/)** - A SQL query builder for JavaScript
- **[lodash](https://lodash.com/)** - A modern JavaScript utility library delivering modularity, performance, and extras
- **[nodemon](https://nodemon.io/)** - A tool that automatically restarts the Node.js application when file changes are detected
- **[pg](https://node-postgres.com/)** - A non-blocking PostgreSQL client for Node.js
- **[validator](https://github.com/validatorjs/validator.js)** - A library for validating and sanitizing strings
- **[@emotion/react](https://emotion.sh/docs/introduction)** - A library for styling React components using CSS-in-JS
- **[@emotion/styled](https://emotion.sh/docs/@emotion/styled)** - A library for styling React components using tagged template literals
- **[@fontsource/roboto](https://github.com/fontsource/fontsource)** - Self-hosted Open Source fonts
- **[@mui/icons-material](https://mui.com/material-ui/icons/)** - Material Design icons from the official Google Material Design library
- **[@mui/material](https://mui.com/material-ui/getting-started/installation/)** - React components for faster and easier web development with Material Design
- **[firebase](https://firebase.google.com/)** - A comprehensive app development platform from Google
- **[localforage](https://github.com/localForage/localForage)** - An offline storage library for Progressive Web Apps
- **[match-sorter](https://github.com/kentcdodds/match-sorter)** - A library for sorting and filtering data in React applications
- **[react](https://reactjs.org/)** - A JavaScript library for building user interfaces
- **[react-dom](https://reactjs.org/docs/react-dom.html)** - The entry point to the React library for web applications
- **[react-router-dom](https://reactrouter.com/web/guides/quick-start)** - A routing library for React applications
- **[sort-by](https://github.com/kvnneff/sort-by)** - A utility for sorting arrays of objects or arrays of arrays

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
