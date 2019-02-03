import React, {Component} from "react";
import ReactDOM from 'react-dom'
import sound from './webaudio';
import InputRange  from 'react-input-range';
import arpeggURL from './music/arpegg.wav';
import bassURL from './music/bass.wav';
import HiHatURL from './music/HiHat.wav';
import kickURL from './music/kick.wav';
import padsURL from './music/pads.wav';
import pianoURL from './music/piano.wav';
import AudioVis from './AudioVis';

class Track extends Component {

  // gets name,
  constructor(props) {
    super(props);

    this.state = {
      volume: 50,
      audioData: new Uint8Array(0),
    };

    this.analyser = this.props.audio.context.createAnalyser();
    this.props.audio.gainNode.connect(this.analyser);


    this.analcanvas = React.createRef();
    this.audiobox = React.createRef();

    this.tick = this.tick.bind(this);

    this.sliderChanged = this.sliderChanged.bind(this);
    this.onSliderDown = this.onSliderDown.bind(this);
    this.onMuteClick = this.onMuteClick.bind(this);
  }

  componentDidMount() {
    this.dataArray = new Uint8Array(this.props.audio.analyser.frequencyBinCount);
    // let w = this.audiobox.width;
    // let h = this.audiobox.height;
    this.rafId = requestAnimationFrame(this.tick);
  }

  // componentWillUnmount() {
  //   cancelAnimationFrame(this.rafId);
  //   this.analyser.disconnect();
  //   this.source.disconnect();
  // }

  tick() {
    this.props.audio.analyser.getByteTimeDomainData(this.dataArray);
    console.log(this.dataArray);
    this.setState({ audioData: this.dataArray });
    this.rafId = requestAnimationFrame(this.tick);
  }

  sliderChanged(event) {
    this.setState({volume: event.target.value});
    console.log("slider changed");
  }

  // only want the server updated when the slider is released.
  onSliderDown(event) {
  }
  onSliderUp(event) {
  }

  onMuteClick(event) {
    event.preventDefault();
    this.props.muteHandler(this.props.trackID)
  }

  render() {
    return (
        <div id={this.props.id} className="track-container">
          <div className="control-box">
            <p>{this.props.name}</p>
            <button onClick={this.onMuteClick}>mute</button>
            <div className="slidecontainer">
              <input type="range" min={0} max={200} value={this.state.volume} onChange={this.sliderChanged} />
            </div>
          </div>
          <div className="boxed" ref={this.audiobox}>
            {/*<canvas width="300" height="75" ref={this.analcanvas} />*/}
            <AudioVis audioData={this.state.audioData}/>
          </div>

        </div>
    );
  }

}

export default Track;