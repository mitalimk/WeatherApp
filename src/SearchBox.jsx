import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"
import { useState } from 'react';


export default function SearchBox({updateInfo}){
    let [city,setCity]=useState(""); 
    let [error,setError]=useState(false);
    const API_URL="https://api.openweathermap.org/data/2.5/weather";  
    const API_KEY="a4ef19ad1c7deb08116f63f7f0e9489c";

    async function getWeatherInfo(){
    try{
        let response= await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
       let jsonResponse=await response.json();
       console.log(jsonResponse);
       let result={
        city:city,
        temp:jsonResponse.main.temp,
        tempMin:jsonResponse.main.temp_min,
        tempMax:jsonResponse.main.temp_max,
        humidity:jsonResponse.main.humidity,
        feelslike:jsonResponse.main.feels_like,
        weather:jsonResponse.weather[0].description,
        timezone: jsonResponse.timezone, 
       };
       console.log(result);
       return result;
    }catch(err){
        throw err;
    }
       
    }
    function handleChange(event){
        setCity(event.target.value);
    }

    async function handleSubmit(event){
        try{
            event.preventDefault();
        console.log(city);
        setCity("");
        let newInfo=await getWeatherInfo();
       updateInfo(newInfo);
        }catch(err){
            setError(true);
        }
        
    }
    
    return(
        <div className="SearchBox">
            
            <form onSubmit={handleSubmit}>
            <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange}  />
            <br></br><br></br>
            <Button variant="contained" type='submit'  >Search</Button>
            <br></br><br></br>
            {error&& <p style={{color:"red"}}>No  such city exists in our API!</p>}
            </form>
        </div>
    );
} 