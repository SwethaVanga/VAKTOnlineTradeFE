import React from 'react';
import RatesContextProvider from './context/RatesContext';
import UserContextProvider from './context/UserContext';
import Main from './components/Main';

import './App.css';


function App() {
  return (

	<div className="container">   
		
		<UserContextProvider>
			<RatesContextProvider>
				<Main />
			</RatesContextProvider>
		</UserContextProvider>
	</div>

  );
}

export default App;

