import React, { Component } from "react";

class BucketListItem extends Component {
  state = {
    isEditing: false,
    b_title: "",
    b_checked: false
  };

  inputClick = ev => {
    ev.stopPropagation();
  };

  toggleEdit = () => {
    const { isEditing } = this.state;
    this.setState({
      isEditing: !isEditing
    });
  };

  editInput = ev => {
    this.setState({
      ...this.state,
      b_title: ev.target.value
    });
  };

  handleChange = e => {
    const {
      target: { b_checked }
    } = e;
    this.setState({ b_checked });
  };

  componentDidUpdate(prevProps, prevState) {
    const { bucket } = this.props;
    if (!prevState.isEditing && this.state.isEditing) {
      this.setState({
        b_title: bucket.b_title
      });
    }
  }

  updateHandle = () => {
    const { bucket, bucket_url } = this.props;
    const data = { _id: bucket._id, b_title: this.state.b_title };
    fetch(bucket_url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  };

  deleteHandle = ev => {
    ev.stopPropagation();

    if (window.confirm("데이터를 삭제할까요?")) {
      const { bucket, bucket_url } = this.props;
      const data = { _id: bucket._id };
      fetch(bucket_url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    }
  };

  render() {
    const { bucket } = this.props;
    return (
      <tr data-id={bucket._id}>
        <td>{bucket.b_date}</td>
        <td>{bucket.b_time}</td>
        <td>
          <input
            type="checkbox"
            checked={this.state.b_checked}
            onChange={this.handleChange}
          />
        </td>
        <td onClick={this.toggleEdit}>
          {this.state.isEditing ? (
            <div>
              <input
                value={this.state.b_title}
                onClick={this.inputClick}
                onChange={this.editInput}
              />
              <button
                type="button"
                onClick={this.updateHandle}
                className="w3-button w3-orange w3-tiny"
              >
                완료
              </button>
            </div>
          ) : (
            <span>{bucket.b_title}</span>
          )}
        </td>
        <td>
          <button
            type="button"
            onClick={this.deleteHandle}
            className="w3-button w3-red w3-small"
          >
            삭제
          </button>
        </td>
      </tr>
    );
  }
}

export default BucketListItem;
