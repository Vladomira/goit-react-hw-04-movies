import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { React, Component } from 'react';

export default class SpinLoader extends Component {
  render() {
    return (
      <Loader
        type="Hearts"
        color="#7a2020"
        height={150}
        width={150}
        timeout={5000}
        style={{
          position: 'fixed',
          top: '30%',
          left: '45%',
        }}
      />
    );
  }
}
