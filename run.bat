@echo off

cd %~dp0api
start cmd /k "cd src && python running.py"

cd %~dp0ui
start npm start
