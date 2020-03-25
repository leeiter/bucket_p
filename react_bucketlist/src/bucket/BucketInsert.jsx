import React, { Component } from "react";
import axios from "axios";

class BucketInsert extends Component {
  state = {
    b_title: ""
  };

  handleChange = e => {
    console.log(e.target.value);
    this.setState({ ...this.state, b_title: e.target.value });
    console.log("B_TITLE", this.state.b_title);
  };

  bucketAxiosSubmit = ev => {
    ev.preventDefault();

    const { bucket_url } = this.props;
    axios
      .post(bucket_url, { b_title: this.state.b_title })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };

  bucketInsertSubmit = ev => {
    ev.preventDefault();

    const { bucket_url } = this.props;
    // let data = new FormData();
    // data.append("b_title", this.state.b_title);

    console.log("전송", this.state.b_title);

    fetch(bucket_url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        b_title: this.state.b_title
      })
    });
  };

  render() {
    return (
      // <React.Fragment></React.Fragment>
      <form
        onSubmit={this.bucketInsertSubmit}
        className="w3-container w3-row-padding"
      >
        <div className="w3-col s9 w3-padding">
          <input
            value={this.state.b_title}
            onChange={this.handleChange}
            className="w3-input w3-border"
          />
        </div>
        <div className="w3-col s3 w3-padding">
          <button type="submit" className="w3-button w3-blue">
            저장
          </button>
        </div>
      </form>
    );
  }
}

export default BucketInsert;
