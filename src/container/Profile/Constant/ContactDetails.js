import React, { Component } from "react";
import { Row, Col, Divider } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Input, Label, Button } from "components/Form";
import { ContactConst } from "../constant";
import { ButtonConst, FormValidation } from "App/AppConstant";

const ValidationSchema = Yup.object().shape({
  contact_name: Yup.string()
    .trim()
    .required(FormValidation.alphaNumValid)
    .matches(/^[aA-zZ0-9\s]+$/, FormValidation.alphaValid),
  mobile_no: Yup.string()
    .trim()
    .min(10)
    .max(10)
    .required(FormValidation.mobileInvalid),
  email_id: Yup.string().trim().email().required(FormValidation.emailInvalid),
});

export default class ContactDetails extends Component {
  constructor() {
    super();
    this.state = {
      initState: { contact_name: "", mobile_no: "", email_id: "" },
    };
  }

  handleSubmit = async (values, { setSubmitting }) => {
    try {
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { initState } = this.state;
    return (
      <div>
        <Formik
          initialValues={initState}
          validationSchema={ValidationSchema}
          onSubmit={this.handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            onBlur,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={ContactConst.contact_name}
                    className={
                      errors.contact_name && touched.contact_name ? "empty" : ""
                    }
                  />
                  <Input
                    // placeholder={ContactConst.contact_nameplace}
                    className={
                      errors.contact_name && touched.contact_name ? "empty" : ""
                    }
                    onBlur={handleBlur}
                    name="contact_name"
                    value={values.contact_name}
                    handleChange={handleChange}
                    tabIndex="1"
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={ContactConst.mobile}
                    className={
                      errors.mobile_no && touched.mobile_no ? "empty" : ""
                    }
                  />
                  <Input
                    // placeholder={ContactConst.mobileplace}
                    type="number"
                    className={
                      errors.mobile_no && touched.mobile_no ? "empty" : ""
                    }
                    onBlur={handleBlur}
                    name="mobile_no"
                    value={values.mobile_no}
                    handleChange={handleChange}
                    tabIndex="2"
                  />
                  {errors.mobile_no && touched.mobile_no && (
                    <div className="form-error">{errors.mobile_no}</div>
                  )}
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={ContactConst.email}
                    className={
                      errors.email_id && touched.email_id ? "empty" : ""
                    }
                  />
                  <Input
                    // placeholder={ContactConst.emailplace}
                    className={
                      errors.email_id && touched.email_id ? "empty" : ""
                    }
                    onBlur={handleBlur}
                    name="email_id"
                    value={values.email_id}
                    handleChange={handleChange}
                    tabIndex="3"
                  />
                  {errors.email_id && touched.email_id && (
                    <div className="form-error">{errors.email_id}</div>
                  )}
                </Col>

                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label title={ContactConst.designation} />
                  <Input
                  // placeholder={ContactConst.designationplace}
                  />
                </Col>
              </Row>
              <div className="btnDiv anime">
                <Button type="submit">{ButtonConst.save}</Button>
              </div>
            </Form>
          )}
        </Formik>
        <Divider />
      </div>
    );
  }
}
