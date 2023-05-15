# Whatsapp-NOA React App

This is a react project of 3 students from Bar-Ilan University. 
In the project we implemented WhatsappWeb-like application, only sending messages, without recieving.

## Available Scripts

In the project directory, you can run:

### `npm start`

## React uses
We implemented number of components where we render into index.html to the root component. Each component is styled
with a css file named noa.css

In this project we used useRef on some HTML tags to get its info (like textboxes),
also, we used useState on the chat component, to change it's state of which person you are writing to.

In addition, our whole database is a list of User, in each has some personal field and a chat list, where every
chat list has info on the chat and a list of messages.

To save images in our database, we converted the image to a string of bytes and convert it at our will.

Have fun looking at our project, Whatsapp-NOA(Naor Or Adar).
