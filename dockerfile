FROM node:18-alpine
WORKDIR /ESC-Frontend
COPY . .
RUN npm install
CMD ["npm","start"]

# Here, we state the environment as using a Node version 18 alpine version, then we will state that it will use ESC-Frontend as the current work
# directory. COPY all contents within src, public and package to the destinations we set within the container. Ask the container to run npm install
# then run the npm start command

# docker run -dp 3000:3000 --name esc-frontend esc-frontend:latest    
