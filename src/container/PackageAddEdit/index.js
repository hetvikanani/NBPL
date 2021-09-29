import React, { Component } from "react";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Editor } from "react-draft-wysiwyg";
import { EditorState , convertToRaw} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
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
      packageDetails:"",
      btnDisable: false,
      subType: false,
      initialState: {
        packageType:"",
        packagePrice:"",
      },
    };
  }
  hendalEditor = (editorState) => {
    try {
      let val = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      
      this.setState({ editor: editorState,packageDetails: val});
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
  selectUI =(val,setFieldValue,error)=>{
    try {
      return(
        <Select
          data={select}
          value={val}
          defaultValue={val}
          selectClass={error ? "empty" : ""}
          onChange={(value) => {
            setFieldValue("packageType", value);
          }}
        />

      );
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { initialState, subType, editor ,packageDetails} = this.state;
    return (
      <PackAddEditStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv">
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
                          <Label title={packAddEditConst.packType + packAddEditConst.colon} 
                          className={
                            errors.packageType && touched.packageType
                              ? "empty"
                              : ""
                          }
                          />
                          { values.packageType==="" && this.selectUI(
                              "",
                              setFieldValue,
                              errors.packageType && touched.packageType
                            )}
                            { values.packageType!==""&& this.selectUI(
                              values.packageType,
                              setFieldValue,
                              errors.packageType && touched.packageType
                            )}
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className="field">
                          <Label title={packAddEditConst.subsType + packAddEditConst.colon} />
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
                          <Label title={packAddEditConst.packPrice + packAddEditConst.colon} />
                          <Input 
                            className={
                              errors.packagePrice && touched.packagePrice
                                ? "empty"
                                : ""
                            }
                            onBlur={handleBlur}
                            name="packagePrice"
                            value={values.packagePrice}
                            handleChange={handleChange}
                          />
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className="field">
                          <Label title={packAddEditConst.packDetails + packAddEditConst.colon} />
                          <Editor
                            editorState={editor}
                            onEditorStateChange={this.hendalEditor}
                          />
                        </div>
                      </Col>
                    </Row>     
                    {/* <div dangerouslySetInnerHTML={{__html: packageDetails}}/> */}
                    <div className="bottomDiv">
                      <Button type="button">{packAddEditConst.saveAddOther}</Button>
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
export default withRouter(PackageAddEdit);
