<p align="center">
  <img src="https://res.cloudinary.com/devsoncall/image/upload/v1634938051/okdoc-logo.png" alt="OkDoc! Logo" width="250" height="250">
</p>

# OK Doc (Back-End) &middot;

[![Maintainability](https://api.codeclimate.com/v1/badges/da64eedb7063496d7b74/maintainability)](https://codeclimate.com/github/Devs-On-Call/okdoc-backend/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/da64eedb7063496d7b74/test_coverage)](https://codeclimate.com/github/Devs-On-Call/okdoc-backend/test_coverage)

Healthcare Android app that helps you view your medical history and create appointments.

- See android app [here!](https://github.com/Devs-On-Call/okdoc-android)
- Check documentation [here!](https://documenter.getpostman.com/view/8654070/UUxxhUAL)

## Installation

- Clone the project.
- Install the dependencies: `npm install`

## How to run

- Start the app: `npm start`
- Or use `npm run dev` to run with nodemon (to refresh automatically)

## Tests

- Run all tests with: `npm test`
- Generate test coverage with: `npm run coverage`
- Run TSLint for all files: `tslint 'src/**/*.ts'`

## CICD

Every time a pull request opens:

- project gets tested and has its test coverage report sent to [Code Climate](https://codeclimate.com/github/Devs-On-Call/okdoc-backend) using Github Actions (with [this](.github/workflows/coverage-pr.yml) script),
- Code Climate tests the code for Duplication/Complexity/Maintainability issues,
- Heroku creates a review app.

When a pull request gets merged into main:

- using [this](.github/workflows/coverage-main.yml) script, a new test coverage report is created and sent to Code Climate,
- api gets deployed to Heroku.

## Credits

Made with ♥ by Devs On Call

**_Front-End &amp; Design_**

- Marina Kipourou
- Christodoulos Antoniou
- Efstratios Bekstasiadis

**_Back-End_**

- Elena Konstantinidi
- Mitrofanos Ntatidis

**_Full Stack &amp; DevOps_**

- Jim Skretas Kazakis

<p align="center">
  <img src="https://res.cloudinary.com/devsoncall/image/upload/v1634938059/devsoncall-logo.png" alt="DevsOnCall Logo" width="250" height="250">
</p>
