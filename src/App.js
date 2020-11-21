import React from 'react'
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../src/Img/lap1.jpg';

class App extends React.Component {
constructor(props) {
super(props);
this.state = {
showcontent:true,
txtval:'',
txtval1:'',
txtval2:'',
defaultamt:500,
pound:'£'
}
this.ontxt=this.ontxt.bind(this);
this.ontxt1=this.ontxt1.bind(this);
this.ontxt2=this.ontxt2.bind(this);
this.rangeselect=this.rangeselect.bind(this);
this.setBubble=this.setBubble.bind(this);
}

ontxt=(evt)=> {

const regex=/^[0-9]+$/;
const val=evt.target.value;
if(val)
{
if(parseInt(val) > 250000)
{
  alert("Maximum value reached");
  return false;
}
if(!String(val).match(regex))
{
  alert("Only numeric value allowed");
  return false;
}
}
this.setState({txtval:val,defaultamt:val})
}
ontxt1=(evt)=> {
const val=evt.target.value;
this.setState({txtval1:val})
}
ontxt2=(evt)=> {
const val=evt.target.value;
this.setState({txtval2:val})
}
rangeselect=()=> {
const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach(wrap => {
const range = wrap.querySelector(".range");
const bubble = wrap.querySelector(".bubble");
range.addEventListener("input", () => {
this.setBubble(range, bubble);
});
this.setBubble(range, bubble);
});
}
setBubble=(range, bubble) => {
const val = range.value;
const min = range.min ? range.min : 0;
const max = range.max ? range.max : 100;
const newVal = Number(((val - min) * 100) / (max - min));
bubble.innerHTML = val;
bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
this.setState({defaultamt:val,txtval:val,pound:"£"})
}

calculateevt=(evt) => {
 const val=evt.target.value;
 const totalamount=this.state.txtval;
 const pervalue= 1.16 / 100 * totalamount;
 this.setState({txtval1:pervalue.toFixed(2)});
 const pervalue0= 10 /100 * pervalue;
 this.setState({txtval2:pervalue0.toFixed(2)});

}


render() {
return(
<div className="container">
	<div className="row">
		<div className="col-md-12">
			<img src={img} alt="Snow"  className="img-al" />
			<div className="centered">
				<h1>Lending made easy</h1>
				<p className="p-font">Earn up to -1.16%* a year a wide range of P2P sites with InvestUP</p>
				<div className="btn">
					<button className="btn-st">GET STARTED</button>
				</div>
			</div>
		</div>
		<div className="col-md-12 col-pos" style={{display:this.state.showcontent == true ? 'block':'none'}}>
			<div className="cont-md">
				<p className="p-size">
         With  
					<label>{this.state.pound}</label>
					<input type="textbox" className="txt-bx" value={this.state.txtval} onBlur={this.calculateevt} onChange={this.ontxt}/>  your estimated earnings could be 
					<label>{this.state.pound}-</label>
					<input type="textbox" className="txt-bx2" value={this.state.txtval1}  onChange={this.ontxt1} disabled/> * per
      
				</p>
				<br />
				<p className="p-size">year with fees of just 
					<label>{this.state.pound}</label>
					<input type="textbox" className="txt-bx3" value={this.state.txtval2} onChange={this.ontxt2} disabled/> per year
				</p>
				<p className="ptag">Estimated earnings are based on -1.16% per annum before tax and any potential losses. As with most forms of investment, peer-to-peer lending carries a </p>
				<p className="ptag txt1">degree of risk to your capital, in this case, if borrowers were unable to repay their loans.</p>
				<div className="range-wrap" style={{width: "55%"}}>
					<input type="range" className="range" onChange={this.rangeselect} min={500} max={250000} step={100} onBlur={this.calculateevt}/>
					<output className="bubble" id="rangeval" style={{left: "calc(0% + 8px)"}}>{this.state.pound}{this.state.defaultamt}</output>
				</div>
			</div>
		</div>
	</div>
</div>
)
}
}

export default App;