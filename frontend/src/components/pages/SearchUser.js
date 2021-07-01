import React,{useState, useEffect} from "react"
import axios from 'axios';
import {Link,NavLink,useHistory} from 'react-router-dom';

const SearchUser = () =>{
	const history = useHistory();
	useEffect(()=>{
		if (localStorage.getItem('user-token')) {
			history.push('/about');
		}
	})
	let state = {};
	const [user, setUser] = useState({ 
		email:'',
		password:''
	}); 
	
	const [errors, setErrors] = useState(null);
	const [passerrors, setPassErrors] = useState(null);

	const errorDivPass = passerrors ? <div className="error"> {passerrors} </div> : '';

	const errorDiv = errors 
        ? <div className="error"> 
            {errors}
          </div> 
        : '';
	const onInputChange = (e) =>{
		setUser({...user,[e.target.name]:e.target.value});
	}
	const {email,password} = user; 

	const onFormSubmit = async e =>{
		e.preventDefault();
		setErrors(null);
		await axios.post(`${process.env.REACT_APP_API_URL}user/login`,user)
		.then(function (result) {
			// result = JSON.stringify(result);
			console.log(result.data.data.token); 
	        localStorage.setItem('user-token',result.data.data.token);
	        history.push('/about');
        })
        .catch(function (error) {
            if(error.response){ 
            	if(error.response.data.errors) {
		        	setPassErrors(error.response.data.errors.password); 
			        setErrors(error.response.data.errors.email); 
			    }else{
			    	setPassErrors(error.response.data.message); 
			    }
		    } else if (error.request) { 
	            console.log(error.request);
	        } else {
	             
	            console.log('Error', error.message);
	        }
        });
		
	};
 
	return ( 
		<div className="container">
			 
			 <form onSubmit={e=>onFormSubmit(e)}>
			  <div className="mb-3">
			    <label htmlFor="exampleInputEmail1" className="form-label">Search User</label>
			    <input type="email" name="email" onChange={e =>onInputChange(e)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
			    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
			  {errorDiv}
			  </div> 
			 
			  <button type="submit" className="btn btn-primary">Submit</button>
			</form> 
		</div>
	);
};
export default SearchUser;