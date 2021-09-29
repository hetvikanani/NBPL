import React, { Component } from "react";
import { Input, Label, Button, Select } from "components/Form";
import { Row, Col } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ProfileStyle } from "../style";
import { FinancialConst } from "../constant";

const ValidationSchema = Yup.object().shape({
  bank_name: Yup.string().trim().required(" "),
  branch_name: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[aA-zZ\s]+$/, ""),
  account_no: Yup.string().trim().min(11).max(11).required(" "),
  ifsc_code: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "only"),
  address: Yup.string().trim().required(" "),
  pincode: Yup.string().trim().required(" ").min(6).max(6),
  city: Yup.string().trim().required(" "),
  state: Yup.string().trim().required(" "),
});

export default class FinancialDetails extends Component {
  constructor() {
    super();
    this.state = {
      initState: {
        bank_name: "",
        branch_name: "",
        account_no: "",
        ifsc_code: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
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
    let bank = [
      "Canara Bank",
      "Bank of India",
      "Bank of Baroda",
      "Punjab Bank",
    ];
    let city = ["Rajkot", "Ahmedabad", "Surat", "Baroda"];
    let state = ["Gujarat", "Utter Pradesh", "Goa", "Maharastra"];

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
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row gutter={24}>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Label
                      title={FinancialConst.bank_name}
                      className={
                        errors.bank_name && touched.bank_name ? "empty" : ""
                      }
                    ></Label>
                    <Select
                      placeholder={FinancialConst.bank_nameplace}
                      data={bank}
                      selectClass={
                        errors.bank_name && touched.bank_name ? "empty" : ""
                      }
                      name="bank_name"
                      tabIndex="1"
                      value={values.bank_name}
                      onChange={(value) => {
                        setFieldValue("bank_name", value);
                      }}
                    ></Select>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Label
                      title={FinancialConst.branch_name}
                      className={
                        errors.branch_name && touched.branch_name ? "empty" : ""
                      }
                    ></Label>
                    <Input
                      placeholder={FinancialConst.branch_nameplace}
                      className={
                        errors.branch_name && touched.branch_name ? "empty" : ""
                      }
                      onBlur={handleBlur}
                      name="branch_name"
                      value={values.branch_name}
                      handleChange={handleChange}
                      tabIndex="2"
                    ></Input>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Label
                      title={FinancialConst.account_no}
                      className={
                        errors.account_no && touched.account_no ? "empty" : ""
                      }
                    ></Label>
                    <Input
                      placeholder={FinancialConst.account_noplace}
                      type="number"
                      className={
                        errors.account_no && touched.account_no ? "empty" : ""
                      }
                      onBlur={handleBlur}
                      name="account_no"
                      value={values.account_no}
                      handleChange={handleChange}
                      tabIndex="3"
                    ></Input>
                  </Col>

                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Label
                      title={FinancialConst.ifsc}
                      className={
                        errors.ifsc_code && touched.ifsc_code ? "empty" : ""
                      }
                    ></Label>
                    <Input
                      placeholder={FinancialConst.ifscplace}
                      className={
                        errors.ifsc_code && touched.ifsc_code ? "empty" : ""
                      }
                      onBlur={handleBlur}
                      name="ifsc_code"
                      value={values.ifsc_code}
                      handleChange={handleChange}
                      tabIndex="4"
                    ></Input>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Label
                      title={FinancialConst.address}
                      className={
                        errors.address && touched.address ? "empty" : ""
                      }
                    ></Label>
                    <Input
                      rows={2}
                      placeholder={FinancialConst.addressplace}
                      className={
                        errors.address && touched.address ? "empty" : ""
                      }
                      onBlur={handleBlur}
                      name="address"
                      value={values.address}
                      handleChange={handleChange}
                      tabIndex="5"
                    ></Input>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Label
                      title={FinancialConst.pincode}
                      className={
                        errors.pincode && touched.pincode ? "empty" : ""
                      }
                    ></Label>
                    <Input
                      placeholder={FinancialConst.pincodeplace}
                      className={
                        errors.pincode && touched.pincode ? "empty" : ""
                      }
                      onBlur={handleBlur}
                      name="pincode"
                      type="number"
                      value={values.pincode}
                      handleChange={handleChange}
                      tabIndex="6"
                    ></Input>
                  </Col>

                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Label
                      title={FinancialConst.city}
                      className={errors.city && touched.city ? "empty" : ""}
                    ></Label>
                    <Select
                      placeholder={FinancialConst.cityplace}
                      data={city}
                      selectClass={errors.city && touched.city ? "empty" : ""}
                      name="city"
                      tabIndex="7"
                      value={values.city}
                      onChange={(value) => {
                        setFieldValue("city", value);
                      }}
                    ></Select>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Label
                      title={FinancialConst.state}
                      className={errors.state && touched.state ? "empty" : ""}
                    ></Label>
                    <Select
                      placeholder={FinancialConst.stateplace}
                      data={state}
                      selectClass={errors.state && touched.state ? "empty" : ""}
                      name="state"
                      tabIndex="8"
                      value={values.state}
                      onChange={(value) => {
                        setFieldValue("state", value);
                      }}
                    ></Select>
                  </Col>
                </Row>
                <div className="btnDiv">
                  <Button type="submit">Update</Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
     
    );
  }
}
