import React, { Component } from "react";
import { Row, Col } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { AdmSelesStyle } from "./style";
import { ButtonConst } from "App/AppConstant";
import { tableData, SalesConst } from "./constant";
import {
  Menu,
  Header,
  Label,
  Select,
  DatePicker,
  Table,
  Button,
} from "components/Form";

const SalesValidation = Yup.object().shape({
  product: Yup.string().trim().required(" "),
});
const select = ["dfdf", "dfdf"];

class AdminSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisable: false,
      initialState: {
        product: "",
        formDate: "",
        toDate: "",
      },
    };
  }
  selectUI = (val, setFieldValue, error) => {
    try {
      return (
        <Select
          data={select}
          value={val}
          // withID={true}
          defaultValue={val}
          selectClass={error ? "empty" : ""}
          onChange={(value) => {
            setFieldValue("product", value);
          }}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { initialState } = this.state;
    return (
      <AdmSelesStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv anime">
            <h2>{SalesConst.sales}</h2>
            <div className="inputDiv">
              <Formik
                initialValues={initialState}
                validationSchema={SalesValidation}
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
                    <Row gutter={25}>
                      <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <div className="field">
                          <Label
                            title={SalesConst.product}
                            className={
                              errors.product && touched.product ? "empty" : ""
                            }
                          />
                          {values.product === "" &&
                            this.selectUI(
                              "",
                              setFieldValue,
                              errors.product && touched.product
                            )}
                          {values.product !== "" &&
                            this.selectUI(
                              values.product,
                              setFieldValue,
                              errors.product && touched.product
                            )}
                        </div>
                      </Col>
                      <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <div className="field">
                          <Label title={SalesConst.fromDate} />
                          <DatePicker
                            name="formDate"
                            disableDate={true}
                            value={values.formDate}
                            onBlur={handleBlur}
                            handleChange={(data) =>
                              setFieldValue("formDate", data)
                            }
                            //    className={errors.date && touched.date ? "empty" : ""}
                          />
                        </div>
                      </Col>
                      <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <div className="field">
                          <Label title={SalesConst.toDate} />
                          <DatePicker
                            name="toDate"
                            disableDate={true}
                            value={values.toDate}
                            onBlur={handleBlur}
                            handleChange={(data) =>
                              setFieldValue("toDate", data)
                            }
                            //   className={errors.date && touched.date ? "empty" : ""}
                          />
                        </div>
                      </Col>
                      <Col
                        xs={24}
                        sm={12}
                        md={12}
                        lg={6}
                        xl={6}
                        className="buttonDiv"
                      >
                        <Button type="submit">{ButtonConst.submit}</Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="salesDiv">
              <div className="headerDiv">
                <h2>{SalesConst.visman}</h2>
              </div>
              <div className="tableDiv">
                <Table type="admin_sales" data={tableData} size={10} />
              </div>
            </div>
          </div>
        </div>
      </AdmSelesStyle>
    );
  }
}

export default AdminSales;
