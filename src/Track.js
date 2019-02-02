import React, {Component} from "react";

import arpeggURL from './music/arpegg.wav';
import bassURL from './music/bass.wav';
import HiHatURL from './music/HiHat.wav';
import kickURL from './music/kick.wav';
import padsURL from './music/pads.wav';
import pianoURL from './music/piano.wav';

class Track extends Component {

  // gets name,
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <span>
          {this.props.name}
        <div className="slidecontainer">
          <input type="range" min="1" max="100" value="50" className="slider" id="myRange" />   
        </div>
        </span>
    );
  }

}

export default Track;