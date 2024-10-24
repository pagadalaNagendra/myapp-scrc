import { Component } from "react";
import "./index.css"

class Page1 extends Component{

    state = {
        number : 25
    }

    decrementNumber = ()=>{
        this.setState(prevState=>({
            number : prevState.number-1
        }))
    }
    
    incrementNumber = ()=>{
        this.setState(prevState=>({
            number : prevState.number+1
        }))
    }
    
    squareNumber = ()=>{
        this.setState(prevState=>({
            number : prevState.number**2
        }))
    }
    
    render(){
        
        const {number} = this.state
        
        return(
            <div className="home-container">
                <h1 className="number">{number}</h1>
                <div className="buttons-container">
                    <button className="home-button" onClick={this.decrementNumber}>
                        Decrement 
                    </button>
                    <button className="home-button" onClick={this.incrementNumber}>
                        Increment 
                    </button>
                    <button className="home-button" onClick={this.squareNumber}>
                        Square 
                    </button>
                </div>
            </div>


        )
    }
}


export default Page1