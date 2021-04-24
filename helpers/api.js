const axios = require("axios");

// First, we grab the body of the html with axios
const getStations = () => {
  return axios.get("http://mtaapi.herokuapp.com/stations");
};

const getStationById = (id) => {
  return axios.get("http://mtaapi.herokuapp.com/stop?id=" + id);
};

const getArrivalsTimesById = (id) => {
  return axios.get("http://mtaapi.herokuapp.com/api?id=" + id);
};

const getArrivalsByTime = (hr, min) => {
  return axios.get(
    "http://mtaapi.herokuapp.com/times?hour=" + hr + "&minute=" + min
  );
};


const fixArrivals = (arrivals, currentTime) => {
  arrivals = arrivals.arrivals;
  let nextTwoHours = [];
  arrivals.forEach((element) => {
    let el = element.split(":");
    if (currentTime[0] <= el[0] && el[0] < parseInt(currentTime[0]) + 2) {
      nextTwoHours.push(el.join(":"));
    }
  });

  let len = nextTwoHours.length;
  for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
          if (nextTwoHours[j] && nextTwoHours[j+1] && nextTwoHours[j].split(":")[0] > nextTwoHours[j + 1].split(":")[0]) {
              let tmp = nextTwoHours[j];
              nextTwoHours[j] = nextTwoHours[j + 1];
              nextTwoHours[j + 1] = tmp;
          }
      }
  }
  var chunkLength = Math.max(nextTwoHours.length / 2, 1);
  var chunks = [];
  for (var i = 0; i < 2; i++) {
    if (chunkLength * (i + 1) <= nextTwoHours.length)
      chunks.push(nextTwoHours.slice(chunkLength * i, chunkLength * (i + 1)));
  }
  return chunks;
};

module.exports = {
  getStations: getStations,
  getStationById: getStationById,
  getArrivalsTimesById: getArrivalsTimesById,
  getArrivalsByTime: getArrivalsByTime,
  fixArrivals: fixArrivals,
};
