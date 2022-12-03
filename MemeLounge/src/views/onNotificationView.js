let notificationDiv = document.querySelector('.notification');
let notificationSpan = document.querySelector('.notification>span');

export async function onNotification(message){
    notificationDiv.style.display = 'block';
    notificationSpan.textContent = message;
    await new Promise(resolve => setTimeout(resolve, 3000));
    notificationDiv.style.display = 'none';
    notificationSpan.textContent = "";
}
