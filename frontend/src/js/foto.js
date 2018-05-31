
var fotoInput = document.getElementById('fotoInput');
var fotopreview = document.getElementById('fotopreview');

fotoInput.addEventListener('change', function(e) {
    showThumbnail(this.files);
});

function showThumbnail(files) {
    if (files && files[0]) {
    var reader = new FileReader();
    
    reader.onload = function (e) {
        console.log(e)
       fotopreview.src = e.target.result;
    }

        reader.readAsDataURL(files[0]);
    }
}