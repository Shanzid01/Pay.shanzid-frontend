import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import '../styles/checkout.css';
import Loader from "../components/Loader";

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    }
  }
};

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false, 
      error:"", 
      processing:false
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    if(!this.validate()) return;
    this.setState({error:""});
    this.props.stripe.createToken({name: document.getElementById("sender_name").value}).then(({token, error}) => {
      if (error) {
        this.setState({error:error.message});
      } else {
        this.setState({processing:true});
        fetch("https://pay-shanzid.herokuapp.com/charge", {
          method: "POST",
          headers: {"Content-Type": "text/plain"},
          body: JSON.stringify({
            token:token.id,
            payee:document.getElementById("sender_name").value,
            amount:document.getElementById("sender_amount").value,
            message:document.getElementById("sender_message").value
          })
        }).then(async (response)=>{
          if (response.ok){
            this.setState({error:"", processing:false});
            let data=(await response.json()).status;
            let senderData={
              trnID:data.id,
              date:new Date(Number(data.metadata.Date)).toGMTString(),
              name:data.billing_details.name,
              amount:(data.amount/100)+" "+data.currency,
              message:data.description
            }
            this.props.paymentSuccess(senderData);
          }
          else {
            let error=await response.json();
            this.setState({error, processing:false});
          }
        })
      }
    });;
  }
  validate(){
    let name=document.getElementById("sender_name").value;
    let amount=document.getElementById("sender_amount").value;
    let isValid=true;
    let error_txt="";
    if(name.length<=0){
      document.getElementById("sender_name").classList.add("error");
      error_txt+="* Please fill in your name\n";
      isValid=false;
    }else{
      document.getElementById("sender_name").classList.remove("error");
    }
    if(Number(amount)<=0){
      document.getElementById("sender_amount").classList.add("error");
      error_txt+="* Please enter an amount greater than $0.50";
      isValid=false;
    }else{
      document.getElementById("sender_amount").classList.remove("error");
    }
    if(!this.props.serverReady){
      error_txt="* Server busy..please try again in a few minutes";
      isValid=false;
    }
    if(!isValid){
      this.setState({error:error_txt});
    }
    return isValid;
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className="checkout form-container col s12">
        <div className="input-field col s6">
          <input id="sender_name" required  placeholder="Full name"></input>
        </div>
        <div className="input-field col s6">
          <input id="sender_amount" type="number" required placeholder="Amount (in CAD)" />
        </div>
        <div className="input-field col s12">
          <textarea id="sender_message" className="materialize-textarea" placeholder="Message (optional)"></textarea>
        </div>
        <CardElement {...createOptions()} />
        <button className={"waves-effect waves-light btn blue "+(this.state.processing? "disabled":"")} onClick={this.submit}>
          {this.state.processing? <Loader />:"Donate"}
        </button>
        <div className={this.state.error!=""? "error-text":""}>{this.state.error}</div>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);