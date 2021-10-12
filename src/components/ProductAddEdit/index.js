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
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { ProAddEditStyle } from "./style";
import { Input, Label, Button, FileUpload } from "components/Form";
import { ButtonConst } from "App/AppConstant";
import { proAddConst } from "./constant";
import { configVar } from "modules/config";
const ProductValidation = Yup.object().shape({
  productName: Yup.string().trim().required(" "),
});
class ProAddEditDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: EditorState.createEmpty(),
      productDescri: "",
      prodDesError: false,
      btnDisable: false,
      comLogoName: null,
      comLogoByte: null,
      comLogoBase64: null,
      comLogoError: false,
      title: "",
      iconName: null,
      iconByte: null,
      iconBase64: null,
      featureId: 0,
      productId: 0,
      features: [],
      initialState: {
        productName: "",
        productTitle: "",
      },
    };
  }
  componentDidUpdate(prevProps) {
    try {
      const { features } = this.state;
      const { data } = this.props;
      if (data !== prevProps.data) {
        let url = configVar.BASE_URL.slice("/", -1);
        let comLogoName =
          data.productLogo !== ""
            ? data.productLogo.split("/ProductLogo/")
            : null;
        let init = {
          productName: data.productname,
          productTitle: data.productTitle,
        };
        let editorState = EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(
              data.productDescription !== "" ? data.productDescription : ""
            )
          )
        );
        data.productFeatures &&
          data.productFeatures.length > 0 &&
          data.productFeatures.map((a) => {
            if (a.pfName !== "" && a.pfIcon !== "") {
              features.push({
                featureId: a.pfId,
                title: a.pfName,
                iconByte: a.pfIcon !== "" ? url + a.pfIcon : null,
                iconBase64: a.pfIcon !== "" ? a.pfIcon : null,
                isDelete:a.isDelete,
              });
            }
          });
        this.setState({
          productId: data.productId,
          initialState: init,
          comLogoName: comLogoName[1],
          comLogoBase64: data.productLogo !== "" ? data.productLogo : null,
          comLogoByte: data.productLogo !== "" ? url + data.productLogo : null,
          editor: editorState,
          productDescri: data.productDescription,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  handalTitle = (e) => this.setState({ title: e.target.value });
  hendalEditor = (editorState) => {
    try {
      let val = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      this.setState({
        editor: editorState,
        productDescri: val,
        prodDesError: val.trim() === "" || val === "<p></p>\n",
      });
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
            <Image
              src={b}
              width={50}
              height={30}
              className={c ? "img" + c : ""}
            />
          </>
        );
      }
      return (
        <FileUpload
          accept=".jpg, .jpeg, .png,.svg"
          image={true}
          sendByte={c === "companyLogo" ? this.setComLogo : this.setIcon}
          elements={<UploadOutlined />}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  setComLogo = (byteCode, name, base64) => {
    this.setState({
      comLogoByte: byteCode,
      comLogoName: name,
      comLogoBase64: base64,
      comLogoError: !base64,
    });
  };
  setIcon = (byteCode, name, base64) =>
    this.setState({ iconByte: byteCode, iconName: name, iconBase64: base64 });
  removeCompLogo = () =>
    this.setState({
      comLogoByte: null,
      comLogoName: null,
      comLogoBase64: null,
    });
  removeIcon = () =>
    this.setState({ iconByte: null, iconName: null, iconBase64: null });
  deleteIcon = (i) => {
    try {
      const {features,productId } = this.state;
      if (productId !== 0) {
        features[i].isDelete=1;
        this.setState({ features });
      } else {
        features.splice(i, 1);
        this.setState({ features });
      }
    } catch (error) {
      console.log(error);
    }
  };
  addIcon = () => {
    try {
      const { features, title, iconByte, iconBase64, featureId} =
        this.state;
      if (title.trim() !== "" && iconBase64 && features.length < 25) {
        features.push({
          featureId: featureId,
          title: title,
          iconByte: iconByte,
          iconBase64: iconBase64,
          isDelete: 0,
        });
        this.setState({
          title: "",
          iconByte: null,
          iconName: null,
          iconBase64: null,
        });
      } else {
        this.setState({
          title: "",
          iconByte: null,
          iconName: null,
          iconBase64: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  imagesUI = () => {
    try {
      const { features } = this.state;
      return features.map(
        (a, i) =>
          a.isDelete === 0 && (
            <div className="imgDiv" key={i}>
              <Image
                src={a.iconByte}
                width={160}
                height={100}
                preview={false}
              />
              <div>
                <span className="txtWrap">{a.title}</span>
                <DeleteOutlined onClick={() => this.deleteIcon(i)} />
              </div>
            </div>
          )
      );
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      const {
        title,
        iconByte,
        iconBase64,
        features,
        productDescri,
        comLogoBase64,
        featureId,
        productId,
      } = this.state;
      let productFeatures = [];
      let flag = false;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      if (productDescri.trim() === "" || productDescri === "<p></p>\n") {
        this.setState({ prodDesError: true });
        flag = true;
      }
      if (!comLogoBase64) {
        this.setState({ comLogoError: true });
        flag = true;
      }
      if (title.trim() !== "" && iconBase64 && features.length < 25) {
        features.push({
          featureId: featureId,
          title: title.trim(),
          iconByte: iconByte,
          iconBase64: iconBase64,
          isDelete:0,
        });
      }
      if (features && features.length > 0) {
        features.forEach((a) => {
          productFeatures.push({
            pfId: a.featureId,
            productId: productId,
            pfName: a.title,
            pfIcon: a.iconBase64,
            isDelete:a.isDelete,
          });
        });
      }
      if (flag === false) {
        if (productId !== 0) {
          let data = this.props.data;
          data.productId = productId;
          data.productname = values.productName.trim();
          data.productTitle = values.productTitle.trim();
          data.productDescription = productDescri;
          data.productLogo = comLogoBase64 !== null ? comLogoBase64 : "";
          data.productFeatures = productFeatures;

          this.props.countInc(data);
        } else {
          let sendData = {
            productId: productId,
            productname: values.productName.trim(),
            productTitle: values.productTitle.trim(),
            productDescription: productDescri,
            productLogo: comLogoBase64 !== null ? comLogoBase64 : "",
            productFeatures: productFeatures,
          };
          this.props.countInc(sendData);
        }
      }
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
      comLogoError,
      prodDesError,
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
              <Row gutter={20} className="anime">
                <Col xs={24} sm={24} md={24} lg={12} xl={12} className="anime">
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
                <Col xs={24} sm={24} md={24} lg={12} xl={12} className="anime">
                  <div className="compLogoDiv">
                    <Label
                      title={proAddConst.company}
                      className={comLogoError ? "empty" : ""}
                    />
                    {this.fileUpload(comLogoName, comLogoByte, "companyLogo")}
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} className="anime">
                  <div className="field">
                    <Label title={proAddConst.productTitle} />
                    <Input
                      onBlur={handleBlur}
                      name="productTitle"
                      value={values.productTitle}
                      handleChange={handleChange}
                    />
                  </div>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <div className="field">
                    <Label title={proAddConst.productDes} />
                    <Editor
                      wrapperClassName={prodDesError ? "editorError" : ""}
                      editorState={editor}
                      onEditorStateChange={this.hendalEditor}
                    />
                  </div>
                </Col>
              </Row>
              <h2>{proAddConst.features}</h2>
              <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} className="anime">
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
                  <div className="addButton pointer" onClick={this.addIcon}>
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
