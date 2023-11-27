import requests

# Define the base URL for your FastAPI application
BASE_URL = "http://127.0.0.1:8000"  # Update with the correct URL if needed

# Define default values for optional parameters
default_port = "COM4"
default_temp = 150
default_speed = 0

def test_hello_world():
    response = requests.get(f"{BASE_URL}/")
    print("Hello World Endpoint:")
    print(response.text)
    print()

def test_available_ports():
    response = requests.get(f"{BASE_URL}/available-ports")
    print("Available Ports Endpoint:")
    print(response.json())
    print()

def test_check_printer_connection(port=default_port):
    response = requests.get(f"{BASE_URL}/printer/connected", headers={"port": port})
    print("Check Printer Connection Endpoint:")
    print(response.json())
    print()

def test_bed_temp(port=default_port):
    response = requests.get(f"{BASE_URL}/temp/bed", headers={"port": port})
    print("Bed Temperature Endpoint:")
    print(response.json())
    print()

def test_set_hotend_temp(temp=default_temp, port=default_port):
    data = {"temp": temp}
    response = requests.post(f"{BASE_URL}/temp/hotend/set", headers={"port": port}, json=data)
    print("Set Hotend Temperature Endpoint:")
    print(response.json())
    print()

def test_pause_print(port=default_port):
    response = requests.get(f"{BASE_URL}/print/resume", headers={"port": port})
    print("Pause Print Endpoint:")
    print(response.json())
    print()

def test_set_fan_speed(speed=default_speed, port=default_port):
    data = {"speed": speed}
    response = requests.post(f"{BASE_URL}/control/set-fan-speed", headers={"port": port}, json=data)
    print("Set Fan Speed Endpoint:")
    print(response.json())
    print()

# Run the tests
# test_hello_world()
# test_available_ports()
# test_check_printer_connection()
# test_bed_temp()
# test_set_hotend_temp()
# test_pause_print()
# test_set_fan_speed()
