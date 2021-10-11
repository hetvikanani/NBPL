import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import {
  CloseOutlined,
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
  FilePdfFilled,
} from "@ant-design/icons";

import { ProDocStyle } from "./style";
import { ButtonConst } from "App/AppConstant";
import { proDocConst } from "./constant";
import { Input, Label, Button, FileUpload } from "components/Form";
import { saveProduct } from "redux/product/action";
import { configVar } from "modules/config";
class ProductDocument extends Component {
  constructor() {
    super();
    this.state = {
      btnDisable: false,
      proDocId: 0,
      proVideoId: 0,
      docTitle: "",
      docName: null,
      docByte: null,
      docBase64: null,
      documents: [],
      videos: [],
      videoLink: "",
    };
  }
  componentDidMount() {
    try {
      const { data } = this.props;
      const { documents, videos } = this.state;
      if (data.productId !== 0) {
        let url = configVar.BASE_URL.slice("/", -1);
        data.productDocument.length > 0 &&
          data.productDocument.forEach((a) => {
            // if (a.documentPath !== "" && a.documentTitle !== "") {
            documents.push({
              proDocId: a.pdId,
              docTitle: a.documentTitle,
              docByte: a.documentPath !== "" ? url + a.documentPath : null,
              docBase64: a.documentPath !== "" ? a.documentPath : null,
              isDelete: a.isDelete,
            });
            this.setState({ documents });
            // }
          });
        data.productVideo.length > 0 &&
          data.productVideo.forEach((a) => {
            videos.push({
              proVideoId: a.productVideoId,
              videoLink: a.videoUrl,
              videoShow: a.videoUrl.replace("watch?v=", "embed/"),
              isDelete: a.isDelete,
            });
            this.setState({ videos });
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
  handalTitle = (e) => this.setState({ docTitle: e.target.value });
  handalvideo = (e) => this.setState({ videoLink: e.target.value });

  fileUpload = () => {
    try {
      const { docName, docByte } = this.state;
      if (docName && docByte) {
        return (
          <>
            <span className="optionui anime">
              <span className="txtWrap">{docName}</span>
              <CloseOutlined onClick={() => this.removefile()} />
            </span>
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
  setPdf = (byteCode, name, base64) => {
    this.setState({ docByte: byteCode, docName: name, docBase64: base64 });
  };
  removefile = () =>
    this.setState({ docByte: null, docName: null, docBase64: null });
  addPdf = () => {
    try {
      const { documents, docTitle, docByte, docBase64, proDocId } = this.state;
      if (docTitle.trim() !== "" && docBase64 && documents.length < 25) {
        documents.push({
          proDocId: proDocId,
          docTitle: docTitle.trim(),
          docByte: docByte,
          docBase64: docBase64,
          isDelete: 0,
        });
        this.setState({
          docTitle: "",
          docByte: null,
          docName: null,
          docBase64: null,
        });
      } else {
        this.setState({
          docTitle: "",
          docByte: null,
          docName: null,
          docBase64: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  addVideoLink = () => {
    try {
      const { videos, videoLink, proVideoId } = this.state;
      if (videoLink.trim() !== "" && videos.length < 25) {
        let url = videoLink.trim().replace("watch?v=", "embed/");
        videos.push({
          videoLink,
          videoShow: url,
          proVideoId: proVideoId,
          isDelete: 0,
        });
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
      return documents.map(
        (a, i) =>
          a.isDelete === 0 && (
            <div className="pdfSDiv" key={i}>
              <a href={a.docByte} target="_blank" rel="noreferrer">
                <FilePdfFilled />
              </a>
              <span className="txtWrap">{a.docTitle}</span>

              <DeleteOutlined onClick={() => this.delete(i, "doc")} />
            </div>
          )
      );
    } catch (error) {
      console.log(error);
    }
  };
  delete = (i, val) => {
    try {
      const { documents, videos } = this.state;
      const { data } = this.props;
      if (val === "doc") {
        if (data.productId !== 0) {
          documents[i].isDelete=1;
          this.setState({ documents });
        } else {
          documents.splice(i, 1);
          this.setState({ documents });
        }
      } else if (val === "video") {
        if (data.productId !== 0) {
          videos[i].isDelete=1;
          this.setState({ videos});
        } else {
          videos.splice(i, 1);
          this.setState({ videos });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  videoLinksUI = () => {
    try {
      const { videos } = this.state;
      return videos.map(
        (a, i) =>
          a.isDelete === 0 && (
            <div key={i} className="linkDiv anime">
              <div className="videoBox">
                <iframe
                  id="fr"
                  width="200"
                  height="150"
                  src={a.videoShow}
                ></iframe>
                <CloseOutlined onClick={() => this.delete(i, "video")} />
              </div>
            </div>
          )
      );
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = async (setSubmitting) => {
    try {
      const {
        proDocId,
        docTitle,
        documents,
        docByte,
        docBase64,
        videoLink,
        videos,
        proVideoId,
      } = this.state;
      const { data } = this.props;
      let productDocument = [];
      let productVideo = [];
      let productSubscriptiondetails = [];

      this.setState({ btnDisable: true });
      setTimeout(() => {
        this.setState({ btnDisable: false });
      }, 4500);

      if (docTitle.trim() !== "" && docBase64 && documents.length < 25) {
        documents.push({
          proDocId: proDocId,
          docTitle: docTitle.trim(),
          docByte: docByte,
          docBase64: docBase64,
          isDelete:0,
        });
        this.setState({ docTitle: "", docByte: null, docBase64: null });
      }
      if (documents && documents.length > 0) {
        documents.forEach((a) => {
          productDocument.push({
            pdId: a.proDocId,
            productId: data.productId,
            documentTitle: a.docTitle,
            documentPath: a.docBase64 !== null ? a.docBase64 : "",
            isDelete:a.isDelete,
          });
        });
      }
      if (videoLink.trim() !== "" && videos.length < 25) {
        let url = videoLink.trim().replace("watch?v=", "embed/");
        videos.push({ videoLink, videoShow: url, proVideoId: proVideoId ,isDelete:0,});
        this.setState({ videoLink: "" });
      }

      if (videos && videos.length > 0) {
        videos.forEach((a) => {
          productVideo.push({
            productVideoId: a.proVideoId,
            productId: data.productId,
            videoUrl: a.videoLink,
            isDelete:a.isDelete,
          });
        });
      }
      data.productDocument = productDocument;
      data.productVideo = productVideo;
      data.productSubscriptiondetails = productSubscriptiondetails;
      await this.props.saveProduct(data);

      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { docTitle, videoLink, btnDisable } = this.state;
    return (
      <ProDocStyle>
        <Row gutter={20}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} className="anime">
            <div className="field">
              <Label title={proDocConst.docTitle} />
              <Input value={docTitle} handleChange={this.handalTitle} />
            </div>
          </Col>
          <Col xs={18} sm={18} md={12} lg={6} xl={6}>
            <div className="compLogoDiv">
              <Label title={proDocConst.productDocS} />
              {this.fileUpload()}
            </div>
          </Col>
          <Col xs={6} sm={6} md={12} lg={6} xl={6} className="addbtn">
            <div className="addButton pointer" onClick={this.addPdf}>
              <PlusOutlined />
            </div>
          </Col>
        </Row>
        {this.pdfSUI()}
        <Row gutter={20}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} className="anime">
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
          <Button disabled={btnDisable} onClick={this.handleSubmit}>
            {ButtonConst.submit}
          </Button>
        </div>
      </ProDocStyle>
    );
  }
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  saveProduct: (payload) => dispatch(saveProduct(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDocument)
);
