import React, { Component } from "react";
import { Row, Col, Image } from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { BasicDetailsStyle } from "./style";
import { basicConst } from "./constant";
import { Input, Label, RoundSwitch, Button, FileUpload } from "components/Form";
import { FormValidation, gstConst, panConst } from "App/AppConstant";
import { connect } from "react-redux";
import { changePartnerData } from "redux/partner/action";

import { values } from "lodash";

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

  switchChange = () => this.setState({ gstType: !this.state.gstType });

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
              <span className="txtWrap">{name}</span>
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
          elements={<UploadOutlined />}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  removefile = () => this.setState({ imgByte: "", imgnm: "", imgBase64: "" });

  setByte = (byteCode, name, base64) =>
    this.setState({ imgByte: byteCode, imgnm: name, imgBase64: base64 });

  handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { gstType } = this.state;
      console.log(gstType, values, "lll");
      // this.setState({ btnDisable: true });
      // setTimeout(() => {
      //   this.setState({ btnDisable: false });
      // }, 4500);
      this.props.changePartnerData("img", this.state.imgBase64);
      // this.props.changeData("basicDetailsData", {
      //   ...values,
      //   img: this.state.imgBase64,
      //   // gstType: this.state.gstType,
      // });
      // if (gstType && values.gst === "") {
      //   this.setState({ gstNoError: gstType && values.gst === "" });
      // } else this.props.countInc();
      this.props.countInc();
      setSubmitting(false);
    } catch (error) {
      console.log(error, "handle error");
    }
  };

  render() {
    const { disable, gstType, gstNoError } = this.state;
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
              handleChange,
              handleBlur,
              handleSubmit,
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
                          handleChange(e);
                          this.changeDataForm("companyName", e.target.value);
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
                          handleChange(e);
                          this.changeDataForm("email", e.target.value);
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
                          handleChange(e);
                          this.changeDataForm("mobile", e.target.value);
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
                        checked={gstType}
                        handleChange={this.switchChange}
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
                          handleChange(e);
                          this.changeDataForm("pan", e.target.value);
                        }}
                        className={errors.pan && touched.pan ? "empty" : ""}
                      />
                    </div>
                    {errors.pan && touched.pan && (
                      <div className="form-error">{errors.pan}</div>
                    )}
                  </Col>
                  {gstType ? (
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
                          value={values.gst.toUpperCase()}
                          handleChange={(e) => {
                            handleChange(e);
                            this.changeDataForm("gst", e.target.value);
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
                          handleChange(e);
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
                      <div className="pointer">{this.fileUpload()}</div>
                    </div>
                  </Col>
                </Row>
                <div className="bottomDiv">
                  <div className="btn anime">
                    <Button
                      type="button"
                      onClick={() => this.props.history.push("/partners")}
                    >
                      {basicConst.previous}
                    </Button>
                    <Button type="submit" disabled={disable}>
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
