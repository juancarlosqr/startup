var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: '',
      lastGistDesc: ''
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url,
          lastGistDesc: lastGist.description
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        <p><strong>Async Github</strong></p>
        <p>
          Last gist of {this.state.username} is {' '}
          <a href={this.state.lastGistUrl} target="_blank">{this.state.lastGistDesc}</a>
        </p>
        
        <div>
          <div id={false} />
          <input value={false} />
          <div>{false}</div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.getElementById('github')
);