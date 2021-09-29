import React, { Component } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { ChangePWDStyle } from "./style";
import { Menu, Header } from "components/Form";
import { Button, Input, Label } from "components/Form";
import { FormValidation, pwdMatch, ButtonConst } from "App/AppConstant";
import {ChangePasswordConst} from "./constant";
 
const validationSchema = Yup.object().shape({
  curPwd: Yup.string()
    .min(4, FormValidation.passwordMin)
    .required(" ")
    .matches(pwdMatch, FormValidation.passwordInvalid),
  newPwd: Yup.string()
    .min(4, FormValidation.passwordMin)
    .required(" ")
    .matches(pwdMatch, FormValidation.passwordInvalid),
  conPwd: Yup.string()
    .min(4, FormValidation.passwordMin)
    .required(" ")
    .when("newPwd", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref("newPwd")], FormValidation.RepatePWD),
    })
    .matches(pwdMatch, FormValidation.passwordInvalid),
});


class ChangePWD extends Component {
  constructor() {
    super();
    this.state = {
      disable: false,
      initialState: {
        curPwd: "",
        newPwd: "",
        conPwd: "",
      },
    };
  }
  handleSubmit = () => {
    try {
      this.setState({ disable: true });
      setTimeout(() => {
        this.setState({ disable: false });
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { initialState, disable } = this.state;
    return (
      <ChangePWDStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv">
            <Formik
              initialValues={initialState}
              validationSchema={validationSchema}
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
              }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="form_div">
                    <div className="field">
                      <Label
                        title={ChangePasswordConst.curPwd}
                        className={
                          errors.curPwd && touched.curPwd ? "empty" : ""
                        }
                      />
                       <Input
                        placeholder={ChangePasswordConst.entCurPwd}
                        className={errors.curPwd && touched.curPwd ? "empty" : ""}
                        onBlur={handleBlur}
                        name="curPwd"
                        value={values.curPwd}
                        handleChange={handleChange}
                        tabIndex="1"
                      /> 
                    </div>
                    <div className="field">
                      <Label
                        title={ChangePasswordConst.newPwd}
                        className={
                          errors.newPwd && touched.newPwd ? "empty" : ""
                        }
                      />
                       <Input
                        placeholder={ChangePasswordConst.entNewPwd}
                        className={errors.newPwd && touched.newPwd ? "empty" : ""}
                        onBlur={handleBlur}
                        name="newPwd"
                        value={values.newPwd}
                        handleChange={handleChange}
                        tabIndex="2"
                      /> 
                    </div>
                    <div className="field">
                      <Label
                        title={ChangePasswordConst.cunfNewPwd}
                        className={
                          errors.conPwd && touched.conPwd ? "empty" : ""
                        }
                      />
                       <Input
                        placeholder={ChangePasswordConst.cunfNewPwd}
                        className={errors.conPwd && touched.conPwd ? "empty" : ""}
                        onBlur={handleBlur}
                        name="conPwd"
                        value={values.conPwd}
                        handleChange={handleChange}
                        tabIndex="3"
                      /> 
                    </div>
                    <div className="btnDiv">
                      <Button type="submit" disabled={disable}>
                        {ButtonConst.updatePWD}
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </ChangePWDStyle>
    );
  }
}
export default ChangePWD;
