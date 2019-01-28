import React from 'react';
import User from '../../assets/user.png'
import Arrow from '../../assets/arrow.png';
import ArrowPrev from '../../assets/arrowprev.png';
const color = ['#4c8d01', '#3ccfae', '#f5a623'];
const ProductCard = ({ index,coolors, showPreviousCard, isShowPrevious, isShowNext, postActivity, productName, description, hyperLink, productId, hierarchy, openHierarchy, isGOback, showPrevious, showNext }) => {
    let colorr = coolors[index%3];
    return (<div key={index} style={{ height: '25vh', width: '24.5vw', margin: '2vh 2vw 0 0', borderRadius: '10px', display: 'inline-block', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)', position: 'relative' }}>
        <div style={{ height: '25vh', background: colorr, width: '24.5vw', display: 'table' }}>
            <div style={{ margin: 0, width: '15vw', padding: '0 2vw', color: '#000', verticalAlign: 'middle', textAlign: 'left', display: 'table-cell', height: '13vh' }}
                className="nowwrap">
                <p style={{ fontFamily: 'Open Sans', margin: 0, fontSize: '0.9em', fontWeight: '600', color: '#000', textAlign: 'left' }}>{productName}</p>
                <p style={{ fontFamily: 'Open Sans', fontWeight: '600', color: '#000', textAlign: 'left', fontSize: '0.8em' }}>{description}</p>

                {typeof hierarchy !== "undefined" && hierarchy !== null && hierarchy.length === 0 && <div style={{ lineHeight: '6.8vh', color: '#32abf4' }} onClick={() => { postActivity(productId, 'applied') }}>
                    <button style={{ padding: '0.5vw 1vw', color: colorr, border: '1px solid #FFF', cursor: 'pointer', background: '#ffffff', borderRadius: '15px', fontSize: '0.9em', fontFamily: 'Open Sans', textDecoration: 'none' }}>Apply online </button></div>}
                
                {typeof hierarchy !== "undefined" && hierarchy !== null && hierarchy.length !== 0 && <button onClick={() => { openHierarchy(productId, productName, hierarchy); postActivity(productId, 'viewed') }}
                    style={{ padding: '0.5vw 1vw', border: '1px solid #FFF', color: colorr, cursor: 'pointer', background: '#ffffff', borderRadius: '15px', fontSize: '0.9em', fontFamily: 'Open Sans',outline:'none' }}>View Product</button>}
               
                {typeof hierarchy === "undefined" && <div style={{ lineHeight: '6.8vh', color: '#32abf4' }} onClick={() => { postActivity(productId, 'applied') }}>
                    <button style={{ padding: '0.5vw 1vw', color: colorr, border: '1px solid #FFF', cursor: 'pointer', background: '#ffffff', borderRadius: '15px', fontSize: '0.9em', fontFamily: 'Open Sans', textDecoration: 'none' }}>Apply online </button></div>}

            </div>
            {isShowNext &&
                <div style={{ background: '#797979', cursor: 'pointer', height: '6vh', width: '3vw', display: 'table', position: 'absolute', top: '8vh', right: '-1.5vw', borderRadius: '50%' }} onClick={showNext}>
                    <div style={{ display: 'table-cell',textAlign:'center', verticalAlign: 'middle' }}>
                        <img src={Arrow} />
                    </div>
                </div>}
            {isShowPrevious &&
                <div style={{ background: '#797979', cursor: 'pointer', height: '6vh', width: '3vw', display: 'table', position: 'absolute', top: '8vh', left: '-2vw', borderRadius: '50%' }} onClick={showPreviousCard}>
                    <div style={{ display: 'table-cell',textAlign:'center', verticalAlign: 'middle' }}>
                        <img src={ArrowPrev} />
                    </div>
                </div>
            }
        </div>
        {/* <div style={{ height: '6.8vh', cursor: 'pointer' }} >
            {hierarchy.length === 0 && <div style={{ lineHeight: '6.8vh', color: '#32abf4' }} onClick={()=>{postActivity(productId, 'applied')} }>
            <a hreff={hyperLink}  target="_blank" style={{textDecoration:'none',  color: '#32abf4' }}>Apply online </a></div>}
            {hierarchy.length !== 0 && <div style={{ lineHeight: '6.8vh', color: '#32abf4' }} onClick={() => { openHierarchy(productId, productName, hierarchy); postActivity(productId, 'viewed') }}>View Products</div>}
        </div> */}
    </div>
    )
}

const PeopleCard = ({ postActivity, productName, productId, hyperLink }) => (
    <div style={{ height: '20vh', width: '15vw', margin: '3vh 2vw', border: '1px solid #e9eff4', borderRadius: '10px', display: 'inline-block' }}>
        <div style={{ height: '13vh', background: '#fff', width: '15vw', display: 'table' }}>
            <div style={{ margin: 0, width: '15vw', color: '#000', verticalAlign: 'middle', display: 'table-cell', height: '13vh' }}
                className="nowwrap">
                <img src={User} />
            </div>
        </div>
        <div style={{ height: '6.8vh', borderTop: '1px solid #e9eff4', cursor: 'pointer' }} onClick={() => { postActivity(productId, 'applied') }}>
            <div style={{ lineHeight: '6.8vh', color: '#32abf4' }}>
                <a hreff={hyperLink} target="_blank" style={{ textDecoration: 'none', color: '#32abf4' }}>{productName} </a></div>
        </div>
    </div>
)

export { ProductCard, PeopleCard };
