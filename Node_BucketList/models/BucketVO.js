const mongoose = require("mongoose");

const bucketVO = mongoose.Schema({
  b_date: String,
  b_time: String,
  b_title: String,
  b_checked: String
});

module.exports = mongoose.model("tbl_bucket", bucketVO);
