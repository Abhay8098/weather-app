import React, { useState } from 'react'
import { useEffect } from 'react'
import './weatherApp.css'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

function WeatherApp() {
 
  //<<---- state to store the location--->>
  var[locationData,setLocation]=useState('')
  var[error,setError]=useState('')
  var [print,setPrint]=useState('')

  // <<----------Function to search the city-------------->>
  const search=(event)=>{
    if(event.key!=='Enter'){
      return 
    }
    else{
      var inpVal=document.getElementById('search-box').value.toLowerCase();
      if(inpVal!==''){
        axios(`https://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=${inpVal}`)
      .then(rel=>rel.data)
      .then(data=>setLocation(data))
      .catch(err=>setError(err))
      }
    }
  }

  // <<-----------for current ip when application load-------->>
  useEffect(()=>{
    axios(`https://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=auto:ip`)
    .then(rel=>rel.data)
    .then(data=>setLocation(data))
    
  },[])

// <<===========UseEffect Starts here=============>>
// <<-----------rerender the searched location------------->>
    useEffect(() => {
      if(locationData!==''){
    let theme=locationData.current.condition.text.toLowerCase();
      var imageUrl='';
      // <<---------printing the searched data--------->>
      setPrint(
        <div className='display'>
          <h3>{locationData.location.name} ,{locationData.location.country}</h3>
         
          <span id='spn'>
             <p style={{fontSize:"5vw",fontWeight:"2500px"}}>{locationData.current.temp_c} °C</p>
             &emsp;
              <p><img src={locationData.current.condition.icon}alt=''style={{height:"6vw"}}/></p>         
          </span>

          <p>{locationData.current.condition.text} </p>
          <p style={{fontSize:"1.5vw"}}>{locationData.location.localtime}</p>
        </div>
      )
        // <<-------------changing the theme----------------->>
        if(theme.indexOf('mist')>-1||theme.indexOf('fog')>-1)
          imageUrl='https://images5.alphacoders.com/387/387477.jpg'
        else if(theme.indexOf('cloud')>-1||theme.indexOf('overcast')>-1)
          imageUrl='https://thelivenagpur.com/wp-content/uploads/2020/02/cloudy.jpg'
         else if(theme.indexOf('sun')>-1)
          imageUrl='https://cdn.wallpapersafari.com/72/23/95A6Gz.jpg'
          else if(theme.indexOf('rain')>-1||theme.indexOf('drizzle')>-1)
          imageUrl='https://d2908q01vomqb2.cloudfront.net/9e6a55b6b4563e652a23be9d623ca5055c356940/2021/08/17/rain-weather-radar-atmosphere-asdi-open-data-1200x600-1.jpg'
          else if(theme.indexOf('snow')>-1)
          imageUrl='https://images.unsplash.com/photo-1418985991508-e47386d96a71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c25vd3xlbnwwfHwwfHw%3D&w=1000&q=80'
          else if(theme.indexOf('clear')>-1)
          imageUrl=' https://www.rd.com/wp-content/uploads/2018/09/How-Every-State-Got-its-Nickname-34-e1577982439510.jpg?fit=700,474'
         
        document.body.style.background=`url(${imageUrl})`
        document.body.style.backgroundRepeat='no-repeat'
        document.body.style.backgroundSize='100vw 100vh'

      }

      // <<------------error message---------------->>
      else if(error!==''){
        setPrint(
          <h2 style={{marginTop:"2%",color:"white",textAlign:"center"}}> *Enter the correct location</h2>
        )

        // <<---------theme in error---------------->>
        imageUrl='https://static.s4be.cochrane.org/app/uploads/2017/04/shutterstock_531145954.jpg'
       let theme="err"
        if(theme==="err"){
          document.body.style.background=`url(${imageUrl})`
        document.body.style.backgroundRepeat='no-repeat'
        document.body.style.backgroundSize='100vw 100vh'

        }
      }
      setError('')
      setLocation('')
    },[locationData,error])
// <<===========UseEffect ends here=============>>

    
  return (
       <>
       {/* <<-----main body of page -------->> */}
        <div className='main'>
        <h1>Weather App</h1>
        <input type="text" id='search-box' autoFocus placeholder='Enter your City Name' onKeyPress={search}/> 
       <button type='submit' id="search-btn" name="srch" onClick={search}><SearchIcon fontSize="2vw"/></button>
       <div id='display'>
       {print}
       </div>
        </div>
       </>
  )
}

export default WeatherApp