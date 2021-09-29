import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { SearchOutlined } from "@ant-design/icons";

import { ContactStyle } from "./style";
import { Menu, Header, Input, Button } from "components/Form";
import { FormValidation} from "App/AppConstant";
import { ContactPageconst } from "./constant";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required(" "),
  email: Yup.string().trim().email(FormValidation.emailInvalid).required(" "),
  message: Yup.string().trim().required(" "),
});

class Contact extends Component {
  constructor() {
    super();
    this.state = {
      initState: {
        name: "",
        email: "",
        message: "",
      },
    };
  }
  addressRow = (a) => {
    try {
      let a = ["Surat", "Vadodara", "Mumbai", "U.S.A"];
      return a.map((b) => (
        <Col xs={24} sm={12} md={12} lg={6} xl={6} className="address_col">
          <h3>{b}</h3>
          <ul>
            <li>{ContactPageconst.address1}</li>
            <li>{ContactPageconst.address2}</li>
            <li>{ContactPageconst.address3}</li>
            <li>{ContactPageconst.address4}</li>
          </ul>
        </Col>
      ));
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { initState } = this.state;
    return (
      <ContactStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv">
            <Row gutter={20}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Card>
                  <h3>{ContactPageconst.contactUs}</h3>
                  <Formik
                    initialValues={initState}
                    validationSchema={ValidationSchema}
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
                      <Form onSubmit={handleSubmit}>
                        <Row gutter={20}>
                          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Input
                              name="name"
                              value={values.name}
                              onBlur={handleBlur}
                              handleChange={handleChange}
                              placeholder={ContactPageconst.fullName}
                              tabIndex="1"
                              className={
                                errors.name && touched.name ? "empty" : ""
                              }
                            />
                          </Col>
                          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Input
                              name="email"
                              value={values.email.trim()}
                              onBlur={handleBlur}
                              handleChange={handleChange}
                              placeholder={ContactPageconst.email}
                              tabIndex="2"
                              className={
                                errors.email && touched.email ? "empty" : ""
                              }
                            />
                            {errors.email && touched.email && (
                              <div className="form-error">{errors.email}</div>
                            )}
                          </Col>
                          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Input
                              name="message"
                              placeholder={ContactPageconst.message}
                              row={4}
                              value={values.message}
                              handleChange={handleChange}
                              tabIndex="3"
                            />
                          </Col>
                        </Row>
                        <div className="btnDiv">
                          <Button type="submit">{ContactPageconst.sendMessage}</Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Card>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Card>
                  <h3>{ContactPageconst.headOff}</h3>
                  <div className="cardHead">
                    <div className="iconDiv">
                      <i className="fas fa-map-marker-alt icon"></i>
                    </div>
                    <ul>
                      <li>{ContactPageconst.address1}</li>
                      <li>{ContactPageconst.address2}</li>
                      <li>{ContactPageconst.address3}</li>
                      <li>{ContactPageconst.address4}</li>
                    </ul>
                  </div>
                  <div className="cardHead">
                    <div className="iconDiv">
                      <i className="fas fa-phone-alt icon"></i>
                    </div>
                    <div>
                      <p>{ContactPageconst.pluse + ContactPageconst.nuberDigit}</p>
                    </div>
                  </div>
                  <div className="cardHead">
                    <div className="iconDiv">
                      <i className="fas fa-envelope icon"></i>
                    </div>
                    <div>
                      <span>{ContactPageconst.mailiID}</span>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Card>
                  <div className="banch_div">
                    <h3>{ContactPageconst.ourBranches}</h3>
                    <div className="search_div">
                      <Input
                        placeholder={ContactPageconst.search}
                        suffix={<SearchOutlined />}
                      />
                    </div>
                  </div>
                  <Row gutter={15}>{this.addressRow()}</Row>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </ContactStyle>
    );
  }
}
export default Contact;
