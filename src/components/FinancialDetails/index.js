import React, { Component } from "react";
import { Row, Col } from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {financialDetailConst} from "./constant";


import { FinDetailsStyle } from "./style";
import { Input, Label, Button } from "components/Form";
const UserValidation = Yup.object().shape({
  bankName: Yup.string().trim().required(" "),
  branchName: Yup.string().trim().required(" "),
  address: Yup.string().trim().required(" "),
  accountNo: Yup.string().trim().min(11).max(11).required(" "),
  ifscCode: Yup.string()
  .trim()
  .required(" ")
  .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "only"),
pincode: Yup.string().trim().min(6).max(6).required(" "),
city: Yup.string().trim().required(" "),
state: Yup.string().trim().required(" "),

 
});
class FinancialDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      initialState: {
        bankName: "",
        branchName: "",
        address: "",
        accountNo: "",
        ifscCode: "",
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
      this.props.countInc();

      setSubmitting(false);
    } catch (error) {
      console.log(error, "handle error");
    }
  };
  render() {
    const { initialState, disable } = this.state;
    return (
      <FinDetailsStyle>
        <h2>{financialDetailConst.finDetail}</h2>
        <div className="formDiv">
          <Formik
            initialValues={initialState}
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
              validateForm,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row gutter={24}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <div className="field">
                      <Label
                        title={financialDetailConst.bankName}
                        className={
                          errors.bankName && touched.bankName ? "empty" : ""
                        }
                      />
                      <Input
                        onBlur={handleBlur}
                        name="bankName"
                        value={values.bankName}
                        handleChange={handleChange}
                        tabIndex="1"
                        className={
                          errors.bankName && touched.bankName ? "empty" : ""
                        }
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <div className="field">
                      <Label
                        title={financialDetailConst.branchName}
                        className={
                          errors.branchName && touched.branchName ? "empty" : ""
                        }
                      />
                      <Input
                        onBlur={handleBlur}
                        name="branchName"
                        value={values.branchName}
                        handleChange={handleChange}
                        tabIndex="2"
                        className={
                          errors.branchName && touched.branchName ? "empty" : ""
                        }
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <div className="field">
                      <Label title={financialDetailConst.address}
                      className={
                        errors.address && touched.address ? "empty" : ""
                      }/>
                      <Input
                        row={5}
                        onBlur={handleBlur}
                        name="address"
                        value={values.address}
                        handleChange={handleChange}
                        tabIndex="3"
                        className={
                          errors.address && touched.address ? "empty" : ""
                        }
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <div className="field">
                      <Label
                        title={financialDetailConst.accNo}
                        className={
                          errors.accountNo && touched.accountNo ? "empty" : ""
                        }
                      />
                      <Input
                        type="number"
                        onBlur={handleBlur}
                        name="accountNo"
                        value={values.accountNo}
                        handleChange={handleChange}
                        tabIndex="4"
                        className={
                          errors.accountNo && touched.accountNo ? "empty" : ""
                        }
                      />
                    </div>
                    <div className="field">
                      <Label
                        title={financialDetailConst.ifsc}
                        className={
                          errors.ifscCode && touched.ifscCode ? "empty" : ""
                        }
                      />
                      <Input
                        onBlur={handleBlur}
                        name="ifscCode"
                        value={values.ifscCode}
                        handleChange={handleChange}
                        tabIndex="5"
                        className={
                          errors.ifscCode && touched.ifscCode ? "empty" : ""
                        }
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <div className="field">
                      <Label
                        title={financialDetailConst.pincode}
                        className={
                          errors.pincode && touched.pincode ? "empty" : ""
                        }
                      />
                      <Input
                        type="number"
                        onBlur={handleBlur}
                        name="pincode"
                        value={values.pincode}
                        handleChange={handleChange}
                        tabIndex="6"
                        className={
                          errors.pincode && touched.pincode ? "empty" : ""
                        }
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <div className="field">
                      <Label title={financialDetailConst.city}
                       className={
                        errors.city && touched.city ? "empty" : ""
                      } />
                      <Input
                        onBlur={handleBlur}
                        name="city"
                        value={values.city}
                        handleChange={handleChange}
                        tabIndex="7"
                        className={
                          errors.city && touched.city ? "empty" : ""
                        }
                      />
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <div className="field">
                      <Label title={financialDetailConst.state}
                       className={
                        errors.state && touched.state ? "empty" : ""
                      } />
                      <Input
                        onBlur={handleBlur}
                        name="state"
                        value={values.state}
                        handleChange={handleChange}
                        tabIndex="8"
                        className={
                          errors.state && touched.state ? "empty" : ""
                        }
                      />
                    </div>
                  </Col>
                </Row>

                <div className="bottomDiv">
                  <div className="btn">
                    <Button type="button" onClick={this.props.previous}>{financialDetailConst.previous}</Button>
                    <Button type="submit" disabled={disable}>
                    {financialDetailConst.next}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </FinDetailsStyle>
    );
  }
}
export default FinancialDetails;
