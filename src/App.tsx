import React, {useState, FormEvent} from 'react';
import './App.css';
import { Container, Button, Row, Col, InputGroup, FormControl, Card, Table } from 'react-bootstrap';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({uri: 'http://localhost:4000/api/'});

export function App()
{
  const [address, setAddress] = useState('');
  const [locations, setLocations] = useState([{description: "", longitude: "", latitude: ""}]) 
  
  const handleSearch = () => {

    client
      .query({
        query: gql`
        {
          location(search: "${address}") {
            description
            longitude
            latitude
          }
        }`
      })
      .then(result =>
      {
        setLocations(result.data.location)
      });
  }

  const renderTableBody = () => {
    return locations.map(location =>
      <tr>
        <td>{location.description}</td>
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
