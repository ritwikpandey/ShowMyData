import React from 'react';
import Banner from '../../assets/banner.png';
import ImageOne from '../../assets/icone.png';
import ImageTwo from '../../assets/ictwo.png';
import ImageThree from '../../assets/icthree.png';
import ImageFour from '../../assets/icfour.png';
import ImageFive from '../../assets/icfive.png';
import ImageSix from '../../assets/icsix.png';

const MortgageBanner = ()=>(
    <div style={{ width: '80vw', padding: '2vh 10vw' }} >
    <div style={{ position: 'relative', height: '50vh', width: '80vw', textAlign: 'left' }}>
      <p style={{ fontFamily: 'Open Sans', fontWeight: '600' }}>Home Mortgage Loans</p>
      <div style={{ position: 'absolute', height: '40vh', width: '55%' }} className="mortgageLoanBanner">
      </div>
      <div style={{ position: 'absolute', left: '48%', textAlign: 'left', height: '34vh', margin: '3vh 0', width: '50%', background: '#ffffff',borderRadius:'5px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)' }}>
        <h4 style={{ fontFamily: 'Open Sans', color: '#b61235', textAlign: 'left', marginLeft: '2vw' }}>Buying your perfect home is easier</h4>
        <p style={{ fontFamily: 'Open Sans', color: '#545558', textAlign: 'left', margin: '0 5vw 0 2vw' }}>Buying your perfect home is easier
          Start with a simpler online home mortgage application and personalized support every step of the way.</p>
        <br />
        <button style={{ fontFamily: 'Open Sans', marginLeft: '2vw', padding: '0.5em 1em', cursor: 'pointer', textAlign: 'left', background: '#ffffff', color: '#4a90e2', border: '1px solid #4a90e2', borderRadius: '20px' }}>GET STARTED</button>
      </div>
    </div>
    <p style={{color:'#5545558', fontSize:'1.2em', fontFamily:'Open Sans', fontWeight:'300'}}>Homeownership, simplified</p>
    <div>
      <div style={{display:'table',height:'15vh', width:'30%',margin:'2vh 0 2vh 2%' ,background:'#ffffff', float:'left',boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)', borderRadius:'5px'}}>
      <div style={{verticalAlign: 'middle', display:'table-cell'}}>
        <img src={ImageOne} alt=""/>
        <p style={{margin:0, color:'#545558', fontFamily:'Open Sans', fontWeight:'400'}}>Buy a Home</p>
        </div>
        </div>
        <div style={{display:'table',height:'15vh', width:'30%',margin:'2vh 3%', background:'#ffffff', float:'left',boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',borderRadius:'5px'}}>
        <div style={{verticalAlign: 'middle', display:'table-cell'}}>
        <img src={ImageTwo} alt=""/>
        <p style={{margin:0, color:'#545558', fontFamily:'Open Sans', fontWeight:'400'}}>Refinance Your Mortgage</p>
        </div>
        </div>
        <div style={{display:'table',height:'15vh', width:'30%',margin:'2vh 2% 2vh 0' , background:'#ffffff', float:'left',boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',borderRadius:'5px'}}>
        <div style={{verticalAlign: 'middle', display:'table-cell'}}>
        <img src={ImageThree} alt=""/>
        <p style={{margin:0, color:'#545558', fontFamily:'Open Sans', fontWeight:'400'}}>Home Equity</p>
        </div>
        </div>
      </div>
      <div style={{clear:'both'}} />
      <div>
      <div style={{display:'table',height:'15vh', width:'30%',margin:'2vh 0 2vh 2%' ,background:'#ffffff', float:'left', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',borderRadius:'5px'}}>
      <div style={{verticalAlign: 'middle', display:'table-cell'}}>
        <img src={ImageFour} alt=""/>
        <p style={{margin:0, color:'#545558', fontFamily:'Open Sans', fontWeight:'400'}}>Mortgage Calculators</p>
        </div>
        </div>
        <div style={{display:'table',height:'15vh', width:'30%',margin:'2vh 3%', background:'#ffffff', float:'left', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',borderRadius:'5px'}}>
        <div style={{verticalAlign: 'middle', display:'table-cell'}}>
        <img src={ImageFive} alt=""/>
        <p style={{margin:0, color:'#545558', fontFamily:'Open Sans', fontWeight:'400'}}>Current Mortgage Rates</p>
        </div>
        </div>
        <div style={{display:'table',height:'15vh', width:'30%',margin:'2vh 2% 2vh 0' , background:'#ffffff', float:'left', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',borderRadius:'5px'}}>
        <div style={{verticalAlign: 'middle', display:'table-cell'}}>
        <img src={ImageSix} alt=""/>
        <p style={{margin:0, color:'#545558', fontFamily:'Open Sans', fontWeight:'400'}}>Mortgage Sign-On</p>
        </div>
        </div>
      </div>
      <div style={{clear:'both'}} />
      
  </div>
)

export default MortgageBanner;