import React, { Component } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { SupportStyle } from "./style";
import { Menu, Header } from "components/Form";
import { Button, Input, Label } from "components/Form";
import { FormValidation } from "App/AppConstant";
import { supportConstant } from "./constant";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { saveSupport } from "redux/partnerUser/action";
import { getAuthUserID } from "modules/helper";
var userId = getAuthUserID();

const ValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required(" "),
  email: Yup.string().trim().required(" ").email(FormValidation.emailInvalid),
  message: Yup.string().trim().required(" "),
  mobile: Yup.string()
    .trim()
    .min(10, FormValidation.mobileInvalid)
    .max(10, FormValidation.mobileInvalid),
});
class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      initValues: {
        supportId: 0,
        name: "",
        email: "",
        message: "",
        mobile: "",
      },
    };
  }

  handleSubmit = async (values, { setSubmitting }) => {
    try {
      this.setState({ disable: true });
      setTimeout(() => {
        this.setState({ disable: false });
      }, 4500);
      let data = {
        supportId: values.contactId,
        name: values.name,
        email: values.email,
        message: values.message,
        mobile: values.mobile,
        userId: userId,
      };
      await this.props.saveSupport({ data: data });
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { initValues, disable } = this.state;
    return (
      <SupportStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv">
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
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="form_div anime">
                    <div className="field anime">
                      <Label
                        title={supportConstant.name}
                        className={errors.name && touched.name ? "empty" : ""}
                      />
                      <Input
                        placeholder={supportConstant.placeName}
                        className={errors.name && touched.name ? "empty" : ""}
                        onBlur={handleBlur}
                        name="name"
                        value={values.name}
                        handleChange={handleChange}
                      />
                    </div>
                    <div className="field anime">
                      <Label
                        title={supportConstant.email}
                        className={errors.email && touched.email ? "empty" : ""}
                      />
                      <Input
                        placeholder={supportConstant.placeEmail}
                        className={errors.email && touched.email ? "empty" : ""}
                        onBlur={handleBlur}
                        name="email"
                        value={values.email}
                        handleChange={handleChange}
                      />
                      {errors.email && touched.email && (
                        <div className="form-error">{errors.email}</div>
                      )}
                    </div>
                    <div className="field anime">
                      <Label
                        title={supportConstant.msg}
                        className={
                          errors.message && touched.message ? "empty" : ""
                        }
                      />
                      <Input
                        className={
                          errors.message && touched.message ? "empty" : ""
                        }
                        row={3}
                        name="message"
                        value={values.message}
                        handleChange={handleChange}
                      />
                      {errors.message && touched.message && (
                        <div className="form-error">{errors.message}</div>
                      )}
                    </div>
                    <div className="field anime">
                      <Label title={supportConstant.phone} />
                      <Input
                        placeholder={supportConstant.placePhone}
                        className={
                          errors.mobile && touched.mobile ? "empty" : ""
                        }
                        onBlur={handleBlur}
                        name="mobile"
                        value={values.mobile}
                        handleChange={handleChange}
                      />
                      {errors.mobile && touched.mobile && (
                        <div className="form-error">{errors.mobile}</div>
                      )}
                    </div>
                    <div className="btnDiv">
                      <Button type="submit" disabled={disable}>
                        {supportConstant.submit}
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </SupportStyle>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.partner.loading,
    error: state.partner.error,
    message: state.partner.message,
  };
};
const mapDispatchToProps = (dispatch) => ({
  saveSupport: (payload) => dispatch(saveSupport(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Support)
);
