from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Header, Query

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
def check_printer_connection(port: str = Header(default="COM4")):
    try:
        serial_connection = Serial(port)
        serial_connection.close()
        return {"connected": True}
    except Exception as e:
        return {"connected": False, "error": str(e)}




# Get temp
@app.get('/temp/bed')
def bed_temp(port: str = Header(default="COM4")):
    setup = gcode_commands(port=port)
    
    temperature = setup.get_temperatures()

    bed_temperature = temperature[0]
    return {"bed_temperature": bed_temperature}

@app.get('/temp/hotend')
def hotend_temp(port: str = Header(default="COM4")):
    setup = gcode_commands(port=port)
    
    temperature = setup.get_temperatures()

    hotend_temperature = temperature[1]
    return {"hotend_temperature": hotend_temperature}



# Set temp
@app.post('/temp/bed/set')
async def set_hotend_temp(data: dict, port: str = Header(default="COM4")):
    target_bed_temp = data.get('temp')
    
    setup = gcode_commands(port=port)
    setup.set_temperatures(target_hotend_temp=None, target_bed_temp=target_bed_temp)
    
    return {"message": "Hotend temperature set successfully"}

@app.post('/temp/hotend/set')
async def set_hotend_temp(data: dict, port: str = Header(default="COM4")):
    target_hotend_temp = data.get('temp')
    
    setup = gcode_commands(port=port)
    setup.set_temperatures(target_hotend_temp=target_hotend_temp, target_bed_temp=None)
    
    return {"message": "Hotend temperature set successfully"}


# Pause & Stop print
@app.get('/print/pause')
def pause_print(port: str = Header(default="COM4")):
    setup = gcode_commands(port=port)
    setup.pause_print()

    return {"message": "Print is now paused"}

@app.get('/print/resume')
def resume_print(port: str = Header(default="COM4")):
    setup = gcode_commands(port=port)
    setup.resume_print()

    return {"message": "Print is now resumed"}

@app.get('/print/stop')
def stop_print(port: str = Header(default="COM4")):
    setup = gcode_commands(port=port)
    setup.stop_print()

    return {"message": "Print is now cancelled"}



# Fan speed
@app.post('/control/set-fan-speed')
def set_fan_speed(data: dict, port: str = Header(default="COM4")):
    fan_speed = data.get('speed')
    setup = gcode_commands(port=port)

    setup.set_fan_speed(fan_speed)
    return {f"message": "Fan is set at {fan_speed}"}

@app.get('/control/set-fan-off')
def set_fan_off(port: str = Header(default="COM4")):
    setup = gcode_commands(port=port)
    setup.set_fan_off()

    return {f"message": "Fan is turned off"}