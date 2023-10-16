import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const resetPass = async (obj) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        obj
      );
      console.log(obj);
      console.log(response);
      navigate("/signin");
    } catch (err) {
      setErr(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: (obj) => resetPass(obj),
  });

  return (
    <div className="container mt-5 col-12 col-md-8 col-lg-5">
      <form
        className="mt-1 mb-3  container w-100 d-flex flex-column verifyCode"
        onSubmit={formik.handleSubmit}
      >
        <div className="d-flex flex-row justify-content-center">
          {err && (
            <div className="alert text-center py-1 w-100 alert-danger">
              {err}
            </div>
          )}
        </div>

        <div className="fw-bold rssp fs-4 mt-3 mb-3 d-flex gap-3 align-content-center align-items-center">
          <i class="fa-solid fa-key fcolor"></i>
          <div className="fcolor">Reset Password</div>
        </div>
        <div className="d-flex flex-column gap-1 mt-2 ">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <div className="d-flex flex-column gap-1 mt-2 ">
            <label className="form-label" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              className="form-control"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
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
    </div>
  );
}

export default ResetPassword;
