// import {Link} from "react-router-dom"
import { Link } from 'react-router-dom';


import {Component} from "react"
import "./index.css"

class Navbar extends Component{
    render(){
        return(
            <nav className='navbar'>
                <ul className='list-container'>
                    <li>
                        <Link to="/" className="link">Home</Link>
                    </li>
                    <li>
                        <Link to="/page1" className="link">Page 1</Link>
                    </li>
                    <li>
                        <Link to="/page2" className="link">Page 2</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar