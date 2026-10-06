import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY =  "14f75c13bb782597e05658b85f192462";

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      setWeather(data);
    } catch (error) {
      setError("City not found. Please enter a valid city.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0b3d2e, #198754, #52b788, #b7e4c7)",
        padding: "50px 15px",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>

            <Card
              className="border-0 shadow-lg"
              style={{
                borderRadius: "30px",
                overflow: "hidden",
                backgroundColor: "rgba(255,255,255,0.95)",
              }}
            >
              <Card.Body className="p-4 p-md-5">

                {/* Header */}
                <div className="text-center mb-4">

                  <div
                    className="mx-auto mb-3 d-flex justify-content-center align-items-center"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      backgroundColor: "#d8f3dc",
                      fontSize: "42px",
                    }}
                  >
                    🌿
                  </div>

                  <h1
                    className="fw-bold"
                    style={{ color: "#14532d" }}
                  >
                    Weather App
                  </h1>

                  <p className="text-muted">
                    Discover the weather around you 🌱
                  </p>

                </div>

                {/* Search */}
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    getWeather();
                  }}
                >
                  <div className="d-flex gap-2">

                    <Form.Control
                      size="lg"
                      type="text"
                      placeholder="Enter city name..."
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      style={{
                        border: "2px solid #95d5b2",
                        borderRadius: "15px",
                      }}
                    />

                    <Button
                      variant="success"
                      size="lg"
                      type="submit"
                      style={{
                        borderRadius: "15px",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                      }}
                    >
                      Search
                    </Button>

                  </div>
                </Form>

                {/* Loading */}
                {loading && (
                  <div className="text-center mt-4">
                    <Spinner
                      animation="border"
                      variant="success"
                    />

                    <p className="text-muted mt-2">
                      Checking weather...
                    </p>
                  </div>
                )}

                {/* Error */}
                {error && !loading && (
                  <Alert
                    variant="danger"
                    className="text-center mt-4"
                  >
                    {error}
                  </Alert>
                )}

                {/* Weather Result */}
                {weather && !loading && (
                  <div
                    className="mt-4 p-4 text-center"
                    style={{
                      background:
                        "linear-gradient(145deg, #e9f5db, #d8f3dc)",
                      borderRadius: "25px",
                    }}
                  >

                    {/* City */}
                    <h2
                      className="fw-bold mb-1"
                      style={{ color: "#14532d" }}
                    >
                      {weather.name}
                    </h2>

                    <p className="text-muted">
                      {weather.sys.country}
                    </p>

                    {/* Weather Image */}
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                      alt={weather.weather[0].description}
                      style={{
                        width: "140px",
                        height: "140px",
                      }}
                    />

                    {/* Temperature */}
                    <h1
                      className="display-1 fw-bold"
                      style={{ color: "#166534" }}
                    >
                      {Math.round(weather.main.temp)}°C
                    </h1>

                    {/* Description */}
                    <p
                      className="text-capitalize fs-5 fw-semibold"
                      style={{ color: "#40916c" }}
                    >
                      {weather.weather[0].description}
                    </p>

                    {/* Weather Details */}
                    <Row className="g-3 mt-3">

                      <Col xs={6}>
                        <Card
                          className="border-0 shadow-sm h-100"
                          style={{ borderRadius: "18px" }}
                        >
                          <Card.Body>

                            <div style={{ fontSize: "28px" }}>
                              💧
                            </div>

                            <small className="text-muted">
                              Humidity
                            </small>

                            <h5
                              className="fw-bold mb-0"
                              style={{ color: "#166534" }}
                            >
                              {weather.main.humidity}%
                            </h5>

                          </Card.Body>
                        </Card>
                      </Col>

                      <Col xs={6}>
                        <Card
                          className="border-0 shadow-sm h-100"
                          style={{ borderRadius: "18px" }}
                        >
                          <Card.Body>

                            <div style={{ fontSize: "28px" }}>
                              💨
                            </div>

                            <small className="text-muted">
                              Wind Speed
                            </small>

                            <h5
                              className="fw-bold mb-0"
                              style={{ color: "#166534" }}
                            >
                              {weather.wind.speed} m/s
                            </h5>

                          </Card.Body>
                        </Card>
                      </Col>

                    </Row>

                    {/* Feels Like */}
                    <Card
                      className="border-0 shadow-sm mt-3"
                      style={{ borderRadius: "18px" }}
                    >
                      <Card.Body>

                        <span className="text-muted">
                          Feels like{" "}
                        </span>

                        <strong
                          style={{ color: "#166534" }}
                        >
                          {Math.round(weather.main.feels_like)}°C
                        </strong>

                      </Card.Body>
                    </Card>

                  </div>
                )}

                {/* Footer */}
                <div className="text-center mt-4">
                  <small className="text-muted">
                    🌱 Stay connected with nature
                  </small>
                </div>

              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;