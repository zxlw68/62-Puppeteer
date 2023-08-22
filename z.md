npm i express

npm i -D nodemon cross-env

app.listen(process.env.PORT)

"start": "SET PORT=3000 && nodemon server.js ",

"start2": "cross-env PORT=3000 nodemon server.js "

npm i absolutify  
#convert relative url to absolute url
