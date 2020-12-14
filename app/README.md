# NOTE

I used a new UserList data structure to optimize and improve the behavior of immer patches.
The json-server does not work well with non array data structure thus not all the REST APIs provided by the json-server have the expected behaviour.

It's fine in the end because I just wanted to play a bit with Immer patches


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

before running the command you have to start the JSON-server:
```sh
json-server --watch ./mock/db.json -p 3004
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Some unit test coverage provided for actions and reducers.

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run cypress`
Some end2end test coverage provided.
before running the command evetually reset the JSON server to default values by running:
```sh
npm run test:reset-mocks
```


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

 


