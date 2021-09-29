import React, { Component } from "react";
import { Row, Col, Image, message } from "antd";
import {
  CloseOutlined,
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
  FilePdfFilled,
} from "@ant-design/icons";

import { ProDocStyle } from "./style";
import { Input, Label, Button, FileUpload } from "components/Form";
import { ButtonConst } from "App/AppConstant";
// import {adminProConst} from "container/AdminProduct/constant";
import {proDocConst} from "./constant";
class ProductDocument extends Component {
  constructor() {
    super();
    this.state = {
      btnDisable: false,
      docTitle: "",
      docName: null,
      docByte: null,
      documents: [],
      videos: [],
      videoLink: "",
    };
  }
  handalTitle = (e) => this.setState({ docTitle: e.target.value });
  handalvideo = (e) => this.setState({ videoLink: e.target.value });

  fileUpload = () => {
    try {
      const { docName, docByte } = this.state;
      if (docName && docByte) {
        // let name = docName.split(".");
        // name = name[0]+"." + name[1];
        return (
          <>
            <span className="optionui">
              <span className="txtWrap">{docName}</span>
              <CloseOutlined onClick={() => this.removefile()} />
            </span>

            {/* <Image src={b} width={50} height={30} preview={false} /> */}
          </>
        );
      }
      return (
        <FileUpload
          accept=".pdf"
          pdf={true}
          sendByte={this.setPdf}
          elements={<UploadOutlined />}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };
  setPdf = (byteCode, name) =>
    this.setState({ docByte: byteCode, docName: name });
  removefile = () => this.setState({ docByte: null, docName: null });
  addIcon = () => {
    try {
      const { documents, docTitle, docName, docByte } = this.state;
      if (docTitle !== "" && docByte && docName && documents.length < 25) {
        documents.push({
          docTitle: docTitle,
          docByte: docByte,
          docName: docName,
        });
        this.setState({ docTitle: "", docByte: null, docName: null });
      } else {
        // message.info("max 25 icon add");
        this.setState({ docTitle: "", docByte: null, docName: null });
      }
    } catch (error) {
      console.log(error);
    }
  };
  addVideoLink = () => {
    try {
      const { videos, videoLink } = this.state;
      if (videoLink !== "" && videos.length < 25) {
       
        let url = videoLink.replace("watch?v=", "embed/");
        console.log(url);

        videos.push({ videoLink, videoShow: url });
        this.setState({ videoLink: "" });
      } else {
        this.setState({ videoLink: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  pdfSUI = () => {
    try {
      const { documents } = this.state;
      return documents.map((a, i) => (
        <div className="pdfSDiv" key={i}>
          <FilePdfFilled />
          <span className="txtWrap">{a.docTitle}</span>
          <DeleteOutlined onClick={() => this.delete(i, "doc")} />
        </div>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  delete = (i, val) => {
    try {
      const { documents, videos } = this.state;
      if (val === "doc") {
        documents.splice(i, 1);
        this.setState({ documents });
      } else if (val === "video") {
        videos.splice(i, 1);
        this.setState({ videos });
      }
    } catch (error) {
      console.log(error);
    }
  };
  videoLinksUI = () => {
    try {
      const { videos } = this.state;
      return videos.map((a, i) => (
        <div key={i} className="linkDiv">
          <div className="videoBox">
            <iframe width="200" height="150" src={a.videoShow}></iframe>
            <CloseOutlined onClick={() => this.delete(i, "video")} />
          </div>
        </div>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit=()=>{
    try {
      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);
      // this.props.countInc();
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { docTitle, videoLink, btnDisable } = this.state;
    return (
      <ProDocStyle>
        <Row gutter={20}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div className="field">
              <Label title={proDocConst.docTitle} />
              <Input value={docTitle} handleChange={this.handalTitle} />
            </div>
          </Col>
          <Col xs={18} sm={18} md={12} lg={6} xl={6}>
            <div className="compLogoDiv">
              <Label title={proDocConst.productDocS}/>
              {this.fileUpload()}
            </div>
          </Col>
          <Col xs={6} sm={6} md={12} lg={6} xl={6} className="addbtn">
            <div className="addButton pointer" onClick={this.addIcon}>
              <PlusOutlined />
            </div>
          </Col>
        </Row>
        {this.pdfSUI()}

        <Row gutter={20}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div className="field">
              <Label title={proDocConst.proVideo} />
              <Input
                value={videoLink}
                handleChange={this.handalvideo}
                suffix={<UploadOutlined onClick={this.addVideoLink} />}
              />
            </div>
          </Col>
        </Row>
        {this.videoLinksUI()}

        <div className="btnDiv">
          <Button disabled={btnDisable}  onClick={this.handleSubmit}>
            {ButtonConst.submit}
          </Button>
        </div>
      </ProDocStyle>
    );
  }
}
export default ProductDocument;
