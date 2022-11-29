// var data = fetch("data.json")
// .then(cevap => cevap.json())
// .then(veri => {
//     console.log(veri);
//     console.log(veri.kisiler);
//     console.log(veri.kisiler[1].dogumYeri);
//     console.log(veri.meslekler);
//     console.log(veri.meslekler[0]);
//     console.log(veri.meslekler[1]);
// });
var body = document.getElementsByTagName("BODY");
var listele = document.getElementById("listele");
var album = document.getElementById("album");
// let data = fetch("https://jsonplaceholder.typicode.com/posts")
// .then(cevap => cevap.json())
// .then(veri => {
//     veri.forEach(element => {
//         if(element.id <=100){
//             listele.innerHTML += `<li>${element.title} </li>`;           
//         }
//     })
// });

let data = fetch("https://jsonplaceholder.typicode.com/photos")
    .then(cevap => cevap.json())
    .then(veri => {
        veri.forEach(element => {
            if (element.id <= 1000) {
                album.innerHTML += `<img src="${element.url}">`;
            }
        })

    })