var express = require("express");
var router = express.Router();

var bucketVO = require("../models/BucketVO");
var cors = require("cors");

var moment = require("moment");

var app = express();
app.use(cors());

var corsOption = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200
};

require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

router.get("/", (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-requested-With");

  bucketVO.find({}).exec((err, data) => {
    res.json(data);
  });
});

router.post("/", (req, res) => {
  req.body.b_date = moment().format("YYYY[-]MM[-]DD");
  req.body.b_time = moment().format("HH:mm:ss");

  var bucket = new bucketVO(req.body);
  bucket.save((err, data) => {
    res.json(data);
  });
});

router.put("/", (req, res) => {
  console.log(req.body);

  bucketVO
    .update({ _id: req.body._id }, { $set: req.body })
    .exec((err, result) => {
      res.json(result);
    });
});

router.delete("/", (req, res) => {
  console.log("body 값 : ", req.body);
  bucketVO.deleteOne({ _id: req.body._id }).exec((err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
