import http, { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs/promises';

// define como uma task se parece no sistema
interface Task {
    id: number;
    titulo: string;
    concluido: boolean;
}

// le o arquivo json e retorna a lista de tasks ou um array vazio se der erro
async function listarTasks(): Promise<Task[]> {
    try {
        const dadosBrutos = await fs.readFile('tarefa.json', 'utf-8');
        return JSON.parse(dadosBrutos);
    } catch {
        return [];
    }
}

// pega o titulo, gera um id novo e salva a task no json
async function adicionarTask(tituloDigitado: string): Promise<Task> {
    const listaAtual = await listarTasks();
    const novoId = listaAtual.length > 0 ? listaAtual[listaAtual.length - 1]!.id + 1 : 1;
    const novaTask: Task = { id: novoId, titulo: tituloDigitado, concluido: false };

    listaAtual.push(novaTask);
    await fs.writeFile('tarefa.json', JSON.stringify(listaAtual, null, 2));
    return novaTask;
}

// registra o que aconteceu no server em um arquivo de log sem apagar o anterior
async function registrarLog(metodo: string, url: string) {
    const data = new Date().toISOString();
    const linhaLog = `[${data}] ${metodo} em ${url}\n`;

    try {
        await fs.appendFile('acesso.log', linhaLog);
        console.log(`log registrado: ${metodo} ${url}`);
    } catch (err) {
        console.error('erro ao salvar o log:', err);
    }
}

// cria o server http nativo
const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req;

    // dispara o log de forma asincrona (nao trava a resposta pro user)
    registrarLog(method || 'desconhecido', url || 'desconhecido');

    // avisa que a resposta sempre sera um json (exceto pro robots.txt)
    res.setHeader('Content-Type', 'application/json');

    // redireciona ou avisa quando bate na raiz do localhost
    if (method === 'GET' && url === '/') {
        res.statusCode = 200;
        return res.end(JSON.stringify({ mensagem: 'bem-vindo ao node-cli -- tente acessar /tasks ou /robots.txt' }));
    }

    // rota pro robots.txt pra facilitar quem abre o server
    if (method === 'GET' && url === '/robots.txt') {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 200;
        return res.end('User-agent: *\nDisallow: /');
    }

    // rota pra buscar todas as tasks ja gravadas
    if (method === 'GET' && url === '/tasks') {
        const tasks = await listarTasks();
        res.statusCode = 200;
        return res.end(JSON.stringify(tasks));
    }

    // rota pra criar uma task nova via post
    if (method === 'POST' && url === '/tasks') {
        // no node puro o corpo da req chega em pedacos (streams)
        let body = '';
        req.on('data', (chunk: Buffer) => body += chunk.toString());
        req.on('end', async () => {
            try {
                const { titulo } = JSON.parse(body);
                const taskCriada = await adicionarTask(titulo);
                res.statusCode = 201;
                res.end(JSON.stringify(taskCriada));
            } catch (err) {
                res.statusCode = 400;
                res.end(JSON.stringify({ erro: 'json invalido ou campo faltando' }));
            }
        });
        return;
    }

    // rota padrao caso nao encontre o caminho solicitado
    res.statusCode = 404;
    res.end(JSON.stringify({ mensagem: 'rota nao encontrada' }));
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`server rodando em http://localhost:${PORT}`);
});
