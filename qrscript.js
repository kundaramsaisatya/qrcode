
let qrtext= document.getElementById("qrtext");
let qrimg= document.getElementById("qrimg");

function myfunction(){
    if(qrtext.value.length>0){
        qrimg.src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+qrtext.value;

        imgbox.classList.add("showimg");
    }
    else if(qrtext.value.length==0){
        qrimg.src="";
        imgbox.classList.remove("showimg");
        setTimeout(() => {
            alert("Enter URL");
        }, 300);
    }
}


  

