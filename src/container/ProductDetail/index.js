import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import { Row, Col, Image, Card } from "antd";
import { FilePdfFilled } from "@ant-design/icons";
import "react-multi-carousel/lib/styles.css";

import { Menu, RoundSwitch,Header,PackageCard } from "components/Form";
import { vizman, iPing, act, eAuction, eVoting, ezeo } from "components/Images";
import { ProDetailstyle } from "./style";
import { FeaturesData, MonthlyData, CarouselData } from "./constatnt";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
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
export default class ProductDetails extends Component {
  constructor() {
    super();
    this.state = { checked: false, item: "" };
  }
  componentDidMount() {
    try {
      const { match } = this.props;

      if (match.params.name) {
        this.setState({ item: match.params.name });
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
      return FeaturesData.map((a, i) => (
        <Col xs={24} sm={12} md={12} lg={12} xl={6} key={i}>
          <Card hoverable className="Feature-card">
            <div className="img-div">
              <Image src={a.img} preview={false} />
            </div>
            <h5>{a.heading}</h5>
          </Card>
        </Col>
      ));
    } catch (error) {
      console.log(error);
    }
  };

  subscriptionUI = () => {
    try {
      const { checked } = this.state;
      return MonthlyData.map((a, i) => (
        <Col xs={24} sm={24} md={24} lg={8} xl={8} key={i}>
           <PackageCard data={a} period="Month"  checked={checked}/>
        </Col>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  carouselUI = () => {
    try {
      return CarouselData.map((a, i) => (
        <div className="carousel-img" key ={i}>
          <Image src={a} preview={false} />
        </div>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  headerImg = () => {
    try {
      const { item } = this.state;
      return (
        <>
          <Image
            src={
              item === "iping"
                ? iPing
                : item === "Act"
                ? act
                : item === "eAuction"
                ? eAuction
                : item === "eVoting"
                ? eVoting
                : item === "EZEO"
                ? ezeo
                : vizman
            }
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
    try {
      return (
        <>
          <a
            href="https://www.vizman.app/downloads/VizManUserManual.pdf"
            target="_blank"
          >
            <div className="pdfIcon">
              <FilePdfFilled />
            </div>
          </a>
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { checked, item } = this.state;
    return (
      <ProDetailstyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv">
            <h2>Product Details</h2>
            <div className="boxDiv">
              {this.headerImg()}
              <h3 className="txtHead">{item} - Visitor Management System</h3>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters,
              </p>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters,
              </p>
            </div>
            <div className="boxDiv">
              <h3 className="txtHead">Features</h3>
              <div>
                <Row gutter ={20}>{this.featureUI()} </Row>
              </div>
            </div>

            <div className="box3">
              <div className="boxDiv">
                <h3 className="txtHead">Subscription Details</h3>
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
            <div className="box4">
              <div className="boxDiv">
                <h3 className="txtHead">Partner related details</h3>
                <p>
                  We Provide a Variety of Visitor Management and Workspace
                  Reservation Solutions. We Also Provide You with Employee
                  Parcel Management The point of using Lorem Ipsum is that it
                  has a more-or-less normal distribution of letters.
                </p>
              </div>
            </div>
            <div className="box5">
              <div className="boxDiv">
                <h3 className="txtHead">User Manual</h3>
                {this.pdfImg()}
              </div>
            </div>
            <div className="box6">
              <div className="boxDiv">
                <h3 className="txtHead">Suggestions Video</h3>
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
    );
  }
}
