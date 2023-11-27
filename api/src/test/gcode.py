from serial import Serial

import time

def send_gcode(command, delay=2):
    ser.write((command + "\n").encode('utf-8'))
    time.sleep(delay)

def get_temperatures():
    ser.reset_input_buffer()
    send_gcode("M105")  # Send M105 command to get temperatures
    response = ser.readline().decode('utf-8').strip()
    
    # Example response: "ok T:21.5 /0.0 B:60.0 /60.0 T0:21.5 /0.0 @:0 B@:0"
    temp_start = response.find("T:") + 2
    temp_end = response.find(" ", temp_start)
    bed_temp = float(response[temp_start:temp_end])

    temp_start = response.find("B:") + 2
    temp_end = response.find(" ", temp_start)
    hotend_temp = float(response[temp_start:temp_end])

    return hotend_temp, bed_temp

def main():
    port = "COM4"  # Change this to the correct port for your setup
    baudrate = 115200
    global ser
    ser = Serial(port, baudrate, timeout=1)

    try:
        while True:
            hotend_temp, bed_temp = get_temperatures()
            
            print("Hotend Temperature: {:.2f} °C".format(hotend_temp))
            print("Bed Temperature: {:.2f} °C".format(bed_temp))
            
            # You can add more functionality here based on your needs
            
            time.sleep(5)  # Adjust the delay based on your needs

    except KeyboardInterrupt:
        print("Exiting the script.")
        ser.close()

if __name__ == "__main__":
    main()
