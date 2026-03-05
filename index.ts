import fs from 'node:fs/promises';
//chama o modulo nativo File Sytem e importa a forma moderna(promises)

interface Tarefa {
    id: number;
    titulo: string;
    concluido: boolean;
}
//define a interface da tarefa 

async function adicionarTarefa(novaTarefa: Tarefa) {
    let listaAtual: Tarefa[] = [];

    try {
        // tenta ler o arquivo para não sobrescrever dados antigos
        const dadosBrutos = await fs.readFile('tarefa.json', 'utf-8');
        const dadosTraduzidos = JSON.parse(dadosBrutos);

        // garante que o que foi lido é realmente uma lista
        if (Array.isArray(dadosTraduzidos)) {
            listaAtual = dadosTraduzidos;
        }
    } catch (erro) {
        // Se o arquivo não existir segue com a lista vazia
        console.log('criando novo banco de dados local');
    } 

    // adiciona o novo objeto ao Array
    listaAtual.push(novaTarefa);

    const conteudo = JSON.stringify(listaAtual, null, 2);
    //converte o objeto tarefa para uma string JSON

    try {
        await fs.writeFile('tarefa.json', conteudo);
        console.log(`Tarefa "${novaTarefa.titulo}" gravada com sucesso`);
    }
    //tenta escrever o arquivo tarefa.json
    catch (erro) {
        console.error('erro ao gravar o arquivo:', erro);
    }
    //se der errado cai aqui
}

//exemplos para testar o array
const tarefa1: Tarefa = {
    id: 1,
    titulo: "make todo in node",
    concluido: true
};

const tarefa2: Tarefa = {
    id: 2,
    titulo: "commit in git",
    concluido: true
};

const tarefa3: Tarefa = {
    id: 3,
    titulo: "make readme",
    concluido: false
};

// Função autoinvocavel para rodar as gravçoes em sequencia
(async () => {
    await adicionarTarefa(tarefa1);
    await adicionarTarefa(tarefa2);
    await adicionarTarefa(tarefa3); 
})();