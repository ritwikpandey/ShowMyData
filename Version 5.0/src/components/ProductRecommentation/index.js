import React from 'react';
import { ProductCard } from '../card/component';

export default class ProductRecommentation extends React.Component {
    constructor(props){
        super(props)
        this.state={
            showFrom:0,
            hideFrom:2, 
            totalCardCount:0
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({showFrom:0, hideFrom:2})
    }
    showNext = ()=>{
        let {showFrom, hideFrom, totalCardCount} = this.state;
        let {length} = this.props;
        if(hideFrom <= (length-2))
        this.setState({showFrom: showFrom+1, hideFrom:hideFrom+1})
    }
    showPreviousCard = ()=>{
        let {showFrom, hideFrom, totalCardCount} = this.state;
        let {length} = this.props;
        if(showFrom !== 0)
        this.setState({showFrom: showFrom-1, hideFrom:hideFrom-1})
    }

    render() {
        let { data,length, openHierarchy, selectedProducts,  showPrevious, postActivity } = this.props;
        let {showFrom, hideFrom} = this.state;
        return (
            <div style={{ width: '80vw', padding: '0 10vw' }}>
                <br />
                {data.length !== 0 && <div style={{ margin: 0, textAlign: 'left', height: '4vh', fontSize: '16px', padding: '4px 0vw', fontWeight: '400', fontFamily: 'Open Sans' }}>
                    <p style={{ float: 'left', height: '4vh', margin: 0, color: '#545558', fontFamily: 'Open Sans', fontWeight: '600' }}>Recommended products for you</p>
                    {selectedProducts.length !== 0 &&
                        <p onClick={showPrevious} style={{ float: 'right', height: '4vh', fontWeight: '300', fontSize: '13px', textDecoration: 'underline', cursor: 'pointer', margin: 0 }}>Go back </p>}
                </div>
                }
                <div style={{
                    width: '85vw', padding: '0 2vw', overflow: 'auto'
                    , whiteSpace: 'nowrap',
                }}>
                    {data.map((product, index) => (
                        <span key={index}>
                        {(showFrom <= index && hideFrom >= index) && <ProductCard coolors ={['#984447', '#ADD9F4', '#476C9B']} index={index} showPreviousCard={this.showPreviousCard} isShowPrevious={showFrom !== 0 && showFrom === index && length >=4}  isShowNext={(hideFrom === index && index !== length-1)? true: false} showNext={this.showNext} postActivity={postActivity} description={product.description} hyperLink={product.hyperLink} productName={product.productName} isGOback={false} productId={product.productId} hierarchy={product.hierarchy} openHierarchy={openHierarchy} /> }
                        </span>
                    ))}

                </div>
            </div>
        )
    }
}

