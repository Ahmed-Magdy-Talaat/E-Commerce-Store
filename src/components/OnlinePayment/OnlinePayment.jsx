import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { cartContext } from "../CartContext/CartContext";

function OnlinePayment() {
  const { payment, getItems } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (obj) => {
    const { data } = await getItems();
    const response = await payment(data.data._id, obj);
    console.log(response);
    window.location.href = response.data.session.url;
  };
  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "This phone number is invalid")
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: (obj) => handleSubmit(),
  });
  return (
    <div className="container col-12 col-md-9 col-lg-6 rssp  mt-5">
      <div className=" d-flex flex-column justify-content-center align-items-center align-content-center ">
        {err && (
          <div className="alert text-center py-1 w-75 alert-danger">{err}</div>
        )}
        <form
          className="mt-1 mb-3  container w-75 d-flex flex-column"
          onSubmit={formik.handleSubmit}
        >
          <div className="fw-bold fs-4 mt-3 mb-3 d-flex gap-3 align-content-center align-items-center">
            <i class="fa-solid fa-money-bill-wave fcolor"></i>
            <div className="fcolor"> Online Payment</div>
          </div>

          <div className="d-flex flex-column gap-1 mt-2 ">
            <label className="form-label" htmlFor="details">
              Details
            </label>
            <input
              type="text"
              name="details"
              className="form-control"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="d-flex flex-column gap-1 mt-3 ">
            <label className="form-label" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <div>
              {formik.errors.phone && formik.touched.phone && (
                <div className="alert alert-danger mt-1 px-2 py-1" role="alert">
                  {formik.errors.phone}
                </div>
              )}
            </div>
          </div>

          <div className="d-flex flex-column gap-1 mt-3 ">
            <label className="form-label" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="d-flex justify-content-center mt-2 align-content-center">
            {!isLoading ? (
              <button
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                className="btn-1 fs-5 py-2 my-3 col-4 rounded-4"
              >
                Pay
              </button>
            ) : (
              <button>
                <Link
                  className="btn btn-1 px-2 fs-5 col-4 ms-3 my-3 rounded-4"
                  to="/signUp"
                >
                  Pay
                </Link>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default OnlinePayment;
