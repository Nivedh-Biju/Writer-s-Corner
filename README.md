# Writer's Corner

Writer's Corner is a multi-user website that enables multiple users to post and read stories. The platform integrates an administration workflow and leverages the OpenAI API to enhance the overall user experience.

## Features

- **Multi-User Platform**: Allows multiple users to create accounts, share their stories, and engage with other users' content.

- **Administration Workflow**: Implements a robust administration workflow to manage user accounts, content moderation, and overall site administration.

- **OpenAI API Integration**: Utilizes the OpenAI API to enhance the storytelling experience, providing intelligent suggestions, or other features that leverage natural language processing.

## Usage

run the app.js file or "npm start" in the file directory

# DOCUMENTATION
 - **tech stact used**: Express.js, MongoDB, Nodejs
## server

- The models file contains the mongodb schema for post and user data
- The database configuration is present in 'config'
- The GET and POST methods for each page is in the respective page's JS file in the 'routes' file

## views

- The ejs flies are present in this folder andd are called for rendering in the app.js file
- The partials contains header, footer and other constant parts of all pages
- 'master' and 'admin' files contains the ejs header, footer and other constants for their respective pages.


