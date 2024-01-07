#!/bin/bash

# Navigate to the api directory
cd "$(dirname "$0")/api" || exit
gnome-terminal --working-directory="$(dirname "$0")/api/src" --command="python3 running.py" &

# Pause to allow Python script to start before continuing
sleep 5

# Navigate to the ui directory
cd "$(dirname "$0")/ui" || exit
npm start
