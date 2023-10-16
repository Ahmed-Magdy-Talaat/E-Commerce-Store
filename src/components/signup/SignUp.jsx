import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "name must at least be 3 letters")
      .max(10, "name must at most 10 letters")
      .required(),
    email: Yup.string().email().required(),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "This phone number is invalid")
      .required(),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])(?=.*[0-9a-zA-Z]).{8,}$/,
        "Password must be at least eight characters starting with an uppercase letter, one special character, and alphanumeric characters"
      )
      .required(),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Re-enter your password"),
  });

  async function registerSubmit(obj) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        obj
      );
      if (data.message === "success") {
        navigate("/signIn");
      }
    } catch (error) {
      setErr(error.response.data.message);
    }
    setIsLoading(false);
    console.log(obj);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (obj) => registerSubmit(obj),
  });
  //<i class=""></i>
  return (
    <div className="container col-12 col-md-8 col-lg-5  mt-3 rssp">
      <div className=" d-flex flex-column justify-content-center align-items-center align-content-center ">
        {err !== "" && (
          <div className="alert text-center py-1 w-100 alert-danger">{err}</div>
        )}
        <form
          className="mt-1 mb-3 container w-100 d-flex flex-column"
          onSubmit={formik.handleSubmit}
        >
          <div className="fw-bold fs-4 mt-3 mb-3 d-flex gap-3 align-content-center align-items-center">
            <i class="fa-solid fa-user-plus fcolor"></i>
            <div className="fcolor"> Sign Up</div>
          </div>
          <div className="d-flex flex-column flex-lg-row flex-md-row justify-content-between align-content-center gap-3">
            <div className="d-flex flex-column gap-1 mt-2 col-md-6">
              <label className="form-label" htmlFor="firstName">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name && (
                <div className="alert alert-danger mt-1 px-2 py-1" role="alert">
                  {formik.errors.name}
                </div>
              )}
            </div>

            <div className="d-flex flex-column gap-1 mt-2 col-md-6 ">
              <label className="form-label" htmlFor="phone">
                phone
              </label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phone && formik.touched.phone && (
                <div className="alert alert-danger mt-1 px-2 py-1" role="alert">
                  {formik.errors.phone}
                </div>
              )}
            </div>
          </div>

          <div className="d-flex flex-column gap-1 mt-3 ">
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
            {formik.errors.email && formik.touched.email && (
              <div className="alert alert-danger mt-1 px-2 py-1" role="alert">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div className="d-flex flex-column gap-1 mt-3  ">
            <label className="form-label" htmlFor="pass">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="alert alert-danger mt-1 px-2 py-1" role="alert">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="d-flex flex-column gap-1 mt-3  ">
            <label className="form-label" htmlFor="repass">
              Repassword
            </label>
            <input
              type="password"
              name="rePassword"
              className="form-control"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
              <div className="alert alert-danger mt-1 px-2 py-1" role="alert">
                {formik.errors.rePassword}
              </div>
            )}
          </div>

          {!isLoading ? (
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              className="btn-1 px-4 py-2 my-3 ms-auto rounded-4"
            >
              Register
            </button>
          ) : (
            <button
              type="button"
              className="btn-1 px-4 py-2 my-3 ms-auto rounded-4 "
            >
              <i className="fas fa-spinner fa-spin "></i>
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
