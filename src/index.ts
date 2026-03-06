import http, { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs/promises';

// define como uma tarefa se parece no sistema
interface Tarefa {
    id: number;
    titulo: string;
    concluido: boolean;
}

// le o arquivo json e retorna a lista de tarefas ou um array vazio se der erro
async function listarTarefas(): Promise<Tarefa[]> {
    try {
        const dadosBrutos = await fs.readFile('tarefa.json', 'utf-8');
        return JSON.parse(dadosBrutos);
    } catch {
        return [];
    }
}

// pega o titulo, gera um id novo e salva a tarefa no json
async function adicionarTarefa(tituloDigitado: string): Promise<Tarefa> {
    const listaAtual = await listarTarefas();
    const novoId = listaAtual.length > 0 ? listaAtual[listaAtual.length - 1]!.id + 1 : 1;
    const novaTarefa: Tarefa = { id: novoId, titulo: tituloDigitado, concluido: false };

    listaAtual.push(novaTarefa);
    await fs.writeFile('tarefa.json', JSON.stringify(listaAtual, null, 2));
    return novaTarefa;
}

// registra o que aconteceu no servidor em um arquivo de log sem apagar o anterior
async function registrarLog(metodo: string, url: string) {
    const data = new Date().toISOString();
    const linhaLog = `[${data}] ${metodo} em ${url}\n`;

    try {
        await fs.appendFile('acesso.log', linhaLog);
    } catch (err) {
        console.error('erro ao salvar o log:', err);
    }
}

// aqui a magica acontece: cria o servidor http nativo
const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req;

    // dispara o log de forma asincrona (nao trava a resposta pro usuario)
    registrarLog(method || 'desconhecido', url || 'desconhecido');

    // avisa que a resposta sempre sera um json (exceto pro robots.txt)
    res.setHeader('Content-Type', 'application/json');

    // redireciona ou avisa quando bate na raiz do localhost
    if (method === 'GET' && url === '/') {
        res.statusCode = 200;
        return res.end(JSON.stringify({ mensagem: 'bem-vindo ao node-cli -- tente acessar /tarefas ou /robots.txt' }));
    }

    // rota pro robots.txt pra facilitar quem abre o server
    if (method === 'GET' && url === '/robots.txt') {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 200;
        return res.end('User-agent: *\nDisallow: /');
    }

    // rota pra buscar todas as tarefas ja gravadas
    if (method === 'GET' && url === '/tarefas') {
        const tarefas = await listarTarefas();
        res.statusCode = 200;
        return res.end(JSON.stringify(tarefas));
    }

    // rota pra criar uma tarefa nova via post
    if (method === 'POST' && url === '/tarefas') {
        // no node puro o corpo da req chega em pedacos (streams)
        let body = '';
        req.on('data', (chunk: Buffer) => body += chunk.toString());
        req.on('end', async () => {
            try {
                const { titulo } = JSON.parse(body);
                const tarefaCriada = await adicionarTarefa(titulo);
                res.statusCode = 201;
                res.end(JSON.stringify(tarefaCriada));
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
