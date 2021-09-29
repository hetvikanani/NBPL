import React, { Component } from "react";
import { Row, Col, Image, message } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  CloseOutlined,
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

import { ProAddEditStyle } from "./style";
import { Input, Label, Button, FileUpload } from "components/Form";
import { ButtonConst } from "App/AppConstant";
// import {adminProConst} from "container/AdminProduct/constant";
import { proAddConst } from "./constant";
const ProductValidation = Yup.object().shape({
  productName: Yup.string().trim().required(" "),
});
class ProAddEditDetail extends Component {
  constructor() {
    super();
    this.state = {
      editor: EditorState.createEmpty(),
      productDescri: "",
      btnDisable: false,
      comLogoName: null,
      comLogoByte: null,
      title: "",
      iconName: null,
      iconByte: null,
      features: [],
      initialState: {
        productName: "",
      },
    };
  }
  handalTitle = (e) => this.setState({ title: e.target.value });
  hendalEditor = (editorState) => {
    try {
      let val = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      this.setState({ editor: editorState, productDescri: val });
    } catch (error) {
      console.log(error);
    }
  };
  fileUpload = (a, b, c) => {
    try {
      if (a && b) {
        let name = a.split(".");
        name = name[0].substr(0, 5) + "." + name[1];
        return (
          <>
            <span className="optionui">
              <span className="txtWrap">{name}</span>
              <CloseOutlined
                onClick={() =>
                  c === "companyLogo"
                    ? this.removeCompLogo()
                    : this.removeIcon()
                }
              />
            </span>
            <Image src={b} width={50} height={30} preview={false} />
          </>
        );
      }
      return (
        <FileUpload
          accept=".jpg, .jpeg, .png"
          image={true}
          sendByte={c === "companyLogo" ? this.setComLogo : this.setIcon}
          elements={<UploadOutlined />}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  setComLogo = (byteCode, name) =>
    this.setState({ comLogoByte: byteCode, comLogoName: name });
  setIcon = (byteCode, name) =>
    this.setState({ iconByte: byteCode, iconName: name });
  removeCompLogo = () =>
    this.setState({ comLogoByte: null, comLogoName: null });
  removeIcon = () => this.setState({ iconByte: null, iconName: null });
  deleteIcon = (i) => {
    try {
      const { features } = this.state;
      features.splice(i, 1);
      this.setState({ features });
    } catch (error) {
      console.log(error);
    }
  };
  addIcon = (title, iconByte, iconName) => {
    try {
      const { features } = this.state;
      if (title !== "" && iconByte && iconName && features.length < 25) {
        features.push({ title: title, iconByte: iconByte, iconName: iconName });
        this.setState({ title: "", iconByte: null, iconName: null });
      } else {
        // message.info("max 25 icon add");
        this.setState({ title: "", iconByte: null, iconName: null });
      }
    } catch (error) {
      console.log(error);
    }
  };
  imagesUI = () => {
    try {
      const { features } = this.state;
      return features.map((a, i) => (
        <div className="imgDiv" key={i}>
          <Image src={a.iconByte} width={160} height={100} preview={false} />
          <div>
            <span className="txtWrap">{a.title}</span>
            <DeleteOutlined onClick={() => this.deleteIcon(i)} />
          </div>
        </div>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { title, iconName, iconByte, features } = this.state;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      if (title !== "" && iconName && iconByte) {
        features.push({ title: title, iconByte: iconByte, iconName: iconName });
      }
      this.props.countInc();
      console.log(features);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      editor,
      initialState,
      btnDisable,
      comLogoName,
      comLogoByte,
      title,
      iconName,
      iconByte,
    } = this.state;
    return (
      <ProAddEditStyle>
        <Formik
          initialValues={initialState}
          validationSchema={ProductValidation}
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
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <div className="field">
                    <Label
                      title={proAddConst.product}
                      className={
                        errors.productName && touched.productName ? "empty" : ""
                      }
                    />
                    <Input
                      onBlur={handleBlur}
                      name="productName"
                      value={values.productName}
                      handleChange={handleChange}
                      className={
                        errors.productName && touched.productName ? "empty" : ""
                      }
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <div className="compLogoDiv">
                    <Label title={proAddConst.company} />
                    {this.fileUpload(comLogoName, comLogoByte, "companyLogo")}
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <div className="field">
                    <Label title={proAddConst.productDes} />
                    <Editor
                      editorState={editor}
                      onEditorStateChange={this.hendalEditor}
                    />
                  </div>
                </Col>
              </Row>
              <h2>{proAddConst.features}</h2>
              <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <div className="field">
                    <Label title={proAddConst.title} />
                    <Input value={title} handleChange={this.handalTitle} />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                  <div className="compLogoDiv">
                    <Label title={proAddConst.icon} />
                    {this.fileUpload(iconName, iconByte, "icon")}
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} xl={6} className="addbtn">
                  <div
                    className="addButton pointer"
                    onClick={() => this.addIcon(title, iconByte, iconName)}
                  >
                    <PlusOutlined />
                  </div>
                </Col>
              </Row>
              <div className="imagesDiv">{this.imagesUI()}</div>
              <div className="btnDiv">
                <Button type="submit" disabled={btnDisable}>
                  {ButtonConst.next}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </ProAddEditStyle>
    );
  }
}
export default ProAddEditDetail;
