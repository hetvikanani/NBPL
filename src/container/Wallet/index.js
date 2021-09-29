import React, { Component } from "react";
import { Row, Col, Card ,InputNumber} from "antd";

import { WalletStyle } from "./style";
import { Menu, Button, Header, Input, Table } from "components/Form";
import { topRowData, tableData,WalletConst } from "./constatnt";

// const onSearch = (value) => console.log(value);
class Salse extends Component {
  constructor() {
    super();
    this.state = {
      addMoney: "",
      withDraw: "",
      addMoneyError: false,
      withDrawError: false,
      submitClicked: false,
    };
  }
  onChange = (value) => {
    console.log("changed", value);
  };

  handleSubmit = (a) => {
    try {
      const { addMoney, withDraw } = this.state;
      this.setState({ submitClicked: true });
      let flag = false;
      if (a === "Add Money") {
        if (addMoney.toString() === "") {
          this.setState({ addMoneyError: true });
          flag = true;
        }
      }
      if (a === "Withdraw") {
        if (withDraw.toString() === "") {
          this.setState({ withDrawError: true });
          flag = true;
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleInput = (name, val) => {
    const { addMoneyError, withDrawError } = this.state;
    try {
      this.setState({
        [name]: val,
        addMoneyError:
          name === "addMoney" && val.trim().length > 0 ? false : addMoneyError,
        withDrawError:
          name === "withDraw" && val.trim().length > 0 ? false : withDrawError,
      });
    } catch (error) {
      console.log(error);
    }
  };
  topRowUi = () => {
    try {
      const { addMoney, withDraw, addMoneyError, withDrawError } = this.state;
      return topRowData.map((a, i) => (
        <Col xs={24} sm={24} md={24} lg={24} xl={8} key={i}>
          <Card className="box">
            <h3 className="name">{a.name}</h3>
            <div className="input-div">
            {i === 0 && <h1 className="mark">{a.value}</h1>}
              {i !== 0 && (<>
                <Input                  
                  className={`inputBox ${
                    a.name === "Add Money" && addMoneyError
                      ? "empty-field"
                      : "" || (a.name === "Withdraw" && withDrawError)
                      ? "empty-field"
                      : ""
                  }  `}
                  value={a.name === "Add Money" ? addMoney : withDraw}
                  type="number"
                  handleChange={(e) => {
                    this.handleInput(
                      a.name === "Add Money" ? "addMoney" : "withDraw",
                      e.target.value
                    );
                  }}
                />
                <Button
                  className="btn-head"
                  onClick={() => this.handleSubmit(a.name)}
                >
                  {a.name}
                </Button>
                </>
                )} 
              </div>
          </Card>
        </Col>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  inputNumberUi = () => {
    try {
      return (
        <>
          <span>{WalletConst.show}</span>
          <InputNumber
            min={1}
            max={100000}
            // defaultValue={3}
            onChange={this.onChange}
          />
          <span className="entries">{WalletConst.entries}</span>
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };
  SearchUI = () => {
    try {
      return (
          <Input placeholder={WalletConst.search}/>
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <WalletStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv">            
              <Row gutter={20}>{this.topRowUi()}</Row>
              <div className="boxDiv">
              <h2>{WalletConst.tranHistory}</h2>
              <div className="inputNum-div">
                <div className = "inputDiv"> {this.inputNumberUi()} </div>               
                <div className = "searchDiv">{this.SearchUI()}</div>
              </div>
              <div className="table-div">
                <Table data={tableData} type="wallet" size={10} />
              </div>
              <div>
                <p className="last-para">Showing 1 to 3 of 3 entries </p>
              </div>
            </div>
          </div>
        </div>
      </WalletStyle>
    );
  }
}

export default Salse;
