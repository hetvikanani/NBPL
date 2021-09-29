import React, { Component } from "react";
import { message, Upload } from "antd";
import { withRouter } from "react-router-dom";

class FileUpload extends Component {
  beforeUpload = async (file) => {
    try {
      const { image, video,pdf } = this.props;
      if (image || video) {
        if (image && file.size > 300000)
          message.error("Select smaller size image(less then 300kb)");
        else if (video && file.size > 2000000)
          message.error("Select smaller size video(less then 500kb)");
        else {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            this.props.sendByte(reader.result, file.name);
          };
        }
      }else if(pdf) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.props.sendByte(reader.result, file.name);
        };
        // let formdata = new FormData();
        // let ext = file.name.split(".");
        // let newName = new Date().getTime();
        // formdata.append("file", file, newName + "." + ext[ext.length - 1]);
        // console.log(formdata);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { elements, accept } = this.props;
    const props = { beforeUpload: this.beforeUpload };
    return (
      <Upload showUploadList={false} {...props} accept={accept}>
        {elements}
      </Upload>
    );
  }
}

// const mapStateToProps = (state) => ({});
// const mapDispatchToProps = (dispatch) => ({
//   upload: (payload) => dispatch(upload(payload)),
// });

export default withRouter(FileUpload);
