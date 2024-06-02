// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html,
// котра має детальну інфорацію про об'єкт на який клікнули
//
//
// На сторінці user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (ендпоінт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Кожному посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html,
//     котра має детальну інфу про поточний пост.
//
//     На сторінці post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста
// (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
//
// Стилизація проєкта -
// index.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під інформацією про user.
//     user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
//     блоки з короткою іфною про post - в ряд по 5 .
//     post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
//     Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки
//     (дати фон. марджини і тд)
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        localStorage.setItem('users', JSON.stringify(users));

        users.forEach(user => {
            const userContainer = document.createElement('div');
            userContainer.classList.add('userContainer');
            const userIdNameContainer = document.createElement('div');
            userIdNameContainer.classList.add('userIdNameContainer')
            const userID = document.createElement('h3');
            userID.id = 'userID';
            const userName = document.createElement('h4');
            userName.id = 'userName';
            const infoButton = document.createElement('button');
            infoButton.id = 'userInfoButton';
            infoButton.textContent = 'INFORMATION'

            userID.textContent = `ID: ${user.id}`;
            userName.textContent = `Name: ${user.name}`;

            infoButton.addEventListener('click', function(){
                window.location.href = `user-details.html?id=${user.id}`;
            });

            userIdNameContainer.append(userID, userName);
            userContainer.append(userIdNameContainer, infoButton);
            document.body.appendChild(userContainer);
        });
    });