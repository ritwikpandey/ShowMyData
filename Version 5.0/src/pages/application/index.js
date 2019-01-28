import React, { Component } from 'react';
import UserService from '../../services/userService';
import './app.css';

class Application extends Component {
    constructor(props) {
        super(props);
        this.state ={
            productName:'',
            productId:'',
            showModal:false
        }
    }

    componentDidMount() {
        let state = this.props.location.state;
        if(state){
            this.setState({data: state.data})
        }else{
            
        }
    }

    postContentActivity = ()=>{
        console.log(localStorage.getItem("REACT_APP_USER_ID"))
        let {data} = this.state;
        
        let params = new FormData();    
        params.append("contentId", data.contentId);
        params.append("cookieId", localStorage.getItem("REACT_APP_USER_ID"));
        params.append("level", 2)

        UserService.postContentActivity(params, ()=>{         
        }, ()=>{
        })
        this.props.history.push("result") 
    }
    render() {
        let {productId, productName, showModal} = this.state;
        return (
            <div>
                <header onClick={()=>this.props.history.push("recommendations")}  role="banner" class="headerbg"><nav class="Masthead-masthead-container-bWFzdGhlYWQtY29udGFpbm" role="navigation"><div class="Masthead-masthead-bWFzdGhlYW col-sm-12 col-md-12 col-lg-12"><div class="Masthead-back-YmFjaw"></div><div><a hreff="https://www.wellsfargo.com/" aria-label="Wells Fargo" class="Masthead-logo-bG9nbw"><img alt="Wells Fargo" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE1M3B4IiBoZWlnaHQ9IjE1cHgiIHZpZXdCb3g9IjAgMCAxNTMgMTUiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE1MyAxNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+Cgk8cmVjdCB4PSItMi43NSIgeT0iLTQuMDIiIGZpbGw9IiNCQjA4MjYiIHdpZHRoPSIxNTcuNjI1IiBoZWlnaHQ9IjIzLjU0OSIvPgoJPGc+CgkJPGc+CgkJCTxnPgoJCQkJPHBhdGggZmlsbD0iI0ZCQzYxMSIgZD0iTTkzLjM3Myw2LjQyM2MwLTAuOTc3LTAuMTYtMS44MzktMC41MDctMi41MzRjLTAuNDM2LTAuNzQ3LTEuMzE3LTAuODYtMi43OTctMC44NmgtMy4xNzN2My43ODRoMC45OSBjMS42MTQsMCwxLjg1OC0wLjI5MiwxLjg1OC0yLjI1aDEuMTc2djYuMzMzbC0xLjIwMi0wLjAyMmMtMC4wMjYtMi4xMjQtMC4yNDgtMi41NTctMS44MzItMi41NTdoLTAuOTl2My4yNTggYzAsMS4wNTQsMC4xNjUsMS4xNTksMS4yNjIsMS4xNTloMS40Nzh2MS40MjNoLTcuNzkxdi0xLjQyM2wwLjcyNi0wLjAyNmMxLjEwMywwLDEuNDc0LTAuMTA4LDEuNDc0LTEuMTUyYzAtNy40MjUsMCwwLDAtNy40NDggYzAtMS4wNDgtMC4zNzEtMS4xNTktMS40NzQtMS4xNTloLTAuNzI2di0xLjQyYzEyLjk3OSwwLDAsMCwxMi45NzksMHY0Ljg5NUg5My4zNzN6Ii8+CgkJCQk8cGF0aCBmaWxsPSIjRkJDNjExIiBkPSJNMTIyLjUwMiwxMC41OThoLTEuMTg5YzAuMDU0LDEuNDY1LDAsMi4wMy0wLjc3MSwyLjA4NmMtMC4zODMsMC4wMjMtMC42NzktMC4zMy0wLjczNi0xLjA4IGMwLTAuMjY5LDAuMDM0LTAuNTc0LDAtMC43M2MtMC4xMjQtMS43MjctMC40MjMtMi41MjgtMi42ODQtMy4wNjZjMi40Mi0wLjMyMSwzLjg0Ny0xLjQ1LDMuODQ3LTMuMjczIGMwLTIuMDQyLTEuNTA2LTMuMDA1LTQuNzMyLTMuMDA1aC04LjY2N3YxLjQyaDEuMDQzYzEuMDk0LDAsMS4yMjgsMC4xMTEsMS4yMjgsMS4xNTl2Ny40NDhjMCwwLjkyNy0wLjU2MSwxLjE3OS0xLjI4MiwxLjE3OSBoLTAuOTIzYy0wLjY5Ni0wLjAwNy0xLjA4NC0wLjI4My0xLjQ0OS0xLjIzM2wtNC4wNTYtOS45NzJoLTMuMDg1TDk0LjgyNywxMS41Yy0wLjM4LDAuODg0LTAuNjcyLDEuMjMzLTEuNjY3LDEuMjMzaC0wLjU4djEuNDIzIGg2LjU4OHYtMS40MjNoLTEuMzE2Yy0wLjY2OSwwLTEuMDIxLTAuMDI2LTEuMDIxLTAuNDM0YzAtMC4xNTQsMC4wNTQtMC4zNDMsMC4xNjEtMC41OGwwLjY0NC0xLjU1OGg0LjkybDAuNTM1LDEuNDQxIGMwLjEwNywwLjI0OCwwLjE5LDAuNDY1LDAuMTksMC42MTRjMCwwLjQzNC0wLjM1NCwwLjUxNi0xLjA3OCwwLjUxNmgtMS4zNDV2MS40MjNoMTQuMjV2LTEuNDIzaC0xLjE1NCBjLTEuMSwwLTEuMjYzLTAuMTA1LTEuMjYzLTEuMTU5VjguMjFoMS4yODhjMi4xOTcsMCwyLjg3NCwwLjQzNSwyLjk0NSwyLjU0M2wwLjA1MiwxLjQ0OWMwLjA3NiwxLjczOCwxLjE5NiwyLjIyMywyLjk0NiwyLjIyMyBjMS41MjUsMCwyLjU3OS0wLjkxOCwyLjU3OS0zLjJoMC4wMjdDMTIyLjUyOSwxMS4wMjksMTIyLjUyOSwxMC44MTMsMTIyLjUwMiwxMC41OTh6IE05OC4yNTEsOC42NjdsMS45MDYtNC44NmwxLjkxNiw0Ljg2IEg5OC4yNTF6IE0xMTUuNDUxLDYuNzlsLTIuNzYsMC4wMjJWMi45NzhoMi43MTNjMS43NzgsMCwyLjYzNCwwLjQyNiwyLjYzNCwxLjg5N3YwLjAzOEMxMTguMDM4LDYuMjIzLDExNy4yMDcsNi43OSwxMTUuNDUxLDYuNzkgeiIvPgoJCQkJPHBhdGggZmlsbD0iI0ZCQzYxMSIgZD0iTTEzMy43NTEsNS41ODZjLTAuNjA1LTEuODk5LTEuODYxLTIuNzc5LTMuOTU0LTIuNzc5Yy0yLjA2NSwwLTMuNjg3LDEuNjgxLTMuNjYyLDQuOTAzIGMwLDMuMjczLDEuMjk5LDUuMDAzLDMuNjYyLDUuMDM5YzEuNzE4LDAsMy4yMjktMC44NTksMy4yMjktMi4yNzJWOS43ODFjMC0wLjg1OS0wLjIxOC0wLjg1OS0xLjQtMC44NTloLTAuNjQzVjcuNDcxaDUuODc0IHYxLjQ1MWgtMC40OWMtMC45MDUsMC0xLjA0Mi0wLjA4My0xLjA0MiwwLjk4NnY0LjIwMmgtMS4wMzlsLTAuNjc0LTEuMDM5Yy0xLjE0NywwLjkxLTIuNzk2LDEuMzM3LTQuMjcyLDEuMzM3IGMtMS43NCwwLTMuMjA1LTAuNjE5LTQuMzgxLTEuNzk0Yy0xLjIzNC0xLjI2NC0xLjk2LTIuOTE4LTEuOTM3LTQuOTA0YzAtMS45NTgsMC42NDYtMy41MDYsMS45MDYtNC43NyBjMS4wOTgtMS4wNywyLjc1MS0xLjY5Nyw0LjQ2NS0xLjY2OGMxLjQyMywwLDMuMDcxLDAuMzgyLDQuMDA1LDEuMzY5bDAuNjQ1LTEuMzE1aDEuMDEzdjQuMjQ1TDEzMy43NTEsNS41ODZ6Ii8+CgkJCQk8cGF0aCBmaWxsPSIjRkJDNjExIiBkPSJNMTQ1LjI5OCwxNC4zOTZjLTQuMTg3LDAtNy40Ni0yLjYzNC03LjQ2LTYuNTg5YzAtMy45NjIsMy4yNzMtNi41NjMsNy40MzUtNi41NjMgYzQuMTksMCw3LjM3NiwyLjYwMSw3LjM3Niw2LjU4N0MxNTIuNjQ4LDExLjc2MiwxNDkuNDYzLDE0LjM5NiwxNDUuMjk4LDE0LjM5NnogTTE0OS41MjMsNy44NzVjMC00LjUxNy0zLjAzMy01LjA4NC00LjI3Ny01LjA4NCBjLTIuNDU2LDAtNC4zMjQsMS43NDMtNC4zMjQsNS4wN2MwLDMuMzE3LDEuODY4LDUuMDUzLDQuMzI0LDUuMDUzQzE0Ni40ODEsMTIuOTEzLDE0OS41MjMsMTIuMywxNDkuNTIzLDcuODc1eiIvPgoJCQk8L2c+CgkJCTxnPgoJCQkJPHBhdGggZmlsbD0iI0ZCQzYxMSIgZD0iTTQ3LjIzNiwxMS43MjVjLTAuMzk5LDAuNzU3LTEuMjg5LDAuOTUxLTIuNzg4LDAuOTUxaC0zLjA2OVY0LjE1MWMwLTEuMDQ1LDAuMjEzLTEuMTU5LDEuNDQ0LTEuMTU5IGwwLjkxNy0wLjAyMVYxLjU0MmgtNy42Mjl2MS40MjloMC42NzFjMS4wNzQsMCwxLjcxMywwLjEwNSwxLjcxMywxLjE4bDAuMDMzLDcuNDIzYzAsMS4wNy0wLjQ4NiwxLjE4My0xLjU4NSwxLjE4M2gtMC43MjZ2MS40MiBoMTMuMDE4VjkuMTA4YzAsMC0xLjIyNiwwLTEuNDY3LDBDNDcuNzcsMTAuMjk3LDQ3LjYxNSwxMS4wNjIsNDcuMjM2LDExLjcyNXoiLz4KCQkJCTxwYXRoIGZpbGw9IiNGQkM2MTEiIGQ9Ik0zMC42NTUsMTIuNjc2aC00LjA2NlY4LjNoMC45NDJjMS41NjMsMCwxLjc3OSwwLjMwMSwxLjg4OCwyLjQzOGgxLjQ3NHYtNi4zN2gtMS40NDcgYy0wLjEzNSwxLjg5OC0wLjM1MiwyLjQzNy0xLjk0NCwyLjQzN2gtMC45MTNWMy4wNTJoMy41MjFjMi41NDIsMCwzLjI0MSwwLjQ1LDMuMzE3LDMuNDA5aDEuNDM1di00LjkyIGMtMTMuMjI3LDAtMC43MTUsMC0xMi41NjUsMEgyMS4yN2gtNS4xMjV2MS40MjloMC44OTFjMC43MjYsMCwxLjA2OCwwLjE2NSwxLjA2OCwwLjU2MWMwLDAuMjE2LDAsMC41MzgtMC4xNiwwLjk3MWwtMi40NDIsNi4zNDYgYzAsMC0wLjAwNCwwLTAuMTUyLDBjLTEuMTEtMy4xNjctMi42MTgtNi44MzMtMi42MTgtNi44MzNjLTAuMDgyLTAuMTg2LTAuMTA3LTAuMzgtMC4xMDctMC41MzdjMC0wLjM3MywwLjIzOC0wLjUwOCwwLjg2Ni0wLjUwOCBoMS4wNzFWMS41NDJINy44MDV2MS40MjloMC44NDljMS4wOTUsMCwxLjQ1LDAuNTMyLDEuNTUyLDEuNTc3bC0yLjUwMSw2LjMwMWMwLDAtMC4wNTUsMC0wLjE3NiwwIEM2LjM1NCw3LjQ2NCw0Ljg4NiwzLjk1Niw0Ljg4NiwzLjk1NkM0LjgwNCwzLjc3LDQuODMzLDMuNjM2LDQuODMzLDMuNTU5Yy0wLjAzLTAuNDEsMC4yOTQtMC41ODgsMS4wMi0wLjU4OGgwLjYxOFYxLjU0MkgwLjA0NyB2MS40MjloMC4yOTljMC45MzQsMCwxLjU3OCwwLjYxMywyLjAwNywxLjcxbDMuNzY1LDkuNDk2aDIuMzQzbDIuNzY3LTYuOTkxbDIuODc3LDYuOTkxaDIuMjgxbDMuNjAzLTkuNjUxIGMwLjQzLTEuMTU4LDAuNzgyLTEuNTU1LDEuODI1LTEuNTU1aDAuMjA1YzEuMDk5LDAsMS42OTgsMC4xMDUsMS42OTgsMS4xNTFjMCw3LjQ1MywwLDAuMDI5LDAsNy40NTMgYzAsMS4wNC0wLjU5OSwxLjE1Mi0xLjY5OCwxLjE1MmwtMC43NSwwLjAzdjEuNDJoMTMuODM0VjkuMTA4aC0xLjQzOUMzMy40NzYsMTEuNTksMzIuOTE4LDEyLjY3NiwzMC42NTUsMTIuNjc2eiIvPgoJCQkJPHBhdGggZmlsbD0iI0ZCQzYxMSIgZD0iTTYxLjM2Nyw5LjEwOGMwLDEuMTg4LTAuMTYxLDEuOTUzLTAuNTM4LDIuNjE2Yy0wLjQsMC43NTctMS4yODMsMC45NTEtMi43NzEsMC45NTFoLTMuMDgzVjQuMTUxIGMwLTEuMDQ1LDAuMjE2LTEuMTU5LDEuNDUtMS4xNTlsMC45MDQtMC4wMjFWMS41NDJoLTcuNjI2djEuNDI5aDAuODA3YzEuMDcsMCwxLjU4NSwwLjEwNSwxLjU4NSwxLjE4bDAuMDI2LDcuNDIzIGMwLDEuMDctMC40ODEsMS4xODMtMS41ODgsMS4xODNoLTAuMTkxdjEuNDJINjIuODRWOS4xMDhDNjIuODQsOS4xMDgsNjEuNTc3LDkuMTA4LDYxLjM2Nyw5LjEwOHoiLz4KCQkJCTxwYXRoIGZpbGw9IiNGQkM2MTEiIGQ9Ik03NS43NiwxMC40N2MwLDIuODkzLTIuMjU5LDMuOTQ2LTUuNjM5LDMuOTQ2Yy0yLjAyNywwLTMuOTgxLTEuMTYtNC40MTEtMS41NTVsLTAuNDM0LDEuMzIzaC0xLjI3MyBWOS4xMjNoMS40NjVjMC40MDYsMi4zODUsMi4wMjksMy40NDQsNC4zNTQsMy41NTNjMS45ODQsMC4wODEsMy40MDgtMC40NSwzLjU3Mi0xLjgzMmMwLjE3Mi0xLjU2Mi0xLjU4OC0xLjQ1OC0zLjA2NS0xLjczNSBsLTIuMTUzLTAuMzk2Yy0zLjI0Ni0wLjU2MS00LjI3Mi0xLjUxMS00LjM1NS0zLjYyOGMtMC4wODMtMi4zMDEsMS45OTEtMy44MDYsNC44MTItMy44MzVjMS4zNDQsMCwzLjEyLDAuMjE4LDQuNDg3LDEuMzE2IGwwLjY0NS0xLjA0NWgxLjEyNVY1Ljk0aC0xLjQyYy0wLjMxNS0yLjQ1NS0yLjczMy0zLjIwMS00Ljc4NS0zLjE0OWMtMS41MDIsMC4wNTMtMi40OTMsMC45Mi0yLjQ5MywxLjkzOCBjMCwwLjk0LDAuOTQsMS4wNzUsMi4xMzgsMS4yODVsMi42MzEsMC40NDhjMi43MDksMC40NTcsNC43OTcsMS4wMTcsNC43OTcsMy45NzdWMTAuNDd6Ii8+CgkJCTwvZz4KCQk8L2c+Cgk8L2c+Cjwvc3ZnPgo=" class="Masthead-masthead-img-logo-bWFzdGhlYWQtaW1nLWxvZ2" /><span class="hidden-accessible">, opens in a new window</span></a></div><div class="Masthead-top-search-dG9wLXNlYXJjaA"><ul><li class="Masthead-security-c2VjdXJpdH"><a hreff="/online_security">Online Security<span class="hidden-accessible">, opens in a new window</span></a></li></ul></div><div class="Masthead-menu-bWVudQ"></div></div></nav></header>

                <div style={{ backgroundImage: 'url("https://apply.wellsfargo.com/assets/images/photography/lifestyle/credit-cards/header-image-ccbt.jpg")', backgroundRepeat: 'no-repeat', backgroundSize: '100% auto', position: 'absolute', width: '100%', zIndex: '-1' }}>
                    <h1 style={{ marginBottom: 0 }}>
                        <div class="ApplicationBanner-title-text-dGl0bGUtdGV4dA" style={{ textAlign: "center", marginBottom: 0 }}>
                            <br /><br />
                            You're applying for the</div>
                        <p style={{ textAlign: 'center', color: '#d20826', marginBottom: 0 }}>Wells Fargo Product</p>
                    </h1>

                    <p style={{ textAlign: 'center', margin: 0 }}> Apply in minutes. Get a decision in seconds. </p>
                    <br />
                    <br />
                    <br />
                    <br />
                </div>

                <div style={{ margin: '33vh 15% 0 15%', padding: '0 5%', background: '#fff', zIndex: 1000, borderRadius: '10px', boxShadow: "0 3px 13px 4px rgba(0,0,0,.13)" }}>

                    <br /><br />

                    <div role="region" aria-label="Progress bar" class="ProgressBar-progress-bar-container-cHJvZ3Jlc3MtYmFyLWNvbnRhaW5lcg col-sm-12 col-md-9 col-lg-8">
                        <div class="ProgressBar-progress-bar-cHJvZ3Jlc3MtYm">
                            <div class="ProgressBar-progress-bar-line-cHJvZ3Jlc3MtYmFyLWxpbm ProgressBar-active-YWN0aX" style={{ width: "25%" }}>
                                <div class="hidden-accessible">About You  step 1 of 4 selected</div>
                                <span class="ProgressBar-progress-bar-indicator-cHJvZ3Jlc3MtYmFyLWluZGljYXRvcg ProgressBar-active-YWN0aX"></span>
                            </div>
                            <div class="ProgressBar-progress-bar-line-cHJvZ3Jlc3MtYmFyLWxpbm ProgressBar-default-ZGVmYXVsdA " style={{ width: "25%" }}>
                            </div>
                            <div class="ProgressBar-progress-bar-line-cHJvZ3Jlc3MtYmFyLWxpbm ProgressBar-default-ZGVmYXVsdA " style={{ width: "25%" }}>
                            </div>
                            <div class="ProgressBar-progress-bar-line-cHJvZ3Jlc3MtYmFyLWxpbm ProgressBar-default-ZGVmYXVsdA " style={{ width: "25%" }}>
                            </div>
                        </div>
                        <div class="ProgressBar-progress-bar-small-cHJvZ3Jlc3MtYmFyLXNtYW">
                            <div class="ProgressBar-active-step-YWN0aXZlLXN0ZX">
                                <a hreff="#" class=" ProgressBar-has-disabled-aGFzLWRpc2FibG" aria-disabled="true" aria-label="Previous Step">
                                    <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iY2Fyb3QtZ3JheS1sZWZ0LTE0MHgyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxNCAyMCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM3ODc1NzU7ZmlsbC1ydWxlOmV2ZW5vZGQ7fTwvc3R5bGU+PC9kZWZzPjxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxNCAyLjM1IDExLjMzIDAgMi42NyA3LjY1IDIuNjcgNy42NSAwIDEwIDIuNjcgMTIuMzUgMi42NyAxMi4zNSAxMS4zMyAyMCAxNCAxNy42NSA1LjMzIDEwIDE0IDIuMzUiLz48L3N2Zz4=" alt="" /></a>
                                <span class="ProgressBar-active-step-title-YWN0aXZlLXN0ZXAtdGl0bG">About You</span>
                                <a hreff="#" class=" ProgressBar-has-enabled-aGFzLWVuYWJsZW" aria-label="Next Step">
                                    <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iY2Fyb3QtZ3JheS1sZWZ0LTE0MHgyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxNCAyMCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM3ODc1NzU7ZmlsbC1ydWxlOmV2ZW5vZGQ7fTwvc3R5bGU+PC9kZWZzPjxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxNCAxMCAxMS4zMyA3LjY1IDExLjMzIDcuNjUgMi42NyAwIDAgMi4zNSA4LjY3IDEwIDAgMTcuNjUgMi42NyAyMCAxMS4zMyAxMi4zNSAxMS4zMyAxMi4zNSAxNCAxMCIvPjwvc3ZnPg==" alt="" /></a>
                            </div>
                        </div>
                        <div class="ProgressBar-progress-bar-large-cHJvZ3Jlc3MtYmFyLWxhcm">
                            <div class="ProgressBar-step-c3RlcA" style={{ width: "25%" }}>
                                <div class="ProgressBar-active-YWN0aX" role="link" aria-label="About You  step 1 of 4 selected" aria-disabled="true" tabindex="0">
                                    <div>About You</div>
                                </div>
                            </div>
                            <div class="ProgressBar-step-c3RlcA" style={{ width: "25%" }}>
                                <div class="ProgressBar-default-ZGVmYXVsdA " role="link" aria-label="future Your Finances step 2 of 4" aria-disabled="true" tabindex="0">
                                    <div>Your Finances</div>
                                </div>
                            </div>
                            <div class="ProgressBar-step-c3RlcA" style={{ width: "25%" }}>
                                <div class="ProgressBar-default-ZGVmYXVsdA " role="link" aria-label="future Card Options step 3 of 4" aria-disabled="true" tabindex="0">
                                    <div>Card Options</div>
                                </div>
                            </div>
                            <div class="ProgressBar-step-c3RlcA" style={{ width: "25%" }}>
                                <div class="ProgressBar-default-ZGVmYXVsdA " role="link" aria-label="future Review and Submit step 4 of 4" aria-disabled="true" tabindex="0">
                                    <div>Review and Submit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div role="region">
                        <div class="__showhide-entered">
                            <section class="Section-section-c2VjdGlvbg Section-re-imagine-cmUtaW1hZ2luZQ">
                                <h2 class="Section-section-heading-c2VjdGlvbi1oZWFkaW Section-sub-heading-c3ViLWhlYWRpbm">About You</h2>
                            </section>
                        </div>
                    </div>
                    <section class="Section-section-c2VjdGlvbg Section-re-imagine-cmUtaW1hZ2luZQ">
                        <div class="DriversLicenseCaptureMessage-dl-capture-message-ZGwtY2FwdHVyZS1tZXNzYW">
                        </div>
                        <div>
                            <div class="FormGroup-form-group-Zm9ybS1ncm91cA">
                                <div class="FormGroup-row-cm FormGroup-two-column-view-dHdvLWNvbHVtbi12aW">
                                    <div class="Input-input-container-aW5wdXQtY29udGFpbm col-sm-12 col-md-7">
                                        <div class="Input-input-balloon-container-aW5wdXQtYmFsbG9vbi1jb250YWluZX">
                                            <div class="Input-label-group-container-bGFiZWwtZ3JvdXAtY29udGFpbm">
                                                <div class="Input-label-container-bGFiZWwtY29udGFpbm Input-above-YWJvdm">
                                                    <label for="personalInfo_name_firstName" class="Input-text-label-dGV4dC1sYWJlbA Input-above-YWJvdm">First name</label>
                                                </div>
                                                <div class="Input-input-group-aW5wdXQtZ3JvdX Input-filled-in-ZmlsbGVkLW">
                                                    <input type="text" class="Input-text-input-dGV4dC1pbnB1dA Input-filled-in-ZmlsbGVkLW" id="personalInfo_name_firstName" name="personalInfo.name.firstName" minlength="1" maxlength="15" size="15" aria-describedby="" aria-required="true" spellcheck="false"  />
                                                </div>
                                            </div>
                                            <div class="Input-balloon-help-icon-YmFsbG9vbi1oZWxwLWljb2" id="personalInfo_name_firstName_balloon_help">
                                                <div class="BalloonHelpLink-c29link-container-YzI5bGluay1jb250YWluZX">
                                                    <a hreff="#" class="BalloonHelpLink-c29link-YzI5bGluaw BalloonHelpLink-icon-aWNvbg"><span class="hidden-accessible">Legal name</span>
                                                        <img width="20" height="20" alt="Open a dialog" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZmZmO30uYntmaWxsOiNkMGQyZDg7fS5je2ZpbGw6IzUyNzRiOTt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xMCwwQTEwLDEwLDAsMSwwLDIwLDEwLDEwLDEwLDAsMCwwLDEwLDBaIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik0xMCwzYTcsNywwLDEsMS03LDcsNyw3LDAsMCwxLDctN20wLTFhOCw4LDAsMSwwLDgsOCw4LDgsMCwwLDAtOC04WiIvPjxwYXRoIGNsYXNzPSJjIiBkPSJNNy4zMiw2LjQ2QTMuMiwzLjIsMCwwLDEsOS44Nyw1LjM3QzExLjc2LDUuMzcsMTMsNi41MiwxMyw4cy0uOCwyLjM2LTIuNiwyLjcxTDEwLjI2LDEyaC0xTDguOTMsOS43YzEuNzYtLjI0LDIuMzktLjk1LDIuMzktMS43QTEuMzYsMS4zNiwwLDAsMCw5LjgsNi43MWExLjU3LDEuNTcsMCwwLDAtMS4yMi40Mi44NC44NCwwLDAsMSwuMjQuNTlBLjgxLjgxLDAsMCwxLDgsOC42MWExLjA2LDEuMDYsMCwwLDEtMS0xLjFBMS43MiwxLjcyLDAsMCwxLDcuMzIsNi40NlpNOC43LDEzLjgzYTEsMSwwLDEsMSwyLjA4LDAsMSwxLDAsMSwxLTIuMDgsMFoiLz48L3N2Zz4=" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="small-screen">
                                        </div>
                                    </div>
                                    <div class="Input-input-container-aW5wdXQtY29udGFpbm col-sm-12 col-md-5">
                                        <div class="Input-input-balloon-container-aW5wdXQtYmFsbG9vbi1jb250YWluZX">
                                            <div class="Input-label-group-container-bGFiZWwtZ3JvdXAtY29udGFpbm">
                                                <div class="Input-label-container-bGFiZWwtY29udGFpbm Input-above-YWJvdm">
                                                    <label for="personalInfo_name_middleInitial" class="Input-text-label-dGV4dC1sYWJlbA Input-above-YWJvdm">Middle initial (optional)</label>
                                                </div><div class="Input-input-group-aW5wdXQtZ3JvdX Input-filled-in-ZmlsbGVkLW">
                                                    <input type="text" class="Input-text-input-dGV4dC1pbnB1dA Input-filled-in-ZmlsbGVkLW" id="personalInfo_name_middleInitial" name="personalInfo.name.middleInitial" minlength="1" maxlength="1" size="1" aria-describedby="" spellcheck="false"  />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="small-screen">
                                        </div>
                                    </div>
                                </div>
                                <div class="FormGroup-row-cm FormGroup-two-column-view-bottom-text-container-dHdvLWNvbHVtbi12aWV3LWJvdHRvbS10ZXh0LWNvbnRhaW5lcg">
                                    <div class="col-sm-12 col-md-7">
                                        <div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-5">
                                        <div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="FormGroup-form-group-Zm9ybS1ncm91cA">
                            <div class="FormGroup-row-cm FormGroup-two-column-view-dHdvLWNvbHVtbi12aW">
                                <div class="Input-input-container-aW5wdXQtY29udGFpbm col-sm-12 col-md-7">
                                    <div class="Input-input-balloon-container-aW5wdXQtYmFsbG9vbi1jb250YWluZX">
                                        <div class="Input-label-group-container-bGFiZWwtZ3JvdXAtY29udGFpbm">
                                            <div class="Input-label-container-bGFiZWwtY29udGFpbm Input-above-YWJvdm">
                                                <label for="personalInfo_name_lastName" class="Input-text-label-dGV4dC1sYWJlbA Input-above-YWJvdm">Last name</label>
                                            </div><div class="Input-input-group-aW5wdXQtZ3JvdX Input-filled-in-ZmlsbGVkLW"><input type="text" class="Input-text-input-dGV4dC1pbnB1dA Input-filled-in-ZmlsbGVkLW" id="personalInfo_name_lastName" name="personalInfo.name.lastName" minlength="2" maxlength="25" size="25" aria-describedby="" aria-required="true" spellcheck="false"  />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="small-screen">
                                    </div>
                                </div>
                                <div class="Select-select-container-c2VsZWN0LWNvbnRhaW5lcg col-sm-12 col-md-5">
                                    <div class="Select-select-balloon-container-c2VsZWN0LWJhbGxvb24tY29udGFpbm">
                                        <div class="Select-label-group-container-bGFiZWwtZ3JvdXAtY29udGFpbm">
                                            <div class="Select-label-container-bGFiZWwtY29udGFpbm ">
                                                <label class="Select-select-label-c2VsZWN0LWxhYm " id="personalInfo_name_suffix_label" for="personalInfo_name_suffix">Suffix (optional)</label>
                                            </div>
                                            <div class="Select-input-group-aW5wdXQtZ3JvdX">
                                                <select class="" id="personalInfo_name_suffix" name="personalInfo.name.suffix" aria-invalid="false"><option value="">Select one</option><option value="JR">Jr.</option><option value="SR">Sr.</option><option value="I">I</option><option value="II">II</option><option value="III">III</option><option value="IV">IV</option><option value="V">V</option></select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="small-screen">
                                    </div>
                                </div>
                            </div>
                            <div class="FormGroup-row-cm FormGroup-two-column-view-bottom-text-container-dHdvLWNvbHVtbi12aWV3LWJvdHRvbS10ZXh0LWNvbnRhaW5lcg">
                                <div class="col-sm-12 col-md-7">
                                    <div>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-5">
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="FormGroup-form-group-Zm9ybS1ncm91cA">
                            <div class="FormGroup-row-cm FormGroup-two-column-view-dHdvLWNvbHVtbi12aW">
                                <div class="Input-input-container-aW5wdXQtY29udGFpbm col-sm-12 col-md-7">
                                    <div class="Input-input-balloon-container-aW5wdXQtYmFsbG9vbi1jb250YWluZX">
                                        <div class="Input-label-group-container-bGFiZWwtZ3JvdXAtY29udGFpbm">
                                            <div class="Input-label-container-bGFiZWwtY29udGFpbm Input-above-YWJvdm">
                                                <label for="personalInfo_address_street1" class="Input-text-label-dGV4dC1sYWJlbA Input-above-YWJvdm">Home/permanent address</label>
                                            </div>
                                            <div class="Input-input-group-aW5wdXQtZ3JvdX Input-filled-in-ZmlsbGVkLW">
                                                <input type="text" class="Input-text-input-dGV4dC1pbnB1dA Input-filled-in-ZmlsbGVkLW" id="personalInfo_address_street1" name="personalInfo.address.street1" minlength="1" maxlength="30" size="30" aria-describedby="" aria-required="true" spellcheck="false"  />
                                            </div>
                                        </div>
                                        <div class="Input-balloon-help-icon-YmFsbG9vbi1oZWxwLWljb2" id="personalInfo_address_street1_balloon_help">
                                            <div class="BalloonHelpLink-c29link-container-YzI5bGluay1jb250YWluZX">
                                                <a hreff="#" class="BalloonHelpLink-c29link-YzI5bGluaw BalloonHelpLink-icon-aWNvbg">
                                                    <span class="hidden-accessible">No P.O. Box</span>
                                                    <img width="20" height="20" alt="Open a dialog" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZmZmO30uYntmaWxsOiNkMGQyZDg7fS5je2ZpbGw6IzUyNzRiOTt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xMCwwQTEwLDEwLDAsMSwwLDIwLDEwLDEwLDEwLDAsMCwwLDEwLDBaIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik0xMCwzYTcsNywwLDEsMS03LDcsNyw3LDAsMCwxLDctN20wLTFhOCw4LDAsMSwwLDgsOCw4LDgsMCwwLDAtOC04WiIvPjxwYXRoIGNsYXNzPSJjIiBkPSJNNy4zMiw2LjQ2QTMuMiwzLjIsMCwwLDEsOS44Nyw1LjM3QzExLjc2LDUuMzcsMTMsNi41MiwxMyw4cy0uOCwyLjM2LTIuNiwyLjcxTDEwLjI2LDEyaC0xTDguOTMsOS43YzEuNzYtLjI0LDIuMzktLjk1LDIuMzktMS43QTEuMzYsMS4zNiwwLDAsMCw5LjgsNi43MWExLjU3LDEuNTcsMCwwLDAtMS4yMi40Mi44NC44NCwwLDAsMSwuMjQuNTlBLjgxLjgxLDAsMCwxLDgsOC42MWExLjA2LDEuMDYsMCwwLDEtMS0xLjFBMS43MiwxLjcyLDAsMCwxLDcuMzIsNi40NlpNOC43LDEzLjgzYTEsMSwwLDEsMSwyLjA4LDAsMSwxLDAsMSwxLTIuMDgsMFoiLz48L3N2Zz4=" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="small-screen"></div>
                                </div>
                            </div>
                            <div class="FormGroup-row-cm FormGroup-two-column-view-bottom-text-container-dHdvLWNvbHVtbi12aWV3LWJvdHRvbS10ZXh0LWNvbnRhaW5lcg">
                                <div class="col-sm-12 col-md-7">
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="FormGroup-form-group-Zm9ybS1ncm91cA">
                            <div class="FormGroup-row-cm FormGroup-two-column-view-dHdvLWNvbHVtbi12aW">
                                <div class="Input-input-container-aW5wdXQtY29udGFpbm col-sm-12 col-md-7">
                                    <div class="Input-input-balloon-container-aW5wdXQtYmFsbG9vbi1jb250YWluZX">
                                        <div class="Input-label-group-container-bGFiZWwtZ3JvdXAtY29udGFpbm">
                                            <div class="Input-label-container-bGFiZWwtY29udGFpbm Input-above-YWJvdm">
                                                <label for="personalInfo_address_street2" class="Input-text-label-dGV4dC1sYWJlbA Input-above-YWJvdm">Address line 2</label>
                                            </div>
                                            <div class="Input-input-group-aW5wdXQtZ3JvdX Input-filled-in-ZmlsbGVkLW">
                                                <input type="text" class="Input-text-input-dGV4dC1pbnB1dA Input-filled-in-ZmlsbGVkLW" id="personalInfo_address_street2" name="personalInfo.address.street2" minlength="1" maxlength="30" size="30" aria-describedby="" spellcheck="false"  />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="small-screen">
                                    </div>
                                </div>
                            </div>
                            <div class="FormGroup-row-cm FormGroup-two-column-view-bottom-text-container-dHdvLWNvbHVtbi12aWV3LWJvdHRvbS10ZXh0LWNvbnRhaW5lcg">
                                <div class="col-sm-12 col-md-7">
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="FormGroup-form-group-Zm9ybS1ncm91cA">
                            <div class="FormGroup-row-cm FormGroup-two-column-view-dHdvLWNvbHVtbi12aW">
                                <div class="Input-input-container-aW5wdXQtY29udGFpbm col-sm-12 col-md-7">
                                    <div class="Input-input-balloon-container-aW5wdXQtYmFsbG9vbi1jb250YWluZX">
                                        <div class="Input-label-group-container-bGFiZWwtZ3JvdXAtY29udGFpbm">
                                            <div class="Input-label-container-bGFiZWwtY29udGFpbm Input-above-YWJvdm">
                                                <label for="personalInfo_address_city" class="Input-text-label-dGV4dC1sYWJlbA Input-above-YWJvdm">City</label>
                                            </div>
                                            <div class="Input-input-group-aW5wdXQtZ3JvdX Input-filled-in-ZmlsbGVkLW">
                                                <input type="text" class="Input-text-input-dGV4dC1pbnB1dA Input-filled-in-ZmlsbGVkLW" id="personalInfo_address_city" name="personalInfo.address.city" minlength="1" maxlength="20" size="20" aria-describedby="" aria-required="true" spellcheck="false"  />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="small-screen">
                                    </div>
                                </div>
                                <div class="Select-select-container-c2VsZWN0LWNvbnRhaW5lcg col-sm-12 col-md-5">
                                    <div class="Select-select-balloon-container-c2VsZWN0LWJhbGxvb24tY29udGFpbm">
                                        <div class="Select-label-group-container-bGFiZWwtZ3JvdXAtY29udGFpbm">
                                            <div class="Select-label-container-bGFiZWwtY29udGFpbm Select-above-YWJvdm">
                                                <label class="Select-select-label-c2VsZWN0LWxhYm Select-above-YWJvdm" id="personalInfo_address_state_label" for="personalInfo_address_state">State</label>
                                            </div>
                                            <div class="Select-input-group-aW5wdXQtZ3JvdX Select-selected-c2VsZWN0ZW">
                                                <select class=" Select-selected-c2VsZWN0ZW" id="personalInfo_address_state" name="personalInfo.address.state" aria-invalid="false" aria-required="true"><option value="">Select one</option><option value="AK">AK</option><option value="AL">AL</option><option value="AR">AR</option><option value="AZ">AZ</option><option value="CA">CA</option><option value="CO">CO</option><option value="CT">CT</option><option value="DE">DE</option><option value="FL">FL</option><option value="GA">GA</option><option value="HI">HI</option><option value="IA">IA</option><option value="ID">ID</option><option value="IL">IL</option><option value="IN">IN</option><option value="KS">KS</option><option value="KY">KY</option><option value="LA">LA</option><option value="MA">MA</option><option value="MD">MD</option><option value="ME">ME</option><option value="MI">MI</option><option value="MN">MN</option><option value="MO">MO</option><option value="MS">MS</option><option value="MT">MT</option><option value="NC">NC</option><option value="ND">ND</option><option value="NE">NE</option><option value="NH">NH</option><option value="NJ">NJ</option><option value="NM">NM</option><option value="NV">NV</option><option value="NY">NY</option><option value="OH">OH</option><option value="OK">OK</option><option value="OR">OR</option><option value="PA">PA</option><option value="RI">RI</option><option value="SC">SC</option><option value="SD">SD</option><option value="TN">TN</option><option value="TX">TX</option><option value="UT">UT</option><option value="VA">VA</option><option value="VT">VT</option><option value="WA">WA</option><option value="WI">WI</option><option value="WV">WV</option><option value="WY">WY</option><option value="AS">AS</option><option value="AA">AA</option><option value="AE">AE</option><option value="AP">AP</option><option value="PW">PW</option><option value="DC">DC</option><option value="VI">VI</option><option value="PR">PR</option><option value="FM">FM</option><option value="MP">MP</option><option value="GU">GU</option></select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="small-screen">
                                    </div>
                                </div>
                            </div>
                            <div class="FormGroup-row-cm FormGroup-two-column-view-bottom-text-container-dHdvLWNvbHVtbi12aWV3LWJvdHRvbS10ZXh0LWNvbnRhaW5lcg">
                                <div class="col-sm-12 col-md-7">
                                    <div>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-5">
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="FormGroup-form-group-Zm9ybS1ncm91cA">
                            <div class="FormGroup-row-cm FormGroup-two-column-view-dHdvLWNvbHVtbi12aW">
                                <div class="Input-input-container-aW5wdXQtY29udGFpbm col-sm-12 col-md-7">
                                    <div class="Input-input-balloon-container-aW5wdXQtYmFsbG9vbi1jb250YWluZX">
                                        <div class="Input-label-group-container-bGFiZWwtZ3JvdXAtY29udGFpbm">
                                            <div class="Input-label-container-bGFiZWwtY29udGFpbm Input-above-YWJvdm">
                                                <label for="personalInfo_address_zip" class="Input-text-label-dGV4dC1sYWJlbA Input-above-YWJvdm">ZIP code</label>
                                            </div>
                                            <div class="Input-input-group-aW5wdXQtZ3JvdX Input-filled-in-ZmlsbGVkLW"><input type="tel" class="Input-text-input-dGV4dC1pbnB1dA Input-filled-in-ZmlsbGVkLW" id="personalInfo_address_zip" name="personalInfo.address.zip" minlength="5" maxlength="5" size="5" aria-describedby="" aria-required="true" spellcheck="false"  /></div></div>
                                    </div></div>
                                <div class="small-screen"></div>
                            </div></div>

                        <div class="FormGroup-row-cm FormGroup-two-column-view-bottom-text-container-dHdvLWNvbHVtbi12aWV3LWJvdHRvbS10ZXh0LWNvbnRhaW5lcg">
                            <div class="col-sm-12 col-md-7">
                                <div></div>
                            </div>
                        </div>

                        <div class="FormGroup-form-group-Zm9ybS1ncm91cA">
                            <div class="FormGroup-row-cm FormGroup-two-column-view-dHdvLWNvbHVtbi12aW">
                                <div class="Input-input-container-aW5wdXQtY29udGFpbm col-sm-12 col-md-7">
                                    <div class="Input-input-balloon-container-aW5wdXQtYmFsbG9vbi1jb250YWluZX">
                                        <div class="Input-label-group-container-bGFiZWwtZ3JvdXAtY29udGFpbm">
                                            <div class="Input-label-container-bGFiZWwtY29udGFpbm Input-above-YWJvdm"><label for="personalInfo_emailAddress_emailAddress" class="Input-text-label-dGV4dC1sYWJlbA Input-above-YWJvdm">Email address</label></div>
                                            <div class="Input-input-group-aW5wdXQtZ3JvdX Input-filled-in-ZmlsbGVkLW">
                                                <div class="Input-placeholder-container-cGxhY2Vob2xkZXItY29udGFpbm"></div>
                                                <input type="email" class="Input-text-input-dGV4dC1pbnB1dA Input-filled-in-ZmlsbGVkLW" id="personalInfo_emailAddress_emailAddress" name="personalInfo.emailAddress.emailAddress" minlength="7" maxlength="120" size="35" aria-describedby="" aria-required="true" spellcheck="false"  />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="small-screen"></div>
                                </div>
                                <div class="Input-input-container-aW5wdXQtY29udGFpbm col-sm-12 col-md-5">
                                    <div class="Input-input-balloon-container-aW5wdXQtYmFsbG9vbi1jb250YWluZX">
                                        <div class="Input-label-group-container-bGFiZWwtZ3JvdXAtY29udGFpbm">
                                            <div class="Input-label-container-bGFiZWwtY29udGFpbm Input-above-YWJvdm"><label for="personalInfo_phone_phoneNumber" class="Input-text-label-dGV4dC1sYWJlbA Input-above-YWJvdm">Phone number</label></div>
                                            <div class="Input-input-group-aW5wdXQtZ3JvdX Input-filled-in-ZmlsbGVkLW">
                                                <div class="Input-placeholder-container-cGxhY2Vob2xkZXItY29udGFpbm"></div>
                                                <input type="tel" class="Input-text-input-dGV4dC1pbnB1dA Input-filled-in-ZmlsbGVkLW" id="personalInfo_phone_phoneNumber" name="personalInfo.phone.phoneNumber" minlength="10" size="13" aria-describedby="personalInfo_phone_phoneNumber_tip_text" aria-required="true" spellcheck="false"  />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="small-screen">
                                        <div class="Input-tip-text-dGlwLXRleH" id="personalInfo_phone_phoneNumber_tip_text">Mobile number preferred</div>
                                    </div>
                                </div>
                            </div>
                            <div class="FormGroup-row-cm FormGroup-two-column-view-bottom-text-container-dHdvLWNvbHVtbi12aWV3LWJvdHRvbS10ZXh0LWNvbnRhaW5lcg">
                                <div class="col-sm-12 col-md-7">
                                    <div></div>
                                </div>
                                <div class="col-sm-12 col-md-5">
                                    <div>
                                        <div class="FormGroup-tip-text-dGlwLXRleH" id="personalInfo_phone_phoneNumber_tip_text">Mobile number preferred</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="FormGroup-form-group-Zm9ybS1ncm91cA">
                            <div class="FormGroup-row-cm FormGroup-two-column-view-dHdvLWNvbHVtbi12aW">
                                <div class="Input-input-container-aW5wdXQtY29udGFpbm col-sm-12 col-md-7">
                                    <div class="Input-input-balloon-container-aW5wdXQtYmFsbG9vbi1jb250YWluZX">
                                        <div class="Input-label-group-container-bGFiZWwtZ3JvdXAtY29udGFpbm">
                                            <div class="Input-label-container-bGFiZWwtY29udGFpbm Input-above-YWJvdm"><label for="personalInfo_birthdate_dateOfBirth" class="Input-text-label-dGV4dC1sYWJlbA Input-above-YWJvdm">Date of birth</label></div>
                                            <div class="Input-input-group-aW5wdXQtZ3JvdX Input-filled-in-ZmlsbGVkLW">
                                                <div class="Input-placeholder-container-cGxhY2Vob2xkZXItY29udGFpbm"></div>
                                                <input type="tel" class="Input-text-input-dGV4dC1pbnB1dA Input-filled-in-ZmlsbGVkLW" id="personalInfo_birthdate_dateOfBirth" name="personalInfo.birthdate.dateOfBirth" minlength="8" size="10" aria-describedby="" aria-required="true" spellcheck="false"  />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="small-screen"></div>
                                </div>
                                <div class="Input-input-container-aW5wdXQtY29udGFpbm col-sm-12 col-md-5">
                                    <div class="Input-input-balloon-container-aW5wdXQtYmFsbG9vbi1jb250YWluZX">
                                        <div class="Input-label-group-container-bGFiZWwtZ3JvdXAtY29udGFpbm">
                                            <div class="Input-label-container-bGFiZWwtY29udGFpbm Input-above-YWJvdm"><label for="personalInfo_socialSecurityNumber_socialSecurityNumber" class="Input-text-label-dGV4dC1sYWJlbA Input-above-YWJvdm">Social Security number</label></div>
                                            <div class="Input-input-group-aW5wdXQtZ3JvdX Input-filled-in-ZmlsbGVkLW">
                                                <div class="Input-placeholder-container-cGxhY2Vob2xkZXItY29udGFpbm"></div>
                                                <input type="tel" class="Input-text-input-dGV4dC1pbnB1dA Input-filled-in-ZmlsbGVkLW" id="personalInfo_socialSecurityNumber_socialSecurityNumber" name="personalInfo.socialSecurityNumber.socialSecurityNumber" minlength="9" size="11" aria-describedby="" aria-required="true" spellcheck="false"  />
                                            </div>
                                        </div>
                                        <div class="Input-balloon-help-icon-YmFsbG9vbi1oZWxwLWljb2" id="personalInfo_socialSecurityNumber_socialSecurityNumber_balloon_help">
                                            <div class="BalloonHelpLink-c29link-container-YzI5bGluay1jb250YWluZX"><a hreff="#" class="BalloonHelpLink-c29link-YzI5bGluaw BalloonHelpLink-icon-aWNvbg"><span class="hidden-accessible">Why do we ask for your SSN?</span><img width="20" height="20" alt="Open a dialog" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZmZmO30uYntmaWxsOiNkMGQyZDg7fS5je2ZpbGw6IzUyNzRiOTt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xMCwwQTEwLDEwLDAsMSwwLDIwLDEwLDEwLDEwLDAsMCwwLDEwLDBaIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik0xMCwzYTcsNywwLDEsMS03LDcsNyw3LDAsMCwxLDctN20wLTFhOCw4LDAsMSwwLDgsOCw4LDgsMCwwLDAtOC04WiIvPjxwYXRoIGNsYXNzPSJjIiBkPSJNNy4zMiw2LjQ2QTMuMiwzLjIsMCwwLDEsOS44Nyw1LjM3QzExLjc2LDUuMzcsMTMsNi41MiwxMyw4cy0uOCwyLjM2LTIuNiwyLjcxTDEwLjI2LDEyaC0xTDguOTMsOS43YzEuNzYtLjI0LDIuMzktLjk1LDIuMzktMS43QTEuMzYsMS4zNiwwLDAsMCw5LjgsNi43MWExLjU3LDEuNTcsMCwwLDAtMS4yMi40Mi44NC44NCwwLDAsMSwuMjQuNTlBLjgxLjgxLDAsMCwxLDgsOC42MWExLjA2LDEuMDYsMCwwLDEtMS0xLjFBMS43MiwxLjcyLDAsMCwxLDcuMzIsNi40NlpNOC43LDEzLjgzYTEsMSwwLDEsMSwyLjA4LDAsMSwxLDAsMSwxLTIuMDgsMFoiLz48L3N2Zz4=" /></a></div>
                                        </div>
                                    </div>
                                    <div class="small-screen"></div>
                                </div>
                            </div>
                            <div class="FormGroup-row-cm FormGroup-two-column-view-bottom-text-container-dHdvLWNvbHVtbi12aWV3LWJvdHRvbS10ZXh0LWNvbnRhaW5lcg">
                                <div class="col-sm-12 col-md-7">
                                    <div></div>
                                </div>
                                <div class="col-sm-12 col-md-5">
                                    <div></div>
                                </div>
                            </div>
                        </div>
                        <div class="FormGroup-form-group-Zm9ybS1ncm91cA">
                            <div class="FormGroup-row-cm FormGroup-two-column-view-dHdvLWNvbHVtbi12aW">
                                <div class="Input-input-container-aW5wdXQtY29udGFpbm col-sm-12 col-md-7">
                                    <div class="Input-input-balloon-container-aW5wdXQtYmFsbG9vbi1jb250YWluZX">
                                        <div class="Input-label-group-container-bGFiZWwtZ3JvdXAtY29udGFpbm">
                                            <div class="Input-label-container-bGFiZWwtY29udGFpbm Input-above-YWJvdm"><label for="personalInfo_securityWord_securityWord" class="Input-text-label-dGV4dC1sYWJlbA Input-above-YWJvdm">Mother’s maiden name</label></div>
                                            <div class="Input-input-group-aW5wdXQtZ3JvdX Input-filled-in-ZmlsbGVkLW"><input type="text" class="Input-text-input-dGV4dC1pbnB1dA Input-filled-in-ZmlsbGVkLW" id="personalInfo_securityWord_securityWord" name="personalInfo.securityWord.securityWord" minlength="1" maxlength="16" size="16" aria-describedby="" aria-required="true" spellcheck="false"  /></div>
                                        </div>
                                        <div class="Input-balloon-help-icon-YmFsbG9vbi1oZWxwLWljb2" id="personalInfo_securityWord_securityWord_balloon_help">
                                            <div class="BalloonHelpLink-c29link-container-YzI5bGluay1jb250YWluZX"><a hreff="#" class="BalloonHelpLink-c29link-YzI5bGluaw BalloonHelpLink-icon-aWNvbg"><span class="hidden-accessible">Why do we ask for this?</span><img width="20" height="20" alt="Open a dialog" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZmZmO30uYntmaWxsOiNkMGQyZDg7fS5je2ZpbGw6IzUyNzRiOTt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xMCwwQTEwLDEwLDAsMSwwLDIwLDEwLDEwLDEwLDAsMCwwLDEwLDBaIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik0xMCwzYTcsNywwLDEsMS03LDcsNyw3LDAsMCwxLDctN20wLTFhOCw4LDAsMSwwLDgsOCw4LDgsMCwwLDAtOC04WiIvPjxwYXRoIGNsYXNzPSJjIiBkPSJNNy4zMiw2LjQ2QTMuMiwzLjIsMCwwLDEsOS44Nyw1LjM3QzExLjc2LDUuMzcsMTMsNi41MiwxMyw4cy0uOCwyLjM2LTIuNiwyLjcxTDEwLjI2LDEyaC0xTDguOTMsOS43YzEuNzYtLjI0LDIuMzktLjk1LDIuMzktMS43QTEuMzYsMS4zNiwwLDAsMCw5LjgsNi43MWExLjU3LDEuNTcsMCwwLDAtMS4yMi40Mi44NC44NCwwLDAsMSwuMjQuNTlBLjgxLjgxLDAsMCwxLDgsOC42MWExLjA2LDEuMDYsMCwwLDEtMS0xLjFBMS43MiwxLjcyLDAsMCwxLDcuMzIsNi40NlpNOC43LDEzLjgzYTEsMSwwLDEsMSwyLjA4LDAsMSwxLDAsMSwxLTIuMDgsMFoiLz48L3N2Zz4=" /></a></div>
                                        </div>
                                    </div>
                                    <div class="small-screen"></div>
                                </div>
                            </div>
                            <div class="FormGroup-row-cm FormGroup-two-column-view-bottom-text-container-dHdvLWNvbHVtbi12aWV3LWJvdHRvbS10ZXh0LWNvbnRhaW5lcg">
                                <div class="col-sm-12 col-md-7">
                                    <div></div>
                                </div>
                            </div>
                        </div>



                        <div class="FormGroup-form-group-Zm9ybS1ncm91cA">
                            <div class="FormGroup-row-cm FormGroup-two-column-view-dHdvLWNvbHVtbi12aW">
                                <div class="Select-select-container-c2VsZWN0LWNvbnRhaW5lcg col-sm-12 col-md-7">
                                    <div class="Select-select-balloon-container-c2VsZWN0LWJhbGxvb24tY29udGFpbm">
                                        <div class="Select-label-group-container-bGFiZWwtZ3JvdXAtY29udGFpbm">
                                            <div class="Select-label-container-bGFiZWwtY29udGFpbm Select-above-YWJvdm"><label class="Select-select-label-c2VsZWN0LWxhYm Select-above-YWJvdm" id="personalInfo_citizenshipType_citizenship_label" for="personalInfo_citizenshipType_citizenship">Citizenship</label></div>
                                            <div class="Select-input-group-aW5wdXQtZ3JvdX Select-selected-c2VsZWN0ZW">
                                                <select class=" Select-selected-c2VsZWN0ZW" id="personalInfo_citizenshipType_citizenship" name="personalInfo.citizenshipType.citizenship" aria-invalid="false" aria-required="true">
                                                    <option value="">Select one</option>
                                                    <option value="US_CITIZEN">US citizen</option>
                                                    <option value="RESIDENT_ALIEN">Resident alien</option>
                                                    <option value="NON_RESIDENT_ALIEN">Non-resident alien</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="Select-balloon-help-icon-YmFsbG9vbi1oZWxwLWljb2">
                                            <div class="BalloonHelpLink-c29link-container-YzI5bGluay1jb250YWluZX"><a hreff="#" class="BalloonHelpLink-c29link-YzI5bGluaw BalloonHelpLink-icon-aWNvbg"><span class="hidden-accessible">Why do we ask for citizenship?</span><img width="20" height="20" alt="Open a dialog" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZmZmO30uYntmaWxsOiNkMGQyZDg7fS5je2ZpbGw6IzUyNzRiOTt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xMCwwQTEwLDEwLDAsMSwwLDIwLDEwLDEwLDEwLDAsMCwwLDEwLDBaIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik0xMCwzYTcsNywwLDEsMS03LDcsNyw3LDAsMCwxLDctN20wLTFhOCw4LDAsMSwwLDgsOCw4LDgsMCwwLDAtOC04WiIvPjxwYXRoIGNsYXNzPSJjIiBkPSJNNy4zMiw2LjQ2QTMuMiwzLjIsMCwwLDEsOS44Nyw1LjM3QzExLjc2LDUuMzcsMTMsNi41MiwxMyw4cy0uOCwyLjM2LTIuNiwyLjcxTDEwLjI2LDEyaC0xTDguOTMsOS43YzEuNzYtLjI0LDIuMzktLjk1LDIuMzktMS43QTEuMzYsMS4zNiwwLDAsMCw5LjgsNi43MWExLjU3LDEuNTcsMCwwLDAtMS4yMi40Mi44NC44NCwwLDAsMSwuMjQuNTlBLjgxLjgxLDAsMCwxLDgsOC42MWExLjA2LDEuMDYsMCwwLDEtMS0xLjFBMS43MiwxLjcyLDAsMCwxLDcuMzIsNi40NlpNOC43LDEzLjgzYTEsMSwwLDEsMSwyLjA4LDAsMSwxLDAsMSwxLTIuMDgsMFoiLz48L3N2Zz4=" /></a></div>
                                        </div>
                                    </div>
                                    <div class="small-screen"></div>
                                </div>
                            </div>
                            <div class="FormGroup-row-cm FormGroup-two-column-view-bottom-text-container-dHdvLWNvbHVtbi12aWV3LWJvdHRvbS10ZXh0LWNvbnRhaW5lcg">
                                <div class="col-sm-12 col-md-7">
                                    <div></div>
                                </div>
                            </div>
                        </div>

                        <div role="region">
                            <div class="__showhide-entered">
                                <div class="FormGroup-form-group-Zm9ybS1ncm91cA">
                                    <div class="FormGroup-row-cm FormGroup-two-column-view-dHdvLWNvbHVtbi12aW">
                                        <div class="Select-select-container-c2VsZWN0LWNvbnRhaW5lcg col-sm-12 col-md-7">
                                            <div class="Select-select-balloon-container-c2VsZWN0LWJhbGxvb24tY29udGFpbm">
                                                <div class="Select-label-group-container-bGFiZWwtZ3JvdXAtY29udGFpbm">
                                                    <div class="Select-label-container-bGFiZWwtY29udGFpbm Select-above-YWJvdm"><label class="Select-select-label-c2VsZWN0LWxhYm Select-above-YWJvdm" id="personalInfo_countryOfCitizenship_countryOfCitizenship_label" for="personalInfo_countryOfCitizenship_countryOfCitizenship">Country of citizenship</label></div>
                                                    <div class="Select-input-group-aW5wdXQtZ3JvdX Select-selected-c2VsZWN0ZW">
                                                        <select class=" Select-selected-c2VsZWN0ZW" id="personalInfo_countryOfCitizenship_countryOfCitizenship" name="personalInfo.countryOfCitizenship.countryOfCitizenship" aria-invalid="false" aria-required="true">
                                                            <option value="">Select one</option>
                                                            <option value="AF">Afghanistan</option>
                                                            <option value="AL">Albania</option>
                                                            <option value="DZ">Algeria</option>
                                                            <option value="AD">Andorra</option>
                                                            <option value="AO">Angola</option>
                                                            <option value="AI">Anguilla</option>
                                                            <option value="AG">Antigua and Barbuda</option>
                                                            <option value="AR">Argentina</option>
                                                            <option value="AM">Armenia</option>
                                                            <option value="AW">Aruba</option>
                                                            <option value="AU">Australia</option>
                                                            <option value="AT">Austria</option>
                                                            <option value="AZ">Azerbaijan</option>
                                                            <option value="BS">Bahamas</option>
                                                            <option value="BH">Bahrain</option>
                                                            <option value="BD">Bangladesh</option>
                                                            <option value="BB">Barbados</option>
                                                            <option value="BY">Belarus</option>
                                                            <option value="BE">Belgium</option>
                                                            <option value="BZ">Belize</option>
                                                            <option value="BJ">Benin</option>
                                                            <option value="BM">Bermuda</option>
                                                            <option value="BT">Bhutan</option>
                                                            <option value="BO">Bolivia</option>
                                                            <option value="BA">Bosnia Herzegovina</option>
                                                            <option value="BW">Botswana</option>
                                                            <option value="BV">Bouvet Island</option>
                                                            <option value="BR">Brazil</option>
                                                            <option value="IO">Brit Ind Ocean Terr</option>
                                                            <option value="VG">British Virgin Isl</option>
                                                            <option value="BN">Brunei Darussalam</option>
                                                            <option value="BG">Bulgaria</option>
                                                            <option value="BF">Burkina Faso</option>
                                                            <option value="BI">Burundi</option>
                                                            <option value="KH">Cambodia</option>
                                                            <option value="CM">Cameroon</option>
                                                            <option value="CA">Canada</option>
                                                            <option value="CV">Cape Verde</option>
                                                            <option value="KY">Cayman Islands</option>
                                                            <option value="CF">Central African Repub</option>
                                                            <option value="TD">Chad</option>
                                                            <option value="CL">Chile</option>
                                                            <option value="CN">China</option>
                                                            <option value="CX">Christmas Island</option>
                                                            <option value="CC">Cocos (Keeling) Isl</option>
                                                            <option value="CO">Colombia</option>
                                                            <option value="KM">Comoros</option>
                                                            <option value="CG">Congo</option>
                                                            <option value="CD">Congo-Dem Rep of the</option>
                                                            <option value="CK">Cook Islands</option>
                                                            <option value="CR">Costa Rica</option>
                                                            <option value="CI">Cote d' Ivoire</option>
                                                            <option value="HR">Croatia</option>
                                                            <option value="CU">Cuba</option>
                                                            <option value="CY">Cyprus</option>
                                                            <option value="CZ">Czech Republic</option>
                                                            <option value="DK">Denmark</option>
                                                            <option value="DJ">Djibouti</option>
                                                            <option value="DM">Dominica</option>
                                                            <option value="DO">Dominican Republic</option>
                                                            <option value="TL">East Timor</option>
                                                            <option value="EC">Ecuador</option>
                                                            <option value="EG">Egypt</option>
                                                            <option value="SV">El Salvador</option>
                                                            <option value="GQ">Equatorial Guinea</option>
                                                            <option value="ER">Eritrea</option>
                                                            <option value="EE">Estonia</option>
                                                            <option value="ET">Ethiopia</option>
                                                            <option value="FK">Falkland Isl-Malvinas</option>
                                                            <option value="FO">Faroe Islands</option>
                                                            <option value="FJ">Fiji</option>
                                                            <option value="FI">Finland</option>
                                                            <option value="FR">France</option>
                                                            <option value="GF">French Guiana</option>
                                                            <option value="PF">French Polynesia</option>
                                                            <option value="TF">French Southern Terr</option>
                                                            <option value="GA">Gabon</option>
                                                            <option value="GM">Gambia</option>
                                                            <option value="GE">Georgia</option>
                                                            <option value="DE">Germany</option>
                                                            <option value="GH">Ghana</option>
                                                            <option value="GI">Gibraltar</option>
                                                            <option value="GR">Greece</option>
                                                            <option value="GL">Greenland</option>
                                                            <option value="GD">Grenada</option>
                                                            <option value="GP">Guadeloupe</option>
                                                            <option value="GT">Guatemala</option>
                                                            <option value="GN">Guinea</option>
                                                            <option value="GW">Guinea-Bissau</option>
                                                            <option value="GY">Guyana</option>
                                                            <option value="HT">Haiti</option>
                                                            <option value="HM">Heard/McDonald Islands</option>
                                                            <option value="VA">Holy See (Vatican)</option>
                                                            <option value="HN">Honduras</option>
                                                            <option value="HK">Hong Kong</option>
                                                            <option value="HU">Hungary</option>
                                                            <option value="IS">Iceland</option>
                                                            <option value="IN">India</option>
                                                            <option value="ID">Indonesia</option>
                                                            <option value="IQ">Iraq</option>
                                                            <option value="IE">Ireland</option>
                                                            <option value="IR">Islamic Repub of Iran</option>
                                                            <option value="IL">Israel</option>
                                                            <option value="IT">Italy</option>
                                                            <option value="JM">Jamaica</option>
                                                            <option value="JP">Japan</option>
                                                            <option value="JO">Jordan</option>
                                                            <option value="KZ">Kazakhstan</option>
                                                            <option value="KE">Kenya</option>
                                                            <option value="KI">Kiribati</option>
                                                            <option value="KR">Korea (Republic of)</option>
                                                            <option value="KP">Korea-Dem Ppls Rep of</option>
                                                            <option value="KW">Kuwait</option>
                                                            <option value="KG">Kyrgyzstan</option>
                                                            <option value="LA">Lao People's Dem Rep</option>
                                                            <option value="LV">Latvia</option>
                                                            <option value="LB">Lebanon</option>
                                                            <option value="LS">Lesotho</option>
                                                            <option value="LR">Liberia</option>
                                                            <option value="LY">Libya Arab Jamahiriya</option>
                                                            <option value="LI">Liechtenstein</option>
                                                            <option value="LT">Lithuania</option>
                                                            <option value="LU">Luxembourg</option>
                                                            <option value="MO">Macao</option>
                                                            <option value="MK">Macedonia</option>
                                                            <option value="MG">Madagascar</option>
                                                            <option value="MW">Malawi</option>
                                                            <option value="MY">Malaysia</option>
                                                            <option value="MV">Maldives</option>
                                                            <option value="ML">Mali</option>
                                                            <option value="MT">Malta</option>
                                                            <option value="MH">Marshall Islands</option>
                                                            <option value="MQ">Martinique</option>
                                                            <option value="MR">Mauritania</option>
                                                            <option value="MU">Mauritius</option>
                                                            <option value="YT">Mayotte</option>
                                                            <option value="MX">Mexico</option>
                                                            <option value="MD">Moldova</option>
                                                            <option value="MC">Monaco</option>
                                                            <option value="MN">Mongolia</option>
                                                            <option value="MS">Montserrat</option>
                                                            <option value="MA">Morocco</option>
                                                            <option value="MZ">Mozambique</option>
                                                            <option value="MM">Myanmar</option>
                                                            <option value="NA">Namibia</option>
                                                            <option value="NR">Nauru</option>
                                                            <option value="NP">Nepal</option>
                                                            <option value="NL">Netherlands</option>
                                                            <option value="AN">Netherlands Antilles</option>
                                                            <option value="NC">New Caledonia</option>
                                                            <option value="NZ">New Zealand</option>
                                                            <option value="NI">Nicaragua</option>
                                                            <option value="NE">Niger</option>
                                                            <option value="NG">Nigeria</option>
                                                            <option value="NU">Niue</option>
                                                            <option value="NF">Norfolk Island</option>
                                                            <option value="NO">Norway</option>
                                                            <option value="OM">Oman</option>
                                                            <option value="PK">Pakistan</option>
                                                            <option value="PW">Palau</option>
                                                            <option value="PS">Palestinian Territory</option>
                                                            <option value="PA">Panama</option>
                                                            <option value="PG">Papua New Guinea</option>
                                                            <option value="PY">Paraguay</option>
                                                            <option value="PE">Peru</option>
                                                            <option value="PH">Philippines</option>
                                                            <option value="PN">Pitcairn</option>
                                                            <option value="PL">Poland</option>
                                                            <option value="PT">Portugal</option>
                                                            <option value="QA">Qatar</option>
                                                            <option value="RE">Reunion</option>
                                                            <option value="RO">Romania</option>
                                                            <option value="RU">Russian Federation</option>
                                                            <option value="RW">Rwanda</option>
                                                            <option value="GS">SGeorgia-S Sndwch Isl</option>
                                                            <option value="SH">Saint Helena</option>
                                                            <option value="KN">Saint Kitts and Nevis</option>
                                                            <option value="LC">Saint Lucia</option>
                                                            <option value="WS">Samoa</option>
                                                            <option value="SM">San Marino</option>
                                                            <option value="ST">Sao Tome and Principe</option>
                                                            <option value="SA">Saudi Arabia</option>
                                                            <option value="SN">Senegal</option>
                                                            <option value="SC">Seychelles</option>
                                                            <option value="SL">Sierra Leone</option>
                                                            <option value="SG">Singapore</option>
                                                            <option value="SK">Slovakia</option>
                                                            <option value="SI">Slovenia</option>
                                                            <option value="SB">Solomon Islands</option>
                                                            <option value="SO">Somalia</option>
                                                            <option value="ZA">South Africa</option>
                                                            <option value="ES">Spain</option>
                                                            <option value="LK">Sri Lanka</option>
                                                            <option value="PM">StPierre and Miquelon</option>
                                                            <option value="VC">StVincent-Grenadines</option>
                                                            <option value="SD">Sudan</option>
                                                            <option value="SR">Suriname</option>
                                                            <option value="SJ">Svalbard-Jan Mayen</option>
                                                            <option value="SZ">Swaziland</option>
                                                            <option value="SE">Sweden</option>
                                                            <option value="CH">Switzerland</option>
                                                            <option value="SY">Syrian Arab Republic</option>
                                                            <option value="TW">Taiwan</option>
                                                            <option value="TJ">Tajikstan</option>
                                                            <option value="TZ">Tanzania</option>
                                                            <option value="TH">Thailand</option>
                                                            <option value="TG">Togo</option>
                                                            <option value="TK">Tokelau</option>
                                                            <option value="TO">Tonga</option>
                                                            <option value="TT">Trinidad and Tobago</option>
                                                            <option value="TN">Tunisia</option>
                                                            <option value="TR">Turkey</option>
                                                            <option value="TM">Turkmenistan</option>
                                                            <option value="TC">Turks and Caicos Isl</option>
                                                            <option value="TV">Tuvalu</option>
                                                            <option value="UG">Uganda</option>
                                                            <option value="UA">Ukraine</option>
                                                            <option value="AE">United Arab Emirates</option>
                                                            <option value="GB">United Kingdom</option>
                                                            <option value="ZZ">Unknown Foreign</option>
                                                            <option value="UY">Uruguay</option>
                                                            <option value="UZ">Uzbekistan</option>
                                                            <option value="VU">Vanuatu</option>
                                                            <option value="VE">Venezuela</option>
                                                            <option value="VN">Vietnam</option>
                                                            <option value="WF">Wallis and Futuna</option>
                                                            <option value="EH">Western Sahara</option>
                                                            <option value="YE">Yemen</option>
                                                            <option value="YU">Yugoslavia</option>
                                                            <option value="ZM">Zambia</option>
                                                            <option value="ZW">Zimbabwe</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="small-screen"></div>
                                        </div>
                                    </div>
                                    <div class="FormGroup-row-cm FormGroup-two-column-view-bottom-text-container-dHdvLWNvbHVtbi12aWV3LWJvdHRvbS10ZXh0LWNvbnRhaW5lcg">
                                        <div class="col-sm-12 col-md-7">
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="InsertionPoint-insertion-point-aW5zZXJ0aW9uLXBvaW InsertionPoint-margin-bWFyZ2">
                            <div class="small-screen">

                                <p><span class="c79"><strong>By selecting Continue</strong>, you agree that Wells Fargo Bank, N.A. may:</span></p>
                                <ul>
                                    <li><span class="c79">Contact you at any phone number you provide during this online session <strong>even if we use an autodialer/automatic dialing technology to call or text you</strong>. If the phone number you provide is registered to a cell phone, your mobile carrier’s charges may apply.&nbsp; Your agreement is not a condition of purchase.</span></li>
                                    <li><span class="c79">Contact you at any email address you provide during this online session. You can revoke your agreement to receive marketing emails at any time. Your mobile carrier’s charges may apply.&nbsp;</span></li>
                                    <li><span class="c79">Use personal and financial information about you from our affiliated companies to prefill the application.</span></li>
                                </ul>


                            </div><div class="not-small-screen">

                                <p><span class="c79"><strong>By selecting Continue</strong>, you agree that Wells Fargo Bank, N.A. may:</span></p>
                                <ul>
                                    <li><span class="c79">Contact you at any phone number you provide during this online session <strong>even if we use an autodialer/automatic dialing technology to call or text you</strong>. If the phone number you provide is registered to a cell phone, your mobile carrier’s charges may apply.&nbsp; Your agreement is not a condition of purchase.</span></li>
                                    <li><span class="c79">Contact you at any email address you provide during this online session. You can revoke your agreement to receive marketing emails at any time. Your mobile carrier’s charges may apply.&nbsp;</span></li>
                                    <li><span class="c79">Use personal and financial information about you from our affiliated companies to prefill the application.</span></li>
                                </ul>


                            </div></div>

                        <div class="not-large-screen"><div class="InsertionPoint-insertion-point-aW5zZXJ0aW9uLXBvaW">


                            <p><span class="c79"><strong>Important information about procedures for opening a new account</strong></span></p>
                            <p><span class="c79">When you open an account, we will ask for your name, address, date of birth, and other information that will allow us to identify you. We may also ask for your driver's license or other identifying information.</span> <div class="InsertionPoint-c29link-container-YzI5bGluay1jb250YWluZX"><div class="BalloonHelpLink-c29link-container-YzI5bGluay1jb250YWluZX"><a hreff="#" class="BalloonHelpLink-c29link-YzI5bGluaw"><span>Why do we ask for this?</span><span class="hidden-accessible">Open a dialog</span></a></div></div></p>





                        </div></div>

                        <div><input class="flow-event" type="hidden" name="_eventId_continue"  /><div class="ButtonBar-button-bar-YnV0dG9uLWJhcg ButtonBar-re-imagine-cmUtaW1hZ2luZQ ButtonBar-consider-right-rail-Y29uc2lkZXItcmlnaHQtcmFpbA ButtonBar-three-button-dGhyZWUtYnV0dG" style={{ padding: 0 }}>
                        <button type="submit" class="btn-p" data-mrkt-tracking-id="continue" onClick={this.postContentActivity}>Continue</button>
                        <button type="submit" class="btn-s" data-mrkt-tracking-id="save">Save for Later</button><a hreff="#" class="btn-s" data-mrkt-tracking-id="cancel">Cancel<span class="hidden-accessible">Open a dialog</span></a></div></div>
                    </section>
                    <br />

                    <br />
                    <div>
                        <div class="c20body" data-numbered="false" data-cid="tcm:84-149609-16"></div>
                        <p><span class="c79">Wells Fargo is not affiliated with nor does it maintain control over any other company offering products or services and does not endorse, provide or guarantee their products, services, or policies. Wells Fargo is not responsible for the actions or omissions of these companies nor is Wells Fargo responsible for any other cause, condition or event beyond its direct control.
                    <br /></span>
                        </p>
                        <p><span class="c79">American Express is a federally registered service mark of American Express. This card is issued by Wells Fargo Bank, N.A. pursuant to a license from American Express.</span></p>
                    </div>
                    <br /><br /><br />
                </div>
                <footer role="contentinfo" class="Footer-footer-Zm9vdG">
                    <div class="Footer-footer-container-Zm9vdGVyLWNvbnRhaW5lcg Footer-re-imagine-cmUtaW1hZ2luZQ">
                        <div class="Footer-c9-Yz col-sm-12 col-md-12 col-lg-12">
                            <nav aria-label="corporate, legal, security">
                                <ul class="not-large-screen">
                                    <li><a hreff="https://www.wellsfargo.com/privacy-security/index">Privacy, Cookies, Security &amp; Legal<span class="hidden-accessible">, opens in a new window</span></a></li>
                                    <li><a hreff="/online_security">Online Security<span class="hidden-accessible">, opens in a new window</span></a></li>
                                    <li><a hreff="https://www.wellsfargo.com/privacy-security/privacy/online#adchoices">Ad Choices<span class="hidden-accessible">, opens in a new window</span></a></li>
                                </ul>
                                <ul class="large-screen">
                                    <li><a hreff="https://www.wellsfargo.com/privacy-security/index">Privacy, Cookies, Security &amp; Legal<span class="hidden-accessible">, opens in a new window</span></a></li>
                                    <li><a hreff="https://www.wellsfargo.com/privacy-security/privacy/online#adchoices">Ad Choices<span class="hidden-accessible">, opens in a new window</span></a></li>
                                </ul>
                            </nav>
                            <hr />
                            © 1999 - 2018 Wells Fargo. All rights reserved. NMLSR ID 399801
      </div>
                    </div>
                </footer>
                {showModal && <div className="modal">
          <div className="body">
            <p style={{width:'60%', marginLeft:'20%', fontSize:'20px', fontFamily:'Georgia'}}>{"Successfully applied to the "+ productName+". Our representative will contact you soon"}</p>
          <button className="button" >Go to Home</button>
          </div>
        </div>}
            </div>
        )
    }
}

export default Application;