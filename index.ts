import fs from 'node:fs/promises';
//chama o modulo nativo File Sytem e importa a forma moderna(promisses)

interface Tarefa {
    id:number;
    titulo:string;
    concluido:boolean;
}
//define a interface da tarefa 

async function salvarNoArquivo(dados:Tarefa) {
    const conteudo = JSON.stringify(dados, null, 2);
//converte o objeto tarefa para uma string JSON
    try{
        await fs.writeFile('tarefa.json', conteudo);
        console.log('arquivo gravado com sucesso');
    }
    //tenta escrever o arquivo tarefa.json
    catch(erro) {
        console.error('erro ao gravar o arquivo:', erro);
    }
    //se der errado cai aqui
}

const FirstTask: Tarefa = {
    id: 1,
    titulo: "create todo in ts",
    concluido: false
};

salvarNoArquivo(FirstTask);