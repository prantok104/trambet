import { HttpClientCall } from "@/components/HTTPClient";
import { notify } from "@/components/Helper";
import React, { useEffect, useState } from "react";

const Promotion = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    HttpClientCall({
      endpoint: `affiliate/promotions/1`,
      method: "GET",
      includeAuth: true,
      data: [],
    }).then((res) => {
      if (res.status === true) {
        setData(res?.data?.promotions);
      } else {
        notify("error", res.response.data.message);
      }
    });
  }, []);

  console.log(data);

  return (
    <div>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Promo Code</th>
            <th scope="col">Percentage</th>
            <th scope="col">Applied Date</th>
            <th scope="col">Approval</th>
            <th scope="col">Admin Comment</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th scope="row">{++index}</th>
              <td>{item.title}</td>
              <td>{item.promo_code}</td>
              <td>{item.promo_percentage}%</td>
              <td>{new Date(item.created_at).toLocaleDateString('en-GB')}</td>
              <td>
                {item.is_admin_approved == 1 ? (
                  <span className="badge bg-success">Approved</span>
                ) : (
                  <span className="badge bg-warning">Pending</span>
                )}
              </td>
              <td>
                {item.admin_comment ? item.admin_comment : "No comment"}
              </td>
              <td>
                <span className="badge bg-success">Active</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Promotion;
