import React, { useEffect, useState } from "react";
import AffiliatLayout from "@/pages/affiliate/layout";
import { HttpClientCall } from "@/components/HTTPClient";
import QRCode from "qrcode";

function TwoFA() {
  const [data, setData] = useState([]);
  const [secret, setSecret] = useState("");
  const [code, setCode] = useState("");

  //show qr code
  const getQrCode = () => {
    HttpClientCall({
      endpoint: "twofactor",
      method: "GET",
      includeAuth: true,
      data: [],
    })
      .then((response) => {
        setData(response?.data);

        // show image in qr code div
        var qrCode = response?.data?.qrCodeUrl;
        document.getElementById(
          "qrcode"
        ).innerHTML = `<img src="${qrCode}" width="200" height="200" />`;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async () => {
    console.log("Hi");
    HttpClientCall({
      endpoint: "twofactor/enable",
      method: "POST",
      includeAuth: true,
      data: {
        code: code,
        key: secret
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getQrCode();
  }, []);

  return (
    <>
      <AffiliatLayout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Add Your Account</h4>
                  <p className="card-text">
                    Please scan the QR code below to setup your 2FA
                  </p>
                  <div id="qrcode" className="text-center mt-3">
                    {/* <img src={data?.qrCodeUrl} alt="" className='w-100'/> */}
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-control mt-4 readonly"
                      value={data?.secret}
                      onChange={(e) => setSecret(e.target.value)}
                    />
                    <div className="form-text text-white">
                      If you have any problem with scanning the QR code enter
                      the code manually.{" "}
                      <a
                        href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en"
                        className="text-primary"
                      >
                        App link
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Enable 2FA Authenticator</h4>
                  <p className="card-text">
                    Please enter the 6 digit code from the app
                  </p>
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter 6 digit code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button
                      className="btn btn-primary"
                      type="button"
                      id="button-addon2"
                      onClick={handleSubmit}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AffiliatLayout>
    </>
  );
}

export default TwoFA;
