import React from 'react';

const ExternalRealty = ({data , onClick}) => (
    <div style={{ height: '55vh', padding: '5vh 0', width: '70%', boxShadow: '0 5px 8px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.22)', margin: '5% 15%', background: '#FFF', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Georgia', fontWeight: '300', margin: 0, marginBottom: '1vh', padding: 0, color: '#434343' }}> Welcome back</h1>
        <h3 style={{ fontFamily: 'Georgia', fontWeight: '300', margin: 0, padding: 0, color: '#434343', padding: '0 15%' }}>{data.data.content1}</h3>
        <div style={{ float: 'left', width: '40%', padding: '0 10%', margin: '7vh 0', background: '#FFF' }}>
            <h4 style={{ fontFamily: 'Open sans', margin: 0, marginBottom: '1vh', padding: 0, textAlign: 'left' }}>Your custom scenario</h4>
            <p style={{ textAlign: 'left' }}>{data.data.content2}</p>
            <button style={{ background: '#FFF', border: '1px solid #bb0826', padding: '1vh 0', width: '100%', borderRadius: '5px', outline: 'none', color: '#bb0826', fontFamily: 'verdana' }} onClick={()=>{onClick(data)}}>{data.data.buttonContent}</button>
        </div>
        <div style={{ float: 'left', width: '50%', background: '#FFF', margin: '7vh 0', textAlign: 'center' }}>
            <div>
                <h1 style={{ fontFamily: 'verdana', float: 'left', width: '70%', fontWeight: '300', fontSize: '3em', margin: 0, marginBottom: '1vh', padding: 0, color: '#434343', textAlign: 'right' }} >${data.data.loanAmount} </h1>
                <p style={{ fontSize: '1em !important', float: 'left', width: '10%', paddingLeft: '5%', paddingTop: '1vh', textAlign: 'left' }}>Loan Amount</p>
            </div>
            <div style={{ clear: 'both' }}></div>
            <div style={{ height: '1px', width: '70%', margin: '1vh 0', background: '#e3e3e3' }}></div>
            <div>
                <h1 style={{ fontFamily: 'verdana', float: 'left', width: '70%', fontWeight: '300', fontSize: '3em', margin: 0, marginBottom: '1vh', padding: 0, color: '#434343', textAlign: 'right' }} >${data.data.emi} </h1>
                <p style={{ fontSize: '1em !important', float: 'left', width: '10%', paddingLeft: '5%', paddingTop: '1vh', textAlign: 'left' }}>Monthly Payment</p>
            </div>
        </div>
        <button style={{ background: '#bb0826', border: '1px solid #bb0826', padding: '1vh 0',margin:'0 30%', width: '40%', borderRadius: '5px', outline: 'none', color: '#FFF', fontFamily: 'verdana' }} onClick={()=>{onClick(data)}}>{"Apply for Your Dream Home"}</button>
    </div>
)

export default ExternalRealty;