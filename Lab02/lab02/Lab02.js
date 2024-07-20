const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        let content = fs.readFileSync('Lab02.html', {encoding: 'utf8'});
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
        return res.end(content);
    }
    if (req.method === 'POST' && req.url === '/calculate') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Принимаем данные
        });
        req.on('end', () => {
            const { 'x-value-x': x, 'x-value-y': y } = req.headers;
            const z = parseInt(x) + parseInt(y); // Вычисляем сумму
            res.setHeader('X-Value-z', z); // Устанавливаем заголовок с результатом
            return res.end(); // Завершаем ответ
        });
    } else if(req.method === 'POST' && req.url === '/calc') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { 'x-value-x': x, 'x-value-y': y } = req.headers;
            const z = parseInt(x) + parseInt(y);
            setTimeout(() => {
                res.setHeader('X-Value-z', z);
                return res.end();
            }, 10000);
        });
    } else if (req.method === 'POST' && req.url === '/generateB') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const n = parseInt(req.headers['x-rand-n']);
                const count = getRandomInt(5, 10);
                const randomNumbers = Array.from({ length: count }, () => getRandomInt(-n, n));
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(randomNumbers));
            });
    } else if (req.method === 'POST' && req.url === '/generateC') {
        const n = parseInt(req.headers['x-rand-n']);

        const count = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
        const numbers = Array.from({ length: count }, () => Math.floor(Math.random() * (2 * n + 1)) - n);

        setTimeout(() => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({numbers: numbers }));
        }, 1000);
    } else {
        res.statusCode = 404;
        return res.end('Not Found');
    }
}).listen(3000, () => console.log('Server is running on http://localhost:3000'));

getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}