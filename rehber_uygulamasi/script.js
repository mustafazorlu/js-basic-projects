const ad = document.getElementById('ad');
const soyad = document.getElementById('soyad');
const mail = document.getElementById('mail');
const form = document.getElementById('form-rehber');
const kisiListesi = document.querySelector('.kisi-listesi');

form.addEventListener('submit',kaydet);
kisiListesi.addEventListener('click',kisiIslemleriniYap);

const tumKisilerDizisi = [];
let secilenSatir = undefined;

function kisiIslemleriniYap(e){
    

    if(e.target.classList.contains('btn--delete')){
        const silinecekTr = e.target.parentElement.parentElement;
        const silinecekMail = e.target.parentElement.previousElementSibling.textContent;
        rehberdenSil(silinecekTr,silinecekMail); 
    }else if(e.target.classList.contains('btn--edit')){
        document.querySelector('.kaydetGuncelle').value = 'Güncelle';
        const secilenTr = e.target.parentElement.parentElement;
        const guncellenecekMail = secilenTr.cells[2].textContent;

        ad.value = secilenTr.cells[0].textContent;
        soyad.value = secilenTr.cells[1].textContent;
        mail.value = secilenTr.cells[2].textContent;

        secilenSatir = secilenTr;
    }
    console.log(tumKisilerDizisi);
}



function rehberdenSil(silinecekTrElement,silinecekMail){
    silinecekTrElement.remove();
 
    tumKisilerDizisi.forEach((kisi,index) => {
        if(kisi.mail === silinecekMail) {
            tumKisilerDizisi.splice(index,1);
        }
    });

    // tumKisilerDizisi.filter(function(kisi,index){
    //     return kisi.mail
    // });

    alanlariTemizle();
    document.querySelector('.kaydetGuncelle').value = 'Kaydet';
    secilenSatir = undefined;
}

function kaydet(e){
    e.preventDefault();

    const eklenecekGuncellenecekKisi = {
        ad: ad.value,
        soyad: soyad.value,
        mail: mail.value

    }

    const gonderilenDeger = verileriKontrolEt(eklenecekGuncellenecekKisi);
    if(gonderilenDeger.durum){
        if(secilenSatir){
            kisiyiGuncelle(eklenecekGuncellenecekKisi);
        }else{
            kisiyiEkle(eklenecekGuncellenecekKisi);
        }
    }else{
        bilgiOlustur(gonderilenDeger.mesaj,gonderilenDeger.durum);
    }
}

function kisiyiGuncelle(kisi){
    for (let i = 0; i < tumKisilerDizisi.length; i++) {
        if(tumKisilerDizisi[i].mail === secilenSatir.cells[2].textContent){
            tumKisilerDizisi[i] = kisi;
            break;
        }
    }


    secilenSatir.cells[0].textContent = kisi.ad;
    secilenSatir.cells[1].textContent = kisi.soyad;
    secilenSatir.cells[2].textContent = kisi.mail; 

    document.querySelector('.kaydetGuncelle').value = 'Kaydet';
    secilenSatir = undefined;
    console.log(tumKisilerDizisi);
}

function kisiyiEkle(eklenecekKisi){
    const olusturulanTrElementi = document.createElement('tr');               
    olusturulanTrElementi.innerHTML = `
    <td>${eklenecekKisi.ad}</td>
    <td>${eklenecekKisi.soyad}</td>
    <td>${eklenecekKisi.mail}</td>
    <td>
        <button class="btn btn--edit"><i class="far fa-edit"></i></button>
        <button class="btn btn--delete"><i class="far fa-trash-alt"></i></button>
    </td>
    `;
    kisiListesi.appendChild(olusturulanTrElementi);
    tumKisilerDizisi.push(eklenecekKisi);
    console.log(tumKisilerDizisi);
    bilgiOlustur('Kişi rehbere kaydedildi','');

    
}

function verileriKontrolEt(kisi){
    for(const deger in kisi){
        if(kisi[deger]){
            console.log('veri bos degil');
        }else{
            const sonuc = {
                durum:false,
                mesaj:'Boş alan bırakmayınız'

            }
            return sonuc;
        }
        
    }
    alanlariTemizle();
    return {
        durum: true,
        mesaj: 'Kaydedildi'
    }
}

function bilgiOlustur(mesaj,durum){
    const olusturulanBilgi = document.createElement('div');
    olusturulanBilgi.textContent = mesaj;
    olusturulanBilgi.className = 'bilgi';
    
    olusturulanBilgi.classList.add(durum ? 'bilgi--success' : 'bilgi--error');
    document.querySelector('.container').insertBefore(olusturulanBilgi,form);

    setTimeout(function(){
        const silinecekDiv = document.querySelector('.bilgi');
        if(silinecekDiv){
            silinecekDiv.remove();
        }
    },1000)
}


function alanlariTemizle(){
    ad.value = '';
    soyad.value = '';
    mail.value = '';
}












// if(durum){
//     olusturulanBilgi.classList.add('bilgi--success');
// }else{
//     olusturulanBilgi.classList.add('bilgi--error');
// }