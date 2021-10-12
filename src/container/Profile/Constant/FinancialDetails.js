import React, { Component } from "react";
import { Input, Label, Button, Select } from "components/Form";
import { Row, Col } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FinancialConst } from "../constant";
import { ButtonConst } from "App/AppConstant";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { changePartnerData } from "redux/partner/action";

const UserValidation = Yup.object().shape({
  bankName: Yup.string().trim().required(" "),
  branchName: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[aA-zZ\s]+$/, ""),
  accountNumber: Yup.string().trim().min(11).max(11).required(" "),
  ifscCode: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "only"),
  address: Yup.string().trim().required(" "),
  pincode: Yup.string().trim().required(" ").min(6).max(6),
  city: Yup.string().trim().required(" "),
  state: Yup.string().trim().required(" "),
});

class FinancialDetails extends Component {
  constructor() {
    super();
    this.state = {
      disable: false,
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

  changeDataForm = (fieldName, value) =>
    this.props.changePartnerData(fieldName, value);

  render() {
    const { disable } = this.state;
    const { partner } = this.props;

    let bank = [
      "Canara Bank",
      "Bank of India",
      "Bank of Baroda",
      "Punjab Bank",
    ];
    let city = ["Rajkot", "Ahmedabad", "Surat", "Baroda"];
    let state = ["Gujarat", "Utter Pradesh", "Goa", "Maharastra"];

    // const { initState } = this.state;

    return (
      <div>
        <Formik
          initialValues={partner}
          validationSchema={UserValidation}
          onSubmit={this.handleSubmit}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            onBlur,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row gutter={24}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={FinancialConst.bank_name}
                    className={
                      errors.bankName && touched.bankName ? "empty" : ""
                    }
                  />
                  <Input
                    onBlur={handleBlur}
                    name="bankName"
                    value={values.bankName}
                    handleChange={(e) => {
                      handleChange(e);
                      this.changeDataForm("bankName", e.target.value);
                    }}
                    tabIndex="1"
                    className={
                      errors.bankName && touched.bankName ? "empty" : ""
                    }
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={FinancialConst.branch_name}
                    className={
                      errors.branchName && touched.branchName ? "empty" : ""
                    }
                  />
                  <Input
                    className={
                      errors.branchName && touched.branchName ? "empty" : ""
                    }
                    onBlur={handleBlur}
                    name="branchName"
                    value={values.branchName}
                    handleChange={(e) => {
                      handleChange(e);
                      this.changeDataForm("branchName", e.target.value);
                    }}
                    tabIndex="2"
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={FinancialConst.account_no}
                    className={
                      errors.accountNumber && touched.accountNumber
                        ? "empty"
                        : ""
                    }
                  />
                  <Input
                    type="number"
                    className={
                      errors.accountNumber && touched.accountNumber
                        ? "empty"
                        : ""
                    }
                    onBlur={handleBlur}
                    name="accountNumber"
                    value={values.accountNumber}
                    handleChange={(e) => {
                      handleChange(e);
                      this.changeDataForm("accountNumber", e.target.value);
                    }}
                    tabIndex="3"
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={FinancialConst.ifsc}
                    className={
                      errors.ifsc_code && touched.ifsc_code ? "empty" : ""
                    }
                  />
                  <Input
                    className={
                      errors.ifscCode && touched.ifscCode ? "empty" : ""
                    }
                    onBlur={handleBlur}
                    name="ifscCode"
                    value={values.ifscCode}
                    handleChange={(e) => {
                      handleChange(e);
                      this.changeDataForm("ifscCode", e.target.value);
                    }}
                    tabIndex="4"
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={FinancialConst.address}
                    className={errors.address && touched.address ? "empty" : ""}
                  />
                  <Input
                    rows={2}
                    className={errors.address && touched.address ? "empty" : ""}
                    onBlur={handleBlur}
                    name="address"
                    handleChange={(e) => {
                      handleChange(e);
                      this.changeDataForm("address", e.target.value);
                    }}
                    value={values.address}
                    tabIndex="5"
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={FinancialConst.pincode}
                    className={errors.pincode && touched.pincode ? "empty" : ""}
                  />
                  <Input
                    className={errors.pincode && touched.pincode ? "empty" : ""}
                    onBlur={handleBlur}
                    name="pincode"
                    type="number"
                    value={values.pincode}
                    handleChange={(e) => {
                      handleChange(e);
                      this.changeDataForm("pincode", e.target.value);
                    }}
                    tabIndex="6"
                  />
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={8}
                  xl={8}
                  className="anime highZ2"
                >
                  <Label
                    title={FinancialConst.state}
                    className={errors.state && touched.state ? "empty" : ""}
                  />
                  <Input
                    onBlur={handleBlur}
                    name="state"
                    value={values.state}
                    handleChange={(e) => {
                      handleChange(e);
                      this.changeDataForm("state", e.target.value);
                    }}
                    tabIndex="8"
                    className={errors.state && touched.state ? "empty" : ""}
                  />
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={8}
                  xl={8}
                  className="anime highZ"
                >
                  <Label
                    title={FinancialConst.city}
                    className={errors.city && touched.city ? "empty" : ""}
                  />
                  <Input
                    onBlur={handleBlur}
                    name="city"
                    value={values.city}
                    handleChange={(e) => {
                      handleChange(e);
                      this.changeDataForm("city", e.target.value);
                    }}
                    tabIndex="7"
                    className={errors.city && touched.city ? "empty" : ""}
                  />
                </Col>
              </Row>
              <div className="btnDiv anime">
                <Button type="submit">{ButtonConst.update}</Button>
              </div>
            </Form>
          )}
        </Formik>
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
  connect(mapStateToProps, mapDispatchToProps)(FinancialDetails)
);
