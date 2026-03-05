//chama o modulo nativo File Sytem e importa a forma moderna(promises)
import fs from 'node:fs/promises';

//define a interface da tarefa 
interface Tarefa {
    id: number;
    titulo: string;
    concluido: boolean;
}

async function adicionarTarefa(novaTarefa: Tarefa) {
    let listaAtual: Tarefa[] = [];

    try {
        // tenta ler o arquivo pra não sobrescrever dados antigos
        const dadosBrutos = await fs.readFile('tarefa.json', 'utf-8');
        listaAtual = JSON.parse(dadosBrutos);
    } catch (erro) {
        // se o arquivo não existir sehgue com a lista vazia
        console.log('criando novo banco de dados local');
    }

    // add o novo objeto a array
    listaAtual.push(novaTarefa);

    const conteudo = JSON.stringify(listaAtual, null, 2);
    //converte o objeto tarefa para uma string JSON

    try {
        await fs.writeFile('tarefa.json', conteudo);
        console.log(`tarefa "${novaTarefa.titulo}" gravada com sucesso`);
    }
    //tenta escrever o arquivo tarefa.json
    catch (erro) {
        console.error('erro ao gravar o arquivo:', erro);
    }
    //se der errado cai aqui
}

// criando exemplos para testar o Array
const tarefa1: Tarefa = {
    id: 1,
    titulo: "Aprender Node",
    concluido: true
};

const tarefa2: Tarefa = {
    id: 2,
    titulo: "Subir no GitHub",
    concluido: false
};

// func autoinvocável para rodar as gravações em sequencia
(async () => {
    await adicionarTarefa(tarefa1);
    await adicionarTarefa(tarefa2);
})();