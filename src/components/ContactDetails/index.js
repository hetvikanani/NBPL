import React, { Component } from "react";
import { Row, Col } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { contactConst } from "./constant";

import { ContDetailsStyle } from "./style";
import { Input, Label, Button } from "components/Form";
import { FormValidation } from "App/AppConstant";
const UserValidation = Yup.object().shape({
  contactName: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[aA-zZ0-9\s]+$/, FormValidation.alphaValid),
  email: Yup.string().trim().email().required(" "),
  mobile: Yup.string().trim().min(10).max(10).required(" "),
});
class ContactDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      prev: [],
      initialState: [
        {
          key: uuidv4(),
          contactName: "",
          mobile: "",
          email: "",
          designation: "",
          check: false,
          save: false,
        },
      ],
    };
  }
  increase = (key,val) => {
    const { initialState, prev } = this.state;
    const newData = initialState.map((data) => {
      if (data.key === key) {
        return { ...data, save: true };
      } else return data;
    });
    let prevData = prev;
    prevData.push(val);
    this.setState({
      prev: prevData,
      initialState: [
        ...newData,
        {
          key: uuidv4(),
          contactName: "",
          mobile: "",
          email: "",
          designation: "",
          check: false,
          save: false,
        },
      ],
    });
  };
  remove = (key, setFieldValue, handleReset) => {
    const newData = this.state.initialState.filter((data) => data.key !== key);
    this.setState({ initialState: newData }, () => {
      handleReset();
    });
  };
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { prev } = this.state;
      this.setState({ btnDisable: true, check: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let prevData = prev;
      prevData.push(values);
      this.props.changeData("contractDetailsData", this.state.initialState);
      this.props.apiCall(this.state.initialState);
     
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  proex = (e, index, setFieldValue, fildName) => {
    const { initialState } = this.state;
    let data = [...initialState];
    data[index][fildName] = e.target.value;
    this.setState({ initialState: data });
    setFieldValue(fildName, e.target.value);
  };
  render() {
    const { initialState, disable } = this.state;
    return (
      <ContDetailsStyle>
        <h3 className="anime">{contactConst.cd}</h3>
        {initialState.map((data, index) => (
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
                            this.proex(e, index, setFieldValue, "contactName");
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
                            errors.email && touched.email ? "empty" : ""
                          }
                        />
                        <Input
                          className={
                            errors.email && touched.email ? "empty" : ""
                          }
                          onBlur={handleBlur}
                          name="email"
                          value={values.email}
                          onChange={(e) => {
                            this.proex(e, index, setFieldValue, "email");
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
                        <Label title={contactConst.designation} />
                        <Input
                          onBlur={handleBlur}
                          name="designation"
                          value={values.designation}
                          onChange={(e) => {
                            this.proex(e, index, setFieldValue, "designation");
                          }}
                          tabIndex="4"
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="bottomDiv">
                    <div className="leftBtnDiv anime">
                      {initialState.length - 1 === index && (
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
                      {initialState.length !== 1 && (
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
                      <Button type="submit" disabled={disable}>
                        {initialState.filter((d) => d.key === data.key)[0]?.save
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
export default ContactDetails;
