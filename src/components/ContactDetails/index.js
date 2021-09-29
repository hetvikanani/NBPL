import React, { Component } from "react";
import { Row, Col } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { contactDetailConst } from "./constant";

import { ContDetailsStyle } from "./style";
import { Input, Label, Button } from "components/Form";
const UserValidation = Yup.object().shape({
  contactName: Yup.string()
    .trim()
    .required(" ")
    .matches(/^[aA-zZ0-9\s]+$/, "Only alphabets are allowed for this field "),
  mobile: Yup.string().trim().min(10).max(10).required(" "),
  email: Yup.string().trim().email().required(" "),
});
class ContactDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
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
  increase = (key) => {
    const newData = this.state.initialState.map((data) => {
      if (data.key === key) {
        return { ...data, save: true };
      } else return data;
    });
    this.setState({
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
      this.setState({ btnDisable: true, check: true });
      // setTimeout(() => {
      //   this.setState({ btnDisable: false });
      // }, 4500);
      // let data = {
      //   contactName: values.contactName,
      //   mobile: values.mobile,
      //   email: values.email,
      //   designation: values.designation,
      // };
      this.props.changeData("contractDetailsData", values);
      this.props.apiCall();
      // console.log("data", data);
      setSubmitting(false);
    } catch (error) {
      console.log(error, "handle error");
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
        <h2>{contactDetailConst.contactDetail}</h2>
        {initialState.map((data, index) => (
          <div className="formDiv" key={index}>
            <Formik
              enableReinitialize
              initialValues={data}
              // validationSchema={UserValidation}
              onSubmit={this.handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid,
                validateForm,
                isValidating,
                isInitialValid,
                setFieldValue,
                handleReset,
                resetForm,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <div className="field">
                        <Label
                          title={contactDetailConst.contactName}
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
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <div className="field">
                        <Label
                          title={contactDetailConst.mobile}
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
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <div className="field">
                        <Label
                          title={contactDetailConst.email}
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
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <div className="field">
                        <Label title={contactDetailConst.designation} />
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
                    <div className="leftBtnDiv">
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
                          {contactDetailConst.add}
                        </Button>
                      )}
                      {initialState.length !== 1 && (
                        <Button
                          type="button"
                          onClick={() => {
                            this.remove(data.key, setFieldValue, handleReset);
                          }}
                        >
                          {contactDetailConst.remove}
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
