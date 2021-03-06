import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './components/Checkout';
import "./styles/home.css";
import Background from './components/Background';
import Footer from "./components/Footer";
import Success from "./components/Success";

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      showSuccess:false,
      serverReady:false,
      sender:{
        trnID:"",
        date:"",
        name:"",
        amount:"",
        message:""

      }
    }
  }
  componentDidMount(){
    fetch("https://pay-shanzid.herokuapp.com/boot", {
      method: "GET",
      mode:'no-cors',
      headers: {"Content-Type": "text/plain"},
    }).then((res)=>{
      this.setState({serverReady:true});
    });
  }

  render() {
    let successPage;
    if(this.state.showSuccess){
      successPage=<Success sender={this.state.sender} confettiTrigger={this.state.showSuccess} closeSuccess={()=>window.location.reload()}/>;
    }
    return (
      <div>
        <Background />
        <StripeProvider apiKey="pk_live_r5RamlCiOLOsTONOYLayALoA00zz3eWyvm">
          <div className="container">
            <div className="title">
              <span className="pay-span">pay.</span>
              <span className="shanzid-span">Shanzid</span>
            </div>
            <Elements>
              <CheckoutForm serverReady={this.state.serverReady} paymentSuccess={(payeeData)=>this.setState({sender:payeeData, showSuccess:true})} />
            </Elements>
          </div>
        </StripeProvider>
        {successPage}
        <Footer />
      </div>
    );
  }
}

export default App;