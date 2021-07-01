import React from "react"
import { Nav,Dropdown} from "react-bootstrap"
import { Link,NavLink,useHistory} from "react-router-dom"

const HeaderNavbar = ()=>{
const history = useHistory();
	function logout() {
		localStorage.clear(); 
		history.push('/login'); 
	}
	const user = JSON.parse(localStorage.getItem('user-d'));
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
		  <div className="container">
		    <a className="navbar-brand" to="#">First React APP</a>
		    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		      <span className="navbar-toggler-icon"></span>
		    </button>
		    <div className="collapse navbar-collapse" id="navbarSupportedContent">
		      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
		      {
		      	localStorage.getItem('user-token')  ? 
		      	<>
		      	 <li className="nav-item">
		          <NavLink className="nav-link" aria-current="page" exact to="/">Home</NavLink>
		        </li>
		        <li className="nav-item">
		          <NavLink className="nav-link" exact to="/about">About</NavLink>
		        </li> 
		        <li className="nav-item">
		          <NavLink className="nav-link" exact to="/contact" tabIndex="-1" >Contact</NavLink>
		        </li>
		        <Dropdown>
				  <Dropdown.Toggle   id="dropdown-basic">
				    {user && user.name }
				  </Dropdown.Toggle>

				  <Dropdown.Menu>
				    <Dropdown.Item onClick={ logout }>Logout</Dropdown.Item> 
				  </Dropdown.Menu>
				</Dropdown>
		      	</>
		      	:
		      	<>
		      	<li className="nav-item">
		          <NavLink className="nav-link" exact to="/login" tabIndex="-1" >Login</NavLink>
		        </li>
		      	</>
		      } 
		      </ul> 
		        
		    </div> 
		  </div> 
		</nav>
		)
}

export default HeaderNavbar;