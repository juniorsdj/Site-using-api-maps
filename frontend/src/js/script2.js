let allRegisters

function initMap() {
    let lagarto = {
        lat: -10.916944,
        lng: -37.65
    };
    const markers = []
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: lagarto
    });

    showMarkers().then(r => {
        allRegisters = r
        





        // esta variável vai definir a área de mapa a abranger e o nível do zoom
        // de acordo com as posições dos marcadores
        const bounds = new google.maps.LatLngBounds();
        
        // Loop que vai percorrer a informação contida em markersData 
        // para que a função createMarker possa criar os marcadores 
        for (let i = 0; i < allRegisters.length; i++) {
           
            const latlng = new google.maps.LatLng(allRegisters[i].lat, allRegisters[i].lng);
            const rua = allRegisters[i].Rua;
            const cidade = allRegisters[i].Cidade;
            const estado = allRegisters[i].Estado;
            const bairro = allRegisters[i].Bairro;
            const foto = allRegisters[i].Foto;
            const numero = allRegisters[i].Numero;
            const _id = allRegisters[i]._id;
            const mensagem = allRegisters[i].Mensagem;
            const cep = allRegisters[i].Cep;
            
            createMarker(latlng, rua, cidade, estado, cep, foto, bairro, numero, mensagem, _id);

            // Os valores de latitude e longitude do marcador são adicionados à
            // variável bounds
            bounds.extend(latlng);
        }

        // Depois de criados todos os marcadores,
        // a API, através da sua função fitBounds, vai redefinir o nível do zoom
        // e consequentemente a área do mapa abrangida de acordo com
        // as posições dos marcadores
        map.fitBounds(bounds);
    })

    // const infoWindow = new google.maps.InfoWindow()
    function createMarker(latlng, rua, cidade, estado, cep, foto, bairro, numero, mensagem, _id) {
        const marker = new google.maps.Marker({
            map: map,
            position: latlng,
            title: rua,
            _id: _id
        });

        // Evento que dá instrução à API para estar alerta ao click no marcador.
        // Define o conteúdo e abre a Info Window.
        google.maps.event.addListener(marker, 'click', function() {

            // Variável que define a estrutura do HTML a inserir na Info Window.
            // const iwContent = '<div id="iw_container">' +
            //     '<div class="iw_title"><b>' + rua + '</b></div>' +
            //     '<div class="iw_content">' + cidade + '<br />' +
            //     estado + '<br />' +
            //     cep + `</div> <div><img src=${foto}/> </div></div>`;
            
            preencherCampos(rua, cidade, estado, cep, foto, bairro, numero, mensagem, _id);
            // O conteúdo da variável iwContent é inserido na Info Window.
            // infoWindow.setContent(iwContent);
            // console.log(allRegisters)
            // A Info Window é aberta com um click no marcador.
            // infoWindow.open(map, marker);
        });
    }

    preencherCampos = (rua, cidade, estado, cep, foto, bairro, numero, mensagem, _id) => {
        document.getElementById('iLogradouro').value = rua
        document.getElementById('exibicaoRua').style.display = "inline"
        document.getElementById('iNum').value = numero
        document.getElementById('exibicaoNum').style.display = "inline"
        document.getElementById('iBairro').value = bairro
        document.getElementById('exibicaoBairro').style.display = "inline"
        document.getElementById('iCep').value = cep
        document.getElementById('exibicaoCep').style.display = "inline"
        document.getElementById('iCidade').value = cidade
        document.getElementById('exibicaoCidade').style.display = "inline"
        document.getElementById('iEstado').value = estado
        document.getElementById('exibicaoEstado').style.display = "inline"
        document.getElementById('iComentario').value = mensagem
        document.getElementById('exibicaoMensagem').style.display = "inline" 
        document.getElementById('preview').src = foto
        document.getElementById('edicao').value = _id
        document.getElementById('exibicaoFoto').style.display = "inline"
        
    
    }
}