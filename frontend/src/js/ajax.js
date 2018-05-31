const request = new XMLHttpRequest();

const URL = 'http://localhost:3003/api/sga'
let resultRequest

const add = event => {
    if (!validarDados()) {
        return false
    }
    let rua = document.getElementById('iLogradouro').value
    let numero = document.getElementById('iNum').value
    let bairro = document.getElementById('iBairro').value
    let cep = document.getElementById('iCep').value
    let cidade = document.getElementById('iCidade').value
    let estado = document.getElementById('iEstado').value
    let comentario = document.getElementById('iComentario').value
    let foto = document.getElementById('fotoInput').value
    let lat = coordenadas.lat
    let lng = coordenadas.lng



    request.open('POST', URL, true)
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    request.send(
        `Numero=${numero}&Rua=${rua}&Bairro=${bairro}&Cep=${cep}&Cidade=${cidade}&Estado=${estado}&Mensagem=${comentario}&Foto=${fotoInput}&lat=${lat}&lng=${lng}`
    )
    request.onreadystatechange = function() {

        if (request.readyState == 4) {
            if (request.readyState == 4 && request.status == 201) {
                alert('Enviado com sucesso')
                location.reload();
            } else {
                alert('Erro no envio, tente novamente')
            }
        }
    }

}

const showMarkers = () => {
    const promise = new Promise((resolve) => {
        request.open('GET', URL)
        request.send()
        request.onreadystatechange = function() {

            if (request.readyState == 4 && request.status == 200) {


                resolve(JSON.parse(request.responseText))

            }
        }
    })
    return promise
}

const deleteAll = props => {
    request.open('GET', URL, false)
    request.send()
    data = JSON.parse(request.responseText)
    data.forEach((arq, index) => {
        request.open('DELETE', `${URL}/${arq._id}`, false)
        request.send()
    })
}

const putChanges = event => {
    if (!validarDados()) {
        return false
    }

    const _id = document.getElementById('edicao').value
    let rua = document.getElementById('iLogradouro').value
    let numero = document.getElementById('iNum').value
    let bairro = document.getElementById('iBairro').value
    let cep = document.getElementById('iCep').value
    let cidade = document.getElementById('iCidade').value
    let estado = document.getElementById('iEstado').value
    let comentario = document.getElementById('iComentario').value
    // let lat = coordenadas.lat
    // let lng = coordenadas.lng



    request.open('PUT', `${URL}/${_id}`, true)
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    request.send(
        `Numero=${numero}&Rua=${rua}&Bairro=${bairro}&Cep=${cep}&Cidade=${cidade}&Estado=${estado}&Mensagem=${comentario}`
        // &lat=${lat}&lng=${lng}
    )
    request.onreadystatechange = function() {

        if (request.readyState == 4) {
            if (request.readyState == 4 && request.status == 200) {
                alert('Enviado com sucesso')
                location.reload();
            } else {
                alert('Erro no envio, tente novamente')
            }
        }
    }

}


const validarDados = props => {

    if (document.getElementById('iLogradouro').value == "" || document.getElementById('iLogradouro').value.length < 8) {
        alert("Preencha campo LOGRADOURO corretamente!");
        document.getElementById('iLogradouro').focus();
        return false;
    }
    if (document.getElementById('iNum').value == "") {
        alert("Preencha campo NUMERO corretamente!");
        document.getElementById('iNum').focus();
        return false;
    }
    if (document.getElementById('iBairro').value == "" || document.getElementById('iBairro').value.length < 4) {
        alert("Preencha campo BAIRRO corretamente!");
        document.getElementById('iBairro').focus();
        return false;
    }
    if (document.getElementById('iCep').value == "" || document.getElementById('iCep').value.length != 8) {
        alert("Preencha campo CEP corretamente!");
        document.getElementById('iCep').focus();
        return false;
    }
    if (document.getElementById('iCidade').value == "" || document.getElementById('iCidade').value.length < 4) {
        alert("Preencha campo CIDADE corretamente!");
        document.getElementById('iCidade').focus();
        return false;
    }




    return true;
}

const habilitarEdicao = () => {

    document.getElementById('iLogradouro').readOnly = false
    document.getElementById('iNum').readOnly = false
    document.getElementById('iBairro').readOnly = false
    document.getElementById('iCep').readOnly = false
    document.getElementById('iCidade').readOnly = false
    document.getElementById('iEstado').readOnly = false
    document.getElementById('iComentario').readOnly = false
    document.getElementById('edicao').style.display = 'none'
    document.getElementById('putchanges').style.display = 'inline'
}

const deleteRegister = () => {
    const _id = document.getElementById('edicao').value
    if(confirm('Deseja realmente apagar o registro?')){
    request.open('DELETE', `${URL}/${_id}`, false)
    request.send()
    if (request.readyState == 4 && request.status == 204) {
        alert('Deletado com sucesso')
        location.reload();
    } else {
        alert('Erro ao apagar, tente novamente')
    }
}
}