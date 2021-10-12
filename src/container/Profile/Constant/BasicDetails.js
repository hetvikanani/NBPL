import React, { Component } from "react";
import { Input, Label, Button, Select, FileUpload } from "components/Form";
import { Row, Col, Image } from "antd";
import { CloseOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { BasicConst } from "../constant";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { changePartnerData } from "redux/partner/action";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  FormValidation,
  panConst,
  gstConst,
  ButtonConst,
} from "App/AppConstant";

const UserValidation = Yup.object().shape({
  companyName: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[aA-zZ0-9\s]+$/, FormValidation.aadharInvalid),
  partner_code: Yup.string().trim().required(" "),
  email: Yup.string().trim().email().required(FormValidation.emailInvalid),
  mobile: Yup.string()
    .trim()
    .min(10)
    .max(10)
    .required(FormValidation.mobileInvalid),
  gst: Yup.string()
    .trim()
    .required(" ")
    .matches(gstConst, FormValidation.gstvalid),
  pan: Yup.string().trim().matches(panConst, FormValidation.panValid),
  aadhar: Yup.string().trim().min(12).max(12),
});

class BasicDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      gstType: false,
      gstNoError: false,
      imgnm: "",
      imgByte: "",
      imgBase64: "",
      isDataSet: false,
    };
  }
  // constructor() {
  //   super();
  //   this.state = {
  //     imgByte: "",
  //     imgnm: "",
  //     initState: {
  //       companyName: "",
  //       partner_code: "",
  //       email: "",
  //       mobile_no: "",
  //       gst_type: "",
  //       gst_number: "",
  //       pan_number: "",
  //       aadhar_number: "",
  //     },
  //   };
  // }

  changeDataForm = (fieldName, value) =>
    this.props.changePartnerData(fieldName, value);

  switchChange = (setFieldValue) => {
    this.changeDataForm("gstType", !this.state.gstType);
    setFieldValue("gstType", !this.state.gstType);
    this.setState({ gstType: !this.state.gstType });
  };

  fileUpload = () => {
    try {
      const { imgnm, imgByte } = this.state;
      let name = imgnm;
      if (imgnm && imgByte) {
        let a = name.split(".");
        name = a[0].substr(0, 5) + "." + a[1];
        return (
          <>
            <span className="optionui">
              <span className="txtWrap">{"name"}</span>
              <CloseOutlined onClick={() => this.removefile()} />
            </span>
            <Image src={imgByte} width={50} height={30} />
          </>
        );
      }
      return (
        <FileUpload
          accept=".jpg, .jpeg, .png"
          image={true}
          sendByte={this.setByte}
          elements={
            <Button color="secondary" className="uploadbtn">
              <VerticalAlignTopOutlined />
              {ButtonConst.upload}
            </Button>
          }
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  removefile = () => this.setState({ imgByte: "", imgnm: "" });
  setByte = (byteCode, name) =>
    this.setState({ imgByte: byteCode, imgnm: name });
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

  handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { gstType } = this.state;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      this.props.changePartnerData("img", this.state.imgBase64);
      this.props.countInc();
      setSubmitting(false);
    } catch (error) {
      console.log(error, "handle error");
    }
  };

  render() {
    // const { initState } = this.state;
    let gst = ["Yes", "No"];
    const { disable, gstNoError } = this.state;
    const { partner } = this.props;
    return (
      <div>
        <Formik
          initialValues={partner}
          validationSchema={UserValidation}
          onSubmit={this.handleSubmit}
          enableReinitialize
          // initialValues={initState}
          // validationSchema={ValidationSchema}
          // onSubmit={this.handleSubmit}
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
                    title={BasicConst.company_name}
                    className={
                      errors.companyName && touched.companyName ? "empty" : ""
                    }
                  />
                  <Input
                    // placeholder={BasicConst.company_nameplace}
                    className={
                      errors.companyName && touched.companyName ? "empty" : ""
                    }
                    onBlur={handleBlur}
                    name="companyName"
                    value={values.companyName}
                    handleChange={handleChange}
                    handleChange={(e) => {
                      this.changeDataForm("companyName", e.target.value);
                      setFieldValue("companyName", e.target.value);
                    }}
                    tabIndex="1"
                    className={
                      errors.companyName && touched.companyName ? "empty" : ""
                    }
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={BasicConst.partner_code}
                    className={
                      errors.partner_code && touched.partner_code ? "empty" : ""
                    }
                  />
                  <Input
                    // placeholder={BasicConst.partner_codeplace}
                    type="number"
                    className={
                      errors.partner_code && touched.partner_code ? "empty" : ""
                    }
                    onBlur={handleBlur}
                    name="partner_code"
                    value={values.partner_code}
                    handleChange={handleChange}
                    tabIndex="2"
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={BasicConst.email_id}
                    className={errors.email && touched.email ? "empty" : ""}
                  />
                  <Input
                    // placeholder={BasicConst.email_idplace}
                    className={errors.email && touched.email ? "empty" : ""}
                    onBlur={handleBlur}
                    name="email"
                    value={values.email}
                    // handleChange={handleChange}
                    handleChange={(e) => {
                      this.changeDataForm("email", e.target.value);
                      setFieldValue("email", e.target.value);
                    }}
                    tabIndex="3"
                  />
                  {errors.email && touched.email && (
                    <div className="form-error">{errors.email}</div>
                  )}
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={BasicConst.mobile_no}
                    className={errors.mobile && touched.mobile ? "empty" : ""}
                  />
                  <Input
                    // placeholder={BasicConst.mobile_noplace}
                    type="number"
                    className={errors.mobile && touched.mobile ? "empty" : ""}
                    onBlur={handleBlur}
                    name="mobile"
                    value={values.mobile}
                    // handleChange={handleChange}
                    handleChange={(e) => {
                      this.changeDataForm("mobile", e.target.value);
                      setFieldValue("mobile", e.target.value);
                    }}
                    tabIndex="4"
                  />
                  {errors.mobile && touched.mobile && (
                    <div className="form-error">{errors.mobile}</div>
                  )}
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={BasicConst.gst_type}
                    className={
                      errors.gst_type && touched.gst_type ? "empty" : ""
                    }
                  />
                  <Select
                    // placeholder={BasicConst.gst_typeplace}
                    data={gst}
                    selectClass={
                      errors.gst_type && touched.gst_type ? "empty" : ""
                    }
                    name="gst_type"
                    tabIndex="5"
                    value={values.gst_type}
                    onChange={(value) => {
                      setFieldValue("gst_type", value);
                    }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={BasicConst.gst_number}
                    className={
                      errors.gst_number && touched.gst_number ? "empty" : ""
                    }
                  />
                  <Input
                    // placeholder={BasicConst.gst_numberplace}
                    className={
                      errors.gst_number && touched.gst_number ? "empty" : ""
                    }
                    onBlur={handleBlur}
                    name="gst_number"
                    value={values.gst_number}
                    handleChange={handleChange}
                    tabIndex="6"
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={BasicConst.pan}
                    className={errors.pan && touched.pan ? "empty" : ""}
                  />
                  <Input
                    // placeholder={BasicConst.panplace}
                    className={errors.pan && touched.pan ? "empty" : ""}
                    onBlur={handleBlur}
                    name="pan"
                    value={values.pan}
                    // handleChange={handleChange}
                    handleChange={(e) => {
                      this.changeDataForm("pan", e.target.value);
                    }}
                    tabIndex="7"
                  />
                  {errors.pan && touched.pan && (
                    <div className="form-error">{errors.pan}</div>
                  )}
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={BasicConst.aadhar}
                    className={errors.aadharr && touched.aadhar ? "empty" : ""}
                  />
                  <Input
                    // placeholder={BasicConst.aadharplace}
                    className={errors.aadhar && touched.aadhar ? "empty" : ""}
                    type="number"
                    onBlur={handleBlur}
                    name="aadhar"
                    value={values.aadhar}
                    handleChange={handleChange}
                    tabIndex="7"
                  />
                  {errors.aadhar && touched.aadhar && (
                    <div className="form-error">{errors.aadhar}</div>
                  )}
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label title={BasicConst.companylogo} />
                  <>{this.fileUpload()}</>
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
  partner: state.partner.partner,
});
const mapDispatchToProps = (dispatch) => ({
  changePartnerData: (key, value) => dispatch(changePartnerData(key, value)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BasicDetails)
);
