# Threader

Turn twitter threads into readable article like format. [Available here](https://appthreader.herokuapp.com)

### How to use

Paste link of the topmost tweet of a thread (from last 7 days, twitter restriction for standard dev accounts) and it will generate the whole thread in a readable format.

### If you're interested in testing locally

Pre-requisites:
- NodeJS
- A twitter dev account with a token. [Get that here](https://developer.twitter.com/en)

Steps:
- Clone the repo and check into the `threader` directory
- install the relevant packages by `npm install`
- Replace `token` in `linkOperations.js` with your own token
- `node server.js`
- `cd client/`
- `npm install` Yea, again.
- `npm start` and it should fire up at localhost:3000.

### Improvements to add
- [ ] Fix how links embedded in tweet display
- [ ] Save as PDF
- [ ] Save as HTML
