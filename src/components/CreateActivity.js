import React, { Component } from "react";

class CreateActivity extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:8083",
      name: "",
      response: ""
    };
  }

  handleChange = event => {
    if (event.target.name === "name") {
      this.setState({
        name: event.target.value
      });
    } else if (event.target.name === "endpoint") {
      this.setState({
        endpoint: event.target.value
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      param: {
        name: this.state.name
      },
      endpoint: this.state.endpoint
    };
    fetch("/api/create-activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res =>
        res
          .json()
          .then(data =>
            this.setState({ response: JSON.stringify(data, null, 4) })
          )
      )
      .catch(err => this.setState({ response: JSON.stringify(err, null, 4) }));
  };

  render() {
    const response = this.state.response;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="endpoint">Endpoint</label>
            <input
              type="text"
              className="form-control"
              id="endpoint"
              name="endpoint"
              value={this.state.endpoint}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Submit
          </button>
        </form>
        {response.length > 0 && (
          <div
            className="alert alert-primary alert-dismissible fade show response"
            role="alert"
          >
            <pre>{response}</pre>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default CreateActivity;
