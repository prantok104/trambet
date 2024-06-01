import React from "react";
import NewsCard from "@/components/News/NewsCard";

const Promotion = ({ promotions = [], promo = [] }) => {
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
          {promotions?.map((promotionItem, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{promotionItem.title}</td>
              <td>{promotionItem.promo_code}</td>
              <td>{promotionItem.promo_percentage}%</td>
              <td>{promotionItem.created_at}</td>
              <td>
                {promotionItem.is_admin_approved == 0 && (
                  <span className="badge bg-info">Pending</span>
                )}
                {promotionItem.is_admin_approved == 1 && (
                  <span className="badge bg-success">Approved</span>
                )}
                {promotionItem.is_admin_approved == 2 && (
                  <span className="badge bg-danger">Rejected</span>
                )}
              </td>
              <td>
                <span
                  className={
                    promotionItem.admin_comment ? "" : "badge bg-warning"
                  }
                >
                  {promotionItem.admin_comment || "No Comment"}
                </span>
              </td>
              <td>
                <span
                  className={`badge ${
                    promotionItem.status == 1 ? "bg-success" : "bg-warning"
                  }`} >
                  {promotionItem.status == 1 ? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Promotion;
