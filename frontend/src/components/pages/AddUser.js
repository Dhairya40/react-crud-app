import React,{useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import HeaderNavbar from '../layouts/HeaderNavbar';

const AddUser = () =>{
	let history = useHistory();
	const[user,setUser] = useState({
		name:'',
		email:'',
		password:'',
		message:'' 
	});
	const[image,setImage] = useState("");

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
	const {name,email,message,password} = user;

	const onFormSubmit = async e =>{
		e.preventDefault();
		const formData = new FormData() ;
		formData.append('name', name)
		formData.append('email', email)
		formData.append('password', password)
		formData.append('message', message)
		formData.append('image', image) 
		await axios.post(`${process.env.REACT_APP_API_URL}user/add`,formData,{
		  headers: {
		    Authorization: 'Bearer ' + localStorage.getItem('user-token')
		  }
		}).then(function (result) {
			console.log(result.data.data);
			localStorage.setItem('new-user-d',JSON.stringify(result.data.data));
			alert('User added success!');
	        history.push('/');
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
	            console.log(error.request);
	        } else { 
	            console.log('Error', error.message);
	        }
        }); 
	}
	return (
		<div className="container">
			<HeaderNavbar />
			<h5 className=" text-center mt-10">Add New User</h5>
			<form onSubmit={e=>onFormSubmit(e)} enctype="multipart/form-data">
				<div className="mb-3">
				  <label htmlFor="name" className="form-label">Name</label>
				  <input required type="text" onChange={e =>onInputChange(e)} className="form-control" id="name" name="name" placeholder="name" value={name}/>
				{errorDivName}
				</div>
				<div className="mb-3">
				  <label htmlFor="email" className="form-label">Email address</label>
				  <input required type="email" onChange={e =>onInputChange(e)} className="form-control" id="email" name="email" value={email} placeholder="name@example.com" />
					{errorDiv}
				</div>
				<div className="mb-3">
				  <label htmlFor="email" className="form-label">Email address</label>
				  <input required type="password" onChange={e =>onInputChange(e)} className="form-control" id="email" name="password" value={password} placeholder="password..." />
					{errorDivPass}
				</div>
				<div className="mb-3">
				  <label htmlFor="message" className="form-label">Message</label>
				  <textarea required className="form-control" onChange={e =>onInputChange(e)} id="message" name="message" rows="3" value ={message}> </textarea>
				</div>
				<div className="mb-3">
				  <label htmlFor="message" className="form-label">Select profile image</label>
				 <input type="file" title="select photo" onChange={e =>setImage(e.target.files[0])} className="form-control"/>
				</div>
				<div className="col-auto">
			    	<button type="submit" className="btn btn-primary mb-3">Save</button>
			  	</div>
			</form>
		</div>
		)
}
export default AddUser;