const axios =  require("axios");

    // First, we grab the body of the html with axios
const getStations = () => {
    return axios.get("http://mtaapi.herokuapp.com/stations")
};

const getStationById = (id) => {
    return axios.get("http://mtaapi.herokuapp.com/stop?id=" + id)
};

const getArrivalsTimesById = (id) => {
    return axios.get("http://mtaapi.herokuapp.com/api?id=" + id)
};

const getArrivalsByTime = (hr, min) => {
    return axios.get("http://mtaapi.herokuapp.com/times?hour=" + hr + "&minute=" + min)
};


module.exports = {
    getStations: getStations,
    getStationById: getStationById,
    getArrivalsTimesById: getArrivalsTimesById,
    getArrivalsByTime: getArrivalsByTime
}
