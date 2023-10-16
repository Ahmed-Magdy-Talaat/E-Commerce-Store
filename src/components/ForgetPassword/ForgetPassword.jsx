import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [codeError, setCodeError] = useState("");
  const navigate = useNavigate();

  const postEmail = async (obj) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        obj
      );
      setError("");
      if (response.data.statusMsg === "success") {
        document.querySelector(".forgetPass").classList.add("d-none");
        document.querySelector(".verifyCode").classList.remove("d-none");
      }
    } catch (err) {
      console.log("Error ", err);
      setCodeError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const postCode = async (obj) => {
    setIsLoading(true);
    console.log(obj);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        obj
      );
      if (response.data.status === "Success") {
        navigate("/resetPass");
      }
    } catch (err) {
      console.error(err);
      setCodeError(err.response.data.message); // Use err.response.data.message
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (obj) => postEmail(obj),
  });

  const verifyFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: (obj) => postCode(obj),
  });

  return (
    <div className="container col-12 col-md-8 col-lg-5  mt-5 mt-5">
      <div className=" d-flex flex-column justify-content-center align-items-center align-content-center ">
        <form
          className="mt-1 mb-3 rssp container w-100 d-flex flex-column forgetPass"
          onSubmit={formik.handleSubmit}
        >
          <div className="fw-bold fs-4 mt-3 mb-3 d-flex gap-3 align-content-center align-items-center">
            <i class="fa-solid fa-lock fcolor"></i>
            <div className="fcolor"> Forget Password</div>
          </div>
          <div className="d-flex flex-column gap-1 mt-2 ">
            {error !== "" && (
              <div className="alert alert-danger p-1 ">{error}</div>
            )}
            <label className="form-label" htmlFor="email">
              Email :
            </label>
            <input
              type="text"
              name="email"
              className="form-control"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="alert alert-danger mt-1 px-2 py-1" role="alert">
                {formik.errors.email}
              </div>
            )}
            <div className="d-flex ms-auto mt-3 align-content-center">
              {!isLoading ? (
                <button
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  className="btn-1 py-2 my-3 ms-auto rounded-4"
                >
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-1 px-1 py-2 my-3 ms-auto rounded-4 "
                >
                  <i className="fas fa-spinner fa-spin "></i>
                </button>
              )}
            </div>
          </div>
        </form>

        <form
          className="mt-1 mb-3 rssp container w-75 d-flex flex-column verifyCode d-none"
          onSubmit={verifyFormik.handleSubmit}
        >
          {codeError !== "" && (
            <div className="alert alert-danger p-1">{codeError}</div>
          )}
          <div className="d-flex flex-column gap-1 mt-2 ">
            <div className="fw-bold fs-4 mt-3 mb-3 d-flex gap-3 align-content-center align-items-center">
              <i class="fa-solid fa-lock fcolor"></i>
              <div className="fcolor">Verify Code</div>
            </div>
            <input
              type="text"
              name="resetCode"
              className="form-control"
              value={verifyFormik.values.resetCode}
              onChange={verifyFormik.handleChange}
              onBlur={verifyFormik.handleBlur}
            />
            {verifyFormik.errors.resetCode &&
              verifyFormik.touched.resetCode && (
                <div className="alert alert-danger mt-1 px-2 py-1" role="alert">
                  {verifyFormik.errors.resetCode}
                </div>
              )}
            <div className="d-flex ms-auto mt-3 align-content-center">
              {!isLoading ? (
                <button
                  type="submit"
                  disabled={!(verifyFormik.isValid && verifyFormik.dirty)}
                  className="btn-1 py-2 my-3 ms-auto rounded-4"
                >
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-1 px-1 py-2 my-3 ms-auto rounded-4 "
                >
                  <i className="fas fa-spinner fa-spin "></i>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
