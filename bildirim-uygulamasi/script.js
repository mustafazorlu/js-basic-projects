window.addEventListener('load', () => {
    //console.log(window.Notification);
    if(!window.Notification){
        return;
    }

    // Notification.requestPermission().then(sendNotification)

});

const sendNotification = (permission) =>{
    let notification = new Notification('yeni bildirim', {
        body: 'bildirim',
        icon: 'icon.png'
    });
    console.log();

    notification.onclick = () =>{
        window.location.href = 'https://www.youtube.com';
    }
}

const button = document.getElementById('button');
button.addEventListener('click', () => {
    Notification.requestPermission().then(sendNotification);
})