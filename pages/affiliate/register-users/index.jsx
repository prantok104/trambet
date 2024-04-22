import React from "react";

const RegisterUsers = () => {
  return (
    <div>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User Details</th>
            <th scope="col">Promo Code</th>
            <th scope="col">Percentage</th>
            <th scope="col">Register Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Affiliate Promo Code</td>
            <td>VNMS6D</td>
            <td>20%</td>
            <td>21 Jan, 2024</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RegisterUsers;
