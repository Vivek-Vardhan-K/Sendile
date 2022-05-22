import React from "react";
import "./Results.css";
import icon from "./kindle.png";
import axios from "axios";
import logo from "./../search-component/main-logo.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { useDispatch } from "react-redux";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

function Results(props) {
  const [input, setinput] = useState(props.phold);
  const isLoading = useSelector((state) => state.isLoading);
  const token = useSelector((state) => state.jwtToken);
  const email = useSelector((state) => state.email);
  const dispatch = useDispatch();
  const toSpin = () => {
    dispatch({
      type: "SWITCH_LOADING",
    });
  };
  const byCaller = (id, name, searchText) => {
    axios({
      method: "post",
      url: "https://teleportx.herokuapp.com/download/" + name,
      data: {},
      headers: {
        bookID: id,
        Token: token,
        search4: searchText,
        keymail: email,
      },
    }).then(
      NotificationManager.success("Sent to Kindle", name).catch((error) => {
        NotificationManager.error(error, "Internal error:500");
      })
    );
  };
  if (props.bookData.data != undefined) {
    var listItems = props.bookData.data.map((elem, idx) => (
      <tr key={idx} scope="row">
        <td className="rowdet">{idx + 1}</td>
        <td className="rowdet">
          <a href="#">{elem.Author}</a>
        </td>
        <td className="rowdet">{elem.Title}</td>
        <td className="rowdet">{elem.Year}</td>
        <td className="rowdet">{elem.Size}</td>
        <td className="rowdet">
          <a href="#" title="">
            <img
              src={icon}
              className="resz zoom"
              onClick={() => {
                byCaller(elem.ID, elem.Title, elem.search4);
              }}
            />
          </a>
        </td>
      </tr>
    ));
  }
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <img src={logo} alt="Logo" className="rect-logo" />
            </td>
            <td>
              <InputGroup className="mb-3 sch">
                <FormControl
                  className="form-inp extd common"
                  placeholder="Search with Title"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={input}
                  onChange={(e) => {
                    setinput(e.target.value);
                  }}
                />
                <Button
                  variant="outline-primary"
                  id="button-addon2"
                  className="common"
                  onClick={
                    !isLoading
                      ? () => {
                          props.trig(input);
                        }
                      : null
                  }
                >
                  {isLoading ? "searching" : "Search"}
                </Button>
              </InputGroup>
            </td>
          </tr>
        </tbody>
      </table>
      {isLoading ? <div className="loader"></div> : ""}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col" className="rowdet">
              Index
            </th>
            <th scope="col" className="rowdet">
              Author
            </th>
            <th scope="col" className="rowdet">
              Book Name
            </th>
            <th scope="col" className="rowdet">
              Year
            </th>
            <th scope="col" className="rowdet">
              Size
            </th>
            <th scope="col" className="rowdet">
              Send to Kindle
            </th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </Table>
      <NotificationContainer />
    </div>
  );
}

export default Results;
