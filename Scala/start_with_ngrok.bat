@echo off
setlocal

REM Uruchomienie kontenera Play Framework
echo Uruchamianie kontenera Play Framework...
docker run --rm -d -p 9000:9000 --name play-app-container play-app

REM Uruchomienie ngrok
echo Uruchamianie ngrok...
start "" /WAIT ./ngrok.exe http 9000

REM Po zamknięciu ngrok zatrzymujemy i usuwamy kontener
echo Zatrzymywanie i usuwanie kontenera Play Framework...
docker stop play-app-container

echo Zakończono.
endlocal