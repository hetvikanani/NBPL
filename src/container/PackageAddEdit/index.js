import React, { Component } from "react";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
// import htmlToDraft from 'html-to-draftjs';

import { PackAddEditStyle } from "./style";
import { packAddEditConst } from "./constant";
import {
  Menu,
  Header,
  Input,
  Label,
  Select,
  RoundSwitch,
  Button,
} from "components/Form";
import {
  getSubscribePackage,
  saveProductPackage,
  getProductPackage,
} from "redux/subscribe/action";
const PackageValidation = Yup.object().shape({
  packageType: Yup.string().trim().required(" "),
  packagePrice: Yup.string().trim().required(" "),
});
const select = ["kartik", "Amar"];
class PackageAddEdit extends Component {
  constructor() {
    super();
    this.state = {
      editor: EditorState.createEmpty(),
      packageDetails: "",
      btnDisable: false,
      subType: false,
      selectData: [],
      productId: 0,
      item: "",
      initialState: {
        packageId: 0,
        packageType: "",
        packageTypeId: 0,
        packagePrice: "",
      },
    };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      await this.props.getSubscribePackage();
      if (match.params.id) {
        let id = window.atob(match.params.id);
        var para = {
          parameter: " where partnerid=" +id,
          pageSize: "10",
          // page: currentPage.toString(),
          sortColumn: "tid",
        };
        this.setState({ productId: id, item: match.params.name });
      }
      if (match.params.editid) {
        let editId = window.atob(match.params.editid);
        await this.props.getProductPackage(editId);
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { packageSelect, packageDetail } = this.props;
      const { selectData } = this.state;
      if (packageSelect !== prevProps.packageSelect) {
        packageSelect &&
          packageSelect.forEach((a) => {
            selectData.push({
              id: a.value,
              value: a.text,
            });
          });
        this.setState({ packageSelect });
      }
      if (packageDetail !== prevProps.packageDetail) {
        let data = packageDetail && packageDetail[0];
        let packType = selectData.find(
          (x) => x.id === data.packageType.toString()
        );
        let editorState = EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(
              data.packageDescription !== "" ? data.packageDescription : ""
            )
          )
        );
        let editData = {
          packageId: data.packageId,
          packageType: packType.value,
          packageTypeId: data.packageType,
          packagePrice: data.packagePrice.toString(),
        };
        this.setState({
          initialState: editData,
          subType: data.subscriptionType === 1 ? true : false,
          editor: editorState,
          packageDetails:data.packageDescription
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  hendalEditor = (editorState) => {
    try {
      let val = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      this.setState({ editor: editorState, packageDetails: val });
    } catch (error) {
      console.log(error);
    }
  };
  switchChange = () => {
    try {
      const { subType } = this.state;
      this.setState({ subType: !subType });
    } catch (error) {
      console.log(error);
    }
  };
  selectUI = (val, setFieldValue, error) => {
    try {
      const { selectData } = this.state;
      return (
        <Select
          data={selectData}
          withID={true}
          value={val}
          defaultValue={val}
          selectClass={error ? "empty" : ""}
          onChange={(value, data) => {
            setFieldValue("packageType", value);
            setFieldValue("packageTypeId", data.id);
          }}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { packageDetails, subType, productId, item } = this.state;
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      let sendData = {
        packageId: values.packageId,
        productId: parseInt(productId),
        packageType: parseInt(values.packageTypeId),
        packagePrice: parseInt(values.packagePrice),
        subscriptionType: subType ? 1 : 0,
        packageDescription:
          packageDetails !== "" && packageDetails !== "<p></p>\n"
            ? packageDetails
            : "",
      };
      let rediPath = item + "/" + window.btoa(productId);
        await this.props.saveProductPackage({ data: sendData, url: rediPath });
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { initialState, subType, editor } = this.state;
    return (
      <PackAddEditStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv anime">
            <h2>{packAddEditConst.addNewPack}</h2>
            <div className="formDiv">
              <Formik
                initialValues={initialState}
                validationSchema={PackageValidation}
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
                            title={
                              packAddEditConst.packType + packAddEditConst.colon
                            }
                            className={
                              errors.packageType && touched.packageType
                                ? "empty"
                                : ""
                            }
                          />
                          {values.packageType === "" &&
                            this.selectUI(
                              "",
                              setFieldValue,
                              errors.packageType && touched.packageType
                            )}
                          {values.packageType !== "" &&
                            this.selectUI(
                              values.packageType,
                              setFieldValue,
                              errors.packageType && touched.packageType
                            )}
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="field">
                          <Label
                            title={
                              packAddEditConst.subsType + packAddEditConst.colon
                            }
                          />
                          <div className="switchDiv">
                            <RoundSwitch
                              left="MONTHLY"
                              right="ANNUAL"
                              checked={subType}
                              handleChange={this.switchChange}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="field">
                          <Label
                            title={
                              packAddEditConst.packPrice +
                              packAddEditConst.colon
                            }
                          />
                          <Input
                            className={
                              errors.packagePrice && touched.packagePrice
                                ? "empty"
                                : ""
                            }
                            type="number"
                            onBlur={handleBlur}
                            name="packagePrice"
                            value={values.packagePrice}
                            handleChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className="field">
                          <Label
                            title={
                              packAddEditConst.packDetails +
                              packAddEditConst.colon
                            }
                          />
                          <Editor
                            editorState={editor}
                            onEditorStateChange={this.hendalEditor}
                          />
                        </div>
                      </Col>
                    </Row>
                    <div className="bottomDiv">
                      <Button type="button">
                        {packAddEditConst.saveAddOther}
                      </Button>
                      <Button type="submit">{packAddEditConst.save}</Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </PackAddEditStyle>
    );
  }
}
const mapStateToProps = (state) => ({
  // loading: state.product.loading,
  // error: state.product.error,
  // message: state.product.message,
  packageSelect: state.subscribe.packageSelect,
  packageDetail: state.subscribe.packageDetail,
});
const mapDispatchToProps = (dispatch) => ({
  getSubscribePackage: (payload) => dispatch(getSubscribePackage(payload)),
  saveProductPackage: (payload) => dispatch(saveProductPackage(payload)),
  getProductPackage: (payload) => dispatch(getProductPackage(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PackageAddEdit)
);
