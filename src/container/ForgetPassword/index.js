import React, { Component } from "react";
import { connect } from "react-redux";
import { Spin, Image } from "antd";
import { Formik, Form } from "formik";
import Particles from "react-particles-js";
import * as Yup from "yup";

import { Label, Input, Button } from "components/Form";
import { login } from "redux/login/actions";
import { FormValidation } from "App/AppConstant";
import { StyleContainer } from "./style.js";
import { logo } from "components/Images";
import {ForgetPasswordconst} from "./constant";


const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email(FormValidation.emailInvalid)
    .required(" "),
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { btnDisable: false };
  }
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let data = { email: values.email };
      await this.props.login(data);
      setSubmitting(false);
    } catch (error) {
      console.log(error, "handle error");
    }
  };
  render() {
    const { loading } = this.props;
    const { btnDisable } = this.state;
    return (
      <Spin spinning={loading} size="large">
        <StyleContainer>
          <div className="canvasDiv">
            <Particles
              height="100vh"
              width="100vw"
              params={{
                particles: {
                  color: { value: "#fff" },
                  line_linked: { color: { value: "#fff" } },
                  number: { value: 50 },
                  size: { value: 4 },
                },
                retina_detect: true,
              }}
            />
          </div>
          <div className="form-div fadeInDown">
            <div class="logoDiv">
              <Image src={logo} alt="User Icon" preview={false} width={120} />
            </div>
            <div className="loginDiv">
              <Formik
                initialValues={{ email: "" }}
                validationSchema={loginValidationSchema}
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
                }) => (
                  <Form onSubmit={handleSubmit} noValidate className="">
                    <div className="">
                      <Label
                        title={ForgetPasswordconst.forgotPass}
                        className={errors.email && touched.email ? "empty" : ""}
                      />
                      <Input
                        autocomplete={"off"}
                        onBlur={handleBlur}
                        name="email"
                        value={values.email.trim()}
                        handleChange={handleChange}
                        className={errors.email && touched.email ? "empty" : ""}
                      />
                      {errors.email && touched.email ? (
                        <div className="form-error">{errors.email}</div>
                      ) : null}
                    </div>

                    <div className="btnDiv">
                      <Button type="submit" disabled={btnDisable}>
                        {ForgetPasswordconst.sendEmail}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </StyleContainer>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.login.loading,
  error: state.login.error,
  message: state.login.message,
});
const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(login(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
