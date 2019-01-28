import React from 'react';
const Refinance = ({data, onClick })=>(
    <div style={{ height: '55vh',padding:'5vh 0', width: '70%', boxShadow: '0 5px 8px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.22)', margin: '5% 15%', background:'#FFF', textAlign:'center' }}>

<h2 style={{ fontFamily: 'Georgia', fontWeight: '300',margin:0,marginBottom:'1vh',padding:0, color: '#434343' }}> {data.data.content1}</h2>
    <h1 style={{ fontFamily: 'Georgia', fontWeight: '300',olor: '#434343', padding: '0 15%' }}>{data.data.content2}</h1>
    <h2 style={{ fontFamily: 'Georgia', fontWeight: '300',color: '#434343' }}> {data.data.content3}</h2>
    <br/>
    <button style={{ background: '#FFF', border: '1px solid #bb0826', padding: '1vh 0', width: '30%', borderRadius: '5px', outline: 'none', color: '#bb0826', fontFamily: 'verdana' }} onClick={()=>{onClick(data)}}>{data.data.buttonContent1}</button>
    <br/><br/>
    <button style={{ background: '#FFF', border: '1px solid #bb0826', padding: '1vh 0', width: '30%', borderRadius: '5px', outline: 'none', color: '#bb0826', fontFamily: 'verdana' }} onClick={()=>{onClick(data)}}>{data.data.buttonContent2}</button>
    <br/><br/>
    <button style={{ background: '#FFF', border: '1px solid #bb0826', padding: '1vh 0', width: '30%', borderRadius: '5px', outline: 'none', color: '#bb0826', fontFamily: 'verdana' }} onClick={()=>{onClick(data)}}>{data.data.buttonContent3}</button>
    </div>
)
export default Refinance;