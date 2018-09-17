import React, { Component, Fragment } from "react";
import { createPortal } from "react-dom";

class Portals extends Component {
  render() {
    return createPortal(<Message />, document.getElementById("touchme"));
  }
}

const Message = () => "Just touched it!";

class ReturnTypes extends Component {
  render() {
    return "Hello";
  }
}

class App extends Component {
  render() {
    return (
      // <> 컴포넌트는 대문자여야함
      <Fragment>
        <Portals />
        <ReturnTypes />
      </Fragment>
      // </>
    );
  }
}

export default App;