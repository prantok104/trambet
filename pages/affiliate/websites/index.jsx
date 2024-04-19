import CreatePromotion from "@/components/Affiliate/CreatePromotion/CreatePromotion";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Websites = () => {
  return (
    <div>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Website Id</th>
            <th scope="col">Website</th>
            <th scope="col">Status</th>
            <th scope="col">Create At</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Affiliate Promo Code</td>
            <td>www.google.com</td>
            <td>
              <span class="badge bg-success">Active</span>
            </td>
            <td>21 Jan, 2024</td>
            <td>
              <div className="d-flex justify-content-center gap-2">
                <button type="submit" className="btn btn-primary btn-sm d-flex justify-content-center">
                  <FaEdit />
                </button>
                <button type="submit" className="btn btn-danger btn-sm d-flex justify-content-center">
                  <FaTrash />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Websites;
