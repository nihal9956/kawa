import React from "react";
import { Jumbotron, Container, Image } from "react-bootstrap";
import "./JUMBO_CARD.css";
function JUMBO_CARD(props) {
  return (
    <div className="card_container">
      <Jumbotron
        fluid
        style={{
          backgroundColor: "white",
          boxShadow: "8px 8px 8px 8px lightgray",
          borderRadius: "0.2rem",
        }}
      >
        <Container fluid>
          {props.photo !== undefined ? (
            <div className="user__details">
              <Image src={props.photo} roundedCircle className="user_img" />
              <div className="user_info">
                <h1>{props.name}</h1>
                <p>{props.address}</p>
                <p style={{ color: "lightgray", fontWeight: "700" }}>
                  {props.gender}
                </p>
              </div>
            </div>
          ) : (
            <></>
          )}
        </Container>
      </Jumbotron>
    </div>
  );
}

export default JUMBO_CARD;
