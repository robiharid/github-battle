var React = require("react");

var styles = {
  content: {
    textAlign: "center",
    fontSize: "35px"
  }
};

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text
    };
  }
  componentDidMount() {
    var stopper = this.props.text + "...";
    this.interval = window.setInterval(() => {
      if (this.state.text === stopper) {
        this.setState(() => {
          return {
            text: this.props.text
          };
        });
      } else {
        this.setState(prevState => {
          return {
            text: prevState.text + "."
          };
        });
      }
    }, this.props.speed);
  }
  componentWillMount() {
    window.clearInterval(this.interval);
  }
  render() {
    return <p style={styles.content}>{this.state.text}</p>;
  }
}

Loading.defaultProps = {
  text: "Loading",
  speed: 150
};
module.exports = Loading;
