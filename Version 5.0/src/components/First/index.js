import React from 'react';

const First = ({data, onClick}) => (
    <React.Fragment>
        <div style={{ height: '65vh', width: '70%', boxShadow: '0 5px 8px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.22)', margin: '5% 15%' }}>
            <div style={{ float: 'left', width: '69.8%', height: '65vh', background: '#FFF', textAlign: 'center' }}>
                <div style={{ padding: '15vh 0' }}>
                    <h1 style={{ fontFamily: 'Georgia', fontWeight: '300', color: '#434343' }}>{data.data.content1}</h1>
                    <h2 style={{ fontFamily: 'Georgia', fontWeight: '300', color: '#434343', padding: '0 15%' }}>{data.data.content2} </h2>
                    <p style={{ fontFamily: 'verdana', fontWeight: '300', color: '#434343', padding: '0 15%' }}> {data.data.content3}</p>
                    <button style={{ background: '#bb0826', marginTop: '3vh', padding: '1.5vh 3vw', border: 'none', borderRadius: '5px', outline: 'none', color: '#FFF', fontFamily: 'verdana' }} onClick={()=>{onClick(data)}}>{data.data.buttonContent}</button>
                </div>
            </div>
            <div style={{ float: 'left', width: '0.2%', height: '65vh', background: '#e3e3e3' }}>
            </div>
            <div style={{ float: 'left', width: '30%', height: '65vh', background: '#F9F9F9' }}>
                <div style={{ padding: '3vh 10%', width: '90%' }}>
                    <h1 style={{ fontFamily: 'Georgia', marginBottom: '0.3em', fontWeight: '300', color: '#434343' }}>We found a better rate</h1>
                    <p style={{ fontFamily: 'verdana', fontWeight: '300', fontSize: '0.9em', color: '#434343' }}>your current rate is 4.210% for 10 years. You may be able to reduce at 4.0%</p>
                    <button style={{ background: '#FFF', border: '1px solid #bb0826', padding: '1vh 0', width: '100%', borderRadius: '5px', outline: 'none', color: '#bb0826', fontFamily: 'verdana' }}>See reduced options</button>
                    <div style={{height:'1px', width:'120%', margin:'3vh 0',   background:'#e3e3e3'}}></div>
                    <h1 style={{ fontFamily: 'Georgia', marginBottom: '0.3em', fontWeight: '300', color: '#434343' }}>Improve your home</h1>
                    <p style={{ fontFamily: 'verdana', fontWeight: '300', fontSize: '0.9em', color: '#434343' }}>your current rate is 4.210% for 10 years. You may be able to reduce at 4.0%</p>
                    <button style={{ background: '#FFF', border: '1px solid #bb0826', padding: '1vh 0', width: '100%', borderRadius: '5px', outline: 'none', color: '#bb0826', fontFamily: 'verdana' }}>Learn more</button>
                    
                </div>

            </div>
        </div>
    </React.Fragment>
)

export default First;