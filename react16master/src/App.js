import React, { Component, Fragment } from "react";
import { createPortal } from "react-dom";

const MAX_PIZZAS = 20;

const eatPizza = (state, props) => {
  const { pizzas } = state;
  if (pizzas < MAX_PIZZAS) {
    return {
      pizzas: pizzas + 1
    };
  } else {
    return null;
  }
};

class Controlled extends Component {
  state = {
    pizzas: 0
  };
  _handleClick = () => {
    this.setState(eatPizza);
  };

  render() {
    const { pizzas } = this.state;
    return (
      <button onClick={this._handleClick}>{`i have eaten ${pizzas} ${
        pizzas === 1 ? "pizza" : "pizzas"
      }`}</button>
    );
  }
}

const BoundaryHOC = ProtectedComponent =>
  class Boundary extends Component {
    state = {
      hasError: false
    };
    componentDidCatch(error, info) {
      console.log(`catched ${error} that i have is ${JSON.stringify(info)}`);
      this.setState({ hasError: true });
    }

    render() {
      const { hasError } = this.state;
      if (hasError) {
        return <ErrorFallback />;
      } else {
        return <ProtectedComponent />;
      }
    }
  };

class ErrorMakers extends Component {
  state = {
    friends: ["a", "b", "c"]
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ friends: undefined });
    }, 2000);
  }
  render() {
    const { friends } = this.state;
    return friends.map(friend => `${friend}`);
  }
}

const PErrorMakers = BoundaryHOC(ErrorMakers);

class Portals extends Component {
  render() {
    return createPortal(<Message />, document.getElementById("touchme"));
  }
}

const PPortals = BoundaryHOC(Portals);

const Message = () => "Just touched it!";

class ReturnTypes extends Component {
  render() {
    return "Hello";
  }
}

const ErrorFallback = () => " Sorry, something went wrong!";

class App extends Component {
  render() {
    return (
      // <> 컴포넌트는 대문자여야함
      // <Fragment>
      //   <Portals />
      //   <ReturnTypes />
      //   <PErrorMakers />
      //   <PPortals />
      // </Fragment>
      // </>
      <Controlled />
    );
  }
}

export default App;
