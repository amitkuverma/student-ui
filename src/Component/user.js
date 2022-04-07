import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

const User = () => {
  const history = useHistory();
  const location = useLocation();

  //destructuring pathname from location
  const { state } = location;
  console.log(state);
  const submitForm = async (values) => {
    const body = {
      ...values,
    };
    axios
      .post(`http://localhost:3000/user`, body)
      .then((res) => {
        if (res.data.status) {
          history.push("/student-details/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateForm = async (values) => {
    const body = {
      ...values,
    };
    console.log(body)
    axios
      .put(`http://localhost:3000/user/${state.data._id}`, body)
      .then((res) => {
        if (res.data.status) {
          history.push("/student-details/");
          alert("data updated successfully...");
        } else {
          alert("Unable to updated successfully...");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <h1 className="py-4">Student</h1>
      </div>
      <Formik
        initialValues={
          state
            ? state.data
            : {
                firstName: "",
                lastName: "",
                email: "",
                address: {
                  address_line_1: "",
                  address_line_2: "",
                  city: "",
                  zipcode: "",
                  state: "",
                },
                contact: [],
                eduProgress: [
                  {
                    score: "",
                    class: "",
                    school: "",
                  },
                ],
              }
        }
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.fullName) {
            errors.fullName = "Required";
          }
          if (!values.schoolName) {
            errors.schoolName = "Required";
          }
          if (!values.mobile) {
            errors.mobile = "Required";
          }
          return errors;
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setSubmitting,
          setFieldValue,
          setErrors,
          setFieldTouched,
        }) => (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (state) {
                updateForm(
                  values,
                  setSubmitting,
                  errors,
                  setFieldValue,
                  setFieldTouched
                );
              } else {
                submitForm(
                  values,
                  setSubmitting,
                  errors,
                  setFieldValue,
                  setFieldTouched
                );
              }
            }}
          >
            <div className="row">
              <div className="col-12 col-md-6">
                <label className="my-25  my-md-3 fnt-muli fnt-500 float-left">
                  First Name <span className="star">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  className={`${
                    errors.firstName && touched.firstName ? "invalid" : ""
                  }`}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="my-25  my-md-3 fnt-muli fnt-500 float-left">
                  Last Name <span className="star">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  className={`${
                    errors.lastName && touched.lastName ? "invalid" : ""
                  }`}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="my-25  my-md-3 fnt-muli fnt-500 float-left">
                  Email <span className="star">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={`${
                    errors.email && touched.email ? "invalid" : ""
                  }`}
                  required
                />
              </div>
              <div className="w-100">
                <div className="col-12">
                  <h4 className="float-left mt-4">Address</h4>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <label className="my-25  my-md-3 fnt-muli fnt-500 float-left">
                  Address line 1 <span className="star">*</span>
                </label>
                <input
                  type="text"
                  name="address.address_line_1"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address_line_1}
                  className={`${
                    errors.address_line_1 && touched.address_line_1
                      ? "invalid"
                      : ""
                  }`}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="my-25  my-md-3 fnt-muli fnt-500 float-left">
                  Address line 2 <span className="star">*</span>
                </label>
                <input
                  type="text"
                  name="address.address_line_2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address_line_2}
                  className={`${
                    errors.address_line_2 && touched.address_line_2
                      ? "invalid"
                      : ""
                  }`}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="my-25  my-md-3 fnt-muli fnt-500 float-left">
                  City <span className="star">*</span>
                </label>
                <input
                  type="text"
                  name="address.city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  className={`${errors.city && touched.city ? "invalid" : ""}`}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="my-25  my-md-3 fnt-muli fnt-500 float-left">
                  State <span className="star">*</span>
                </label>
                <input
                  type="text"
                  name="address.state"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.state}
                  className={`${
                    errors.state && touched.state ? "invalid" : ""
                  }`}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="my-25  my-md-3 fnt-muli fnt-500 float-left">
                  Zipcode <span className="star">*</span>
                </label>
                <input
                  type="number"
                  name="address.zipcode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.zipcode}
                  className={`${
                    errors.zipcode && touched.zipcode ? "invalid" : ""
                  }`}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="my-25  my-md-3 fnt-muli fnt-500 float-left">
                  Telephone <span className="star">*</span>
                </label>
                <input
                  type="text"
                  name="contact"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contact}
                  className={`${
                    errors.contact && touched.contact ? "invalid" : ""
                  }`}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="my-25  my-md-3 fnt-muli fnt-500 float-left">
                  Score<span className="star">*</span>
                </label>
                <input
                  type="number"
                  name="eduProgress[0].score"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.score}
                  className={`${
                    errors.score && touched.score ? "invalid" : ""
                  }`}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="my-25  my-md-3 fnt-muli fnt-500 float-left">
                  Class<span className="star">*</span>
                </label>
                <input
                  type="text"
                  name="eduProgress[0].class"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.class}
                  className={`${
                    errors.class && touched.class ? "invalid" : ""
                  }`}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="my-25  my-md-3 fnt-muli fnt-500 float-left">
                  School<span className="star">*</span>
                </label>
                <input
                  type="text"
                  name="eduProgress[0].school"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.school}
                  className={`${
                    errors.school && touched.school ? "invalid" : ""
                  }`}
                  required
                />
              </div>
            </div>
            <div className="contact-submit text-center my-4">
              <button className="submit-btn" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default User;
