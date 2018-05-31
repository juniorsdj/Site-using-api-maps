let coordenadas

function initMap() {
    let lagarto = {
        lat: -10.916944,
        lng: -37.65
    };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: lagarto
    });
    let marker = null;


    var infoWindow = new google.maps.InfoWindow({
        map: map
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            coordenadas = pos
            marker = new google.maps.Marker({
                position: pos,
                map: map
            });
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    map.addListener("click", props => {
        if (!marker) {
            marker = new google.maps.Marker({
                position: props.latLng,
                map: map
            });
            coordenadas = {
                lat: marker.position.lat(),
                lng: marker.position.lng()
            }
        } else {
            marker.setMap(null)
            marker = null;
            console.log(coordenadas)
        }
    })
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: O serviço de Georreferenciamento falhou.' :
        'Error: Seu browser não suporta o serviço.');
}






// function mostrarFoto() {
//     const formUpload = document.getElementById('upload')
//     const preview = document.getElementById('preview')
//     i = 0;
//     $formUpload.addEventListener('submit', function(event) {
//         event.preventDefault();

//         var xhr = new XMLHttpRequest();

//         xhr.open("POST", $formUpload.getAttribute('action'));

//         var formData = new FormData($formUpload);
//         formData.append("i", i++);
//         xhr.send(formData);

//         xhr.addEventListener('readystatechange', function() {
//             if (xhr.readyState === 4 && xhr.status == 200) {
//                 var json = JSON.parse(xhr.responseText);

//                 if (!json.error && json.status === 'ok') {
//                     $preview.innerHTML += '<br />Enviado!!';
//                 } else {
//                     $preview.innerHTML = 'Arquivo não enviado';
//                 }

//             }
//         });

//         xhr.upload.addEventListener("progress", function(e) {
//             if (e.lengthComputable) {
//                 var percentage = Math.round((e.loaded * 100) / e.total);
//                 $preview.innerHTML = String(percentage) + '%';
//             }
//         }, false);

//         xhr.upload.addEventListener("load", function(e) {
//             $preview.innerHTML = String(100) + '%';
//         }, false);

//     }, false);


// }