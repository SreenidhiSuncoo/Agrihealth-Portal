# AgriHealth Portal

## Project Overview
A web-based plant disease detection system that allows users to analyze plant health using symptoms and images, providing actionable insights to improve crop health.
AgriHealth Portal is designed to assist users in identifying plant diseases through symptoms and image inputs.  
It provides detailed information including possible causes, prevention methods, and treatments.
This project demonstrates full-stack development with a focus on clean UI, usability, and scalable backend design.


## Features
- Upload plant leaf images
- Enter symptoms manually
- Get disease prediction
- View cure and prevention methods
- Clean glassmorphism UI

## Tech Stack
- Frontend: React.js
- Backend: Node.js + Express
- Database: MongoDB

## How to Run

### Backend
cd backend  
node server.js  

### Frontend
cd frontend    
npm start  

###ml model
cd backend
py -3.11 ml_server.py

## API Endpoints
- /predict → disease prediction  
- /diseases → fetch disease data  

## Future Improvements
- Integrate ML model (real predictions)
- Add voice input
- Store user history

## Author
S S Sreenidhi
