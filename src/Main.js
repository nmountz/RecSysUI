import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Table,
} from "react-bootstrap";

function Main() {
  let [items, setItems] = useState([]);
  let [userId, setUserId] = useState("");
  let [loading, setLoading] = useState(false);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  let getPearson = () => {
    setLoading(true);
    fetch(`http://localhost:4000/pearson/${userId}`)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        try {
          let tempArr = data.split("\n");
          let output = [];
          for (var item in tempArr) {
            if (tempArr[item].length > 0) {
              output.push(JSON.parse(tempArr[item]));
            }
          }
          console.log(output);
          setItems((items) => output);
          setLoading(false);
        } catch (e) {
          console.log("bad data");
        }
      });
  };

  let getCosine = () => {
    setLoading(true);

    fetch(`http://localhost:4000/cosine/${userId}`)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        try {
          let tempArr = data.split("\n");
          let output = [];
          for (var item in tempArr) {
            if (tempArr[item].length > 0) {
              output.push(JSON.parse(tempArr[item]));
            }
          }
          console.log(output);
          setItems((items) => output);
          setLoading(false);
        } catch (e) {
          console.log("bad data");
        }
      });
  };

  let getJaccard = () => {
    setLoading(true);
    fetch(`http://localhost:4000/jaccard/${userId}`)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        try {
          let tempArr = data.split("\n");
          let output = [];
          for (var item in tempArr) {
            if (tempArr[item].length > 0) {
              output.push(JSON.parse(tempArr[item]));
            }
          }
          console.log(output);
          setLoading(false);

          setItems((items) => output);
        } catch (e) {
          console.log("bad data");
        }
      });
  };

  let getAllThree = () => {
    setLoading(true);
    fetch(`http://localhost:4000/allThree/${userId}`)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        try {
          let tempArr = data.split("\n");
          let output = [];
          for (var item in tempArr) {
            if (tempArr[item].length > 0) {
              output.push(JSON.parse(tempArr[item]));
            }
          }
          setLoading(false);

          setItems((items) => output);
        } catch (e) {
          console.log("bad data");
        }
      });
  };

  return (
    <div className="Main">
      <Container>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Enter userID
              </InputGroup.Text>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={(event) => {
                  setUserId(event.target.value);
                }}
              />
            </InputGroup>
          </Col>
          <Col xs={8}>
            <Button variant="primary" size="lg" active onClick={getPearson}>
              Pearson
            </Button>{" "}
            <Button variant="success" size="lg" active onClick={getCosine}>
              Cosine
            </Button>{" "}
            <Button variant="warning" size="lg" active onClick={getJaccard}>
              Jaccard
            </Button>{" "}
            <Button variant="info" size="lg" active onClick={getAllThree}>
              All 3
            </Button>{" "}
          </Col>
        </Row>
        {loading ? (
          <ClipLoader loading={loading} css={override} size={150} />
        ) : (
          <Table style={{ color: "white", maxWidth: "1500px" }}>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Description</th>
                <th>Image</th>
                <th>score</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, key) => {
                let asin = item.asin;
                let itemDesc = item.itemDesc;
                let imUrl = item.imUrl;
                let result = item.results;
                return (
                  <tr>
                    <td>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://amazon.com/dp/${asin}`}
                      >
                        {asin}
                      </a>
                    </td>
                    <td>
                      <p style={{ fontSize: "15px" }}>{itemDesc}</p>
                    </td>
                    <td>
                      <img src={imUrl} alt={key} />
                    </td>
                    <td>{result}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
}

export default Main;
