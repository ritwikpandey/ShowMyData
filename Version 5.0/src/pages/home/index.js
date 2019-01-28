import React, { Component } from 'react';
import Header from './../../components/header';
import Footer from '../../components/Footer';
import UserService from '../../services/userService';
import Logo from '../../assets/logo.png';
import './home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: "",
            showModal: false,
            showLoader: true,
            showLoadingMsg: "",
            showBtn: false
        }
    }

    _setUserId = () => {
        let { userid } = this.state;
        if (userid !== "") {
            localStorage.setItem("REACT_APP_USER_ID", this.state.userid);
            this.props.history.push("/recommendations")
        }

    }
    _resetUser = () => {
        let { userid } = this.state;
        if (userid === "") {
            return;
        }
        localStorage.setItem("REACT_APP_USER_ID", userid);
        this.setState({
            showModal: true,
            showLoader: true,
            showLoadingMsg: `Resetting user details (User id: ${localStorage.getItem("REACT_APP_USER_ID")})`,
            showBtn: false
        })
        UserService.clearUserData((data) => {
            this.setState({
                showModal: true,
                showLoader: false,
                showLoadingMsg: `Succeefully resetted user details (User id: ${localStorage.getItem("REACT_APP_USER_ID")})`,
                showBtn: true
            })
            localStorage.setItem("REACT_APP_USER_ID", "");
        }, (e) => {
            this.setState({
                showModal: true,
                showLoader: false,
                showLoadingMsg: `Failed to reset user details (User id: ${localStorage.getItem("REACT_APP_USER_ID")})`,
                showBtn: true
            })
            localStorage.setItem("REACT_APP_USER_ID", "");
        })
    }
    _closeModal = () => {
        this.setState({
            showModal: false,
            showLoader: false,
            showLoadingMsg: ``,
            showBtn: false
        })
    }
    _resetApp = () => {
        this.setState({
            showModal: true,
            showLoader: true,
            showLoadingMsg: `Resetting entire application`,
            showBtn: false
        })
        UserService.clearApplicationData((data) => {
            this.setState({
                showModal: true,
                showLoader: false,
                showLoadingMsg: `Succeefully resetted entire application`,
                showBtn: true
            })
            localStorage.setItem("REACT_APP_USER_ID", "");
        }, (e) => {
            this.setState({
                showModal: true,
                showLoader: false,
                showLoadingMsg: `Failed to reset entire application`,
                showBtn: true
            })
        })
    }

    _updateRecommentation = () => {
        this.setState({
            showModal: true,
            showLoader: true,
            showLoadingMsg: `Updating Recommentations`,
            showBtn: false
        })
        UserService.updateRecommnedations((data) => {
            this.setState({
                showModal: true,
                showLoader: false,
                showLoadingMsg: `Succeefully updated recommentations`,
                showBtn: true
            })
        }, (e) => {
            this.setState({
                showModal: true,
                showLoader: false,
                showLoadingMsg: `Failed to update recommentations`,
                showBtn: true
            })
        })
    }


    render() {
        let { showModal, showLoader, showLoadingMsg, showBtn } = this.state;
        return (
            <div>
               
                <div className="login-page">
                    <div className="logo">
                        <img src={Logo} alt="logo" />
                    </div>
                    <div className="form">
                        <div>
                            <input type="text" placeholder="Cookie Id" name="userid" className="input" onChange={(e) => this.setState({ userid: e.target.value })} />
                            <button className="button" onClick={this._setUserId}>Start </button>
                            <button className="button" onClick={this._resetUser} style={{ background: '#ECECEC', color: 'rgba(0,0,0,0.6)' }}>Reset </button>
                            <br /><br />
                            {/* <button className="button-big" onClick={this._updateRecommentation}>Update Recommentation </button> */}
                            <br /><br />
                            <button className="button-big" onClick={this._resetApp}>Reset Application </button>
                        </div>

                    </div>
                    {showModal && <div className="modal">
                        <div className="body">
                            <p>{showLoadingMsg}</p>
                            {showLoader && !showBtn && <div className="loader-5 center"><span></span></div>}
                            {!showLoader && showBtn && <button className="button" onClick={this._closeModal}>OK</button>}
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}

export default Home;