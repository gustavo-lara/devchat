const app = require("express")(); //aplicação
const server = require("http").createServer(app); //inicia a aplicação
const io = require("socket.io")(server, { //vai falar para o server oq ele tem q fazer 
    cors: { origin: "http://localhost:5173" } //cors faz a ligação do server com o react
})
const PORT = 3001;

io.on("connection", (socket) => {
    socket.on("set_username", (username) => {
        console.log(`Bem-vindo ${username}!`)

        socket.on("message", (text) => {
            io.emit("receive_message", {
                text,
                authorID: socket.id,
                author: socket.data.username
            })
            console.log(`Usuário ${socket.data.username} enviou uma mensagem!`)
        });

        socket.data.username = username
        // userName(username, socket.id);

        console.log(`Olá ${username}! Seu id é ${socket.id}!`)
    });
    socket.on("disconnect", (reason) => {
        console.log(`${socket.data.username} desconectado! Motivo: ${reason}`)
    })
});

server.listen(PORT, () => { console.log("Server running...") })

