@echo off

cd %~dp0api
pip install -r requirements.txt

cd %~dp0ui
npm install
