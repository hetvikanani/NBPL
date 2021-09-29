import React, { Component } from "react";
import { Row, Col } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { UserInfoStyle } from "./style";
import { Input, Label, Button } from "components/Form";
import {  FormValidation } from "App/AppConstant";
import {userInfoConst} from "./constant";



const ValidationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required(" "),
  emailId: Yup.string().trim().email(FormValidation.emailInvalid),
  mobileNo: Yup.string()
    .trim().required(" ")
    .min(10, FormValidation.mobileInvalid)
    .max(10, FormValidation.mobileInvalid)
    ,
});

class userInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false,
      initState: {
        firstName: "",
        middleName: "",
        lastName: "",
        emailId: "",
        mobileNo: "",
      },
    };
  }
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
       this.props.countInc();
      
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { initState,btnDisable } = this.state;
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
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <div className="field">
                    <Label
                      title={userInfoConst.firstName}
                      className={
                        errors.firstName && touched.firstName ? "empty" : ""
                      }
                    />
                    <Input
                      className={
                        errors.firstName && touched.firstName ? "empty" : ""
                      }
                      onBlur={handleBlur}
                      name="firstName"
                      value={values.firstName}
                      handleChange={handleChange}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <div className="field">
                    <Label title={userInfoConst.middleName} />
                    <Input />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <div className="field">
                    <Label title={userInfoConst.lastName} />
                    <Input />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <div className="field">
                    <Label
                      title={userInfoConst.email}
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
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <div className="field">
                    <Label
                      title={userInfoConst.mobile}
                      className={
                        errors.mobileNo && touched.mobileNo ? "empty" : ""
                      }
                    />
                    <Input
                      className={
                        errors.mobileNo && touched.mobileNo ? "empty" : ""
                      }
                      type="number"
                      onBlur={handleBlur}
                      name="mobileNo"
                      value={values.mobileNo}
                      handleChange={handleChange}
                    />
                    {errors.mobileNo && touched.mobileNo && (
                      <div className="form-error">{errors.mobileNo}</div>
                    )}
                  </div>
                </Col>
              </Row>
              <div className="btnDiv">
                <Button type="submit" disabled={btnDisable}>{userInfoConst.next}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </UserInfoStyle>
    );
  }
}
export default userInfo;
