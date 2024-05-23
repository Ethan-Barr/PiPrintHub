import './App.css';
import Clock from './components/time';
import Printer from './components/printer';
import Todo from './components/todo';
import printersConfig from './printerConfig';

function App() {
  return (
    <div className="App">
      <div className="time">
        <Clock />
      </div>

      <div className='main-container'>
        <div className='top-printers'>
          {printersConfig.map((printer, index) => (
            <div key={index} className={`printer${index + 1}`}>
              <Printer printerName={printer.name} printerPort={printer.port} printerBaudrate={printer.baudRate} />
            </div>
          ))}
        </div>

        <div className='divider'></div>

        <div className='printjob-list'>
          <Todo />
        </div>
      </div>

      <div className='footer'>
      <p>Made by <a href="https://github.com/Ethan-Barr" className='github-link'>Ethan Barr</a></p>
      <p>Version: 1.0.0</p>
      </div>
    </div>
  );
}

export default App;
