import React,{useState, useEffect} from "react"
import axios from 'axios';
import {Link,NavLink,useHistory} from 'react-router-dom';
import HeaderNavbar from '../layouts/HeaderNavbar';
const Login = () =>{
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

	// useEffect(()=>{
	// 	setErrors();
	// },[]); 
	 
	// const loadUser = async ()=>{
	// 	const result = await axios
	// 		.get("http://localhost/test/index.php")
	// 		.then(function (response) {
	//             setUser(response.data);
	//         })
	//         .catch(function (error) {
	//             console.log(error);
	//         }); 
	// };
	// const deleteUser = async id =>{
	// 	const result = await axios
	// 		.delete(`http://localhost/test/index.php?delete_id=${id}`)
	// 		.then(function (response) {
	//             setUser(response.data);
	//         })
	//         .catch(function (error) {
	//             console.log(error);
	//         }); 
	//         loadUser();
	// };

	
	

	const onFormSubmit = async e =>{
		e.preventDefault();
		setErrors(null);
		await axios.post(`${process.env.REACT_APP_API_URL}user/login`,user)
		.then(function (result) {
			// result = JSON.stringify(result);
			// console.log(result.data.data.user); 
	        localStorage.setItem('user-d',JSON.stringify(result.data.data.user));
	        localStorage.setItem('user-token',result.data.data.token);
	        history.push('/');
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
		<HeaderNavbar />
			<h6 className="display-1">Login</h6><br /> <small>Please enter your details </small><br/>
			 <form onSubmit={e=>onFormSubmit(e)}>
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
			 
			  <button type="submit" className="btn btn-primary">Submit</button>
			</form>

			<span style={{ display: 'inline-flex' }}>New user?
			 <NavLink className="nav-link" exact to="/register">Create A Free Account</NavLink> 
		     </span>
		</div>
	);
};
export default Login;