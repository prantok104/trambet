import React, { useState, useRef, useEffect } from "react";
import Loader from '@/components/Loader';
import { toast } from "react-toastify";
import { notify } from "@/components/Helper";
import { HttpClientCall } from "@/components/HTTPClient";
import { useRouter } from "next/router";
const OTPInputGroup = () => {
  const [resendLoader, setResendLoader] = useState(false)
  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });
  const router = useRouter();
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus on the first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (inputId, value) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [inputId]: value,
    }));
  };

  const handleResendOtp = () => {
    setResendLoader(true)
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = Object.values(inputValues).join("");
    const data = {
      code: otp,
    };
    HttpClientCall({
      method: "POST",
      endpoint: "verify-email",
      includeAuth: true,
      data: data,
    }).then((res) => {
      if (res.status === true) {
        toast.success("Successfully email verification done", {
          onClose: () => router.push('/')
        });
      } else {
        notify("error", res.response.data.message);
      }
    });
  };


  return (
    <>

      <div id="OTPInputGroup" className={"digitGroup"} data-autosubmit="true">
        {resendLoader ? <Loader /> : ''}
        {Array.from({ length: 6 }).map((_, index) => (
          <OTPInput
            key={index}
            id={`input${index + 1}`}
            ref={(el) => (inputRefs.current[index] = el)}
            value={inputValues[`input${index + 1}`]}
            onValueChange={handleInputChange}
            previousId={index === 0 ? null : `input${index}`}
            nextId={index === 5 ? null : `input${index + 2}`}
          />
        ))}
      </div>
      <div className="text-center pb-5">
        <p className="mb-3">Don't you received the OTP? <button className="resend-otp" onClick={handleResendOtp}>Resend OTP</button></p>
        <button onClick={handleSubmit} className="df-btn reg-btn">Submit</button>
      </div>
    </>
  );
};

const OTPInput = React.forwardRef(
  ({ id, previousId, nextId, value, onValueChange }, ref) => {
    const handleKeyUp = (e) => {
      if (e.keyCode === 8 || e.keyCode === 37) {
        const prev = document.getElementById(previousId);
        if (prev) {
          prev.focus();
        }
      } else if (
        (e.keyCode >= 48 && e.keyCode <= 57) ||
        (e.keyCode >= 65 && e.keyCode <= 90) ||
        (e.keyCode >= 96 && e.keyCode <= 105) ||
        e.keyCode === 39
      ) {
        const next = document.getElementById(nextId);
        if (next) {
          next.focus();
        }
      }
    };

    return (
      <input
        id={id}
        ref={ref}
        name={id}
        type="text"
        className={"DigitInput"}
        value={value}
        maxLength="1"
        onChange={(e) => onValueChange(id, e.target.value)}
        onKeyUp={handleKeyUp}
      />
    );
  }
);

export default OTPInputGroup;
