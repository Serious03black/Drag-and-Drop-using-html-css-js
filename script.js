const dropArea=document.getElementById("#drop-area")
const inputFile=document.getElementById("#input-file")
const imageView=document.getElementById(".Image-View")
 inputFile.addEventListener("change",uploadImage)
 function uploadImage(){
    var imgLInk = URL.createObjectURL(inputFile.files[0])
    imageView.style.background = `url(${imgLInk})`;

 }