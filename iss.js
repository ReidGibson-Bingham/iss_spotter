/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

/*
 request(`https://api.thecatapi.com/v1/${address}.`, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    const data = JSON.parse(body);
    console.log(data);
    console.log(typeof data);
    console.log(data[0]);// printing out the first entry in the data array for the user
    
  }); */
const request = require('request');
/*
let cmdLineIn = process.argv[2];

const fetchMyIP = function(callback) { 
  request(`${cmdLineIn}`, function(error, response, body) {
    if (error){
      callback(error, null);
      return;
    }
    let ip = JSON.stringify(body);
    if (ip) {
      callback(null, ip);
    } else {
      callback("no IP found");
    }
     // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  })
}

module.exports = { fetchMyIP };
*/


const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });
};

// Don't need to export the other function since we are not testing it right now.
module.exports = { fetchCoordsByIP }; 