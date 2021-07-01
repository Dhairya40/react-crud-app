import React,{useState, useEffect} from "react"
 import {Link,NavLink,useHistory} from 'react-router-dom'; 

const Protected = (props) =>{ 
 
	 let Comp = props.Comp;
	 const history = useHistory();
	 useEffect(()=>{
		if (!localStorage.getItem('user-token')) {
			history.push('/login');
		}
	})
	 return (
	 		<div>
	 		<Comp />
	 		 </div>
	 	)
};
export default Protected;