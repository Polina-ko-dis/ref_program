@echo off
cd /d "%~dp0"
set "REFERRAL_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not exist "node_modules\vite\bin\vite.js" (
  echo Dependencies are missing. Run pnpm install while connected to TravelLine network.
  pause
  exit /b 1
)
if exist "%REFERRAL_NODE%" (
  "%REFERRAL_NODE%" node_modules\vite\bin\vite.js --host 127.0.0.1 --port 4175 --strictPort
) else (
  node node_modules\vite\bin\vite.js --host 127.0.0.1 --port 4175 --strictPort
)
pause
