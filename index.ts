import fs from 'node:fs/promises';
//chama o modulo nativo File Sytem e importa a forma moderna(promises)

interface Tarefa {
    id: number;
    titulo: string;
    concluido: boolean;
}
//define a interface da tarefa 

async function adicionarTarefa(tituloDigitado: string) { // Ajustado o nome do parâmetro
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

    // --- id auto ---

    // Se a lista tiver itens, pega o ID do último e soma 1. Se não, começa em 1.
    const novoId = listaAtual.length > 0 
        ? listaAtual[listaAtual.length - 1]!.id + 1 
        : 1;

    const objetoTarefa: Tarefa = { // Mudado o nome para evitar conflito
        id: novoId,
        titulo: tituloDigitado,
        concluido: false // toda tarefa nova começa como pendente
    };
    // -------------------------------

    // adiciona o novo objeto ao Array
    listaAtual.push(objetoTarefa);

    const conteudo = JSON.stringify(listaAtual, null, 2);
    //converte o objeto tarefa para uma string JSON

    try {
        await fs.writeFile('tarefa.json', conteudo);
        console.log(`Tarefa "${objetoTarefa.titulo}" gravada com sucesso`);
    }
    //tenta escrever o arquivo tarefa.json
    catch (erro) {
        console.error('erro ao gravar o arquivo:', erro);
    }
    //se der errado cai aqui
}

// Função autoinvocavel para rodar as gravçoes em sequencia
(async () => {
    await adicionarTarefa("create todo in node");
    await adicionarTarefa("commit in github");
    await adicionarTarefa("make readme"); 
})();