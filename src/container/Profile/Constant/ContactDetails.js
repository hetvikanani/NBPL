import React, { Component } from "react";
import { Row, Col, Divider } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { changePartnerData } from "redux/partner/action";
import { Input, Label, Button } from "components/Form";
import { ContactConst } from "../constant";
import { ButtonConst, FormValidation } from "App/AppConstant";

const UserValidation = Yup.object().shape({
  contactName: Yup.string()
    .trim()
    .required(FormValidation.alphaNumValid)
    .matches(/^[aA-zZ0-9\s]+$/, FormValidation.alphaValid),
  mobile: Yup.string()
    .trim()
    .min(10)
    .max(10)
    .required(FormValidation.mobileInvalid),
  emailId: Yup.string().trim().email().required(FormValidation.emailInvalid),
  designation: Yup.string()
    .trim()
    .matches(/^[aA-zZ\s]+$/, FormValidation.alphaValid),
});

class ContactDetails extends Component {
  constructor() {
    super();
    this.state = {
      disable: false,
      prev: [],
    };
  }

  changeDataForm = (fieldName, value) =>
    this.props.changePartnerData(fieldName, value);

  handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { prev } = this.state;
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
    const { disable } = this.state;
    const { partner } = this.props;
    return (
      <div>
        <Formik
          enableReinitialize
          // initialValues={data}
          validationSchema={UserValidation}
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
                      errors.contactName && touched.contactName ? "empty" : ""
                    }
                  />
                  <Input
                    className={
                      errors.contactName && touched.contactName ? "empty" : ""
                    }
                    onBlur={handleBlur}
                    name="contactName"
                    value={values.contactName}
                    handleChange={handleChange}
                    tabIndex="1"
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={ContactConst.mobile}
                    className={errors.mobile && touched.mobile ? "empty" : ""}
                  />
                  <Input
                    type="number"
                    className={errors.mobile && touched.mobile ? "empty" : ""}
                    onBlur={handleBlur}
                    name="mobile"
                    value={values.mobile}
                    handleChange={handleChange}
                    tabIndex="2"
                  />
                  {errors.mobile && touched.mobile && (
                    <div className="form-error">{errors.mobile}</div>
                  )}
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={ContactConst.email}
                    className={errors.emailId && touched.emailId ? "empty" : ""}
                  />
                  <Input
                    className={errors.emailId && touched.emailId ? "empty" : ""}
                    onBlur={handleBlur}
                    name="emailId"
                    value={values.emailId}
                    handleChange={handleChange}
                    tabIndex="3"
                  />
                  {errors.emailId && touched.emailId && (
                    <div className="form-error">{errors.emailId}</div>
                  )}
                </Col>

                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label title={ContactConst.designation} />
                  <Input />
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

const mapStateToProps = (state) => ({
  loading: state.partner.loading,
  error: state.partner.error,
  message: state.partner.message,
  partners: state.partner.partners,
  partner: state.partner.partner,
});
const mapDispatchToProps = (dispatch) => ({
  changePartnerData: (key, value) => dispatch(changePartnerData(key, value)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContactDetails)
);
