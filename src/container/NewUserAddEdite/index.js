import React, { Component } from "react";
import { NewUserStyle } from "./style";
import { Menu, Header, UserInfo, UserRole } from "components/Form";
import { NewUserConst } from "./constant";
import { getUserById } from "redux/user/action";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      data: {},
    };
  }
  async componentDidMount() {
    try {
      const { match } = this.props;
      if (match.params.id) {
        let id = window.atob(match.params.id);
        await this.props.getUserById(id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps) {
    try {
      const { userById } = this.props;
      if (prevProps.userById !== userById) {
        this.setState({ data: userById });
      }
    } catch (error) {
      console.log(error);
    }
  }
  countInc = (userData) => {
    try {
      const { count } = this.state;
      this.setState({ count: count + 1, data: userData });
    } catch (error) {
      console.log(error);
    }
  };
  pageUI = () => {
    try {
      const { count, data } = this.state;
      return count === 0 ? (
        <UserInfo countInc={this.countInc} />
      ) : count === 1 ? (
        <UserRole data={data} />
      ) : (
        ""
      );
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const data = this.props;
    return (
      <NewUserStyle>
        <Menu />
        <div className="container">
          <Header />
          <div className="allDiv anime" id="user-form">
            <h2>{NewUserConst.addNewUser}</h2>
            <div className="formDiv">{this.pageUI(data)}</div>
          </div>
        </div>
      </NewUserStyle>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.user.loading,
  error: state.user.error,
  message: state.user.message,
  user: state.user.user,
  userById: state.user.userById,
});
const mapDispatchToProps = (dispatch) => ({
  getUserById: (id) => dispatch(getUserById(id)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewUser)
);

// import React, { Component } from "react";

// import { NewUserStyle } from "./style";
// import { Menu, Header, UserInfo, UserRole } from "components/Form";
// import { NewUserConst } from "./constant";

// class NewUser extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0,
//     };
//   }
//   countInc = () => {
//     try {
//       const { count } = this.state;
//       this.setState({ count: count + 1 });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   pageUI = () => {
//     try {
//       const { count } = this.state;
//       return count === 0 ? (
//         <UserInfo countInc={this.countInc} />
//       ) : count === 1 ? (
//         <UserRole />
//       ) : (
//         ""
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   render() {
//     return (
//       <NewUserStyle>
//         <Menu />
//         <div className="container">
//           <Header />
//           <div className="allDiv anime">
//             <h2>{NewUserConst.addNewUser}</h2>
//             <div className="formDiv">{this.pageUI()}</div>
//           </div>
//         </div>
//       </NewUserStyle>
//     );
//   }
// }
// export default NewUser;
