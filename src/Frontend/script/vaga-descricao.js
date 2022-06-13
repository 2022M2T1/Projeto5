// gabriel vai explicar kkkk
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function loadVagaData() { //função que os dados da vaga de acordeu com o seu ID

    let id_vaga = getUrlParameter('id_vaga')

    $.ajax({
        url: `http://localhost:3000/rotas/listVagas?id_vaga=${id_vaga}`,
        method: 'post',
        success: function (res) {
            $("#tituloVaga").html(res.vagaInfos.nome_vaga)
            $("#nomeEmpresa").html(res.empresaInfos.nome_empresa)
            $("#salarioVaga").html(` - R$ ${res.vagaInfos.salario_vaga}`)
            $("#descricaoVaga").html(res.vagaInfos.descricao_vaga)
            $("#culturaEmpresa").html(res.empresaInfos.cultura_empresa)

            // puxa o ID do banco e mostra todas as infomações da vaga

            const softskills = res.vagaInfos.softskill_vaga.split(',')
            const hardskills = res.vagaInfos.hardskill_vaga.split(',')

            for (let i = 0; i < softskills.length; i++) { // para cada valor do array, está sendo dividido da maneira escrita no código abaixo
                const divSoftSkills = document.querySelector('#soft-skills');
                divSoftSkills.innerHTML += `<p class="skill rounded-pill">${softskills[i]}</p>`
            }

            for (let x = 0; x < hardskills.length; x++) { // mesma lógica do array de soft skills vale para o de hard skills
                const divHardSkills = document.querySelector('#hard-skills');
                divHardSkills.innerHTML += `<p class="skill rounded-pill">${hardskills[x]}</p>`
            }
        }
    })
}


function applyVaga() { // função que é executada quando o usuário se candidata para uma vaga
    let id_vaga = getUrlParameter('id_vaga')
    let { id_candidata } = JSON.parse(sessionStorage.getItem("UsuarioDadosLogin"))

    $.ajax({
        url: 'http://localhost:3000/rotas/applied',
        method: 'POST',
        data: {
            id_candidata: id_candidata,
            id_vaga: id_vaga
        },
        success: function () {
            window.location.replace("/views/Users/usuariaCandidata3.html")
        }
    })
}