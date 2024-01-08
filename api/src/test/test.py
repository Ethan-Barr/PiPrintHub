import requests

# Change the base URL accordingly
base_url = "http://localhost:8000"  # Replace with the actual base URL of your FastAPI app



def test_api():
    response = requests.get(f"{base_url}/")
    print(response.text)

def test_get_ports():
    response = requests.get(f"{base_url}/available-ports")
    print(response.json())

def test_check_printer_connection():
    port = "COM5"  # Replace with the actual port you want to test
    baudrate = 115200  # Replace with the actual baudrate you want to test

    headers = {"port": port, "baudrate": str(baudrate)}
    response = requests.get(f"{base_url}/printer/connected", headers=headers)
    print(response.json())



def test_bed_temp():
    port = "COM5"  # Replace with the actual port you want to test
    baudrate = 115200  # Replace with the actual baudrate you want to test

    headers = {"port": port, "baudrate": str(baudrate)}
    response = requests.get(f"{base_url}/temp/bed", headers=headers)
    print(response.json())

def test_hotend_temp():
    port = "COM5"  # Replace with the actual port you want to test
    baudrate = 115200  # Replace with the actual baudrate you want to test

    headers = {"port": port, "baudrate": str(baudrate)}
    response = requests.get(f"{base_url}/temp/hotend", headers=headers)
    print(response.json())



def test_set_bed_temp():
    port = "COM5"  # Replace with the actual port you want to test
    baudrate = 115200  # Replace with the actual baudrate you want to test

    headers = {"port": port, "baudrate": str(baudrate)}
    data = {"temp": 60}  # Replace with the actual target bed temperature
    response = requests.post(f"{base_url}/temp/bed/set", headers=headers, json=data)
    print(response.json())

def test_set_hotend_temp():
    port = "COM5"  # Replace with the actual port you want to test
    baudrate = 115200  # Replace with the actual baudrate you want to test

    headers = {"port": port, "baudrate": str(baudrate)}
    data = {"temp": 200}  # Replace with the actual target hotend temperature
    response = requests.post(f"{base_url}/temp/hotend/set", headers=headers, json=data)
    print(response.json())



def test_pause_print():
    port = "COM5"  # Replace with the actual port you want to test
    baudrate = 115200  # Replace with the actual baudrate you want to test

    headers = {"port": port, "baudrate": str(baudrate)}
    response = requests.get(f"{base_url}/print/pause", headers=headers)
    print(response.json())

def test_resume_print():
    port = "COM5"  # Replace with the actual port you want to test
    baudrate = 115200  # Replace with the actual baudrate you want to test

    headers = {"port": port, "baudrate": str(baudrate)}
    response = requests.get(f"{base_url}/print/resume", headers=headers)
    print(response.json())

def test_stop_print():
    port = "COM5"  # Replace with the actual port you want to test
    baudrate = 115200  # Replace with the actual baudrate you want to test

    headers = {"port": port, "baudrate": str(baudrate)}
    response = requests.get(f"{base_url}/print/stop", headers=headers)
    print(response.json())



def test_set_fan_speed():
    port = "COM5"  # Replace with the actual port you want to test
    baudrate = 115200  # Replace with the actual baudrate you want to test

    headers = {"port": port, "baudrate": str(baudrate)}
    data = {"speed": 50}  # Replace with the actual fan speed
    response = requests.post(f"{base_url}/control/set-fan-speed", headers=headers, json=data)
    print(response.json())

def test_set_fan_off():
    port = "COM5"  # Replace with the actual port you want to test
    baudrate = 115200  # Replace with the actual baudrate you want to test

    headers = {"port": port, "baudrate": str(baudrate)}
    response = requests.get(f"{base_url}/control/set-fan-off", headers=headers)
    print(response.json())




# Uncomment and call the function you want to test
# test_api()
# test_get_ports()
test_check_printer_connection()
test_bed_temp()
test_hotend_temp()
# test_set_bed_temp()
# test_set_hotend_temp()
# test_pause_print()
# test_resume_print()
# test_stop_print()
# test_set_fan_speed()
# test_set_fan_off()
