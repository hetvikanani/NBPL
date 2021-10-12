import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Carousel from "react-multi-carousel";
import { Row, Col, Image, Card, Spin } from "antd";
import { FilePdfFilled } from "@ant-design/icons";
import "react-multi-carousel/lib/styles.css";

import { ProDetailstyle } from "./style";
import { Menu, RoundSwitch, Header, PackageCard } from "components/Form";
import { PdConst } from "./constatnt";
import { getProduct } from "redux/product/action";
import { configVar } from "modules/config";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      item: "",
      allData: {},
      pdfData:[],
      monthlyData:[],
      yearlyData:[],
      videoData:[],
    };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      if (match.params.id) {
        let id = window.atob(match.params.id);
        await this.props.getProduct(id);
        this.setState({ item: match.params.name });
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { products } = this.props;
      if (products !== prevProps.products) {
        let subscripData =  products[0].productSubscriptiondetails;
        let monthly = [];
        let yearly = [];
        if (subscripData && subscripData.length > 0) {
          subscripData.forEach((a) => {
            if (a.subscription === "Monthly") {
              monthly.push(a);
            } else if (a.subscription === "Yearly") {
              yearly.push(a);
            }
          });
        }
        products && products[0] && this.setState({
           allData: products[0],
           pdfData: products[0].productDocument,
           monthlyData:monthly,
           yearlyData:yearly,
           videoData:  products[0].productVideo,
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
  switchChange = () => {
    const { checked } = this.state;
    this.setState({ checked: !checked });
  };
  featureUI = () => {
    try {
      const { allData } = this.state;
      return allData.productFeatures.map((a, i) => (
        <Col xs={24} sm={12} md={12} lg={12} xl={6} key={i} className="anime">
          <Card hoverable className="Feature-card">
            <div className="img-div">
              <Image
                src={configVar.BASE_URL + a.pfIcon}
                preview={false}
                width={40}
                height={40}
              />
            </div>
            <h4>{a.pfName}</h4>
          </Card>
        </Col>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  subscriptionUI = () => {
    try {
      const { checked,monthlyData,yearlyData } = this.state;
      let data = checked?yearlyData:monthlyData;
      return data.map((a, i) => (
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={8}
              xl={8}
              key={i}
              className="anime"
            >
              <PackageCard data={a} />
            </Col>
          ));
    } catch (error) {
      console.log(error);
    }
  };
  carouselUI = () => {
    try {
      const {videoData} =this.state;
     
    
      return videoData.map((a, i) => (
        <div className="carousel-img" key={i}>
          <iframe id="fr" width="300" height="150" src={a.videoUrl.replace("watch?v=", "embed/")}></iframe>
          {/* <Image src={a} preview={false} /> */}
        </div>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  headerImg = () => {
    try {
      const { item, allData } = this.state;
      return (
        <>
          <Image
            src={configVar.BASE_URL + allData.productLogo}
            width={150}
            preview={false}
          />
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };
  pdfImg = () => {
    const{ pdfData}=this.state;
    return pdfData.map((a)=>
      <div className="pdfS">
        <h3 className="txtHead">{a.documentTitle}</h3>
          <div className="pdfIcon">
        <a
          href={a.documentPath !==""? configVar.BASE_URL + a.documentPath : ""}
          target="_blank"
          rel="noreferrer"
        >
            <FilePdfFilled />
        </a>
          </div>
      </div>
    )
  };
  render() {
    const { checked, item, allData } = this.state;
    const { loading } = this.props;
    return (
      <Spin spinning={loading} size="large">
        <ProDetailstyle>
          <Menu />
          <div className="container">
            <Header />
            <div className="allDiv anime">
              <h2>{PdConst.pd}</h2>
              <div className="boxDiv anime">
                {this.headerImg()}
                <h3 className="txtHead">
                  {allData.productname}{" "}
                  {allData.productTitle !== ""
                    ? " - " + allData.productTitle
                    : ""}
                </h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: allData.productDescription,
                  }}
                ></p>
              </div>
              <div className="boxDiv">
                <h3 className="txtHead">{PdConst.feat}</h3>
                <Row gutter={20}>{this.featureUI()} </Row>
              </div>
              <div className="box3">
                <div className="boxDiv">
                  <h3 className="txtHead">{PdConst.SubDet}</h3>
                  <div className="switch-div">
                    <RoundSwitch
                      left="MONTHLY"
                      right="ANNUAL"
                      checked={checked}
                      handleChange={this.switchChange}
                    />
                  </div>
                  <div className="Card-Div">
                    <Row gutter={20}> {this.subscriptionUI()} </Row>
                  </div>
                </div>
              </div>
              {/* <div className="box4">
                <div className="boxDiv">
                  <h3 className="txtHead">{PdConst.partDet}</h3>
                  <p>
                    We Provide a Variety of Visitor Management and Workspace
                    Reservation Solutions. We Also Provide You with Employee
                    Parcel Management The point of using Lorem Ipsum is that it
                    has a more-or-less normal distribution of letters.
                  </p>
                </div>
              </div> */}
              <div className="box5">
                <div className="boxDiv">{this.pdfImg()}</div>
              </div>
              <div className="box6">
                <div className="boxDiv">
                  <h3 className="txtHead">{PdConst.sugVid}</h3>
                  <Carousel
                    dotListClass="custom-dot-list-style"
                    swipeable={false}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                  >
                    {this.carouselUI()}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </ProDetailstyle>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.product.loading,
  error: state.product.error,
  message: state.product.message,
  products: state.product.products,
});
const mapDispatchToProps = (dispatch) => ({
  getProduct: (payload) => dispatch(getProduct(payload)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
);
