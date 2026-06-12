import http from 'http';

const server = http.createServer(async (req, res) => {
    console.log("Rota recebida:", req.url);

    if (req.url === "/posts") {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const posts = await response.json();
       
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("--- Gerado pela API (posts) ---\n\n" + JSON.stringify(posts, null, 2));
        return;
    }

    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Rota não encontrada");
});

server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
