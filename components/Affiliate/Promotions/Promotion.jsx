import React from "react";

const Promotion = () => {
  return (
    <div>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Promo Code</th>
            <th scope="col">Percentage</th>
            <th scope="col">Create Date</th>
            <th scope="col">Approval</th>
            <th scope="col">Admin Comment</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Affiliate Promo Code</td>
            <td>VNMS6D</td>
            <td>20%</td>
            <td>21 Jan, 2024</td>
            <td>
              <span class="badge bg-success">Approved</span>
            </td>
            <td>
              <span class="badge bg-warning">No Comment</span>
            </td>
            <td>
              <span class="badge bg-success">Active</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Promotion;
