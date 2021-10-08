import React, { Component } from "react";
import { Row, Col } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { contactConst } from "./constant";
import { connect } from "react-redux";
import { changePartnerData, getPartnerById } from "redux/partner/action";

import { ContDetailsStyle } from "./style";
import { Input, Label, Button } from "components/Form";
import { FormValidation } from "App/AppConstant";
import { withRouter } from "react-router";
const UserValidation = Yup.object().shape({
  contactName: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[aA-zZ\s]+$/, FormValidation.alphaValid),
  emailId: Yup.string().trim().email().required(" "),
  mobile: Yup.string().trim().min(10).max(10).required(" "),
  designation: Yup.string()
    .trim()
    .matches(/^[aA-zZ\s]+$/, FormValidation.alphaValid),
});
class ContactDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      prev: [],
    };
  }
  changeDataForm = (fieldName, value) =>
    this.props.changePartnerData(fieldName, value);

  increase = (key, val) => {
    const { prev } = this.state;
    const { partner } = this.props;
    const newData = partner?.contactDetails?.map((data) => {
      if (data.key === key) {
        return { ...data, save: true };
      } else return data;
    });
    let prevData = prev;
    prevData.push(val);
    this.changeDataForm("contactDetails", [
      ...newData,
      {
        contactId: 0,
        partnerId: 0,
        key: uuidv4(),
        contactName: "",
        mobile: "",
        emailId: "",
        designation: "",
        check: false,
        save: false,
        isDelete: 0,
      },
    ]);
    this.setState({
      prev: prevData,
    });
  };

  remove = (key, setFieldValue, handleReset) => {
    const { partner } = this.props;
    const newData = partner?.contactDetails?.map((data) => {
      if (data.key === key) {
        return { ...data, isDelete: 1 };
      } else return data;
    });
    this.changeDataForm("contactDetails", newData);
    handleReset();
  };
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      // debugger;
      const { partner } = this.props;
      const { prev } = this.state;
      this.setState({ btnDisable: true, check: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let prevData = prev;
      prevData.push(values);

      this.props.apiCall();

      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  proex = (e, index, setFieldValue, fieldName) => {
    const { partner } = this.props;
    let data = [...partner?.contactDetails];
    data[index][fieldName] = e.target.value;
    this.changeDataForm("contactDetails", data);
    setFieldValue(fieldName, e.target.value);
  };
  render() {
    const { disable } = this.state;
    const { partner } = this.props;

    return (
      <ContDetailsStyle>
        <h3 className="anime">{contactConst.cd}</h3>
        {partner?.contactDetails
          ?.filter((data) => data.isDelete !== 1)
          .map((data, index) => (
            <div className="formDiv anime" key={index}>
              <Formik
                enableReinitialize
                initialValues={data}
                validationSchema={UserValidation}
                onSubmit={this.handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  validateForm,
                  setFieldValue,
                  handleReset,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Row gutter={20}>
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
                            title={contactConst.contactName}
                            className={
                              errors.contactName && touched.contactName
                                ? "empty"
                                : ""
                            }
                          />
                          <Input
                            onBlur={handleBlur}
                            name="contactName"
                            value={values.contactName}
                            className={
                              errors.contactName && touched.contactName
                                ? "empty"
                                : ""
                            }
                            onChange={(e) => {
                              this.proex(
                                e,
                                index,
                                setFieldValue,
                                "contactName"
                              );
                            }}
                            tabIndex="1"
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
                            title={contactConst.mobile}
                            className={
                              errors.mobile && touched.mobile ? "empty" : ""
                            }
                          />
                          <Input
                            className={
                              errors.mobile && touched.mobile ? "empty" : ""
                            }
                            onBlur={handleBlur}
                            name="mobile"
                            type="number"
                            value={values.mobile}
                            handleChange={(e) => {
                              this.proex(e, index, setFieldValue, "mobile");
                            }}
                            tabIndex="2"
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
                            title={contactConst.email}
                            className={
                              errors.emailId && touched.emailId ? "empty" : ""
                            }
                          />
                          <Input
                            className={
                              errors.emailId && touched.emailId ? "empty" : ""
                            }
                            onBlur={handleBlur}
                            name="emailId"
                            value={values.emailId}
                            onChange={(e) => {
                              this.proex(e, index, setFieldValue, "emailId");
                            }}
                            tabIndex="3"
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
                            title={contactConst.designation}
                            className={
                              errors.designation && touched.designation
                                ? "empty"
                                : ""
                            }
                          />
                          <Input
                            onBlur={handleBlur}
                            name="designation"
                            value={values.designation}
                            className={
                              errors.designation && touched.designation
                                ? "empty"
                                : ""
                            }
                            onChange={(e) => {
                              this.proex(
                                e,
                                index,
                                setFieldValue,
                                "designation"
                              );
                            }}
                            tabIndex="4"
                          />
                        </div>
                      </Col>
                    </Row>

                    <div className="bottomDiv">
                      <div className="leftBtnDiv anime">
                        {partner?.contactDetails?.length - 1 === index && (
                          <Button
                            type="button"
                            onClick={() => {
                              validateForm().then((d) => {
                                if (Object.keys(d).length === 0)
                                  this.increase(data.key);
                                else handleSubmit();
                              });
                            }}
                          >
                            {contactConst.add}
                          </Button>
                        )}
                        {partner?.contactDetails?.length !== 1 && (
                          <Button
                            type="button"
                            onClick={() => {
                              this.remove(data.key, setFieldValue, handleReset);
                            }}
                          >
                            {contactConst.remove}
                          </Button>
                        )}
                      </div>
                      <div className="rightBtnDiv">
                        <Button
                          type="button"
                          onClick={() => this.props.history.push("/partners")}
                        >
                          {contactConst.cancle}
                        </Button>
                        <Button type="button" onClick={this.props.previous}>
                          {contactConst.previous}
                        </Button>

                        <Button type="submit" disabled={disable}>
                          {partner?.contactDetails?.filter(
                            (d) => d.key === data.key
                          )[0]?.save
                            ? "Save"
                            : "Submit"}
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          ))}
      </ContDetailsStyle>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.partner.loading,
  error: state.partner.error,
  message: state.partner.message,
  partners: state.partner.partners,
  partner: state.partner.partner,
});
const mapDispatchToProps = (dispatch) => ({
  changePartnerData: (key, value) => dispatch(changePartnerData(key, value)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContactDetails)
);
