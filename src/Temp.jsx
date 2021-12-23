import React, { useState, useEffect } from "react";
import "./style.css";
import Weathercard from "./Weather";

const Temp = () => {
    const [searchValue, setSearchValue] = useState( "london" );
    const [tempInfo, setTempInfo] = useState({});


    //get the weather info
    const getWeatherInfo  = async() => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=0c22c302c06d4fe43199e10e2a97de92`;

            const res = await fetch(url);
            const data = await res.json();

            const {temp, humidity, pressure, temp_min, temp_max} = data.main;
            console.log(temp);
            const {main: weathermood} = data.weather[0];
            const {name} = data;
            const  {speed} = data.wind;
            const {country, sunset} = data.sys;

            const myWeatherInfo = {
                temp,humidity, pressure , weathermood, name, speed, country, sunset,temp_min, temp_max
            };

            setTempInfo(myWeatherInfo);

            console.log(data);
        }
        catch(error){
            console.log(error);
        }
    };

    //change the weather info after rendering
    useEffect(() => {
         getWeatherInfo();
        
    }, []);


    return (
        <>
            <div className = "wrap">
                {/* for Search */}
                <div className = "search">
                    <input type = "search"
                     placeholder = "search..."
                      autoFocus
                      id= "search" 
                      value = { searchValue}
                      onChange = {(e) => setSearchValue(e.target.value)}
                      className = "searchTerm"/>

                    <button className = "searchButton" 
                    type = "button" 
                    onClick = {getWeatherInfo}>Search</button>
                </div>
            </div>
            
            {/* weather info component */}
            <Weathercard {...tempInfo}/>
        </>
    )
};

export default Temp;