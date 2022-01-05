import React, { Component } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
`;

const Video = styled.video`
  object-fit: cover;
  width: 100%;
  height: auto;
`;

const Item = styled.div`
  position: absolute;
  top: 0;
  left: 20%;
  width: 60%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 0 0 9999px rgba(255, 100, 100, 0.2);
`

class App extends Component {
  constructor() {
    super();
    this.ref = React.createRef();

    this.state = {
      video: undefined,
      src: undefined,
    }
  }

  handleChange = (e) => {
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      this.setState({video: reader.result});
    })

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      console.log(e.target.files[0])
      this.setState({
        src: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  render() {
    return (
      <div>
        <input type="file" accept="image/*" onChange={(e) => console.log(e.target.value)} />
        <input type="file" accept="video/*" onChange={this.handleChange} />
        <Video controls autoPlay muted playsInline src={this.state.src} ref={this.ref} />
      </div>
    );
  }

  componentDidMount() {
    this.ref.current.addEventListener("loadedmetadata", () => {
      console.log(this.ref.curent.duration);
    })
  }
}

render(<App />, document.getElementById('root'));
