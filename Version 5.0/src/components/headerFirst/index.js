import React from 'react';
import User from '../../assets/user.png'
import Logo from '../../assets/logo.png';


const HeaderFirst = ({showRecommendation, onClick}) =>(
   /*  <div className="header">
    <div className="left">
      <div style={{ height: '8vh', display: 'table' }}>
        <div style={{ verticalAlign: 'middle', display: 'table-cell', height: '8vh' }}>
          <img src={Logo} alt=""  onClick={()=>onClick("/products")} />
        </div>
      </div>

    </div>
  
    
    <div className="right">
      <div style={{ height: '8vh', display: 'table', textAlign: 'right' }}>
        <div style={{ verticalAlign: 'middle', display: 'table-cell', textAlign: 'right', height: '8vh' }}>
          <img src={User} />
        </div>
      </div>
    </div>
    <div className="right">
      <div style={{ height: '8vh', display: 'table', textAlign: 'right' }}>
        <div style={{ verticalAlign: 'middle', display: 'table-cell', textAlign: 'right', height: '8vh' }}>
          <p style={{ color: '#ffffff', fontFamily: 'Open Sans',margin:'0' }} onClick={()=>{localStorage.setItem("REACT_APP_USER_ID", "");onClick("/")}}>Sign off </p>
        </div>
      </div>
    </div>
    <div className="right">
      <div style={{ height: '8vh', display: 'table', textAlign: 'right' }}>
        <div style={{ verticalAlign: 'middle', display: 'table-cell', textAlign: 'right', height: '8vh' }}>
{showRecommendation && <p style={{ color: '#ffffff', fontFamily: 'Open Sans',margin:'0' }} >User Id: {localStorage.getItem("REACT_APP_USER_ID")}</p> }
{!showRecommendation && <p >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p> }
        </div>
      </div>
    </div>
      
    <div className="right">
      <div style={{ height: '8vh', display: 'table', textAlign: 'right' }}>
        <div style={{ verticalAlign: 'middle', display: 'table-cell', textAlign: 'right', height: '8vh' }}>
        {showRecommendation &&  <p style={{ color: '#ffffff', fontFamily: 'Open Sans',margin:'0' }} className="onhover" onClick={()=>onClick("/recommendations")}>Show Recommentations </p>}
        {!showRecommendation && <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p> } 
        </div>
      </div>
    </div>

  </div> */
  <header role="banner">
  <div id="masthead" class="html5header c1">

      <div class="wfLogoStripParent">
          <div class="wfLogoStripChild">
              <div id="brand" onClick={()=>{onClick()}}>
                  <img alt="Wells Fargo Home Page" src="https://www01.wellsfargomedia.com/assets/images/css/template/homepage/homepage-logo-horz.svg" />

              </div>
              <div id="topSearch">
                  <ul>

                      <li role="presentation">
                          <a hreff="https://oam.wellsfargo.com/oamo/identity/enrollment" class="signIn signLockImg">
                              <img alt="Secure" src="https://www04.wellsfargomedia.com/assets/images/css/template/homepage/homepage-lock.svg" />
                              Enroll
                  </a>
                      </li>


                      <li role="presentation">
                          <a hreff="/help/">Customer Service</a>
                      </li>

                      <li role="presentation">
                          <a hreff="/locator/">ATMs/Locations</a>
                      </li>

                      <li role="presentation">
                          <a hreff="/spanish/" lang="es" >Español</a>
                      </li>

                  </ul>

                  <form id="frmSearch" name="gs" method="GET" action="/search/search" role="search" aria-label="Sitewide">
                      <label for="inputTopSearchField" class="hide">Search</label>
                      <div id="sp-results">
                          <span class="hide" id="srchInstructions">Enter search term, then press down arrow to navigate suggestions</span>
                          <input name="q" maxlength="75" size="75" autocomplete="off" autocapitalize="off" id="inputTopSearchField" onkeyup="ss_handleKey(event)" type="text" placeholder="Search" aria-autocomplete="both" role="combobox" aria-controls="search_suggest" aria-expanded="false" aria-describedby="srchInstructions" />
                      </div>

                      <table class="ss-gac-m" id="search_suggest" role="presentation"></table>

                      <button name="btnG" value="Search" class="register" aria-label="Search" id="btnTopSearch" type="submit" disabled="disabled"><span class="searchMagGlass"></span></button>


                  </form>

              </div>
          </div>
      </div>
  </div>
</header>
)

export default HeaderFirst;
