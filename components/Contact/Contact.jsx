"use client";
import React from "react";
import contactImage from "@/public/contact_back.png";
import { FaEnvelope, FaMapMarkedAlt, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div
      style={{
        backgroundImage: `url(https://trambet.smshagor.com/assets/images/frontend/contact/62e7bd71160691659354481.png)`,
      }}
      className="contact_container"
    >
      <div className="container">
        <div className="row g-3 align-items-lg-center justify-content-lg-between">
          <div className="col-md-6 d-flex align-items-center">
            <ul class="list">
              <li>
                <div class="contact-card">
                  <span class="contact-card__icon">
                    <FaMapMarkedAlt />
                  </span>
                  <div class="contact-card__content">
                    <h5 class="contact-card__title">Address Details</h5>
                    <p class="contact-card__text">
                      1520 North Kierland Bl.100 Old City
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div class="contact-card">
                  <span class="contact-card__icon">
                    <FaPhoneAlt />
                  </span>
                  <div class="contact-card__content">
                    <h5 class="contact-card__title">Contact No</h5>
                    <p class="contact-card__text">0123 - 4567 -890</p>
                  </div>
                </div>
              </li>
              <li>
                <div class="contact-card">
                  <span class="contact-card__icon">
                    <FaEnvelope />
                  </span>
                  <div class="contact-card__content">
                    <h5 class="contact-card__title">Email Details</h5>
                    <p class="contact-card__text">support@mail.com</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <h2>right</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
