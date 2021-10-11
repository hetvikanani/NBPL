import React, { Component } from "react";
import { connect } from "react-redux";
import { Spin, Image, message } from "antd";
import { Formik, Form } from "formik";
import { NavLink } from "react-router-dom";
import Particles from "react-particles-js";
import * as Yup from "yup";

import { Label, Input, Button } from "components/Form";
import { login } from "redux/login/actions";
import { FormValidation } from "App/AppConstant";
import { StyleContainer } from "./style.js";
import { LoginConst } from "./constant";
import { logo } from "components/Images";

const loginValidationSchema = Yup.object().shape({
  userName: Yup.string().trim().required(" "),
  password: Yup.string()
    .trim()
    .min(6, FormValidation.passwordMin)
    // .max(25, FormValidation.passwordMax)
    .required(" "),
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { btnDisable: false, role: "partner" };
  }
  componentDidMount() {
    try {
      const { match } = this.props;
      if (match.path === "/login/admin" || match.url === "/login/admin") {
        this.setState({ role: "admin" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      const { role } = this.state;
      if (role === "partner" && values.userName === "Admin") {
        message.error("can't login as admin");
      } else {
        let data = {
          userName: values.userName,
          password: values.password,
          role: role,
        };
        await this.props.login(data);
      }
      setSubmitting(false);
    } catch (error) {
      console.log(error);
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
                  size: { value: 3 },
                },
                retina_detect: true,
              }}
            />
          </div>
          <div className="form-div fadeInDown">
            <div className="logoDiv">
              <Image src={logo} alt="User Icon" preview={false} width={120} />
            </div>
            <div className="loginDiv">
              <Formik
                initialValues={{ userName: "", password: "" }}
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
                        title={LoginConst.userName}
                        className={
                          errors.userName && touched.userName ? "empty" : ""
                        }
                      />
                      <Input
                        onBlur={handleBlur}
                        name="userName"
                        value={values.userName.trim()}
                        handleChange={handleChange}
                        className={
                          errors.userName && touched.userName ? "empty" : ""
                        }
                      />
                      {errors.userName && touched.userName ? (
                        <div className="form-error">{errors.userName}</div>
                      ) : null}
                    </div>
                    <div className="">
                      <Label
                        title={LoginConst.pwd}
                        className={
                          errors.password && touched.password ? "empty" : ""
                        }
                      />
                      <Input
                        password={true}
                        max={25}
                        onBlur={handleBlur}
                        name="password"
                        value={values.password.trim()}
                        handleChange={handleChange}
                        className={
                          errors.password && touched.password ? "empty" : ""
                        }
                      />
                      {errors.password && touched.password ? (
                        <div className="form-error">{errors.password}</div>
                      ) : null}
                      <NavLink to="/forget-password" className="forgetlbl">
                        {LoginConst.forgetPwd}
                      </NavLink>
                    </div>
                    <div className="btnDiv">
                      <Button type="submit" disabled={btnDisable}>
                        {LoginConst.login}
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
