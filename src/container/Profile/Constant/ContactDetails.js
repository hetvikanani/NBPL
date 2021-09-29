import React, { Component } from "react";
import { Row, Col, Divider } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Input, Label, Button } from "components/Form";
import { ContactConst } from "../constant";

const ValidationSchema = Yup.object().shape({
  contact_name: Yup.string()
    .trim()
    .required(
      "Please enter only alphanumeric letters. Special characters are not allowed"
    )
    .matches(/^[aA-zZ0-9\s]+$/, "Only alphabets are allowed for this field "),
  mobile_no: Yup.string()
    .trim()
    .min(10)
    .max(10)
    .required("Please enter valid Mobile No"),
  email_id: Yup.string()
    .trim()
    .email()
    .required("Please enter valid Email Address"),
});

export default class ContactDetails extends Component {
  constructor() {
    super();
    this.state = {
      initState: {
        contact_name: "",
        mobile_no: "",
        email_id: "",
      },
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
      console.log(error, "handle error");
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
               
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Label
                      title={ContactConst.contact_name}
                      className={
                        errors.contact_name && touched.contact_name
                          ? "empty"
                          : ""
                      }
                    ></Label>
                    <Input
                      placeholder={ContactConst.contact_nameplace}
                      className={
                        errors.contact_name && touched.contact_name
                          ? "empty"
                          : ""
                      }
                      onBlur={handleBlur}
                      name="contact_name"
                      value={values.contact_name}
                      handleChange={handleChange}
                      tabIndex="1"
                    ></Input>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Label
                      title={ContactConst.mobile}
                      className={
                        errors.mobile_no && touched.mobile_no ? "empty" : ""
                      }
                    ></Label>
                    <Input
                      placeholder={ContactConst.mobileplace}
                      type="number"
                      className={
                        errors.mobile_no && touched.mobile_no ? "empty" : ""
                      }
                      onBlur={handleBlur}
                      name="mobile_no"
                      value={values.mobile_no}
                      handleChange={handleChange}
                      tabIndex="2"
                    ></Input>
                    {errors.mobile_no && touched.mobile_no && (
                      <div className="form-error">{errors.mobile_no}</div>
                    )}
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Label
                      title={ContactConst.email}
                      className={
                        errors.email_id && touched.email_id ? "empty" : ""
                      }
                    ></Label>
                    <Input
                      placeholder={ContactConst.emailplace}
                      className={
                        errors.email_id && touched.email_id ? "empty" : ""
                      }
                      onBlur={handleBlur}
                      name="email_id"
                      value={values.email_id}
                      handleChange={handleChange}
                      tabIndex="3"
                    ></Input>
                    {errors.email_id && touched.email_id && (
                      <div className="form-error">{errors.email_id}</div>
                    )}
                  </Col>

                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Label title={ContactConst.designation}></Label>
                    <Input placeholder={ContactConst.designationplace}></Input>
                  </Col>
                 </Row>
                <div className="btnDiv">
                  <Button type="submit">Save</Button>
                </div>
              </Form>
            )}
          </Formik>
          <Divider />
        </div>     
    );
  }
}
