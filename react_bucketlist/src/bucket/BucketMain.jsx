import React, { Component } from "react";
// import PropTypes from "prop-types";
import BucketList from "./BucketList";
import BucketInsert from "./BucketInsert";
import "./BucketMain.css";

const BUCKET_URL = "http://localhost:5000/bucket";

class BucketMain extends Component {
  timer = "";
  state = {
    isFetch: false,
    bucketList: []
  };

  componentDidMount() {
    this.fetchBucketList();
    this.timer = setInterval(() => this.fetchBucketList(), 5000);
  }

  componentWillMount() {
    this.timer = null;
  }

  fetchBucketList = () => {
    this.setState({ ...this.state, isFetch: true });

    fetch(BUCKET_URL)
      .then(response => {
        return response.json();
      })
      .then(result => {
        this.setState({
          bucketList: result,
          isFetch: false
        });
      })
      .catch(error => console.log(error));
  };

  //

  //

  //   componentWillReceiveProps(nextProps) {}

  //   shouldComponentUpdate(nextProps, nextState) {}

  //   componentWillUpdate(nextProps, nextState) {}

  //   componentDidUpdate(prevProps, prevState) {}

  //   componentWillUnmount() {}

  render() {
    const { bucketList } = this.state;
    return (
      <div className="w3-container">
        <header className="w3-padding-32 w3-center w3-margin-bottom w3-topbar w3-bottombar w3-border-blue">
          <h2>BUCKETLIST 2020</h2>
          <p>BUCKETLIST 2020 client with React</p>
        </header>
        <section className="w3-container">
          <BucketInsert bucket_url={BUCKET_URL} />
          <BucketList bucketList={bucketList} bucket_url={BUCKET_URL} />
        </section>
      </div>
    );
  }
}

// BucketMain.propTypes = {};

export default BucketMain;
