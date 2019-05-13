# Metadata-Tagging-Mini
ONLY HAS IA for deployment purposes.
Work in progress.

This is application that creates, tags, edits, and exports audio metadata.

It is a redesigned, modernized version of [the website my company currently uses](http://www.dl-music.com) (written in PHP).

My goal was to recreate the functionality of the existing website from scratch, but in React and node.js instead of PHP.

The original site is over ten years old, and has been using the same MySQL database for the entirety of that period.

The application will not work without the database, but I will provide a very minified, condensed version of the database on the test site.

The data in the database is not necessarily sensitive, but I do not feel comfortable publicly providing it.

## Table of Contents

1.  [Documentation](#documentation)
    1.  [Installation](#installation)
    2.  [Running the Program](#runningtheprogram)
2.  [Built With](#builtwith)
3.  [Contributors](#contributors)
4.  [License](#license)

## [Documentation](#documentation)

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### [Installation](#installation)

Just install required npm dependencies

    npm install

### [Running the Program](#runningtheprogram)

    npm run start
    open localhost:8080 in your browser

## [Built With](#builtwith)

-   [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js, used to handle HTTP GET/POST requests
-   [React](https://github.com/facebook/react) - A declarative, efficient, and flexible JavaScript library for building user interfaces.
-   [Redux](https://github.com/reduxjs/redux) - Predictable state container for JavaScript apps
-   [Sass](https://github.com/sass/sass) - Sass makes CSS fun!

## [Contributors](#contributors)

-   **Cullan Shewfelt** - _Initial work_ - [Cullan Shewfelt](https://github.com/cullanshewfelt)

## [License](#license)

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
