import React from 'react';
import './App.css';
import { Container, Button, Row, Col, InputGroup, FormControl, Card } from 'react-bootstrap';

class HanddiiSearch
{
  constructor() {
    this.registerHooks();
  }

  SearchAddress() {
    let searchAddressInput = document.getElementById("searchAddressInput");
    alert(searchAddressInput?.innerText);
    return console.log("Whoa");
  }

  registerHooks() {
    let searchAddressButton = document.getElementById("searchAddressButton");

    if (searchAddressButton) {
      searchAddressButton.addEventListener('click', () => {
        this.SearchAddress();
      });
    }
    else
    {
      console.error("Failed to fund address input button at launch")
    }
  }

  render() {
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
                      />
                      <InputGroup.Append>
                        <span className="glyphicon glyphicon-search"></span>
                      </InputGroup.Append>
                      <InputGroup.Append>
                        <Button variant="outline-secondary" click={this.SearchAddress()}>Search</Button>
                      </InputGroup.Append>
                    </InputGroup>
                </Card.Body>
                <Card.Footer>

                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HanddiiSearch;
