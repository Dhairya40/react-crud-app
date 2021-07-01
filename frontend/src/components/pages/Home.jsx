import React,{useState, useEffect} from "react"
import axios from 'axios';
import {Link,NavLink} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import HeaderNavbar from '../layouts/HeaderNavbar';
import Loading from '../layouts/Loading';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Home = () =>{
	const [users, setUser] = useState([]);
	const [totalCount, setTotalCount] = useState(4);
	const [pageNumber, setPageNumber] = useState(1);
	const [perPage, setPerPage] = useState(10); 
	const pageVisited = pageNumber * perPage; 
	const [loading, setLoading] = useState(true)
	useEffect(()=>{
		loadUser();
	},[]);

	const loadUser = async id=>{
		const result = await axios
			.get(`${process.env.REACT_APP_API_URL}user/data?page=${id}`)
			.then(function (response) {
				// console.log(response.data.data);
	            setUser(response.data.data.data);
	            setTotalCount(response.data.data.last_page);
	            setPerPage(response.data.data.per_page);
	            // setTimeout(()=>{
	            	setLoading(false); 
	            // },3000)
	        }) 
	        .catch(function (error) {
	            console.log(error);
	        }); 
	};
	const deleteUser = async id =>{
		const result = await axios
			.delete(`${process.env.REACT_APP_API_URL}user/delete/${id}`)
			.then(function (response) {
	           loadUser();
	        })
	        .catch(function (error) {
	            console.log(error);
	        }); 
	        // loadUser();
	};

	 

	const handlePageClick = (users) => {
	    let selected = users.selected + 1;
	    // setPageNumber(users.selected + 1);
	    // alert(selected);
	    let offset = Math.ceil(selected * perPage);
 		// alert(selected); 
 		loadUser(selected); 
	  };

	const displayUsers = users.map((user, index) => (
		<tr key={index}>
	      <th scope="row">{index+1}</th>
	      <td> <img src= { user.image_path } /></td>
	      <td>{user.name}</td>
	      <td>{user.email}</td> 
	      <td>{user.about}</td> 
	      <td> 
	      <Link to={`/users/edit/${user.id}`} className="btn btn-warning">Edit</Link> | 
	      <button onClick={() => {if(window.confirm('Are you sure to delete this record?')) {deleteUser(user.id)}}} className="btn btn-danger">Delete</button>
	      </td>
	    </tr>
	));
	return (

			loading ? (
				<Loading />  
				  ): ( 
			<>
				<div className="container">
				<HeaderNavbar />
					<h5 className='display-1 text-center py-10 mt-10'>Home</h5>
					<Link className="btn btn-primary" to="/users/add">Add User</Link>
					<table className="table table-striped" id="user__table">
					    <thead>
					    <tr>
					      <th scope="col">#</th>
					      <th scope="col">Image</th>
					      <th scope="col">Name</th>
					      <th scope="col">Email</th>
					      <th scope="col">About</th>
					      <th scope="col">Action</th>
					    </tr>
					  </thead>
					  <tbody> 
					    {
					    	displayUsers
					    }
					    <ReactPaginate 
						    previousLabel={'Previous'}
		          			nextLabel={'Next'}
		          			breakLabel={'...'}
		          			breakClassName={'break-me'}
		          			pageCount={totalCount}
		          			marginPagesDisplayed={1}
	          				pageRangeDisplayed={2}
	          				onPageChange={handlePageClick} 
	          				containerClassName={'pagination'}
	          				activeClassName={'active'}
					    />
					  </tbody>
					</table>

					<ReactHTMLTableToExcel
	                    id="user__table"
	                    className="btn btn-info"
	                    table="user__table"
	                    filename="tablexls"
	                    sheet="tablexls"
	                    buttonText="Export as excel"
	                /> 
				</div>
			</>
			)
			
		);
};
export default Home;