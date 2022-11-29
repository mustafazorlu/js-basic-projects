//basliktaki saat

const dakikaText = document.getElementById("dakika"); //basliktaki saatin dakika kismini seciyoruz
const saniyeText = document.getElementById("saniye"); //basliktaki saatin saniye kismini seciyoruz


//input elementleri
const secilenDakika = document.getElementById("secilen_dakika"); //dakika inputunu seciyoruz
const secilenSaniye = document.getElementById("secilen_saniye"); //saniye inputunu seciyoruz

//butonlar
const baslatButonu = document.getElementById("baslat");
const sifirlaButonu = document.getElementById("sifirla");

//--------------------

//event listenerlar

secilenDakika.addEventListener("change",() => {
    dakikaText.textContent = secilenDakika.value;
});

secilenSaniye.addEventListener("change", () => {
    saniyeText.textContent = secilenSaniye.value < 10 ? "0" + secilenSaniye.value : secilenSaniye.value;
})

baslatButonu.addEventListener("click",startTimer);

//fonksiyonlar

function startTimer(){
    let dk = dakikaText.textContent;
    let sn = saniyeText.textContent;

    const interval = setInterval(() =>{
        sn--;
        sn = sn < 10 ? "0" + sn : sn;
        if(sn == "0-1"){
            dk--;
            sn = 59;
            
        }
        if(dk == 00 && sn == 00 || dk == 0 && sn == 0){
            clearInterval();
            window.alert("Süre Doldu ! ! !");
            
        }
        dakikaText.textContent = dk;
        saniyeText.textContent = sn;
    },1000);

}



