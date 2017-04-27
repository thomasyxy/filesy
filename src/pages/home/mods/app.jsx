
import React, { PropTypes } from 'react';
import assign from 'object-assign';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = assign({}, props, {});
  }

  componentWillMount() {
  }

  render() {
    return <div className="app-page">
      hello world!
    </div>
  }
}

export default App;
