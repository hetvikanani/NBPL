
import React, { Component } from "react";
import { Row, Col, Image, message } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { SelseAddEditStyle } from "./style";
import {
  Menu,
  Header,
  Card,
  Label,
  Select,
  RoundSwitch,
  Input,
  Button,
  PackageCard,
} from "components/Form";
import { copy } from "components/Images";
// import { PageConst, ButtonConst } from "App/AppConstant";
import { salesAddConstant } from "./constant";

import { MonthlyData, AnnualData, CardData } from "./constant";
const select = ["kartik", "Amar"];
const ValidationSchema = Yup.object().shape({
  lead: Yup.string().trim().required(" "),
  gstNo: Yup.string()
    .trim()
    .matches(
      /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/,
      "Enter Valid GST No."
    ),
  product: Yup.string().trim().required(" "),
  timePeriod: Yup.string().trim().required(" "),
});
class SelseAddEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gstType: false,
      subType: false,
      gstError: false,
      btnDisable: false,
      genLicence: false,     
      licenseId: "45ABc551",
      initValues: {
        lead: "",
        gstNo: "",
        product: "",
        timePeriod: "",
      },
    };
  }
  selectUI = (val, name, setFieldValue, error) => {
    try {
      const { subType } = this.state;
      return (
        <Select
          data={
            name === "timePeriod"
              ? subType
                ? AnnualData
                : MonthlyData
              : select
          }
          value={val}
          // withID={true}
          defaultValue={val}
          selectClass={error ? "empty" : ""}
          onChange={(value) => {
            setFieldValue(name, value);
          }}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  switchChange = (val) => {
    try {
      const { gstType, subType } = this.state;
      this.setState({
        gstType: val === "gstType" ? !gstType : gstType,
        subType: val === "subType" ? !subType : subType,
      });
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
      this.setState({ gstError: gstType && values.gstNo === "" });
    } catch (error) {
      console.log(error);
    }
  };
  packageUI = () => {
    try {
      return CardData.map((a, i) => (
        <Col xs={24} sm={24} md={24} lg={8} xl={8} key={i}>
          <div className="package_div">
            <PackageCard data={a} period="Month" />
          </div>
        </Col>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  generateLicence = () => {
    try {
      const { genLicence } = this.state;
      this.setState({ genLicence: !genLicence });
    } catch (error) {
      console.log(error);
    }
  };
  copyCode = () => {
    try {
      const { licenseId, btnDisable } = this.state;      
      if(btnDisable === false){
        navigator.clipboard.writeText(licenseId);
        message.success("Code Copied");
        this.setState({ btnDisable: true });
        setTimeout(() => {
          this.setState({ btnDisable: false });
        }, 4500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { initValues, gstType, subType, gstError, genLicence, licenseId } =
      this.state;
    return (
      <SelseAddEditStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv">
            <Card
              title={"Add New Sales"}
              content={
                <>
                  <Formik
                    initialValues={initValues}
                    validationSchema={ValidationSchema}
                    onSubmit={this.handleSubmit}
                    enableReinitialize
                  >
                    {({
                      values,
                      errors,
                      touched,
                      onBlur,
                      setFieldValue,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <Row gutter={20}>
                          <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                            <div className="field">
                              <Label title={salesAddConstant.lead} />
                              {values.lead === "" &&
                                this.selectUI(
                                  "",
                                  "lead",
                                  setFieldValue,
                                  errors.lead && touched.lead
                                )}
                              {values.lead !== "" &&
                                this.selectUI(
                                  values.lead,
                                  "lead",
                                  setFieldValue,
                                  errors.lead && touched.lead
                                )}
                            </div>
                          </Col>
                          <Col xs={24} sm={24} md={24} lg={12} xl={ gstType?8:16}>
                            <div className="field">
                              <Label title={salesAddConstant.gstType} />
                              <div className="switchDiv">
                                <RoundSwitch
                                  left="Not Registered"
                                  right="Registered"
                                  checked={gstType}
                                  handleChange={() =>
                                    this.switchChange("gstType")
                                  }
                                />
                              </div>
                            </div>
                          </Col>
                          {gstType && (
                          <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                              <div className="field">
                                <Label title={salesAddConstant.gstno} 
                                className={
                                  (errors.gstNo && touched.gstNo) ||
                                  (gstError && values.gstNo === "")
                                    ? "empty"
                                    : ""
                                }
                                />
                                <Input
                                  className={
                                    (errors.gstNo && touched.gstNo) ||
                                    (gstError && values.gstNo === "")
                                      ? "empty"
                                      : ""
                                  }
                                  onBlur={handleBlur}
                                  name="gstNo"
                                  value={values.gstNo}
                                  handleChange={handleChange}
                                />
                                {errors.gstNo && touched.gstNo && (
                                  <div className="form-error">
                                    {errors.gstNo}
                                  </div>
                                )}
                              </div>
                          </Col>
                            )}
                          <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                            <div className="field">
                              <Label title={salesAddConstant.product} />
                              {values.product === "" &&
                                this.selectUI(
                                  "",
                                  "product",
                                  setFieldValue,
                                  errors.product && touched.product
                                )}
                              {values.product !== "" &&
                                this.selectUI(
                                  values.product,
                                  "product",
                                  setFieldValue,
                                  errors.product && touched.product
                                )}
                            </div>
                          </Col>
                         {values.product !== "" && (
                         <>
                         <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                            <div className="field">
                              <Label title={salesAddConstant.subType} />
                              <div className="switchDiv">
                                <RoundSwitch
                                  left="MONTHLY"
                                  right="ANNUAL"
                                  checked={subType}
                                  handleChange={() => {
                                    this.switchChange("subType");
                                    setFieldValue("timePeriod", "");
                                  }}
                                />
                              </div>
                            </div>
                          </Col>
                          <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                            <div className="field">
                              <Label title={salesAddConstant.timePeriod} />
                              {values.timePeriod === "" &&
                                this.selectUI(
                                  "",
                                  "timePeriod",
                                  setFieldValue,
                                  errors.timePeriod && touched.timePeriod
                                )}
                              {values.timePeriod !== "" &&
                                this.selectUI(
                                  values.timePeriod,
                                  "timePeriod",
                                  setFieldValue,
                                  errors.timePeriod && touched.timePeriod
                                )}
                            </div>
                          </Col>
                          {this.packageUI()}
                          </>
                          )}
                        </Row>
                        {genLicence && (
                          <div className="licenceDiv">
                            <p>{salesAddConstant.liceId} </p>
                            <h2>{licenseId}</h2>
                            <div className="icon pointer">
                              <Image
                                width={13}
                                src={copy}
                                preview={false}
                                onClick={this.copyCode}
                              />
                            </div>
                          </div>
                        )}

                        <div className="btnDiv">                         
                          {!genLicence ?
                            <Button
                              onClick={this.generateLicence}
                            >
                              {salesAddConstant.genLicence}
                            </Button>
                            :
                            <Button type="submit">
                              {salesAddConstant.payment}
                            </Button>
                          }
                        </div>
                      </Form>
                    )}
                  </Formik>
                </>
              }
            />
          </div>
        </div>
      </SelseAddEditStyle>
    );
  }
}
export default SelseAddEdit;
