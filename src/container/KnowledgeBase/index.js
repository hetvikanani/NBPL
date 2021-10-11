import React, { Component } from "react";
import { Row, Col } from "antd";

import { BlogStyle } from "./style";
import { KnowConst } from "./constant";
import { Button, ImageCard, Menu, Header } from "components/Form";
import { blog1, blog2, blog3, blog4, nbpl, vizman } from "components/Images";

class Blog extends Component {
  render() {
    return (
      <BlogStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv">
            <Row gutter={24}>
              <Col lg={18} xl={18}>
                <ImageCard className="mainCard">
                  <h2>{KnowConst.ourBlg}</h2>
                  <Row gutter={24}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <ImageCard
                        hoverable={true}
                        className="parentCard"
                        cover={
                          <img
                            alt="blg"
                            src={blog1}
                            className="imgAnimation"
                          ></img>
                        }
                      >
                        <h3>{KnowConst.blgTxt}</h3>
                        <div className="iconDiv">
                          <p>
                            <i className="fas fa-calendar-alt iconDate"></i>20th
                            Aug 2021 |
                          </p>
                          <p>
                            <i className="fas fa-comment iconDate"></i>Comment
                          </p>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nullam in justo et mauris dictum blandit vitae
                          ac lacus.
                        </p>
                        <Button className="button">{KnowConst.readMore}</Button>
                      </ImageCard>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <ImageCard
                        hoverable={true}
                        className="parentCard"
                        cover={
                          <img
                            alt="blg"
                            src={blog2}
                            className="imgAnimation"
                          ></img>
                        }
                      >
                        <h3>{KnowConst.blgTxt}</h3>
                        <div className="iconDiv">
                          <p>
                            <i className="fas fa-calendar-alt iconDate"></i>20th
                            Aug 2021 |
                          </p>
                          <p>
                            <i className="fas fa-comment iconDate"></i>Comment
                          </p>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nullam in justo et mauris dictum blandit vitae
                          ac lacus.
                        </p>
                        <Button className="button">{KnowConst.readMore}</Button>
                      </ImageCard>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <ImageCard
                        hoverable={true}
                        className="parentCard"
                        cover={
                          <img
                            alt="blg"
                            src={blog3}
                            className="imgAnimation"
                          ></img>
                        }
                      >
                        <h3>{KnowConst.blgTxt}</h3>
                        <div className="iconDiv">
                          <p>
                            <i className="fas fa-calendar-alt iconDate"></i>20th
                            Aug 2021 |
                          </p>
                          <p>
                            <i className="fas fa-comment iconDate"></i>Comment
                          </p>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nullam in justo et mauris dictum blandit vitae
                          ac lacus.{" "}
                        </p>
                        <Button className="button">{KnowConst.readMore}</Button>
                      </ImageCard>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <ImageCard
                        hoverable={true}
                        className="parentCard"
                        cover={
                          <img
                            alt="blg"
                            src={blog4}
                            className="imgAnimation"
                          ></img>
                        }
                      >
                        <h3>{KnowConst.blgTxt}</h3>
                        <div className="iconDiv">
                          <p>
                            <i className="fas fa-calendar-alt iconDate"></i>20th
                            Aug 2021 |
                          </p>
                          <p>
                            <i className="fas fa-comment iconDate"></i>Comment
                          </p>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nullam in justo et mauris dictum blandit vitae
                          ac lacus.
                        </p>
                        <Button className="button">{KnowConst.readMore}</Button>
                      </ImageCard>
                    </Col>
                  </Row>
                </ImageCard>
              </Col>
              <Col xs={24} sm={24} md={24} lg={6} xl={6} className="videoCol">
                <ImageCard className="mainCard">
                  <h2>{KnowConst.ourVdo}</h2>
                  <div className="scroll-bar">
                    <Col>
                      <ImageCard
                        hoverable={true}
                        className="videoCard1"
                        cover={<img alt="blg" src={nbpl}></img>}
                      />
                    </Col>
                    <br />
                    <Col>
                      <ImageCard
                        hoverable={true}
                        className="videoCard1"
                        cover={<img alt="blg" src={vizman}></img>}
                      />
                      <br />
                    </Col>
                    <Col>
                      <ImageCard
                        hoverable={true}
                        className="videoCard1"
                        cover={<img alt="blg" src={vizman}></img>}
                      />
                    </Col>
                    <br />
                    <Col>
                      <ImageCard
                        hoverable={true}
                        className="videoCard1"
                        cover={<img alt="blg" src={vizman}></img>}
                      />
                    </Col>
                  </div>
                </ImageCard>
              </Col>
            </Row>
            <Row className="footerRow">
              <Col lg={18} xl={18}>
                <ImageCard className="mainCard">
                  <h2>{KnowConst.knowUs}</h2>
                  <div>
                    <Row className="footerDiv">
                      <Col xs={24} sm={24} md={11} lg={5} xl={5}>
                        <div className="hoverDiv">
                          <ImageCard
                            className="videoCard1"
                            cover={<img alt="blg" src={blog1}></img>}
                          />
                          <div className="overlay">
                            <div className="text">Lorem Ipsum</div>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={11} lg={5} xl={5}>
                        <div className="hoverDiv">
                          <ImageCard
                            className="videoCard1"
                            cover={<img alt="blg" src={blog2}></img>}
                          />
                          <div className="overlay">
                            <div className="text">Lorem Ipsum</div>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={11} lg={5} xl={5}>
                        <div className="hoverDiv">
                          <ImageCard
                            className="videoCard1"
                            cover={<img alt="blg" src={blog3}></img>}
                          />
                          <div className="overlay">
                            <div className="text">Lorem Ipsum</div>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={11} lg={5} xl={5}>
                        <div className="hoverDiv">
                          <ImageCard
                            className="videoCard1"
                            cover={<img alt="blg" src={blog4}></img>}
                          />
                          <div className="overlay">
                            <div className="text">Lorem Ipsum</div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </ImageCard>
              </Col>
            </Row>
          </div>
        </div>
      </BlogStyle>
    );
  }
}

export default Blog;
