# 3D PiPrintHub

This project allows you to control your 3D printer using a ReactJS-based user interface even when your device is offline. The UI sends GCODE commands to your printer via USB, facilitated by a custom-made FastAPI backend. Additionally, the UI features a convenient integrated todo list for managing your tasks while working on 3D printing projects.

## Features

- **Remote 3D Printer Control**: Manage your 3D printer using a responsive and intuitive ReactJS UI.
- **Offline Capability**: Control your printer even when your device is offline by sending GCODE commands via USB.
- **FastAPI Backend**: A custom-made FastAPI backend facilitates communication between the UI and the 3D printer.
- **Integrated Todo List**: Keep track of your tasks directly within the same UI for a seamless workflow.
- **Availability to add/remove printers**: Able to add/remove printers on your dashboard to suit your needs. 

## Getting Started

### Prerequisites

- Node.js: Ensure you have Node.js installed on your machine. You can download it [here](https://nodejs.org/).
- Python 3.11: Ensure you have Python installed on your machine. You can download it [here](https://python.org/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Ethan-Barr/PiPrintHub.git
    ```

2. Navigate to the project directory:

    ```bash
    cd piprinthub
    ```

### Usage

- `setup.bat`/`setup.sh`: Automatically installs all dependencies needed for the workspace
- `run.bat`/`run.sh`: Automatically start the API and ReactJS UI

#### Windows

1. Run the setup batch file:

    ```bash
    setup.bat
    ```

2. Run the application batch file:

    ```bash
    run.bat
    ```

3. Access the UI in your browser at [http://localhost:3000](http://localhost:3000).

4. Connect your 3D printer to your device via USB.

5. Use the UI to send GCODE commands and control your 3D printer.

#### Mac/Linux

1. Run the setup shell script:

    ```bash
    sh setup.sh
    ```

2. Start the application shell script:

    ```bash
    sh run.sh
    ```

3. Access the UI in your browser at [http://localhost:3000](http://localhost:3000).

4. Connect your 3D printer to your device via USB.

5. Use the UI to send GCODE commands and control your 3D printer.

### Adding Extra Printers

To add additional printers to your UI:

1. Locate the `printerConfig.js` file in the project directory.

2. Open the file and add the details of your additional printer(s) in the following format:

    ```javascript
    const printers = [
      {
        name: 'Printer 1',
        port: '/dev/ttyUSB0',
        baudRate: 115200,
      },
      {
        name: 'Printer 2',
        port: '/dev/ttyUSB1',
        baudRate: 250000,
      },
      // Add more printers as necessary
    ];

    export default printers;
    ```

3. Access the UI to see and control the newly added printers.

## Contributors

- [Ethan Barr](https://github.com/Ethan-Barr)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
