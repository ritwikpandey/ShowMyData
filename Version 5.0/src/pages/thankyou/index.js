import React, { Component } from 'react';
import HeaderFirst from '../../components/headerFirst';
import Footer from '../../components/Footer';

class Thankyou extends React.Component {
    render() {
        return (
            <div>
                <HeaderFirst onClick={() => this.props.history.push("recommendations")} />
                <div role="main" class="ui-content osmp-content" style={{ margin: '1vh 10vw' }}>
                    <div class="primary-content">
                    <br />
                    <br />
                        <div class="osmp-title">
                            <div class=" left  allow-link">
                                <h1>Thank you for your application </h1>
                            </div>
                            <div class="right sub-title">
                                <a href="#" class="print-link ui-utility-link ui-link">Print</a>
                            </div>
                        </div>
                        <div class="clearfix">
                            <div class="section display-table">
                                <p>We need to verify a few pieces of information before we can give you a credit decision.</p>
                                <p>Reference Number: <strong>2018XXXXXXXX</strong></p>
                                <p>Status: <strong>Pending</strong></p>
                                <br />
                            </div>
                            <div class="section">
                            </div>
                        </div>
                        <h2 class="section-hdr">What happens next</h2>
                        <ul> <div class="small-screen">
                            <ul>
                                <li>We'll send you a confirmation email in the next few minutes.</li>
                                <li>If approved, your new credit card will be mailed in 5-7 business days. If we are unable to grant you credit, we will let you know why in writing.</li>
                                <li>Once you get your card, follow the instructions to activate your account and start using services like balance transfers, Overdraft Protection, and Online Banking.</li>
                                <li>If you requested a balance transfer, it may take up to two weeks to credit your other account(s). You should make payments to your creditor(s) until the transfer is complete to avoid late fees and interest charges. Contact your creditor(s) to confirm they received the balance transfer.</li>
                            </ul>
                        </div><div class="not-small-screen">
                                <ul>
                                    <li>We'll send you a confirmation email in the next few minutes.</li>
                                    <li>If approved, your new credit card will be mailed in 5-7 business days. If we are unable to grant you credit, we will let you know why in writing.</li>
                                    <li>Once you get your card, follow the instructions to activate your account and start using services like balance transfers, Overdraft Protection, and Online Banking.</li>
                                    <li>If you requested a balance transfer, it may take up to two weeks to credit your other account(s). You should make payments to your creditor(s) until the transfer is complete to avoid late fees and interest charges. Contact your creditor(s) to confirm they received the balance transfer.</li>
                                </ul>
                            </div> </ul>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />

                <Footer />
            </div>
        )
    }
}

export default Thankyou;