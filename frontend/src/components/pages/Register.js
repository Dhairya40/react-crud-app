import React,{useState, useEffect} from "react"
import axios from 'axios';
import {Link,NavLink,useHistory} from 'react-router-dom';

const Register = () =>{
	
	useEffect(()=>{
		if (localStorage.getItem('user-token')) {
			history.push('/about');
		}
	})
	let state = {};
	const [user, setUser] = useState({ 
		name:'',
		email:'',
		password:''
	}); 
	const history = useHistory();
	const [errors, setErrors] = useState(null);
	const [passerrors, setPassErrors] = useState(null);
	const [nameError, setNameErrors] = useState(null);

	const errorDivPass = passerrors ? <div className="error"> {passerrors} </div> : '';
	const errorDivName = nameError ? <div className="error"> {nameError} </div> : '';

	const errorDiv = errors 
        ? <div className="error"> 
            {errors}
          </div> 
        : '';
	const onInputChange = (e) =>{
		setUser({...user,[e.target.name]:e.target.value});
	}
	const {name,email,password} = user;
 
	const onFormSubmit = async e =>{
		e.preventDefault();
		setErrors(null);
		await axios.post(`${process.env.REACT_APP_API_URL}user/register`,user)
		.then(function (result) {
			console.log(result.data.data);
			localStorage.setItem('user-d',JSON.stringify(result.data.data));
			alert('Registeration success, you can login!');
	        history.push('/login');
        })
        .catch(function (error) {
            if(error.response){ 
            	if(error.response.data.errors) {
		        	setPassErrors(error.response.data.errors.password); 
			        setErrors(error.response.data.errors.email); 
			        setNameErrors(error.response.data.errors.name); 
			    }else{
			    	setPassErrors(error.response.data.message); 
			    }
		    } else if (error.request) {
	            // The request was made but no response was received
	            // `error.request` is an instance of XMLHttpRequest in the 
	            // browser and an instance of 
	            console.log(error.request);
	        } else {
	            // Something happened in setting up the request that triggered an Error
	            console.log('Error', error.message);
	        }
        });
		
	};
 
	return ( 
		<div className="container">
			<h5 className="register">Create a free account to continue</h5><br /> <small>Please enter your details </small><br/>
			 <form onSubmit={e=>onFormSubmit(e)}>
			  <div className="mb-3">
			    <label htmlFor="Name" className="form-label">Your Name</label>
			    <input type="text" name="name" onChange={e =>onInputChange(e)} className="form-control" id="name" aria-describedby="nameHelp" />
			    <div id="nameHelp" className="form-text"> </div>
			  {errorDivName}
			  </div>
			  <div className="mb-3">
			    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
			    <input type="email" name="email" onChange={e =>onInputChange(e)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
			    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
			  {errorDiv}
			  </div>
			  
			  <div className="mb-3">
			    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
			    <input type="password" name="password" onChange={e =>onInputChange(e)} className="form-control" id="exampleInputPassword1" />
			  {errorDivPass}
			  </div>
			   
			  <div className="mb-3 form-check">
			    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
			    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
			  </div>
			 
			  <button type="submit" className="btn btn-primary">Save</button><br />
			  <p style={{ display: 'inline-flex' }}>Already have a account?  
		          <NavLink className="nav-link" exact to="/login">Login</NavLink> 
			  </p>
			</form>
		</div>
	);
};
export default Register;