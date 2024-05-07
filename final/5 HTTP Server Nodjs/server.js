const http = require("http");

const server = http.createServer((req, res) => {
    res.end("Hello i am Server Happy to See You :-)");
} );

server.listen(8000, ()=>{
console.log("Listning at Port number 8000");
});