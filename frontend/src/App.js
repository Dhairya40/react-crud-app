import './App.css';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import NotFound from './components/pages/NotFound';
import AddUser from './components/pages/AddUser';
import EditUser from './components/pages/EditUser';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Protected from './components/pages/Protected';
import Logout from './components/pages/Logout';
import SearchUser from './components/pages/SearchUser';
import 'bootstrap/dist/css/bootstrap.css';

import {BrowserRouter as Router,Redirect , Route,Switch} from "react-router-dom"
const PrivateRoute = ({ isLoggedIn, ...props }) =>
  isLoggedIn
    ? <Route { ...props } />
    : <Redirect to="/login" />

function App() {
  return (
  	<Router>
  		<div className="app" > 
	      <Switch>
	      	<Route exact path="/">
	      	  <Protected Comp={Home}/>
	      	</Route>
	      	<Route exact path="/about"> 
	      	 <Protected Comp={About}/>
	      	 </Route>
	      	<Route exact path="/contact">
	      		<Protected Comp={Contact}/>
	      	</Route>

	      	<Route exact path="/logout">
	      		<Protected Comp={Logout}/>
	      	</Route>  
	      	<Route exact path="/users/add" component={AddUser} />
	      	<Route exact path="/users/edit/:id" component={EditUser} />
	      	<Route exact path="/login" component={Login}  />
	      	<Route exact path="/register" component={Register}  />
	      	<Route  component={NotFound} />
	      </Switch>  
	    </div > 
  	</Router> 
  );
};

export default App;
