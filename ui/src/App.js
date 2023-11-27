import './App.css';
import Clock from './components/time';

import Printer from './components/printer';

function App() {
  return (
    <div className="App">
      <div className="time">
        <Clock />
      </div>
      <div className='MainBody'>
        <div className='Printers'>
          <div className='printer1'>
            <Printer name='Ender 3'/>
          </div>
          <div className='printer2'>
            <Printer name='Ender 5'/>
          </div>
          <div className='printer3'>
            <Printer name='X1 Carbon'/>
          </div>
        </div>
      </div>
      <div className='footer'>
        <p>Made by Ethan Barr</p>
      </div>
    </div>
  );
}

export default App;
