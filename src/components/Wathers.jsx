import React, { useState, useEffect } from 'react'
// import './Wather.css'
import axios from "axios";




const Wathers = () => {
    const [weatherData, setWeatherData] = useState({});    //wather data set karwa na ka lia usestate.
    const [searchInput, setSearchInput] = useState("");    //searchInput  set karwa na ka lia usestate.


    const watherapi = async (cityName) => {

        try {
            // console.log("cityName", cityName);

            const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=b4ea12680ea86cc7787edf4ed12f4461&units=metric`)

            console.log("data", data);  //data check karne ka lia ata hai ya nahi?
            setWeatherData(data.data)   // jo deta aa raha hai use set karwa ne ka lia.

        } catch (error) {
            console.log(error, "error");

        }

    };

    console.log("weatherData", weatherData.main);  //wather data check karne ka lia.









    // useEffect data 1 time render karwa ne kalia
    useEffect(() => {



        watherapi("karachi");     // function useEffect ka under call karwana.
    }, []);


    



    // input search ka lia callback function
    const handlerWeatherApi = (e) => {
        e.preventDefault();
        console.log("searchInput", searchInput);
        watherapi(searchInput);              // watherapi function ka under searchinput aa raha hai ya nahi check.
    };


// cloud change karna ka mlia..

    let emoji = null;
    if (typeof weatherData.main != "undefined"){
        if (weatherData.weather[0].main == "Clouds"){
            emoji = "fa-cloud"
        } else if (weatherData.weather[0].main == "Thunderstorm"){
            emoji = "fa-bolt"
        }
       else if (weatherData.weather[0].main == "Drizzle"){
            emoji = "fa-cloud-rain"
        }else if (weatherData.weather[0].main == "Rain"){
            emoji = "fa-cloud-rain"
        }else if (weatherData.weather[0].main == "Snow"){
            emoji = "fa-snow-flake"
        }else{ emoji = "fa-smog"
    }
    
    }else{
        return(
            <div>...Loading</div>
        )
    }
    




 //Date

 let d = new Date();
 let date = d.getDate();
 let year = d.getFullYear();
 let month = d.toLocaleString("default" , {month:'long'});
 let day = d.toLocaleString("default" , {weekday:'long'});


 // Time

 let time = d.toLocaleTimeString([],{
hour : '2-digit',
minute : '2-digit',
second : '2-digit',




 });


    return (


        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-4'>


                    <div class="card text-white font-bold text-center border-0">
                        <img src={`https://source.unsplash.com/600x900/?${weatherData.weather[0].main}`} class="card-img" alt="..." />
                        <div class="card-img-overlay">

                            {/* form & search bar */}
                            <form onSubmit={handlerWeatherApi}>
                                <div class="input-group mb-4 w-75 mx-auto pt-4">
                                    <input onChange={(e) => setSearchInput(e.target.value)} type="Search" class="form-control" placeholder="Search City" aria-label="Search City" aria-describedby="basic-addon2" />
                                    <button type='submit' class="input-group-text" id="basic-addon2">
                                        <i className='fas fa-search'></i>
                                    </button>
                                </div>

                            </form>


                            <div className='bg-dark bg-opacity-50 py-3'>

                                <h5 class="card-title">{weatherData?.name}</h5>
                                <p class="card-text lead">
                                    {day}, {month} {date}, {year}
                                    <br />
                                    {time}
                                    </p>
                                <hr />
                                <i className={`fas ${emoji} fa-4x`} ></i>
                                <h1 className='fw-bolder md-5'>{weatherData?.main?.temp}&deg;C</h1>
                                <p className='lead fw-bolder mb-0'>{weatherData?.weather && weatherData?.weather[0].main}</p>
                                <p className='lead fw-bolder pt-3'>{weatherData?.main?.temp_min}&deg;C || {weatherData?.main?.temp_max}&deg;C</p>
                            </div>

                        </div>
                    </div>





                </div>



            </div>
        </div>




        // {/* 
        // <Card className="bg-dark text-white">
        //       <Card.Img src="https://source.unsplash.com/600x1900/?nature,water" alt="Card image" />
        //       <Card.ImgOverlay>
        //         <Card.Title>Card title</Card.Title>
        //         <Card.Text>
        //           This is a wider card with supporting text below as a natural lead-in
        //           to additional content. This content is a little bit longer.
        //         </Card.Text>
        //         <Card.Text>Last updated 3 mins ago</Card.Text>
        //       </Card.ImgOverlay>
        //     </Card> */}



    )
}

export default Wathers
