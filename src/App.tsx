import React, {useState, FormEvent} from 'react';
import './App.css';
import { Container, Button, Row, Col, InputGroup, FormControl, Card, Table } from 'react-bootstrap';
import axios from 'axios';

export function App()
{
  const mapApiUrl = `https://api.opencagedata.com/geocode/v1/json?key=ceb6a9aaca6c4da7ac181b5f6a726148`;
  const [address, setAddress] = useState('');
  const [locations, setLocations] = useState([{name: "", longitude: "", latitude: ""}]) 

  const handleSearch = () => {
    console.log(address);
    axios.get(`${mapApiUrl}&q=${encodeURI(address)}&pretty=1`).then(response => {
      const res = response.data.results;
      const locationsRes = res.map((loc: { formatted: string; geometry: { lng: number; lat: number; }; }) => { 
        return {
          name: loc.formatted,
          longitude: loc.geometry.lng,
          latitude: loc.geometry.lat
        };
      });
      setLocations(locationsRes);
    });
  }

  const renderTableBody = () => {
    return locations.map(location =>
      <tr>
        <td>{location.name}</td>
        <td>{location.longitude}</td>
        <td>{location.latitude}</td>
      </tr>
    );
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h1>Welcome to the Handdii-Search application!</h1>
                <p>Let's look for the longitude and latitude of...</p>
              </Card.Header>
              <Card.Body>
                <InputGroup>
                    <FormControl
                      id="searchAddressInput"
                      placeholder="Address to find"
                      aria-label="Address to find"
                      aria-describedby="basic-addon2"
                      value={address}
                      onChange={(e:FormEvent<HTMLInputElement>) => setAddress(e.currentTarget.value)}
                    />
                    <InputGroup.Append>
                      <Button variant="outline-secondary" onClick={() => handleSearch()}>Search</Button>
                    </InputGroup.Append>
                  </InputGroup>
              </Card.Body>
              <Card.Footer>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Location Name</th>
                      <th>Longitude</th>
                      <th>Latitude</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderTableBody()}
                  </tbody>
                </Table>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
