var Home = React.createClass({
  render: function () {
    return <h1>{this.props.title}</h1>;
  }
});
var title = "The Avengers";

var FancyCheckbox = React.createClass({
  render: function() {
    var fancyClass = this.props.checked ? 'FancyChecked' : 'FancyUnchecked';
    return (
      <div className={fancyClass} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
});

var FancyInput = React.createClass({
  getInitialState: function() {
    return {value: 'Hulk is angry!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  handleUncontrolledChange: function(event) {
    console.log(event.target.value);
  },
  render: function() {
    var value = this.state.value;
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <input type="text" onChange={this.handleUncontrolledChange} />
      </div>);
  }
});

var Main = React.createClass({
  render: function () {
    return (
      <section>
        <Home title={title} />
        <FancyCheckbox checked={true} onClick={console.log.bind(console)}>
          The Tesseract has awakened!
        </FancyCheckbox>
        <FancyInput />
      </section>
    );
  }
});

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);
