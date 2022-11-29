const startBtn = document.getElementById("start"); //oyunu baslatmak icin bastıgımız buton
const scoreText = document.getElementById("score"); //oyunda kazandıgımız her puanı tutan metin alanı
const kostebekler = document.querySelectorAll(".kostebek"); // kostebeklerin hepsini tutmamızı saglayan
let oncekiKostebek;
let sureDoldu = false;
let skor = 0;
function rastgeleKostebek(){ //kostebekleri rastgele cagırmak icin yazdigimiz fonksiyon
    const sira = Math.floor(Math.random() * kostebekler.length); //0 dan 6 ya kadar (6 dahil degil) sayı olusturuyoruz
    console.log();
    const secilenKostebek = kostebekler[sira]; //secilen kostebekler
    console.log(sira);
    
    
    if(oncekiKostebek == secilenKostebek){ //onceki kostebek 
        return rastgeleKostebek();
    }else{
        oncekiKostebek = secilenKostebek;
        console.log("else girdi");
    }
    // debugger;
    return secilenKostebek;
    
    
}

function rastgeleSure(min,max){
    const sure = Math.round(Math.random() * (max - min) + min); //bu kısım yaklasık 1000 ile 1500 arası deger alır
    // console.log(sure);
    return sure; //sureyi geri dondurur
}

function yukari(){
    const kostebek = rastgeleKostebek();
    const sure = rastgeleSure(1000,1500);
    kostebek.classList.add("secilen");
    setTimeout(() => {
        kostebek.classList.remove("secilen");
        if(!sureDoldu){
            yukari();
        }
    },sure);
}

function startGame(){
    yukari();
    setTimeout(() => {
        sureDoldu = true;
    },15000)
}

function peep(e){
    if(e.target.classList.contains("secilen")){
        skor++;
        e.target.classList.remove("secilen");
    }
    scoreText.textContent = skor;
}

startBtn.addEventListener("click", () => {
    startGame();
})

kostebekler.forEach(kostebek => {
    kostebek.addEventListener("click", peep);
})