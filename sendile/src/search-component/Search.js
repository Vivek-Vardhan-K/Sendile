import React from "react";
import { useState } from "react";
import "./search-component.css";
import logo from "./main-logo.png";
import axios from "axios";
import Results from "../results-component/Results";
import { useSelector } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { useDispatch } from "react-redux";
import LandFooter from "../footer/LandFooter";
import cst from "../constants/constants";

function Search() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState(false);
  const [bookData, setBookData] = useState([]);
  const token = useSelector((state) => state.jwtToken);
  const email = useSelector((state) => state.email);
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  const handleTabClosing = () => {
    axios({
      method: "delete",
      url: cst.base_url+`removeToken/` + token,
    });
  };
  console.log(email);
  window.addEventListener("unload", handleTabClosing);

  const searchHandler = (inp) => {
    console.log("search started!");
    dispatch({
      type: "SWITCH_LOADING",
    });
    axios({
      method: "get",
      url: cst.base_url+`/search-by-title/` + inp,
      data: {},
    }).then((res) => {
      dispatch({
        type: "SWITCH_LOADING",
      });
      setSearch(true);
      setBookData(res.data);
    });
  };
  if (!search)
    return (
      <div className="page-full">
        <img src={logo} alt="Logo" className="logo-pos" />
        {isLoading ? <div className="loader"></div> : ""}
        <InputGroup className="mb-3">
          <FormControl
            className="form-inp"
            placeholder="Search with Title"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="outline-primary"
            id="button-addon2"
            onClick={
              !isLoading
                ? () => {
                    searchHandler(input);
                  }
                : null
            }
          >
            {isLoading ? "searching" : "Search"}
          </Button>
        </InputGroup>
        <LandFooter />
      </div>
    );
  else {
    return (
      <Results
        bookData={bookData}
        phold={input}
        trig={(inp) => {
          searchHandler(inp);
        }}
      />
    );
  }
}

export default Search;
