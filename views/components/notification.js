const html = document.querySelector('body');

( () => {
    const notification = document.createElement('div');
        notification.classList.add('fixed', 'top-24', 
        'right-8', 'rounded-md', 'text-white', 
        'hidden', 'p-4');

        notification.innerHTML = '<p></p>';
        notification.id = 'notification';
        html.append(notification);
})();

//Funcion para crear notificaciones
export const showNotification = (text, isError, notification) => {
        notification.children[0].innerHTML = text;
        notification.classList.add(`${isError ? 'bg-red-500' : 'bg-green-500'}`);
        notification.classList.remove('hidden');
        setTimeout(() =>{
            notification.classList.add('hidden');
        }, 5000);

}