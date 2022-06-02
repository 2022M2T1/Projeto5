const express = require("express") // trazedno o express para ser utilizado
const sqlite3 = require("sqlite3").verbose() // Trazendo o sqlite3 (oficial do sqlite) para ser utilizado
const sqlite = require("sqlite") // Trazendo o sqlite (criado pela comunidade) para ser utilizado
const bodyParser = require("body-parser") // Trazendo o body-parser para ser utilizado
const Routes = express.Router() // Trazendo o Router do proprio express para ser utilizado



const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));






//                      GET

// Aparece todas as vagas cadastradas no banco de dados
Routes.get("/listVagas", (req, res) => {



    //Uma função que espera as coisas dentro dela acontecem para assim efetuar o codigo
    async function getDB() {

        //abre o banco de dados sqlite
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        //roda comando sql e retorna uma promise

        
        await db.all("SELECT * FROM vagas").then((result)=>{
            res.json(result)
        })

        //fecha o banco de dados
        db.close()
    }

    //chamando a função que foi criada
    getDB()


})

// Aparece todas as candidatas cadastradas no banco de dados
Routes.get("/listCandidatas", (req, res) => {

    async function listCand() {

        // abre o banco de dados
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        //roda comando sql e retorna uma promise
        await db.run("SELECT * FROM candidatas").then((result) => {
            res.json(result)
        })

        // fecha o banco de dados
        db.close()

    }


    listCand()



})

// Aparece todas as empresas cadastradas no banco de dados
Routes.get("/listEmpresa", (req, res) => {

    async function listEmpresa() {

        //abre o banco de dados
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        // roda comandos sql e retorna uma promise
        await db.all("SELECT * FROM empresas").then((result) => {
            res.json(result)
        })

        // fecha o banco de dados
        db.close()

    }

    listEmpresa()
})



//                      POST

// Registro de empresas no banco de dados, as informações listadas no banco
Routes.post("/formEmpresa", (req, res) => {



    async function putDB() {

        // abre o banco de dados
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        // executa comando sql
        // 1ª liste as colunas em ordem que querem ser preenchidas
        // 2ª Values (? x quantidade de dados que entrarao)
        // 3ª [valor1, valor2,valor3 .....]


        const {Nome_Empresa, Ramo_de_Atividade, cnpj, Localizacao, Telefone, Site, Email} = req.body

        await db.run("INSERT INTO empresas (nome_empresa,ramo_empresa,cnpj_empresa,localizacao_empresa,telefone_empresa,site_empresa,email_empresa) VALUES (?,?,?,?,?,?,?)", [Nome_Empresa, Ramo_de_Atividade, cnpj, Localização, Telefone, Site, Email])

        console.log(req.body.cnpj)


        // fecha o banco
        db.close()
    }

    putDB()

    // resposta depois de executar tudo
    res.send("Empresa registrada com sucesso")



})

// Registro de candidata no banco de dados 
Routes.post("/formCandidata", (req, res) => {


    async function putDB() {

        // abre o banco de dados
        let db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })



        // executa comando sql
        // 1ª liste as colunas em ordem que querem ser preenchidas
        // 2ª Values (? x quantidade de dados que entrarao)
        // 3ª [valor1, valor2,valor3 .....]

        const {Nome_candidata, Escolaridade_candidata, Email_candidata, Celular_candidata, CPF_canditada, UF_candidata, Cidade_candidata, Data_nascimento, Genero_canditada, Habilidade_candidata, Senha_canditada, Cargo_canditada} = req.body

        const result = await db.run("INSERT INTO candidatas (nome_candidata,escolaridade_candidata,email_candidata,celular_candidata,) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",[ Nome_candidata, Escolaridade_candidata, Email_candidata, Celular_candidata, CPF_canditada, UF_candidata, Cidade_candidata, Data_nascimento, Genero_canditada, Habilidade_candidata, Senha_canditada, Cargo_canditada, "curriculo"])


        // fecha o banco de dados
        db.close()
    }

    putDB()

    res.send("Candidata registrada com sucesso")
})


// Registro de vagas no banco de dados
Routes.post("/formVagas", (req, res) => {

    async function putDB() {

        // abre o banco de dados
        let db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        // executa comando sql
        // 1ª liste as colunas em ordem que querem ser preenchidas
        // 2ª Values (? x quantidade de dados que entrarao)
        // 3ª [valor1, valor2,valor3 .....]

        const {Soft_Vaga, Hard_Vaga, Nome_vaga, Descricao_Vaga, Local_Vaga, Salario_Vaga} = req.body

        await db.run("INSERT INTO vagas (soft_vaga,hard_vaga,nome_vaga,descricao_vaga,local_vaga,salario_vaga) VALUES(?,?,?,?,?,?)", [Soft_Vaga, Hard_Vaga, Nome_vaga, Descricao_Vaga, Local_Vaga, Salario_Vaga])


        //fecha o bando de dados
        db.close()
    }

    putDB()

    res.send("Vaga registra com sucesso!")

})


//                      PUT


// Edita os valores das colunas da tabela vagas que estão registrados no banco de dados
Routes.put("/editVaga", (req, res) => {


    async function editDB() {

        // abre o banco de dados
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })
        
        


        // executa comando sql
        // 1ª seleciono a tabela
        // 2ª os valores que quero alterar
        // 3ª ?, ?
        // 4ª [valor1,valor2,valor3]

        
        await db.run(`UPDATE vagas SET nome_vaga = ? , salario_vaga = ?  WHERE id_vaga == ? `, [req.body.Nome_vaga, req.body.Salario_vaga, req.body.id_chave])


        // fecha o banco de dados
        db.close()

    }

    editDB()

    res.send("Vaga editada com sucesso no banco de dados")


})

// Edita os valores  das colunas da tabela candidatas que estão registradas no banco de dados
Routes.put("/editCandidata", (req, res) => {


    async function editDB() {

        // abre o banco de dados
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        // executa comando sql
        // 1ª seleciono a tabela
        // 2ª os valores que quero alterar
        // 3ª ?, ?
        // 4ª [valor1,valor2,valor3]
        await db.run(`UPDATE canditadas SET nome_canditada = ?  WHERE id_vaga == ? `, [req.body.Nome_candidata, req.body.id_chave])


        // fecha o banco de dados
        db.close()

    }

    editDB()

    res.send("Perfil editada com sucesso no banco de dados")


})

// Edita os valores das colunas da tabela empresas que estão registradas no banco de dados
Routes.put("/editEmpresa", (req, res) => {


    async function editDB() {

        // abre o banco de dados
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        // executa comando sql
        // 1ª seleciono a tabela
        // 2ª os valores que quero alterar
        // 3ª ?, ?
        // 4ª [valor1,valor2,valor3]
        await db.run(`UPDATE empresas SET email_empresa = ?  WHERE id_vaga == ? `, [req.body.Email_empresa, req.body.id_chave])
        


        // fecha o banco de dados
        db.close()

    }

    editDB()

    res.send(" Perfil da empresa editada com sucesso no banco de dados")


})


//                      DELETE

// Deleta a linha desejada na tabela vagas
Routes.delete("/deleteVagas", (req, res) => {

    async function delDB() {

        // abre o banco de dados
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        // executa comando sql
        // 1ª escolha a tabela e alguma condição para excluir tal linha

        // IMPORTANTE:
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela

        await db.run(`DELETE FROM vagas WHERE id_vaga == ${req.body.id_chave}`)

        //fecha o banco de dados
        db.close()
    }

    delDB()

    res.send("Vaga excluida com sucesso no banco de dados")


})


// Deleta a linha desejada na tabela empresas
Routes.delete("/deleteEmpresa", (req, res) => {

    async function delDB() {

        //abre o banco de dados
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        // executa comando sql
        // 1ª escolha a tabela e alguma condição para excluir tal linha

        // IMPORTANTE:
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela

        await db.run(`DELETE FROM empresas WHERE id_vaga == ${req.body.id_chave} `)

        //fecha banco de dados
        db.close()
    }

    delDB()

    res.send("Empresa excluida com sucesso no banco de dados")


})


// Deleta a linha desejada na tabela candidatas
Routes.delete("/deleteCandidata", (req, res) => {

    async function delDB() {
        // abre o banco de dados
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        // executa comando sql
        // 1ª escolha a tabela e alguma condição para excluir tal linha

        // IMPORTANTE:
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela
        // - Sempre fazer uma condição se não excluirar todos os valores de tal tabela

        await db.run(`DELETE FROM canditada WHERE id_vaga == ${req.body.id_chave}`)

        //fecha o banco de dados
        db.close()
    }

    delDB()

    res.send("Canditada excluida com sucesso no banco de dados")


})





// exportando todos os Routes para serem utilizados em outro arquivo js
module.exports = Routes