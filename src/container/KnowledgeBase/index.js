import React, { Component } from "react";

import { Button, ImageCard, Menu, Header } from "components/Form";
import { BlogStyle } from "./style";
import { Row, Col } from "antd";
import { blog1, blog2, blog3, blog4, nbpl, vizman } from "components/Images";
import {KnowledgeBaseConst} from "./constant";


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
                <h2>{KnowledgeBaseConst.ourBlg}</h2>
                <Row gutter={24}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <ImageCard
                      hoverable={true}
                      className="parentCard"
                      cover={<img src={blog1} className="imgAnimation"></img>}
                    >
                      <h3>{KnowledgeBaseConst.blgTxt}</h3>
                      <div className="iconDiv">
                        <p>
                          <i className="fas fa-calendar-alt iconDate"></i>20th Aug
                          2021 |
                        </p>
                        <p>
                          <i className="fas fa-comment iconDate"></i>Comment
                        </p>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam in justo et mauris dictum blandit vitae ac lacus.
                      </p>
                      <Button className="button">{KnowledgeBaseConst.readMore}</Button>
                    </ImageCard>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <ImageCard
                      hoverable={true}
                      className="parentCard"
                      cover={<img src={blog2} className="imgAnimation"></img>}
                    >
                      <h3>{KnowledgeBaseConst.blgTxt}</h3>
                      <div className="iconDiv">
                        <p>
                          <i className="fas fa-calendar-alt iconDate"></i>20th Aug
                          2021 |
                        </p>
                        <p>
                          <i className="fas fa-comment iconDate"></i>Comment
                        </p>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam in justo et mauris dictum blandit vitae ac lacus.
                      </p>
                      <Button className="button">{KnowledgeBaseConst.readMore}</Button>
                    </ImageCard>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <ImageCard
                      hoverable={true}
                      className="parentCard"
                      cover={<img src={blog3} className="imgAnimation"></img>}
                    >
                      <h3>{KnowledgeBaseConst.blgTxt}</h3>
                      <div className="iconDiv">
                        <p>
                          <i className="fas fa-calendar-alt iconDate"></i>20th Aug
                          2021 |
                        </p>
                        <p>
                          <i className="fas fa-comment iconDate"></i>Comment
                        </p>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam in justo et mauris dictum blandit vitae ac lacus.{" "}
                      </p>
                      <Button className="button">{KnowledgeBaseConst.readMore}</Button>
                    </ImageCard>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <ImageCard
                      hoverable={true}
                      className="parentCard"
                      cover={<img src={blog4} className="imgAnimation"></img>}
                    >
                      <h3>{KnowledgeBaseConst.blgTxt}</h3>
                      <div className="iconDiv">
                        <p>
                          <i className="fas fa-calendar-alt iconDate"></i>20th Aug
                          2021 |
                        </p>
                        <p>
                          <i className="fas fa-comment iconDate"></i>Comment
                        </p>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam in justo et mauris dictum blandit vitae ac lacus.
                      </p>
                      <Button className="button">{KnowledgeBaseConst.readMore}</Button>
                    </ImageCard>
                  </Col>
                </Row>
              </ImageCard>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6} className="videoCol">
              <ImageCard className="mainCard">
                <h2>{KnowledgeBaseConst.ourVdo}</h2>
                <div className="scroll-bar">
                  <Col>
                    <ImageCard
                      hoverable={true}
                      className="videoCard1"
                      cover={<img src={nbpl}></img>}
                    ></ImageCard>
                  </Col>
                  <br />
                  <Col>
                    <ImageCard
                      hoverable={true}
                      className="videoCard1"
                      cover={<img src={vizman}></img>}
                    ></ImageCard>
                    <br />
                  </Col>
                  <Col>
                    <ImageCard
                      hoverable={true}
                      className="videoCard1"
                      cover={<img src={vizman}></img>}
                    ></ImageCard>
                  </Col>
                  <br />
                  <Col>
                    <ImageCard
                      hoverable={true}
                      className="videoCard1"
                      cover={<img src={vizman}></img>}
                    ></ImageCard>
                  </Col>
                </div>
              </ImageCard>
            </Col>
          </Row>
          <Row className="footerRow">
            <Col lg={18} xl={18}>
              <ImageCard className="mainCard">
                <h2>{KnowledgeBaseConst.knowUs}</h2>

                <div>
                  <Row className="footerDiv">
                    <Col xs={24} sm={24} md={11} lg={5} xl={5}>
                      <div className="hoverDiv">
                        <ImageCard
                          className="videoCard1"
                          cover={<img src={blog1}></img>}
                        ></ImageCard>
                        <div className="overlay">
                          <div className="text">Lorem Ipsum</div>
                        </div>
                      </div>
                    </Col>

                    <Col xs={24} sm={24} md={11} lg={5} xl={5}>
                      <div className="hoverDiv">
                        <ImageCard
                          className="videoCard1"
                          cover={<img src={blog2}></img>}
                        ></ImageCard>
                        <div className="overlay">
                          <div className="text">Lorem Ipsum</div>
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={11} lg={5} xl={5}>
                      <div className="hoverDiv">
                        <ImageCard
                          className="videoCard1"
                          cover={<img src={blog3}></img>}
                        ></ImageCard>
                        <div className="overlay">
                          <div className="text">Lorem Ipsum</div>
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={11} lg={5} xl={5}>
                      <div className="hoverDiv">
                        <ImageCard
                          className="videoCard1"
                          cover={<img src={blog4}></img>}
                        ></ImageCard>
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
