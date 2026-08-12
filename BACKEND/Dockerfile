# version of node and start point
FROM node:24 
# Set the working directory inside the container
WORKDIR /app
# copy pakege in current directory
COPY package*.json ./
# install dependences
RUN ls -la
RUN npm install 
# copy all project 
COPY . . 
# port i used in our project
EXPOSE 4000
# defalut command to start project
CMD ["npm" , "start"]