import React, { Component } from "react";
import { Row, Col } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { LeadsStyle } from "./style";
import { formTitle, tableTitle, tableData, leadsConst } from "./constant";
import {
  Menu,
  Header,
  Card,
  Label,
  Input,
  Button,
  Select,
  Switch,
  Table,
} from "components/Form";
import {  ButtonConst, FormValidation } from "App/AppConstant";
const select = ["kartik", "Amar"];
const ProspectSchema = Yup.object().shape({
  custName: Yup.string().trim().min(3, FormValidation.nameMin).required(" "),
  mobile: Yup.string()
    .trim()
    .min(10, FormValidation.mobileInvalid)
    .max(10, FormValidation.mobileInvalid)
    .required(" "),
  email: Yup.string().trim().email(FormValidation.emailInvalid).required(" "),
});
const LeadsSchema = Yup.object().shape({
  custSelect: Yup.string().trim().required(" "),
  product: Yup.string().trim().required(" "),
});
const DemoSchema = Yup.object().shape({
  cusNameDemo: Yup.string().trim().required(" "),
});

class Leads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      demo: false,
      sale: false,
      initProspect: {
        custName: "",
        mobile: "",
        email: "",
        address: "",
      },
      initLeads: {
        custSelect: "",
        leadType: "",
        product: "",
        remarks: "",
      },
      initDemo: {
        cusNameDemo: "",
      },
    };
  }
  selectUI = (val, name, setFieldValue, error) => {
    try {
      return (
        <Select
          data={select}
          value={val}
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
      const { demo, sale } = this.state;
      this.setState({
        demo: val === "demo" ? !demo : demo,
        sale: val === "sale" ? !sale : sale,
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleProspect = (value) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  formCardUI = () => {
    try {
      const { initProspect, initLeads, initDemo, demo, sale } = this.state;
      return formTitle.map((a, i) => (
        <Col xs={24} sm={24} md={24} lg={8} xl={8} key={i}>
          <Card
            title={a}
            extra={
              a === "Prospect" && (
                <div className="addButton">
                  <PlusOutlined />
                </div>
              )
            }
            content={
              <>
                {a === "Prospect" && (
                  <Formik
                    initialValues={initProspect}
                    validationSchema={ProspectSchema}
                    onSubmit={this.handleProspect}
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
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <div className="inputDiv">
                          <div className="field">
                            <Label
                              title={leadsConst.cusName}
                              className={
                                errors.custName && touched.custName
                                  ? "empty"
                                  : ""
                              }
                            />
                            <Input
                              placeholder={leadsConst.name}
                              className={
                                errors.custName && touched.custName
                                  ? "empty"
                                  : ""
                              }
                              onBlur={handleBlur}
                              name="custName"
                              value={values.custName}
                              handleChange={handleChange}
                              tabIndex="1"
                            />
                            {errors.custName && touched.custName && (
                              <div className="form-error">
                                {errors.custName}
                              </div>
                            )}
                          </div>
                          <div className="field">
                            <Label
                              title={leadsConst.mobile}
                              className={
                                errors.mobile && touched.mobile ? "empty" : ""
                              }
                            />
                            <Input
                              placeholder={leadsConst.number}
                              className={
                                errors.mobile && touched.mobile ? "empty" : ""
                              }
                              onBlur={handleBlur}
                              name="mobile"
                              value={values.mobile}
                              handleChange={handleChange}
                              tabIndex="2"
                              type="number"
                            />
                            {errors.mobile && touched.mobile && (
                              <div className="form-error">{errors.mobile}</div>
                            )}
                          </div>
                          <div className="field">
                            <Label
                              title={leadsConst.emid}
                              className={
                                errors.email && touched.email ? "empty" : ""
                              }
                            />
                            <Input
                              placeholder={leadsConst.email}
                              className={
                                errors.email && touched.email ? "empty" : ""
                              }
                              onBlur={handleBlur}
                              name="email"
                              value={values.email}
                              handleChange={handleChange}
                              tabIndex="3"
                            />
                            {errors.email && touched.email && (
                              <div className="form-error">{errors.email}</div>
                            )}
                          </div>
                          <div className="field">
                            <Label title={leadsConst.address} />
                            <Input
                              placeholder={leadsConst.address}
                              row={1}
                              name="address"
                              value={values.address}
                              handleChange={handleChange}
                              tabIndex="4"
                            />
                          </div>
                          <div className={"btn_div"}>
                            <Button type="submit">{leadsConst.save}</Button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                )}
                {a === "Leads" && (
                  <Formik
                    initialValues={initLeads}
                    validationSchema={LeadsSchema}
                    onSubmit={this.handleLeads}
                    enableReinitialize
                  >
                    {({
                      values,
                      errors,
                      touched,
                      onBlur,
                      handleChange,
                      handleBlur,
                      setFieldValue,
                      handleSubmit,
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <div className="inputDiv">
                          <div className="field">
                            <Label
                              title={leadsConst.cusSelect}
                              className={
                                errors.custSelect && touched.custSelect
                                  ? "empty"
                                  : ""
                              }
                            />
                            { values.custSelect==="" && this.selectUI(
                              "",
                              "custSelect",
                              setFieldValue,
                              errors.custSelect && touched.custSelect
                            )}
                            { values.custSelect!==""&& this.selectUI(
                              values.custSelect,
                              "custSelect",
                              setFieldValue,
                              errors.custSelect && touched.custSelect
                            )}
                          </div>
                          <div className="field">
                            <Label title={leadsConst.leadType} />
                            {values.leadType ==="" && this.selectUI(
                              "",
                              "leadType",
                              setFieldValue
                            )}
                            {values.leadType !=="" &&this.selectUI(
                              values.leadType,
                              "leadType",
                              setFieldValue
                            )}
                          </div>
                          <div className="field">
                            <Label
                              title={leadsConst.product}
                              className={
                                errors.product && touched.product ? "empty" : ""
                              }
                            />
                            <Input
                              className={
                                errors.product && touched.product ? "empty" : ""
                              }
                              onBlur={handleBlur}
                              name="product"
                              value={values.product}
                              handleChange={handleChange}
                            />
                          </div>
                          <div className="field">
                            <Label title={leadsConst.remarks} />
                            <Input
                              placeholder={leadsConst.remarks}
                              row={1}
                              name="address"
                              value={values.address}
                              handleChange={handleChange}
                            />
                          </div>
                          <div className="btn_div">
                            <Button type="submit">{leadsConst.save}</Button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                )}
                {a === "Demo" && (
                  <Formik
                    initialValues={initDemo}
                    validationSchema={DemoSchema}
                    onSubmit={this.handleDemo}
                    enableReinitialize
                  >
                    {({
                      values,
                      errors,
                      touched,
                      onBlur,
                      handleChange,
                      handleBlur,
                      setFieldValue,
                      handleSubmit,
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <div className="inputDiv">
                          <div className="field">
                            <Label
                              title={leadsConst.cusName}
                              className={
                                errors.cusNameDemo && touched.cusNameDemo
                                  ? "empty"
                                  : ""
                              }
                            />
                            {values.cusNameDemo ==="" &&this.selectUI(
                              "",
                              "cusNameDemo",
                              setFieldValue,
                              errors.cusNameDemo && touched.cusNameDemo
                            )}
                            {values.cusNameDemo !=="" &&this.selectUI(
                              values.cusNameDemo,
                              "cusNameDemo",
                              setFieldValue,
                              errors.cusNameDemo && touched.cusNameDemo
                            )}
                          </div>
                          <div className="field">
                            <Label title={leadsConst.demo} />
                            <Switch
                              checked={demo}
                              handleChange={() => this.switchChange("demo")}
                            />
                          </div>
                          <div className="field">
                            <Label title={leadsConst.sale} />
                            <Switch
                              checked={sale}
                              handleChange={() => this.switchChange("sale")}
                            />
                          </div>

                          <div className="demoBtndiv">
                            <Button type="submit">{leadsConst.save}</Button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                )}
              </>
            }
          />
        </Col>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  tableCardUI = () => {
    try {
      return tableTitle.map((a, i) => (
        <Col xs={24} sm={24} md={24} lg={8} xl={8} key={i}>
          <Card
            title={a}
            content={
              <div className="tableDiv">
                <div className="search_div">
                  <Input
                    placeholder={leadsConst.search}
                    suffix={<SearchOutlined />}
                  />
                </div>
                <Table data={tableData} type={a.replace(" ", "")} />
              </div>
            }
          />
        </Col>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <LeadsStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv">
            <Row gutter={20}>
              {this.formCardUI()}
              {this.tableCardUI()}
            </Row>
          </div>
        </div>
      </LeadsStyle>
    );
  }
}
export default Leads;
