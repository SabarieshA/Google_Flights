import React, { useState, useEffect } from "react";
import { Box, TextField, Button, MenuItem, IconButton, InputAdornment, } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ApiService from '../services/Api.service';

import Autocomplete from '@mui/material/Autocomplete';
import top100Films from './top100Films';

const FlightSearch = () => {
  const [tripType, setTripType] = useState("Round trip");
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("2025-02-03");
  const [returnDate, setReturnDate] = useState("2025-02-28");
  const [airportDetails, setAirportDetails] = useState([]);

  const [orginSkyId, setOrginSkyId] = useState(null);
  const [orginEntityId, setOrginEntityId] = useState(null);

  const [destinationSkyId, setDestinationSkyId] = useState(null);
  const [destinationEntityId, setDestinationEntityId] = useState(null);

  const [location, setLocation] = useState(null);


  useEffect(() => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }

    // getNearByAirports();
  }, []);

  const searchAirports = async (event, origin) => {
    debugger;
    const searchQuery = event;


    const airportDetails = await ApiService.httpGet(`/api/v1/flights/searchAirport?query=${searchQuery}&locale=en-US`);
    if (origin === "from") {
      setOrginSkyId(airportDetails.data[0].skyId);
      setOrginEntityId(airportDetails.data[0].entityId);
    }
    else if (origin === "to") {
      setDestinationSkyId(airportDetails.data[0].skyId);
      setDestinationEntityId(airportDetails.data[0].entityId);
    }
  }

  const success = async (position) => {
    debugger;
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });

    if (latitude && longitude) {
      const airportDetails = await ApiService.httpGet(`/api/v1/flights/getNearByAirports?lat=${latitude}&lng=${longitude}&locale=en-US`);
      airportDetails.data.current.label = airportDetails.data.current.navigation.localizedName + " " + airportDetails.data.current.skyId
      for (let i = 0; i < airportDetails.data.nearby.length; i++) {
        airportDetails.data.nearby[i].label = airportDetails.data.nearby[i].presentation.suggestionTitle
      }
      setAirportDetails(airportDetails.data);
    }
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "white",
        alignItems: "center",
      }}
    >
      {/* Trip Type Dropdown */}
      <TextField
        select
        value={tripType}
        onChange={(e) => setTripType(e.target.value)}
        size="small"
      >
        <MenuItem value="Round trip">Round trip</MenuItem>
        <MenuItem value="One way">One way</MenuItem>
      </TextField>

      {/* Passengers Dropdown */}
      <TextField
        select
        value={passengers}
        onChange={(e) => setPassengers(e.target.value)}
        size="small"
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <MenuItem key={num} value={num}>
            {num}
          </MenuItem>
        ))}
      </TextField>

      {/* Class Dropdown */}
      <TextField
        select
        value={travelClass}
        onChange={(e) => setTravelClass(e.target.value)}
        size="small"
      >
        <MenuItem value="Economy">Economy</MenuItem>
        <MenuItem value="Business">Business</MenuItem>
        <MenuItem value="First Class">First Class</MenuItem>
      </TextField>

      {/* From Input */}
      <Autocomplete
        disablePortal
        options={airportDetails?.nearby}
        size="small"
        sx={{ width: 300 }}
        onChange={(e) => { searchAirports(e.target.value, "from") }}
        renderInput={(params) => <TextField {...params} label="Where from?" />}
      />

      {/* Swap Button */}
      <IconButton>
        <SwapHorizIcon />
      </IconButton>

      {/* To Input */}
      {/* <TextField
        placeholder="Where to?"
        value={to}
        onChange={(e) => { setTo(e.target.value); searchAirports(e.target.value, "to") }}
        size="small"
        InputProps={{
          startAdornment: <InputAdornment position="start">📍</InputAdornment>,
        }}
      /> */}

      <Autocomplete
        disablePortal
        options={airportDetails?.nearby}
        size="small"
        sx={{ width: 300 }}
        onChange={(e) => { searchAirports(e.target.value, "from") }}
        renderInput={(params) => <TextField {...params} label="Where to?" />}
      />

      {/* Departure Date */}
      <TextField
        type="date"
        value={departureDate}
        onChange={(e) => setDepartureDate(e.target.value)}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarTodayIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Return Date */}
      <TextField
        type="date"
        value={returnDate}
        onChange={(e) => setReturnDate(e.target.value)}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarTodayIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Explore Button */}
      <Button variant="contained" startIcon={<SearchIcon />}>
        Explore
      </Button>
    </Box>
  );
};

export default FlightSearch;
