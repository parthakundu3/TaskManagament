// import axios from 'axios';

// const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

// let baseURL = "https://localhost:7128/api"
// if (!development)
//     baseURL = "https://basicemployeedirectorywebapi.azurewebsites.net/api"


// export default axios.create({
//     baseURL
// });
'use client';
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  headers: {
    "Content-type": "application/json"
  }
});