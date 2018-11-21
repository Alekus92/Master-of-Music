import React, { Component } from "react";
import "./App.css";
import { FormGroup, FormControl, InputGroup, Glyphicon } from "react-bootstrap";
import Profile from "./Profile";
import Gallery from "./Gallery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artist: null,
      tracks: []
    };
  }

  search() {
    console.log("this.state", this.state);
    const BASE_URL = "https://api.spotify.com/v1/search?";
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = "https://api.spotify.com/v1/artists/";

    var accessToken =
      "BQDP1IPCX3oHp0-hQFvtcjMG3WfOTPpDFL0bI-CiGJR4mpkCxBWiTz_5M-y0Y6h60MubdIcjzDGawyDx7cV-jOStJQOP5sPlxdoBMZseJnisILRTI5reyxWiTMmMDJ_F85rjvCyxxqjOUPEuPLVU12OBH1Ll-ttxQA&refresh_token=AQCQZMwMvjA9owrE_5DyapXTw7C0Q8fh7SLF0FCnnjICvliDqaVrIXzbmxaynWATXDSk81-tLo4TSN3Hz_4JsWEqxc3XAQQYqJAey6FjXJtvzxNbwmdjI6ZjnJPYOJUPXmBeew";
    // var myHeaders = new Headers();
    var myOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      },
      mode: "cors",
      cache: "default"
    };
    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({ artist });

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
        fetch(FETCH_URL, myOptions)
          .then(response => response.json())
          .then(json => {
            const { tracks } = json;
            this.setState({ tracks });
          });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Master of Music</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={event => {
                this.setState({ query: event.target.value });
              }}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.search();
                } // przywpiswaniu ,  wciskajac w enter odczyt artyste
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {this.state.artist !== null ? (
          <div>
            <Profile artist={this.state.artist} />
            <Gallery tracks={this.state.tracks} />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default App;
