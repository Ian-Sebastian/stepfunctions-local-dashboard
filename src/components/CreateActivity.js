import React, { Component } from "react";

class CreateActivity extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:8083",
      name: "",
      tagKeys: "",
      tagValues: "",
      response: "",
      statusCode: ""
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
    } else if (event.target.name === "tagKeys") {
      this.setState({
        tagKeys: event.target.value
      });
    } else if (event.target.name === "tagValues") {
      this.setState({
        tagValues: event.target.value
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      param: {
        name: this.state.name,
        tags: this.processTags(this.state.tagKeys, this.state.tagValues)
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
        res.json().then(data => {
          if ("statusCode" in data) {
            this.setState({ statusCode: data.statusCode });
          } else {
            this.setState({ statusCode: "200" });
          }
          this.setState({ response: JSON.stringify(data, null, 4) });
        })
      )
      .catch(err => this.setState({ response: JSON.stringify(err, null, 4) }));
  };

  processTags(keys, values) {
    const tags = [];
    const keyArray = keys.split(",").filter(key => key.length !== 0);
    const valueArray = values.split(",").filter(key => key.length !== 0);
    keyArray.forEach((key, index) => {
      const tag = {
        key: key.trim(),
        value: valueArray[index].trim()
      };
      tags.push(tag);
    });
    return tags;
  }

  render() {
    const response = this.state.response;
    const statusCode = this.state.statusCode;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {/* <div className="form-group">
            <label htmlFor="endpoint">Endpoint</label>
            <input
              type="text"
              className="form-control"
              id="endpoint"
              name="endpoint"
              value={this.state.endpoint}
              onChange={this.handleChange}
            />
          </div> */}
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
          <div className="form-group">
            <label htmlFor="tagKeys">Tag Keys</label>
            <textarea
              className="form-control"
              id="tagKeys"
              name="tagKeys"
              rows="5"
              onChange={this.handleChange}
              value={this.state.tagKeys}
              placeholder="Put tag keys separated by comma. e.g. tag1,tag2"
            />
          </div>
          <div className="form-group">
            <label htmlFor="tagValues">Tag Values</label>
            <textarea
              className="form-control"
              id="tagValues"
              name="tagValues"
              rows="5"
              onChange={this.handleChange}
              value={this.state.tagValues}
              placeholder="Put tag values separated by comma in the order of associated tag keys. e.g. value1,value2"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Submit
          </button>
        </form>
        {response.length > 0 && (
          <div
            className={
              statusCode === "200"
                ? "alert alert-success response"
                : "alert alert-danger response"
            }
            role="alert"
          >
            <pre>{response}</pre>
          </div>
        )}
      </div>
    );
  }
}

export default CreateActivity;
