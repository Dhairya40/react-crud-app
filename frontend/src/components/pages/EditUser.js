import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useHistory,useParams,Link} from 'react-router-dom'
import HeaderNavbar from '../layouts/HeaderNavbar';

const EditUser = () =>{
	let history = useHistory();
	let {id} = useParams(); 
	const[user,setUser] = useState({
		name:'',
		email:'',
		password:'',
		about:''
	});
	const onInputChange = (e) =>{
		setUser({...user,[e.target.name]:e.target.value});
	}
	const {name,email,password,about} = user;

	const onFormSubmit = async e =>{
		e.preventDefault();
		await axios.put(`${process.env.REACT_APP_API_URL}user/update`,user);
		history.push('/');
	} 
	useEffect(() => {
		getUser();
	},[])
	const getUser = async ()=>{ 
		const res = await axios.get(`${process.env.REACT_APP_API_URL}user/data/${id}`); 
		console.log(res.data.data);
		setUser(res.data.data);
	}
	return (
		<div className="container">
			<HeaderNavbar />
			<h5 className=" text-center mt-10">Add New User</h5>
			<form onSubmit={e=>onFormSubmit(e)}>
				<div className="mb-3">
				  <label htmlFor="name" className="form-label">Name</label>
				  <input type="text" onChange={e =>onInputChange(e)} className="form-control" id="name" name="name" placeholder="name" value={name}/>
				</div>
				<div className="mb-3">
				  <label htmlFor="email" className="form-label">Email address</label>
				  <input type="email" onChange={e =>onInputChange(e)} className="form-control" id="email" name="email" value={email} placeholder="name@example.com" />
				</div>
				<div className="mb-3">
				  <label htmlFor="email" className="form-label">Email address</label>
				  <input type="password" onChange={e =>onInputChange(e)} className="form-control" id="email" name="password" value={password} placeholder="password..." />
				 
				</div>
				<div className="mb-3">
				  <label htmlFor="message" className="form-label">Message</label>
				  <textarea className="form-control" onChange={e =>onInputChange(e)} id="about" name="about" rows="3" value={about}> {about}</textarea>
				</div>
				<div className="col-auto">
			    	<button type="submit" className="btn btn-primary mb-3">Update</button>
			    	<Link to="/" className="btn btn-danger mb-3">Back</Link>
			  	</div>
			</form>
		</div>
		)
}
export default EditUser;