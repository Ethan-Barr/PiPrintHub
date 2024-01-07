#!/bin/bash

# Navigate to the api directory
cd "$(dirname "$0")/api" || exit
pip install -r requirements.txt

# Navigate to the ui directory
cd "$(dirname "$0")/ui" || exit
npm install
