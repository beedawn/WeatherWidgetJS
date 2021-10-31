import "./App.css";
import React, { useEffect, useState } from "react";
import Weather from "./components/weather";
import { Dimmer, Loader } from "semantic-ui-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(setLat(position.coords.latitude));
        setLong(position.coords.longitude);
      });
      await fetch(
        `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
        });
    };
    fetchData();
  }, [lat, long]);
  if (typeof data.main != "undefined") {
    
    switch (data.weather[0].main) {
      case "Clouds":
        {
          document.body.style.backgroundImage =
            "url('https://bee.surf/weatherapp/img/clouds.jpg')";
            document.body.style.backgroundSize= 'cover';
        }
        break;
      case "Thunderstorm":
        {
          document.body.style.backgroundImage = "url('https://bee.surf/weatherapp/img/thunderstorm.jpg')";
        }
        break;
      case "Drizzle":
        {
          document.body.style.backgroundImage = "url('https://bee.surf/weatherapp/img/drizzle.jpg')";
        }
        break;
      case "Rain":
        {
          document.body.style.backgroundImage = "url('https://bee.surf/weatherapp/img/rain.jpg')";
        }
        break;
      case "Snow":
        {
          document.body.style.backgroundImage = "url('https://bee.surf/weatherapp/img/snow.jpg')";
        }
        break;
      case "Clear":
        {
          document.body.style.backgroundImage = "url('https://bee.surf/weatherapp/img/clear.jpg')";
        }
        break;
      default:
        break;
    }
    return (
      <div className="App">
        {console.log(data.weather[0].main)}
        <Container>
          <Row>
            <Col>
              {/* {typeof data.main != "undefined" ? ( */}
              <Weather weatherData={data} />
              {/* ) : ( */}
              {/* <div>
              <Dimmer active>
                <Loader>Loading...</Loader>
              </Dimmer>
            </div> */}
              {/* )} */}
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div>
          <Dimmer active>
            <Loader>Loading...</Loader>
          </Dimmer>
        </div>
      </div>
    );
  }
}

export default App;
