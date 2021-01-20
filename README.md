# Softwarely internship recruitment task

This is my solution for Softwarely front-end internship recruitment task. The problem was to create accordion-like list, that would be fed data from JSON format, had to manage arbitrary number of nestings, and implement two types of cards: checkboxes and radios. The behaviour is same as HTML's radio/checkbox input, but with small difference, in this app you can uncheck (close) radio button.

The JSON file structure is as follows: 
node: 
{
    "name": *Will be shown in header*
    "type": < "radio" | "checkbox" | none >, 
            *Determines type of card. If ommited, will use name as header and only show message."*
    "subNodes": [ nodes ]
                *Contains all child nodes, which are the same shape as parent.*
}

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

