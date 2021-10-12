import React, { Component } from "react";
import * as Yup from "yup";
import { Row, Col } from "antd";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { UserInfoStyle } from "./style";
import { userInfoConst } from "./constant";
import { Input, Label, Button } from "components/Form";
import { FormValidation, ButtonConst } from "App/AppConstant";

const ValidationSchema = Yup.object().shape({
  firstname: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[A-Za-z]*$/, FormValidation.nameValid),
  middleName: Yup.string()
    .trim()
    .matches(/^[A-Za-z]*$/, FormValidation.nameValid),
  lastName: Yup.string()
    .trim()
    .matches(/^[A-Za-z]*$/, FormValidation.nameValid),
  emailId: Yup.string().trim().email(FormValidation.emailInvalid).required(" "),
  mobile: Yup.string()
    .trim()
    .required(" ")
    .min(10, FormValidation.mobileInvalid)
    .max(10, FormValidation.mobileInvalid),
});

class userInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false,
      initState: {
        userId: 0,
        firstname: "",
        middleName: "",
        lastName: "",
        emailId: "",
        mobile: "",
      },
    };
  }

  componentDidUpdate(prevProps) {
    const { userById } = this.props;
    if (prevProps.userById !== userById) {
      let data = {
        userId: userById.userId,
        firstname: userById.firstname,
        middleName: userById.middleName,
        lastName: userById.lastName,
        emailId: userById.emailId,
        mobile: userById.mobile,
      };
      this.setState({ initState: data });
    }
  }
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let userData = {
        userId: values.userId,
        firstname: values.firstname.trim(),
        middleName: values.middleName.trim(),
        lastName: values.lastName.trim(),
        emailId: values.emailId.trim(),
        mobile: values.mobile,
      };
      this.props.countInc(userData);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { initState, btnDisable } = this.state;
    // const { user } = this.props;
    return (
      <UserInfoStyle>
        <Formik
          initialValues={initState}
          validationSchema={ValidationSchema}
          onSubmit={this.handleSubmit}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            onBlur,
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="anime">
                  <div className="field">
                    <Label
                      title={
                        userInfoConst.firstName +
                        FormValidation.req +
                        FormValidation.colon
                      }
                      className={
                        errors.firstname && touched.firstname ? "empty" : ""
                      }
                    />
                    <Input
                      className={
                        errors.firstname && touched.firstname ? "empty" : ""
                      }
                      onBlur={handleBlur}
                      name="firstname"
                      value={values.firstname}
                      handleChange={handleChange}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="anime">
                  <div className="field">
                    <Label
                      title={userInfoConst.middleName + FormValidation.colon}
                      className={
                        errors.middleName && touched.middleName ? "empty" : ""
                      }
                    />
                    <Input
                      onBlur={handleBlur}
                      name="middleName"
                      value={values.middleName}
                      handleChange={handleChange}
                      className={
                        errors.middleName && touched.middleName ? "empty" : ""
                      }
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="anime">
                  <div className="field">
                    <Label
                      title={userInfoConst.lastName + FormValidation.colon}
                      className={
                        errors.lastName && touched.lastName ? "empty" : ""
                      }
                    />
                    <Input
                      onBlur={handleBlur}
                      name="lastName"
                      value={values.lastName}
                      handleChange={handleChange}
                      className={
                        errors.lastName && touched.lastName ? "empty" : ""
                      }
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="anime">
                  <div className="field">
                    <Label
                      title={
                        userInfoConst.email +
                        FormValidation.req +
                        FormValidation.colon
                      }
                      className={
                        errors.emailId && touched.emailId ? "empty" : ""
                      }
                    />
                    <Input
                      className={
                        errors.emailId && touched.emailId ? "empty" : ""
                      }
                      onBlur={handleBlur}
                      name="emailId"
                      value={values.emailId}
                      handleChange={handleChange}
                    />
                    {errors.emailId && touched.emailId && (
                      <div className="form-error">{errors.emailId}</div>
                    )}
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="anime">
                  <div className="field">
                    <Label
                      title={
                        userInfoConst.mobile +
                        FormValidation.req +
                        FormValidation.colon
                      }
                      className={errors.mobile && touched.mobile ? "empty" : ""}
                    />
                    <Input
                      className={errors.mobile && touched.mobile ? "empty" : ""}
                      type="number"
                      onBlur={handleBlur}
                      name="mobile"
                      value={values.mobile}
                      handleChange={handleChange}
                    />
                    {errors.mobile && touched.mobile && (
                      <div className="form-error">{errors.mobile}</div>
                    )}
                  </div>
                </Col>
              </Row>
              <div className="btnDiv">
                <div className="nextDiv">
                  <Button onClick={() => this.props.history.push("/users")}>
                    {ButtonConst.cancel}
                  </Button>
                  <Button type="submit" disabled={btnDisable}>
                    {ButtonConst.next}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </UserInfoStyle>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.user.loading,
  error: state.user.error,
  message: state.user.message,
  user: state.user.user,
  userById: state.user.userById,
});
const mapDispatchToProps = (dispatch) => ({
  // getUserById: (id) => dispatch(getUserById(id)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(userInfo)
);
