import React, { Component } from "react";
import { Input, Label, Button, Select, FileUpload } from "components/Form";
import { Row, Col, Image } from "antd";
import { ProfileStyle } from "../style";
import { CloseOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { BasicConst } from "../constant";

import { Formik, Form } from "formik";
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  company_name: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[aA-zZ0-9\s]+$/, "Only alphabets are allowed for this field "),
  partner_code: Yup.string().trim().required(" "),
  email_id: Yup.string()
    .trim()
    .email()
    .required("Please enter valid Email Address"),
  mobile_no: Yup.string()
    .trim()
    .min(10)
    .max(10)
    .required("Please enter valid Mobile No"),
  gst_type: Yup.string().trim().required(" "),
  gst_number: Yup.string()
    .trim()
    .required(" ")
    .matches(/\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/, "only"),
  pan_number: Yup.string()
    .trim()
    .matches(/[A-Z]{5}\d{4}[A-Z]{1}/, "enter valid PAN"),
  aadhar_number: Yup.string().trim().min(12).max(12),
});

export default class BasicDetails extends Component {
  constructor() {
    super();
    this.state = {
      imgByte: "",
      imgnm: "",

      initState: {
        company_name: "",
        partner_code: "",
        email_id: "",
        mobile_no: "",
        gst_type: "",
        gst_number: "",
        pan_number: "",
        aadhar_number: "",
      },
    };
  }

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
          elements={
            <Button color="secondary" className="uploadbtn">
              <VerticalAlignTopOutlined />
              No File Choosen
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
      console.log(error, "handle error");
    }
  };

  render() {
    let gst = ["Yes", "No"];

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
                    title={BasicConst.company_name}
                    className={
                      errors.company_name && touched.company_name ? "empty" : ""
                    }
                  ></Label>

                  <Input
                    placeholder={BasicConst.company_nameplace}
                    className={
                      errors.company_name && touched.company_name ? "empty" : ""
                    }
                    onBlur={handleBlur}
                    name="company_name"
                    value={values.company_name}
                    handleChange={handleChange}
                    tabIndex="1"
                  ></Input>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Label
                    title={BasicConst.partner_code}
                    className={
                      errors.partner_code && touched.partner_code ? "empty" : ""
                    }
                  ></Label>
                  <Input
                    placeholder={BasicConst.partner_codeplace}
                    type="number"
                    className={
                      errors.partner_code && touched.partner_code ? "empty" : ""
                    }
                    onBlur={handleBlur}
                    name="partner_code"
                    value={values.partner_code}
                    handleChange={handleChange}
                    tabIndex="2"
                  ></Input>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Label
                    title={BasicConst.email_id}
                    className={
                      errors.email_id && touched.email_id ? "empty" : ""
                    }
                  ></Label>
                  <Input
                    placeholder={BasicConst.email_idplace}
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
                  <Label
                    title={BasicConst.mobile_no}
                    className={
                      errors.mobile_no && touched.mobile_no ? "empty" : ""
                    }
                  ></Label>
                  <Input
                    placeholder={BasicConst.mobile_noplace}
                    type="number"
                    className={
                      errors.mobile_no && touched.mobile_no ? "empty" : ""
                    }
                    onBlur={handleBlur}
                    name="mobile_no"
                    value={values.mobile_no}
                    handleChange={handleChange}
                    tabIndex="4"
                  ></Input>
                  {errors.mobile_no && touched.mobile_no && (
                    <div className="form-error">{errors.mobile_no}</div>
                  )}
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Label
                    title={BasicConst.gst_type}
                    className={
                      errors.gst_type && touched.gst_type ? "empty" : ""
                    }
                  ></Label>
                  <Select
                    placeholder={BasicConst.gst_typeplace}
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
                  ></Select>
                </Col>

                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Label
                    title={BasicConst.gst_number}
                    className={
                      errors.gst_number && touched.gst_number ? "empty" : ""
                    }
                  ></Label>
                  <Input
                    placeholder={BasicConst.gst_numberplace}
                    className={
                      errors.gst_number && touched.gst_number ? "empty" : ""
                    }
                    onBlur={handleBlur}
                    name="gst_number"
                    value={values.gst_number}
                    handleChange={handleChange}
                    tabIndex="6"
                  ></Input>
                </Col>

                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Label
                    title={BasicConst.pan}
                    className={
                      errors.pan_number && touched.pan_number ? "empty" : ""
                    }
                  ></Label>
                  <Input
                    placeholder={BasicConst.panplace}
                    className={
                      errors.pan_number && touched.pan_number ? "empty" : ""
                    }
                    onBlur={handleBlur}
                    name="pan_number"
                    value={values.pan_number}
                    handleChange={handleChange}
                    tabIndex="7"
                  ></Input>
                  {errors.pan_number && touched.pan_number && (
                    <div className="form-error">{errors.pan_number}</div>
                  )}
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Label
                    title={BasicConst.aadhar}
                    className={
                      errors.aadhar_number && touched.aadhar_number
                        ? "empty"
                        : ""
                    }
                  ></Label>
                  <Input
                    placeholder={BasicConst.aadharplace}
                    className={
                      errors.aadhar_number && touched.aadhar_number
                        ? "empty"
                        : ""
                    }
                    type="number"
                    onBlur={handleBlur}
                    name="aadhar_number"
                    value={values.aadhar_number}
                    handleChange={handleChange}
                    tabIndex="7"
                  ></Input>
                  {errors.aadhar_number && touched.aadhar_number && (
                    <div className="form-error">{errors.aadhar_number}</div>
                  )}
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Label title={BasicConst.companylogo}></Label>
                  <>{this.fileUpload()}</>
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
