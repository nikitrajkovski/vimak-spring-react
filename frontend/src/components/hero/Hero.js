import React from 'react';
import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import Logo from './Logo.js'
import Navbar from './navbar.js'
import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from '@vis.gl/react-google-maps'
import {useState, useEffect} from 'react'
import api from '../../api/axiosConfig';
import Geolib, { getDistance, convertDistance } from 'geolib';
import Najavabar from './najavabar.js'


const Hero = ({ wines }) => {

  const position = {lat: 41.636651020816515, lng: 21.72026578777255};
  const tikves = {lat: 42.00176326587181, lng: 21.468508269030572};
  const sopot = {lat:41.777891885819265, lng:21.741537467168268};
  const stobi = {lat:41.58130479925723,lng: 21.93675240948636}
  const bovin = {lat:41.517200004027046,lng: 22.034712484348077}
  const ezimit = {lat:41.775636781461, lng:22.181484776960062}
  const dalvina = {lat:41.490102841175485, lng:22.74552097455473}
  const Kamnik = {lat:42.00897867805951, lng:21.495899220670854}
  const Popov = {lat: 41.491712673454124, lng: 22.022133615033066}
  const rigo = {lat: 41.27187451496179, lng: 20.706775745697485}
  const Puklavec =  {lat: 42.01253098772045, lng:21.410135013209953}
  const Movino ={lat:41.52159679357502, lng:21.96539342852718}
  const Venec ={lat:41.43396027660053,lng: 22.093714286194047}
  const GD  ={lat:41.478025413394754, lng: 21.932105225792785}

  
  const [winery, setWinery] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userDistance, setUserDistance] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);


  const fetchVine = async (id, wineryLocation) => {
      try {

        const response = await api.get(`/api/v1/winery/${id}`);
        const selectedWinery = response.data;
        setWinery(selectedWinery);
        console.log(selectedWinery)
        console.log('User Location:', userLocation);
        console.log('Winery Location:', wineryLocation);

        const distance = calculateDistance(userLocation, wineryLocation);
        setUserDistance(distance);
        console.log(distance);
      } 
      catch(err) {
        console.log(err);
      }
    }


    useEffect(() => {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setUserLocation(location);
            setLoadingLocation(false); // Set loading to false once location is retrieved
          },
          (error) => {
            console.error("Error getting user location:", error);
            setLoadingLocation(false); // Set loading to false in case of error
          }
        );
      }
    }, []);

    if (loadingLocation) {
      return <div>Loading...</div>;
    }

const calculateDistance = (from, to) => {
  const distanceInMeters = getDistance(from, to);
  const distance = convertDistance(distanceInMeters, 'km');
  return distance;
};


  return (
    <div className='wine-carousel-container'>
      <Navbar/>
      <Carousel indicators={false}>
        {wines && wines.filter((_, index) => index%11===0).map((wine, index) => (
          <Paper key={wine.id}>
            <div style={{display:'flex',justifyContent:"center",alignContent:"center",backgroundColor:"#e6e5d8",height:"4em"}}>
              <h1 style={{fontStyle:"italic", color:"#bc4448"}}>Вина на акција</h1>
            </div>
            <div className='wine-card-container'>
              
                  <div className="wine-poster">
                    <img src={wine.wine_url} />
                  </div>
                  <div className="wine-info">
                    <div className={`wine-name ${wine.wine_type === 'White' ? 'white-wine' : wine.wine_type === 'Rose' ? 'rose-wine' : 'red-wine'}`}>
                    <span className="winfo" style={{fontSize:"1.5em"}}>Вино: </span> <span style={{fontSize:"2em"}}>{wine.wine_name}</span>
                    </div>
                    <div className={`wine-type ${wine.wine_type === 'White' ? 'white-wine' : wine.wine_type === 'Rose' ? 'rose-wine' : 'red-wine'}`}>
                    <span className="winfo" style={{fontSize:"1.5em"}}>Тип на вино: </span> <span style={{fontSize:"2em"}}>{wine.wine_type}</span>
                    </div>
                    <div className={`wine-name ${wine.wine_type === 'White' ? 'white-wine' : wine.wine_type === 'Rose' ? 'rose-wine' : 'red-wine'}`}>
                    <span className="winfo" style={{fontSize:"1.5em"}}>Тип на гројзе: </span> <span style={{fontSize:"2em"}}>{wine.grape_used}</span>
                    </div>
                    <div className={`wine-year ${wine.wine_type === 'White' ? 'white-wine' : wine.wine_type === 'Rose' ? 'rose-wine' : 'red-wine'}`}>
                    <span className="winfo" style={{fontSize:"1.5em"}}>Година на производство: </span> <span style={{fontSize:"2em"}}>{wine.wine_year}</span>
                    </div>
                    <div className={`wine-price ${wine.wine_type === 'White' ? 'white-wine' : wine.wine_type === 'Rose' ? 'rose-wine' : 'red-wine'}`}>
                      <span className="winfo" style={{fontSize:"1.5em"}}>Цена на виното: </span> <span style={{fontSize:"2em"}}>{wine.wine_price}</span>
                    </div>
                    <div className={`wine-rating ${wine.wine_type === 'White' ? 'white-wine' : wine.wine_type === 'Rose' ? 'rose-wine' : 'red-wine'}`}>
                    <span className="winfo" style={{fontSize:"1.5em"}}>Рејтинг за виното: </span> <span style={{fontSize:"2em"}}>{wine.wine_rating}</span>
                    </div>
                    <div className={`wine-winery ${wine.wine_type === 'White' ? 'white-wine' : wine.wine_type === 'Rose' ? 'rose-wine' : 'red-wine'}`}>
                    <span className="winfo" style={{fontSize:"1.5em"}}>Винарија: </span> <span style={{fontSize:"2em"}}>{wine.winery}</span>
                    </div>
                  </div>
            </div>

          </Paper>
          
        ))}
      </Carousel>
      <hr/>
      <div className='map'>
                <div className="searchBar" style={{paddingLeft:"1.7em"}}>
                  {/* <TextField style={{width:'99%', marginBottom:"7em"}} label={'Пребарај'} id="margin-normal" margin="normal" variant="filled" /> */}
                  <div className="vinarijai" >
                      <span className="winfo" style={{fontSize:"1.5em"}}>Винарија: </span> <span style={{fontSize:"1.7em"}}>{winery.winery_name}</span>
                  </div>
                  <div className="vinarijai">
                      <span className="winfo" style={{fontSize:"1.5em"}}>Локација на винаријата: </span> <span style={{fontSize:"1.7em"}}>{winery.winery_location}</span>
                  </div>
                  <div className="vinarijai">
                      <span className="winfo" style={{fontSize:"1.5em"}}>Рејтинг за винаријата: </span> <span style={{fontSize:"1.7em"}}>{winery.winery_rating}</span>
                  </div>
                  <div className="vinarijai">
                      <span className="winfo" style={{fontSize:"1.5em"}}>Оддалеченост од винаријата: </span> <span style={{fontSize:"1.7em"}}>{userDistance}</span>
                  </div>
                </div>
                <div className="delzamapa">
                  <APIProvider apiKey={'AIzaSyAu016zEmkbzV4rr-L_VFVKvUc2CLBE-t4'}>
                      <Map center={position} zoom={9} style={{width: '900px', height:'600px'}} mapId="7d2c71925b05302f">
                      <AdvancedMarker position={userLocation}>
                          <Pin
                            background={"blue"}
                            borderColor={"blue"}
                            glyphColor={"blue"}
                          />
                        </AdvancedMarker>
                        <AdvancedMarker position={tikves} onClick={()=>fetchVine('656cd487b5000e83e49308be', tikves)}>
                          <Pin
                            background={"red"}
                            borderColor={"red"}
                            glyphColor={"pink"}
                          />
                        </AdvancedMarker>
                        <AdvancedMarker position={sopot} onClick={()=>fetchVine('656cd487b5000e83e49308bf', sopot)}>
                          <Pin
                            background={"red"}
                            borderColor={"red"}
                            glyphColor={"pink"}
                          />
                        </AdvancedMarker>
                        <AdvancedMarker position={stobi} onClick={()=>fetchVine('656cd487b5000e83e49308c0', stobi)}>
                          <Pin
                            background={"red"}
                            borderColor={"red"}
                            glyphColor={"pink"}
                          />
                        </AdvancedMarker>
                        <AdvancedMarker position={bovin} onClick={()=>fetchVine('656cd487b5000e83e49308c1', bovin)}>
                          <Pin
                            background={"red"}
                            borderColor={"red"}
                            glyphColor={"pink"}
                          />
                        </AdvancedMarker>
                        <AdvancedMarker position={ezimit} onClick={()=>fetchVine('656cd487b5000e83e49308c2', ezimit)}>
                          <Pin
                            background={"red"}
                            borderColor={"red"}
                            glyphColor={"pink"}
                          />
                        </AdvancedMarker>
                        <AdvancedMarker position={dalvina} onClick={()=>fetchVine('656cd487b5000e83e49308c3', dalvina)}>
                          <Pin
                            background={"red"}
                            borderColor={"red"}
                            glyphColor={"pink"}
                          />
                        </AdvancedMarker>
                        <AdvancedMarker position={Kamnik} onClick={()=>fetchVine('656cd487b5000e83e49308c4', Kamnik)}>
                          <Pin
                            background={"red"}
                            borderColor={"red"}
                            glyphColor={"pink"}
                          />
                        </AdvancedMarker>
                        <AdvancedMarker position={Popov} onClick={()=>fetchVine('656cd487b5000e83e49308c5', Popov)}>
                          <Pin
                            background={"red"}
                            borderColor={"red"}
                            glyphColor={"pink"}
                          />
                        </AdvancedMarker>
                        <AdvancedMarker position={rigo} onClick={()=>fetchVine('656cd487b5000e83e49308c6', rigo)}>
                          <Pin
                            background={"red"}
                            borderColor={"red"}
                            glyphColor={"pink"}
                          />
                        </AdvancedMarker>
                        <AdvancedMarker position={Puklavec} onClick={()=>fetchVine('656cd487b5000e83e49308c7', Puklavec)}>
                          <Pin
                            background={"red"}
                            borderColor={"red"}
                            glyphColor={"pink"}
                          />
                        </AdvancedMarker>
                        <AdvancedMarker position={Movino} onClick={()=>fetchVine('656cd487b5000e83e49308c8', Movino)}>
                          <Pin
                            background={"red"}
                            borderColor={"red"}
                            glyphColor={"pink"}
                          />
                        </AdvancedMarker>
                        <AdvancedMarker position={Venec} onClick={()=>fetchVine('656cd487b5000e83e49308c9', Venec)}>
                          <Pin
                            background={"red"}
                            borderColor={"red"}
                            glyphColor={"pink"}
                          />
                        </AdvancedMarker>
                        <AdvancedMarker position={GD} onClick={()=>fetchVine('656cd487b5000e83e49308ca', GD)}>
                          <Pin
                            background={"red"}
                            borderColor={"red"}
                            glyphColor={"pink"}
                          />
                        </AdvancedMarker>
                      </Map>
                  </APIProvider>
                </div>

            </div>
            <hr/>
            <div className="footer">
                    <div className="f1">
                        <div id="kontakt">Контакт:</div>
                        <div className='kf1'>Е-пошта: vimak@vimak.com</div>
                        <div className='kf1'>Телефон: 070/000-000</div>
                        <br></br>
                        <div>Сите права се задржани</div>
                    </div>
                    <div className="f2">
                      <div className='f2Logo'>
                            <Logo/>
                          </div>
                    </div>
                    <div className="f3">
                    <br/>
                        <div id="politika">Политика на приватност</div>
                        <div>Услови за купување</div>
                    </div>
                </div>
    </div>
    
  );
};

export default Hero;