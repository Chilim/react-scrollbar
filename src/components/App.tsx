import React from 'react';
import Scrollbar from './Scrollbar';
import './App.css';
import { genData } from '../utils/data';

const data = genData();

function App() {
	return (
		<div className='App'>
			<Scrollbar rowLength={30} viewHeight={500} viewWidth={700}>
				{data.map((el, idx) => (
					<div key={idx}>{el}</div>
				))}
			</Scrollbar>
		</div>
	);
}

export default App;
