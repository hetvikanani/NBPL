import React, { Component } from "react";
import { Row, Col, Image } from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";

import { basicConst } from "./constant";
import { BasicDetailsStyle } from "./style";
import { changePartnerData } from "redux/partner/action";
import { FormValidation, gstConst, panConst } from "App/AppConstant";
import { Input, Label, RoundSwitch, Button, FileUpload } from "components/Form";

const UserValidation = Yup.object().shape({
  companyName: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[aA-zZ\s]+$/, FormValidation.alphaValid),
  email: Yup.string().trim().email().required(" "),
  mobile: Yup.string().trim().min(10).max(10).required(" "),
  gst: Yup.string()
    .trim()
    .nullable()
    .matches(gstConst, FormValidation.gstvalid),
  pan: Yup.string().trim().matches(panConst, FormValidation.panValid),
  aadhar: Yup.string()
    .trim()
    .min(12, FormValidation.aadharInvalid)
    .max(12, FormValidation.aadharInvalid),
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
              <span className="txtWrap">{"name"}</span>
              <CloseOutlined onClick={() => this.removefile(setFieldValue)} />
            </span>
            <Image src={partner?.companyLogo} width={50} height={30} />
          </>
        );
      }
      return (
        <FileUpload
          accept=".jpg, .jpeg, .png , .svg"
          image={true}
          sendByte={(a, b, c) => this.setByte(a, b, c, setFieldValue)}
          elements={<UploadOutlined />}
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
    const { disable, gstNoError } = this.state;
    const { partner } = this.props;
    return (
      <BasicDetailsStyle>
        <h2 className="anime">{basicConst.basicDetail}</h2>
        <div className="formDiv">
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
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    xl={12}
                    className="anime"
                  >
                    <div className="field">
                      <Label
                        title={basicConst.comName}
                        className={
                          errors.companyName && touched.companyName
                            ? "empty"
                            : ""
                        }
                      />
                      <Input
                        name="companyName"
                        onBlur={handleBlur}
                        value={values.companyName}
                        handleChange={(e) => {
                          this.changeDataForm("companyName", e.target.value);
                          setFieldValue("companyName", e.target.value);
                        }}
                        className={
                          errors.companyName && touched.companyName
                            ? "empty"
                            : ""
                        }
                      />
                    </div>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    xl={12}
                    className="anime"
                  >
                    <div className="field">
                      <Label
                        title={basicConst.email}
                        className={errors.email && touched.email ? "empty" : ""}
                      />
                      <Input
                        name="email"
                        value={values.email}
                        onBlur={handleBlur}
                        handleChange={(e) => {
                          this.changeDataForm("email", e.target.value);
                          setFieldValue("email", e.target.value);
                        }}
                        className={errors.email && touched.email ? "empty" : ""}
                      />
                    </div>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    xl={12}
                    className="anime"
                  >
                    <div className="field">
                      <Label
                        title={basicConst.mobile}
                        className={
                          errors.mobile && touched.mobile ? "empty" : ""
                        }
                      />
                      <Input
                        name="mobile"
                        type="number"
                        value={values.mobile}
                        onBlur={handleBlur}
                        handleChange={(e) => {
                          this.changeDataForm("mobile", e.target.value);
                          setFieldValue("mobile", e.target.value);
                        }}
                        className={
                          errors.mobile && touched.mobile ? "empty" : ""
                        }
                      />
                    </div>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    xl={12}
                    className="anime"
                  >
                    <div className="field">
                      <Label title={basicConst.gst} />
                      <RoundSwitch
                        left={basicConst.no + basicConst.reg}
                        right={basicConst.reg}
                        checked={partner.gstType}
                        handleChange={() => this.switchChange(setFieldValue)}
                      />
                    </div>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    xl={12}
                    className="anime"
                  >
                    <div className="field">
                      <Label
                        title={basicConst.pan}
                        className={errors.pan && touched.pan ? "empty" : ""}
                      />
                      <Input
                        name="pan"
                        value={values.pan}
                        onBlur={handleBlur}
                        handleChange={(e) => {
                          this.changeDataForm("pan", e.target.value);
                        }}
                        className={errors.pan && touched.pan ? "empty" : ""}
                      />
                    </div>
                    {errors.pan && touched.pan && (
                      <div className="form-error">{errors.pan}</div>
                    )}
                  </Col>
                  {partner?.gstType ? (
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={12}
                      xl={12}
                      className="anime"
                    >
                      <div className="field">
                        <Label
                          title={basicConst.gstNum}
                          className={
                            (errors.gst && touched.gst) ||
                            (gstNoError && values.gst === "")
                              ? "empty"
                              : ""
                          }
                        />
                        <Input
                          name="gst"
                          onBlur={handleBlur}
                          value={values?.gst?.toUpperCase()}
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
                        {errors.gst && touched.gst && (
                          <div className="form-error">{errors.gst}</div>
                        )}
                      </div>
                    </Col>
                  ) : (
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={12}
                      xl={12}
                      className="anime"
                    ></Col>
                  )}
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    xl={12}
                    className="anime"
                  >
                    <div className="field">
                      <Label title={basicConst.aadhar} />
                      <Input
                        name="aadhar"
                        type="number"
                        value={values.aadhar}
                        onBlur={handleBlur}
                        handleChange={(e, z) => {
                          this.changeDataForm("aadhar", e.target.value);
                        }}
                        className={
                          errors.aadhar && touched.aadhar ? "empty" : ""
                        }
                      />
                      {errors.aadhar && touched.aadhar && (
                        <div className="form-error">{errors.aadhar}</div>
                      )}
                    </div>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={12}
                    xl={12}
                    className="anime"
                  >
                    <div className="field">
                      <Label title={basicConst.comLogo} />
                      <div className="pointer">
                        {this.fileUpload(setFieldValue)}
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="bottomDiv">
                  <div className="btn anime">
                    <Button
                      type="button"
                      onClick={() => this.props.history.push("/partners")}
                    >
                      {basicConst.cancle}
                    </Button>
                    <Button
                      type="submit"
                      className="nextBtn"
                      disabled={disable}
                    >
                      {basicConst.next}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </BasicDetailsStyle>
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
