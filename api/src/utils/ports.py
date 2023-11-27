import serial.tools.list_ports

def find_available_ports():
    available_ports = list(serial.tools.list_ports.comports())
    
    if not available_ports:
        print("No serial ports found.")
    else:
        print("Available serial ports:")
        for port, desc, hwid in available_ports:
            print(f"  {port}: {desc} [{hwid}]")

if __name__ == "__main__":
    find_available_ports()
