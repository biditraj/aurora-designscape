@echo off
echo Downloading beach profile image...
powershell -Command "Invoke-WebRequest -Uri 'https://storage.googleapis.com/assistant-conversation-images/825b0ecc-b77d-478c-97b4-dd5c7e838c01' -OutFile 'D:\personal proj\aurora-designscape\public\images\beach-profile.jpg'"
echo Image saved to public/images/beach-profile.jpg
pause 