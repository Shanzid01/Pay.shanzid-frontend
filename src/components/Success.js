import React, {Component} from 'react';
import "../styles/success.css";
import Confetti from 'react-dom-confetti';

class Success extends Component{
    constructor(props){
        super(props);
        this.state={
            success:false,
            confetti:false
        }
    }
    componentDidMount(){
        let item=this;
        setTimeout(()=>{
            item.setState({confetti:true})
        },500);
    }
    render(){
        return(
            <div className="cover-layout">
                <span className="payment-success">Payment successful!</span>
                <div className="payment-info">
                    <span> Transaction ID:</span> {this.props.sender.trnID}<br/>
                    <span> Date:</span> {this.props.sender.date}<br/>
                    <span> Sent by:</span> {this.props.sender.name}<br/>
                    <span> Amount:</span> {this.props.sender.amount}<br/>
                    <span> Message:</span> {this.props.sender.message}<br/>
                </div>
                <br/><br/>
                <button className="waves-effect waves-light btn green z-depth-0" onClick={()=>this.props.closeSuccess()}>Done</button>
                <Confetti active={ this.state.confetti } className="confetti" />
            </div>
        );
    }
}
export default Success;