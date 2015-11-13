var Geo = React.createClass({
  getDefaultProps: function () {
    return {isGeoAvailable: ('geolocation' in navigator) ? true : false}
  },
  getInitialState: function () {
    return {position: 'Unknown'};
  },
  handleUpdateGeoPosition: function (position) {
    this.setState({position: position});
  },
  getCurrentPositionCallback: function(position) {
    if (this.isMounted()) {
      console.log(position);
      this.handleUpdateGeoPosition(position.coords.latitude + ',' + position.coords.longitude);
    }
  },
  componentDidMount: function () {
    if (this.props.isGeoAvailable) {
      navigator.geolocation.getCurrentPosition(this.getCurrentPositionCallback);
    }
  },
  render: function () {
    return (
      <div>
        <p><strong>Async Geolocation</strong></p>
        <p>My current position is: {this.state.position}</p>
      </div>
    );
  }
});
ReactDOM.render(<Geo />, document.getElementById('geo'));