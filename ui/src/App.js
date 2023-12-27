import './App.css';
import Clock from './components/time';

import Printer from './components/printer';
import TodoList from './components/todo';

function App() {
  return (
    <div className="App">
      <div className="time">
        <Clock />
      </div>

      <div className='main-container'>
        <div className='top-printers'>
          <div className='printer1'>
            <Printer printerName={'Ender3 V2 Neo'} />
          </div>
          <div className='printer2'>
            <Printer printerName={'Ender3 V3 SE'} />
          </div>
          <div className='printer3'>
            <Printer printerName={'Ender 5'} />
          </div>
        </div>

        <div className='divider'></div>

        <div className='printjob-list'>
          <TodoList />
        </div>
      </div>

      <div className='footer'>
        <p>Made by Ethan Barr</p>
      </div>
    </div>
  );
}

export default App;
