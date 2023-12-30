
let qrtext= document.getElementById("qrtext");
let qrimg= document.getElementById("qrimg");
let downloadLink = document.getElementById("downloadLink");

downloadLink.classList.add("btnremove");
function myfunction(){
    if(qrtext.value.trim().length>0){
        qrimg.src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+qrtext.value;
        
        imgbox.classList.add("showimg");   
        downloadLink.href = qrimg.src;
        downloadLink.download = "qrcode.png";
        
        fetch(qrimg.src)
        .then(response => response.blob())
        .then(blob => {
            const blobURL = URL.createObjectURL(blob);
            downloadLink.href = blobURL;
        })
        .catch(error => console.error("Error fetching image:", error));
        
        downloadLink.classList.remove("btnremove");
    }
    else if(qrtext.value.length==0){
        qrimg.src="";
        imgbox.classList.remove("showimg");
        setTimeout(() => {
            alert("Enter URL");
        }, 300);
        
    }
    else if(qrtext.value.length=" "){
        qrimg.src="";
        imgbox.classList.remove("showimg");
        setTimeout(() => {
            alert("Input Empty!");
        }, 300);

        
    }

}


  

