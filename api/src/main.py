from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Header, HTTPException

from serial import Serial
import serial.tools.list_ports

from utils.gcode import gcode_commands

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)


# Endpoints
@app.get('/')
def api():
    return "Hello World"


@app.get('/available-ports')
def get_ports():
    available_ports = list(serial.tools.list_ports.comports())
    
    if not available_ports:
        return "No serial ports found."
    else:
        ports_info = []
        for port, desc, hwid in available_ports:
            ports_info.append({"port": port, "description": desc, "hardware_id": hwid})
        return ports_info

@app.get('/printer/connected')
def check_printer_connection(port: str = Header(default=None), baudrate: int = Header(default=115200)):
    if not port:
        return {"connected": False, "error": "No port provided"}

    try:
        serial_connection = Serial(port, baudrate)
        serial_connection.close()
        return {"connected": True}
    except Exception as e:
        return {"connected": False, "error": str(e)}



# Get temp
@app.get('/temp/bed')
def bed_temp(port: str = Header(default=None), baudrate: str = Header(default=115200)):
    setup = gcode_commands(port=port, baudrate=baudrate)
    temperature = setup.get_temperatures()

    bed_temperature = temperature[0]
    return {"bed_temperature": bed_temperature}

@app.get('/temp/hotend')
def hotend_temp(port: str = Header(default=None), baudrate: str = Header(default=115200)):
    setup = gcode_commands(port=port, baudrate=baudrate)
    temperature = setup.get_temperatures()

    hotend_temperature = temperature[1]
    return {"hotend_temperature": hotend_temperature}

# Set temp
@app.post('/temp/bed/set')
async def set_hotend_temp(data: dict, port: str = Header(default=None), baudrate: str = Header(default=115200)):
    setup = gcode_commands(port=port, baudrate=baudrate)
    target_bed_temp = data.get('temp')

    setup.set_temperatures(target_hotend_temp=None, target_bed_temp=target_bed_temp)
    return {"message": "Bed temperature set successfully"}

@app.post('/temp/hotend/set')
async def set_hotend_temp(data: dict, port: str = Header(default=None), baudrate: str = Header(default=115200)):
    setup = gcode_commands(port=port, baudrate=baudrate)
    target_hotend_temp = data.get('temp')

    setup.set_temperatures(target_hotend_temp=target_hotend_temp, target_bed_temp=None)
    return {"message": "Hotend temperature set successfully"}

# Pause & Stop print
@app.get('/print/pause')
def pause_print(port: str = Header(default=None), baudrate: str = Header(default=115200)):
    setup = gcode_commands(port=port, baudrate=baudrate)
    setup.pause_print()
    return {"message": "Print is now paused"}

@app.get('/print/resume')
def resume_print(port: str = Header(default=None), baudrate: str = Header(default=115200)):
    setup = gcode_commands(port=port, baudrate=baudrate)
    setup.resume_print()
    return {"message": "Print is now resumed"}

@app.get('/print/stop')
def stop_print(port: str = Header(default=None), baudrate: str = Header(default=115200)):
    setup = gcode_commands(port=port, baudrate=baudrate)
    setup.stop_print()
    return {"message": "Print is now cancelled"}

# Fan speed
@app.post('/control/set-fan-speed')
def set_fan_speed(data: dict, port: str = Header(default=None), baudrate: str = Header(default=115200)):
    setup = gcode_commands(port=port, baudrate=baudrate)
    fan_speed = data.get('speed')

    setup.set_fan_speed(fan_speed)
    return {"message": f"Fan speed set to {fan_speed}"}

@app.get('/control/set-fan-off')
def set_fan_off(port: str = Header(default=None), baudrate: str = Header(default=115200)):
    setup = gcode_commands(port=port, baudrate=baudrate)
    setup.set_fan_off()
    return {"message": "Fan turned off"}
