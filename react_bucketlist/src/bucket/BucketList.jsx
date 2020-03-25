import React from "react";
import BucketListItem from "./BucketListItem";

const BucketList = ({ bucketList, bucket_url }) => {
  const bucketMap = bucketList.map(bucket => {
    return (
      <BucketListItem
        bucket={bucket}
        key={bucket._id}
        bucket_url={bucket_url}
      />
    );
  });
  return (
    <table className="w3-table w3-table-all w3-margin">
      <tr>
        <th>날짜</th>
        <th>시간</th>
        <th>실행여부</th>
        <th>제목</th>
        <th colspan="2">비고</th>
      </tr>
      {bucketMap}
    </table>
  );
};

export default BucketList;
