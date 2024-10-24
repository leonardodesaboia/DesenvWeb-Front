const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("@replit/database");
const dbClient = new db();

app.use(cors()); // Habilita CORS para todas as rotas
app.use(bodyParser.json());

app.post("/save", (req, res) => {
    const tarefa = req.body.tarefa;

    let lista = [];
    dbClient.get("listaDeTarefas").then((value) => {
        console.log(value);

        // lista = JSON.parse(value.value);
        // console.log(lista);

        // console.log(lista);
        if (tarefa == "") {
            res.json({ message: "Erro em salvar" });
        } else {
            lista.push(tarefa);
            dbClient.set("listaDeTarefas", JSON.stringify(lista)).then(() => {
                res.json({ message: "Dados salvos com sucesso!" });
            });
        }
    });
});

app.get("/load", (req, res) => {
    dbClient
        .list()
        .then((keys) => {
            const promises = keys.value.map((key) => {
                return dbClient.get(key).then((value) => {
                    return { key: key, value: value }; // Retorna um objeto com chave e valor
                });
            });
            Promise.all(promises)
                .then((results) => res.json(results))
                .catch((error) => {
                    console.error("Erro ao recuperar dados:", error);
                    res.status(500).json({ error: "Erro ao recuperar dados" });
                });
        })
        .catch((error) => {
            console.error("Erro ao listar chaves:", error);
            res.status(500).json({ error: "Erro ao listar chaves" });
        });
});

app.get("/loadtask", (req, res) => {
    dbClient
        .get("listaDeTarefas")
        .then((value) => {
            res.json({ key: "listaDeTarefas", value: value });
        })
        .catch((error) => {
            console.error("Erro ao listar chave:", error);
            res.status(500).json({ error: "Erro ao listar chave" });
        });
});

app.post("/delete", (req, res) => {
    const index = req.body.index;
    dbClient
        .list()
        .then((keys) => {
            const key = keys.value[index];
            // console.log(keys);
            if (key) {
                dbClient
                    .delete(key)
                    .then(() => {
                        res.json({ message: "Dados excluídos com sucesso!" });
                    })
                    .catch((error) => {
                        console.error("Erro ao excluir dados:", error);
                        res.status(500).json({
                            error: "Erro ao excluir dados",
                        });
                    });
            } else {
                res.status(404).json({ error: "Chave não encontrada" });
            }
        })
        .catch((error) => {
            console.error("Erro ao listar chaves:", error);
            res.status(500).json({ error: "Erro ao listar chaves" });
        });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
