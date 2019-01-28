import React from 'react';

const Recapture = ({data, onClick})=>(
<div style={{ height: '65vh', width: '70%', boxShadow: '0 5px 8px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.22)', margin: '5% 15%' }}>
            <div style={{ float: 'left', width: '69.8%', height: '65vh', background: '#FFF', textAlign: 'center' }}>
                <div style={{ padding: '15vh 0' }}>
                    <h1 style={{ fontFamily: 'Georgia', fontWeight: '300', color: '#434343' }}>{data.data.content1}</h1>
                    
                    <h2 style={{ fontFamily: 'Georgia', fontWeight: '300', color: '#434343', padding: '0 18%', lineHeight:'4vh' }}>{data.data.content2}</h2>
                    <button style={{ background: '#bb0826', marginTop: '3vh', padding: '1.5vh 3vw', border: 'none', borderRadius: '5px', outline: 'none', color: '#FFF', fontFamily: 'verdana' }} onClick={()=>{onClick(data)}}>{data.data.buttonContent1}</button>
                </div>
            </div>
            <div style={{ float: 'left', width: '0.2%', height: '65vh', background: '#e3e3e3' }}>
            </div>
            <div style={{ float: 'left', width: '30%', height: '65vh', background: '#F9F9F9' }}>
                <div style={{ width: '100%' , textAlign:'center'}}>
                    <h2 style={{ fontFamily: 'Georgia', fontWeight: '300', padding: '3vh 16% 0 16%',color: '#434343' }}>Check out our  current rates now!</h2>
                    <button style={{ background: '#FFF', border: '1px solid #bb0826',padding: '1vh 0', width: '60%', borderRadius: '5px', outline: 'none', color: '#bb0826', fontFamily: 'verdana' }}>See reduced options</button>
                    <div style={{height:'1px', width:'80%', margin:'3vh 10%',   background:'#e3e3e3'}}></div>
                    <h2 style={{ fontFamily: 'Georgia',fontSize:'2em', marginBottom: '0.3em', fontWeight: '300', color: '#434343' }}>Already a customer?</h2>
                    <h2 style={{ fontFamily: 'Georgia', fontWeight: '300', color: '#434343' , padding: '0 16%',}}>Sign on to view your account.</h2>
                    <input style={{width:'60%', border:'1px solid #e3e3e3',fontSize:'1.1em' ,padding:'1vh 10px', borderRadius:'5px', marginBottom:'1.5vh'}}
                     placeholder="User name"/>
                    <input style={{width:'60%', border:'1px solid #e3e3e3',fontSize:'1.1em' ,padding:'1vh 10px', borderRadius:'5px', marginBottom:'3vh'}}
                     placeholder="Password"/>
                    
                    <button style={{ background: '#FFF', border: '1px solid #bb0826', padding: '1vh 0', width: '60%',  borderRadius: '5px', outline: 'none', color: '#bb0826', fontFamily: 'verdana' }}>Sign On</button>
                    
                </div>

            </div>
        </div>
)

export default Recapture;