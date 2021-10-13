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
  partnerCode: Yup.string().trim().required(" "),
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

  changeDataForm = (fieldName, value) =>
    this.props.changePartnerData(fieldName, value);

  switchChange = (setFieldValue) => {
    this.changeDataForm("gstType", !this.state.gstType);
    setFieldValue("gstType", !this.state.gstType);
    this.setState({ gstType: !this.state.gstType });
  };

  fileUpload = (setFieldValue) => {
    try {
      const { partner } = this.props;
      let name = partner?.imgnm;

      if (partner?.imgnm || partner?.companyLogo) {
        let a = name?.split(".");
        name = a?.[0]?.substr(0, 5) + "." + a?.[1];
        return (
          <>
            <span className="optionui">
              <span className="txtWrap">{"Image" || name}</span>
              <CloseOutlined onClick={() => this.removefile(setFieldValue)} />
            </span>
            <Image src={partner?.companyLogo} width={50} height={30} />
          </>
        );
      }
      return (
        <FileUpload
          accept=".jpg, .jpeg, .png, .svg"
          image={true}
          sendByte={(a, b, c) => this.setByte(a, b, c, setFieldValue)}
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
  removefile = (setFieldValue) => {
    this.changeDataForm("companyLogo", "");
    setFieldValue("companyLogo", "");
    this.changeDataForm("imgnm", "");
    setFieldValue("imgnm", "");
    this.changeDataForm("imgBase64", "");
    setFieldValue("imgBase64", "");
    this.setState({ companyLogo: "", imgnm: "", imgBase64: "" });
  };
  setByte = (byteCode, name, base64, setFieldValue) => {
    this.changeDataForm("companyLogo", byteCode);
    setFieldValue("companyLogo", byteCode);
    this.changeDataForm("imgnm", name);
    setFieldValue("imgnm", name);
    this.changeDataForm("imgBase64", base64);
    setFieldValue("imgBase64", base64);
    this.setState({ companyLogo: byteCode, imgnm: name, imgBase64: base64 });
  };

  handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { gstType } = this.state;
      this.setState({ btnDisable: true });
      // setTimeout(() => {
      //   this.setState({ btnDisable: false });
      // }, 4500);
      this.props.changePartnerData("img", this.state.imgBase64);
      this.props.apiCall(false);

      setSubmitting(false);
    } catch (error) {
      console.log(error, "handle error");
    }
  };

  render() {
    let gst = [
      { id: 1, value: "Registred" },
      { id: 0, value: "Unregistred" },
    ];
    const { disable, gstNoError } = this.state;
    const { partner } = this.props;
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
                    title={BasicConst.company_name}
                    className={
                      errors.companyName && touched.companyName ? "empty" : ""
                    }
                  />
                  <Input
                    className={
                      errors.companyName && touched.companyName ? "empty" : ""
                    }
                    disabled={true}
                    onBlur={handleBlur}
                    name="companyName"
                    value={values.companyName}
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
                      errors.partnerCode && touched.partnerCode ? "empty" : ""
                    }
                  />
                  <Input
                    type="number"
                    className={
                      errors.partnerCode && touched.partnerCode ? "empty" : ""
                    }
                    disabled={true}
                    onBlur={handleBlur}
                    name="partnerCode"
                    value={values.partnerCode}
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
                    className={errors.email && touched.email ? "empty" : ""}
                    onBlur={handleBlur}
                    name="email"
                    value={values.email}
                    disabled={true}
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
                    type="number"
                    className={errors.mobile && touched.mobile ? "empty" : ""}
                    disabled={true}
                    onBlur={handleBlur}
                    name="mobile"
                    value={values.mobile}
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
                    className={errors.gstType && touched.gstType ? "empty" : ""}
                  />

                  <Select
                    withID
                    data={gst}
                    selectClass={
                      errors.gstType && touched.gstType ? "empty" : ""
                    }
                    name="gstType"
                    value={values.gstType}
                    onChange={(value) => {
                      setFieldValue("gstType", value);
                      this.changeDataForm("gstType", value);
                    }}
                    defaultValue={values.gstType}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={BasicConst.gst_number}
                    className={errors.gst && touched.gst ? "empty" : ""}
                  />
                  <Input
                    className={errors.gst && touched.gst ? "empty" : ""}
                    onBlur={handleBlur}
                    name="gst"
                    value={values?.gst?.toUpperCase()}
                    tabIndex="6"
                    handleChange={(e) => {
                      this.changeDataForm("gst", e.target.value);
                      setFieldValue("gst", e.target.value);
                    }}
                    className={
                      (errors.gst && touched.gst) ||
                      (gstNoError && values.gst === "")
                        ? "empty"
                        : ""
                    }
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label
                    title={BasicConst.pan}
                    className={errors.pan && touched.pan ? "empty" : ""}
                  />
                  <Input
                    className={errors.pan && touched.pan ? "empty" : ""}
                    onBlur={handleBlur}
                    name="pan"
                    value={values.pan}
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
                    className={errors.aadhar && touched.aadhar ? "empty" : ""}
                    type="number"
                    onBlur={handleBlur}
                    name="aadhar"
                    value={values.aadhar}
                    handleChange={(e, z) => {
                      this.changeDataForm("aadhar", e.target.value);
                    }}
                    tabIndex="7"
                  />
                  {errors.aadhar && touched.aadhar && (
                    <div className="form-error">{errors.aadhar}</div>
                  )}
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} className="anime">
                  <Label title={BasicConst.companylogo} />
                  <>{this.fileUpload(setFieldValue)}</>
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
