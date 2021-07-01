import React,{useEffect} from "react" 
import {useHistory} from 'react-router-dom';

const Logout = () =>{
	const history = useHistory();
	 useEffect(()=>{ 
		localStorage.clear(); 
		history.push('/login'); 
	}) 

	 return ( 
		<div className="container">
			<h6 className="display-1">Logout Success</h6>  
		</div>
	);
};
export default Logout;