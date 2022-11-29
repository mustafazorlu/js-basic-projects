class Kisi{
    constructor(ad,soyad,mail){
        this.ad = ad;
        this.soyad = soyad;
        this.mail = mail; 
    }
}

class Util{
    static bosAlanKontrolEt(...alanlar){
        let sonuc = true;
        alanlar.forEach(alan => {
            if(alan.length === 0){
                sonuc = false;
                return false;
            }
        });
        return sonuc;
    }

    static emailGecerliMi(email){
        
    }
}

class Ekran{
    constructor(){
        this.ad = document.getElementById('ad');
        this.soyad = document.getElementById('soyad');
        this.mail = document.getElementById('mail');
        this.ekleGuncelleButonu = document.querySelector('.kaydetGuncelle');
        this.form = document.getElementById('form-rehber');
        this.form.addEventListener('submit',this.kaydetGuncelle.bind(this));
        this.kisiListesi = document.querySelector('.kisi-listesi');
        this.kisiListesi.addEventListener('click',this.guncelleVeyaSil.bind(this));
        this.depo = new Depo();
        this.secilenSatir = undefined;
        this.kisileriEkranaYazdir();
    }

    alanlarıTemizle(){
        this.ad.value = '';
        this.soyad.value = '';
        this.mail.value = '';
        
    }

    guncelleVeyaSil(e){
        const tiklanmaYeri = e.target;
        if(tiklanmaYeri.classList.contains('btn--delete')){
            this.secilenSatir = tiklanmaYeri.parentElement.parentElement;
            this.kisiyiEkrandanSil();
        }else if(tiklanmaYeri.classList.contains('btn--edit')){
            this.secilenSatir = tiklanmaYeri.parentElement.parentElement;
            this.ekleGuncelleButonu.value = 'Güncelle';
            this.ad.value = this.secilenSatir.cells[0].textContent;
            this.soyad.value = this.secilenSatir.cells[1].textContent;
            this.mail.value = this.secilenSatir.cells[2].textContent;
            
        }
        console.log(this);
    }

    kisiyiEkrandaGuncelle(kisi){
        this.depo.kisiGuncelle(kisi,this.secilenSatir.cells[2].textContent);
        this.secilenSatir.cells[0].textContent = kisi.ad;
        this.secilenSatir.cells[1].textContent = kisi.soyad;
        this.secilenSatir.cells[2].textContent = kisi.mail;
        this.alanlarıTemizle();
        this.secilenSatir = undefined;
        this.ekleGuncelleButonu.value = 'Kaydet';
        this.bilgiOlustur('Kisi güncellendi',true);
    }

    kisiyiEkrandanSil(){
        this.secilenSatir.remove();
        const silinecekMail = this.secilenSatir.cells[2].textContent;
        this.depo.kisiSil(silinecekMail);
        this.alanlarıTemizle();
        this.secilenSatir = undefined;
        this.bilgiOlustur('Kisi rehberden silindi',true);
    }

    kisileriEkranaYazdir(){
        this.depo.tumKisiler.forEach(kisi => {
            this.kisiyiEkranaEkle(kisi);
        });
    }

    kisiyiEkranaEkle(kisi){
        const olusturulanTr = document.createElement('tr');
        olusturulanTr.innerHTML = `
        <td>${kisi.ad}</td>
        <td>${kisi.soyad}</td>
        <td>${kisi.mail}</td>
        <td>
            <button class="btn btn--edit"><i class="far fa-edit"></i></button>
            <button class="btn btn--delete"><i class="far fa-trash-alt"></i></button>
        </td>
        `;
        this.kisiListesi.appendChild(olusturulanTr);
        
    }

    kaydetGuncelle(e){
        e.preventDefault();
        const kisi = new Kisi(this.ad.value, this.soyad.value, this.mail.value);
        // console.log(kisi);
        const sonuc = Util.bosAlanKontrolEt(kisi.ad,kisi.soyad,kisi.mail);
        //tum alanlar icin
        if(sonuc){

            if(this.secilenSatir){
                //secilen satir undifined değilse güncelleme yap diyorum
                this.kisiyiEkrandaGuncelle(kisi);

            }else{
                this.bilgiOlustur('Başarıyla Eklendi',true);
                this.kisiyiEkranaEkle(kisi);
                this.depo.kisiEkle(kisi);
            }


            
            this.alanlarıTemizle();
        }else{
            console.log('bos alan var');
        }
    }

    bilgiOlustur(mesaj,durum){
        const uyariDivi = document.querySelector('.bilgi');
        uyariDivi.textContent = mesaj;
        uyariDivi.classList.add(durum ? 'bilgi--success' : 'bilgi--error');
    
        setTimeout(function(){
               uyariDivi.className = 'bilgi';
        },1000)
    }
}

class Depo{
    constructor(){
        this.tumKisiler = this.kisileriGetir();
    }
    kisileriGetir(){
        let tumKisilerLocal;
        if(localStorage.getItem('tumKisiler') === null){
            tumKisilerLocal = [];
        }else{
            tumKisilerLocal = JSON.parse(localStorage.getItem('tumKisiler'));
        }
        return tumKisilerLocal;
    }
    kisiEkle(kisi){
        this.tumKisiler.push(kisi);
        localStorage.setItem('tumKisiler',JSON.stringify(this.tumKisiler));
    }
    kisiSil(mail){
        this.tumKisiler.forEach((kisi,index) => {
            if(kisi.mail === mail){
                this.tumKisiler.splice(index,1);
            }
        })
        localStorage.setItem('tumKisiler',JSON.stringify(this.tumKisiler));
    }
    kisiGuncelle(guncellenmisKisi,mail){
        this.tumKisiler.forEach((kisi,index) => {
            if(kisi.mail === mail){
                this.tumKisiler[index] = guncellenmisKisi;
            }
        })
        localStorage.setItem('tumKisiler',JSON.stringify(this.tumKisiler));
    }
}

document.addEventListener('DOMContentLoaded',function(e){
    const ekran = new Ekran();
});

