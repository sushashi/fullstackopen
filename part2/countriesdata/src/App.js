import {useState, useEffect} from 'react'
import axios from 'axios'

const getData = () => {
  const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'
  const request = axios.get(url)
  return request.then(response => response.data) 
}

const api_key = process.env.REACT_APP_API_KEY

const App = () =>{
  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState([])
  const [listCountry, setListCountry] = useState([])
  const [filteredList, setFilteredList] = useState(listCountry)
  
  console.log("APIKEY",api_key)
  console.log("FILTERED LIST: ",filteredList)

  useEffect( () => {
    getData().then( d => {
      setData(d)
      setListCountry(d.map( list => list.name.common))
    })
  },[])

  const handleSearch = (event) => {
    event.preventDefault()
    setSearchValue(event.target.value)
    setFilteredList(listCountry.filter( country => country.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return(
    <div>
      <SearchBox value={searchValue} handleSearch={handleSearch} />
      <ListCountries filteredList={filteredList} data={data} />
    </div>
  )
}

const SearchBox = ({searchValue, handleSearch}) => {
  return(
    <div>
      find countries <input value={searchValue} onChange={handleSearch}></input>
    </div>
  )
}

const ListCountries = ({filteredList, data}) => {
  if (filteredList.length > 10){
    return "Too many matches, specify another filter"
  }

  if (filteredList.length === 1){
    const dataCountry = data.filter(d => d.name.common === filteredList[0])[0]
    console.log("DataCountry: ",dataCountry)
    return(
      <CountryDetail dataCountry={dataCountry} />
    )
  }

  return(
    <div>
      {filteredList.map(country => <CountryShowHide key={country} country={country} data={data} />)}
    </div>
  )
}

const CountryShowHide = ({country, data}) => {
  const [show, setShow] = useState(false)
  const dataCountry = data.filter(d => d.name.common === country)[0]

  const handleShow = () => {
    console.log("Click")
    setShow(!show)
  }
  console.log("CountryShowHide: ",{country}, {show})

  return(
    <div>
      {country}{' '}
      <button onClick={() => handleShow()}>{show ?  'Hide' : 'Show'}</button>
      {show? <CountryDetail dataCountry={dataCountry} /> : ""}
    </div>
  )
}

const CountryDetail = ({dataCountry}) => {
  return(
    <div>
    <h1>{dataCountry.name.common}</h1>
    <div>capital {dataCountry.capital}</div>
    <div>area {dataCountry.area}</div>
    <h2>languages:</h2>
    <ul>
      {Object.values(dataCountry.languages).map( l => <li key={l}>{l}</li>)}
    </ul>
    <img src={dataCountry.flags.png} alt={dataCountry.flags.alt}></img>

    <h2>Weather in {dataCountry.capital}</h2>
    <Weather dataCountry={dataCountry} />
  </div>
  )
}

const Weather = ({dataCountry}) =>{
  const [dataWeather, setDataWeather] = useState(null)
  console.log("dataCountry inside Weather: " , dataCountry)
 
  useEffect( () => {
    const lat = dataCountry.capitalInfo.latlng[0]
    const lng = dataCountry.capitalInfo.latlng[1]
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${api_key}`
    console.log(urlWeather)
    axios.get(urlWeather).then( (resp) => {
      setDataWeather(resp.data);
      console.log("DATA AXIOS: ", resp.data);
    })}
  ,[])

  console.log("DATA WEATHER ", dataWeather)
  if(!dataWeather){return null}

  const iconID = dataWeather.weather[0].icon
  const imgUrl = `https://openweathermap.org/img/wn/${iconID}@2x.png`

  return(
    <div>
      <div>temperature {dataWeather.main.temp} Celcius</div>
      <img src={imgUrl}></img>
      <div>wind {dataWeather.wind.speed} m/s</div>
      <p></p>
    </div>
  )
}

export default App;