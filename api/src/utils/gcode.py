from serial import Serial
import time

class gcode_commands:
    def __init__(self, port, baudrate=115200):
        global ser
        self.port = port
        self.baudrate = baudrate
        self.ser = Serial(self.port, self.baudrate, timeout=1)

    # Setup - setting parms to send the request to the printer
    def send_gcode(self, command, delay=2):
        self.ser.write((command + "\n").encode('utf-8'))
        time.sleep(delay)


    # Temperature
    def get_temperatures(self):
        self.ser.reset_input_buffer()
        self.send_gcode("M105")  # Send M105 command to get temperatures
        response = self.ser.readline().decode('utf-8').strip()

        # Example response: "ok T:21.5 /0.0 B:60.0 /60.0 T0:21.5 /0.0 @:0 B@:0"
        temp_start = response.find("T:") + 2
        temp_end = response.find(" ", temp_start)
        bed_temp = float(response[temp_start:temp_end])

        temp_start = response.find("B:") + 2
        temp_end = response.find(" ", temp_start)
        hotend_temp = float(response[temp_start:temp_end])

        return hotend_temp, bed_temp


    def set_temperatures(self, target_hotend_temp, target_bed_temp):
        # Send Gcode to set temperatures
        gcode_command = f"M104 S{target_hotend_temp}"
        gcode_command += f"M140 S{target_bed_temp}"
        
        self.send_gcode(gcode_command)


    # Printer control
    def pause_print(self):
        gcode_command = "M25"
        self.send_gcode(gcode_command)
    
    def resume_print(self):
        gcode_command = "M24"
        self.send_gcode(gcode_command)
    
    def stop_print(self):
        gcode_command = "M0"
        self.send_gcode(gcode_command)


    # Fan control
    def set_fan_speed(self, fan_speed=255):
        gcode_command = f'M106 S{fan_speed}'
        self.send_gcode(gcode_command)
    
    def set_fan_off(self):
        gcode_command = 'M107'
        self.send_gcode(gcode_command)