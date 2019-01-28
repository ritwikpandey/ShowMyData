import React from 'react';
import {ProductCard} from '../card/component';

const ProductRecommentation = ({ data , postActivity}) => (
    <div style={{  width: '80vw', padding: '0 10vw' }}>
        <br />
        <div style={{ margin: 0, textAlign: 'left', height: '4vh', fontSize: '16px', padding: '4px 2vw', fontWeight: '400', fontFamily: 'Open Sans', background: '#f4f4f4', }}>
            <p style={{ float: 'left', height: '4vh', margin: 0 }}>Recommended products for you </p>
        </div>
        <div style={{
            width: '78vw', padding: '0 1vw', height: '30vh', overflow: 'auto'
            , whiteSpace: 'nowrap'
        }}>
            {data.map((product, index) => (
               <ProductCard key={index} postActivity={postActivity}  productName={product.productName} productId={product.productId} hyperLink={product.hyperLink} hierarchy={[]}/>
            ))}
        </div>
    </div>
)

export default ProductRecommentation;