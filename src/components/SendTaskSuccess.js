import React, { Component } from "react";

class SendTaskSuccess extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:8083",
      taskToken: "",
      output: "",
      response: ""
    };
  }

  handleChange = event => {
    if (event.target.name === "taskToken") {
      this.setState({
        taskToken: event.target.value
      });
    } else if (event.target.name === "output") {
      this.setState({
        output: event.target.value
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      param: {
        taskToken: this.state.taskToken,
        output: this.state.output
      },
      endpoint: this.state.endpoint
    };
    fetch("/api/send-task-success", {
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
            <label htmlFor="taskToken">Task Token</label>
            <input
              type="text"
              className="form-control"
              id="taskToken"
              name="taskToken"
              value={this.state.taskToken}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="output">Output</label>
            <input
              type="text"
              className="form-control"
              id="output"
              name="output"
              value={this.state.output}
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

export default SendTaskSuccess;