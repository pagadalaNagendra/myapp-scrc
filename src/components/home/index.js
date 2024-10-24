import { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css"

class Home extends Component{
    render(){
        return(
            <div className="home-container">
                <h1>Hello World</h1>
                <ul className='list-container'>
                    
                        <li>
                            <Link to="/" className="link"><button className="home-button">Home</button></Link>
                        </li>
                    
                    
                        <li>
                            <Link to="/page1" className="link"><button className="home-button">Page 1</button></Link>
                        </li>
                    
                    
                        <li>
                            <Link to="/page2" className="link"><button className="home-button">Page 2</button></Link>
                        </li>
                
                </ul>
            </div>
        )
    }
}


export default Home