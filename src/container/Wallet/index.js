import React, { Component } from "react";
import { Row, Col, Card, InputNumber } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { WalletStyle } from "./style";
import {
  Menu,
  Button,
  Header,
  Input,
  Table,
  Pagination,
} from "components/Form";
import { topRowData, WalletConst } from "./constatnt";
import {
  getTaransactionHistory,
  getCurrentBalence,
  addWithdarawMoney,
} from "redux/wallet/action";

class Salse extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      pageSize: 10,
      dataLength: 0,
      currentPage: 1,
      partnerId: "0",
      addMoney: "",
      withDraw: "",
      addMoneyError: false,
      withDrawError: false,
      submitClicked: false,
    };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      const { currentPage, pageSize } = this.state;
      if (match.params.id) {
        let id = window.atob(match.params.id);
        let para = {
          parameter: " where partnerid=" + id,
          pageSize: pageSize.toString(),
          page: currentPage.toString(),
          sortColumn: "tid",
        };
        await this.props.getTaransactionHistory(para);
        await this.props.getCurrentBalence(id);
        this.setState({ partnerId: id });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps) {
    try {
      const { trHistory } = this.props;
      if (trHistory !== prevProps.trHistory) {
        if (trHistory && trHistory.length > 0)
          this.setState({ dataLength: trHistory[0].totalLenght });
      }
    } catch (error) {
      console.log(error);
    }
  }

  handlePagination = async (val) => {
    const { partnerId, pageSize } = this.state;
    var para = {
      parameter: " where partnerid=" + partnerId,
      pageSize: pageSize.toString(),
      page: val.toString(),
      sortColumn: "partnerid desc",
    };
    await this.props.getTaransactionHistory(para);
    this.setState({ currentPage: val.current });
  };
  onChange = (value) => {
    console.log("changed", value);
  };

  handleSubmit = async (a) => {
    try {
      const { addMoney, withDraw, partnerId } = this.state;
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
      }
      if (flag === false) {
        let url = `${partnerId}/${a === "Add Money" ? addMoney : withDraw}/${
          a === "Add Money" ? "0" : "1"
        }`;
        await this.props.addWithdarawMoney(url);
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
      const { currBal } = this.props;
      let balence =
        currBal && currBal.length > 0 ? currBal[0].currentBalence : 0;
      const { addMoney, withDraw, addMoneyError, withDrawError } = this.state;
      return topRowData.map((a, i) => (
        <Col xs={24} sm={24} md={24} lg={24} xl={8} key={i}>
          <Card className="box">
            <h3 className="name">{a.name}</h3>
            <div className="input-div">
              {i === 0 && <h1 className="mark">{"₹ " + balence}</h1>}
              {i !== 0 && (
                <>
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
                    max={25}
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
      return <Input placeholder={WalletConst.search} />;
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { trHistory } = this.props;
    const { dataLength, currentPage, pageSize } = this.state;
    return (
      <WalletStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv anime">
            <Row gutter={20}>{this.topRowUi()}</Row>
            <div className="boxDiv">
              <h2>{WalletConst.tranHistory}</h2>
              <div className="inputNum-div">
                <div className="inputDiv"> {this.inputNumberUi()} </div>
                <div className="searchDiv">{this.SearchUI()}</div>
              </div>
              <div className="table-div">
                <Table data={trHistory} type="wallet" size={10} />
              </div>
              <div className="bottomDiv">
                <p className="last-para">Showing 1 to 3 of 3 entries </p>
                {dataLength > 10 && (
                  <div className="pagiDiv">
                    <Pagination
                      onChange={this.handlePagination}
                      current={currentPage}
                      total={dataLength}
                      pageSize={pageSize}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </WalletStyle>
    );
  }
}
const mapStateToProps = (state) => ({
  // loading: state.wallet.loading,
  // error: state.wallet.error,
  // message: state.wallet.message,
  trHistory: state.wallet.trHistory,
  currBal: state.wallet.currBal,
});
const mapDispatchToProps = (dispatch) => ({
  getTaransactionHistory: (payload) =>
    dispatch(getTaransactionHistory(payload)),
  getCurrentBalence: (payload) => dispatch(getCurrentBalence(payload)),
  addWithdarawMoney: (payload) => dispatch(addWithdarawMoney(payload)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Salse));
