//Begin Reservations-rooms

class Room{
    constructor(room, entry_date, exit_date, price){
        this.room = room;
        this.entry_date = entry_date;
        this.exit_date = exit_date;
        this.price = price;
    }
}
let reservations = [];

let rooms = [
    'Habitacion Matrimonial',
    'Habitacion Deluxe',
    'Habitacion Presidencial',
    'Habitacion Doble',
    'Habitacion Triple',
    'Habitacion Cuadruple'
]

let prices = [
    2500,
    5500,
    6500,
    2000,
    3000,
    3500
]


//***********BEGIN USER LOGIN***********//
function showLoginUser(){
    const $login_btn = document.querySelector('#login-btn');
    $login_btn.addEventListener('click', () => {
        let login_div = document.createElement('div');
        login_div.innerHTML = 
        `<div class="login-card">
            <div class="close" id="btn-close-login"><img src="./assets/img/svg/btn-close.svg" alt=""></div>
            <form class="login-card__form" id="login-form">
                <div class="username-container">
                    <label for="username">Username</label>
                    <input maxlength="10" type="text" id="username" placeholder="username">
                </div>
                <div class="password-container">
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="*******">
                </div>
                <button id="sumbit-login" type="submit">Log In</button>
            </form>
        </div>`;
        document.body.appendChild(login_div);
        login_div.className = 'reservation-card__background';
        login_div.setAttribute('style', 'display: flex;');
        document.body.setAttribute('style', 'overflow:hidden;')
        let $close = document.querySelector("#btn-close-login");
        $close.addEventListener('click', () =>{
            login_div.remove();
            document.body.setAttribute('style', 'overflow:auto;');
        })
        validateLogin(login_div);
    })
}

function validateLogin(login_div){
    const $username = document.querySelector('#username');
    const $password = document.querySelector('#password');
    const $btn_sumbit = document.querySelector('#sumbit-login');
    $btn_sumbit.addEventListener('click', () => {
        if ($password.value && $username.value){
            sessionStorage.setItem('Username', $username.value);
            sessionStorage.setItem('Password', $password.value);
            swal({
                title: 'HOTEL PREMIUM',
                text: '',
                icon: 'success'
            })
            login_div.remove();
            document.body.setAttribute('style', 'overflow:auto;');
            let user_loged = document.createElement('li');
            if(sessionStorage.getItem('Username') && sessionStorage.getItem('Password')){
                user_loged.innerHTML =`<a id="navbar__user" class="navbar__links" href="#">${$username.value}</a>`;
                document.querySelector('#navbar__item-login').remove();
                document.querySelector('.navbar__items').appendChild(user_loged);
            }
        }else{
            swal({
                title: 'HOTEL PREMIUM',
                text: 'Please complete all fields',
                icon: 'warning'
            })
        }
    })
}

function refreshPage(){
    window.onload = (el) =>{
        if(sessionStorage.getItem('Username') && sessionStorage.getItem('Password')){
            let user_loged = document.createElement('li');
            user_loged.innerHTML =`<a id="navbar__user" class="navbar__links" href="#">${sessionStorage.getItem('Username')}</a>`;
            document.querySelector('#navbar__item-login').remove();
            document.querySelector('.navbar__items').appendChild(user_loged);
        }
    }
}
//***********BEGIN USER LOGIN***********//


//***********BEGIN CONFIG DATE***********//
const msToDays = 1000 * 60 * 60 * 24;

function restringInputDates(){
    let $entry_date = document.querySelector('#entry-date');
    let $exit_date = document.querySelector('#exit-date');
    $entry_date.addEventListener('change', () =>{
        next_day = $entry_date.value.split('-');
        next_day[2] = parseInt(next_day[2]) < 10 ? ('0' + (parseInt(next_day[2]) + 1)) : ('' + (parseInt(next_day[2]) + 1));
        next_day = next_day.join('-');
        $exit_date.setAttribute('min', `${next_day}`);
        if ($entry_date.value >= $exit_date.value){
            $exit_date.value = next_day;
        }
    })
}

function setDefaultDate(date1, date2){
    let today = new Date();
    today = today.toISOString().split('T')[0];
    let one_year = new Date(Date.parse(today) + 31536000000);
    one_year = one_year.toISOString().split('T')[0];
    date1.value = today;
    date1.setAttribute('min', `${today}`);
    date1.setAttribute('max', `${one_year}`);

    let next_day = today.split('-');
    next_day[2] = parseInt(next_day[2]) < 10 ? ('0' + (parseInt(next_day[2]) + 1)) : ('' + (parseInt(next_day[2]) + 1));
    next_day = next_day.join('-');
    date2.value = next_day;
    date2.setAttribute('min', `${next_day}`);
    date2.setAttribute('max', `${one_year}`);
}
//***********END CONFIG DATES***********//


//***********BEGIN ROOMS SHOW***********//
function showSelectRooms(){
    let $select = document.querySelector('#select-room')
    rooms.forEach((ev, index) =>{
        let $option = document.createElement('option');
        $option.value = `${index}`;
        $option.innerHTML = `${ev}`;
        $select.appendChild($option);
    })
    restringInputDates();
    setPrices();
}

function changeSelectRooms(){
    let $select = document.querySelector('#select-room');
    $select.addEventListener('change', () =>{

        let $price_room = document.querySelector('#price-room');
        $price_room.textContent = prices[$select.value];
        let $title_room = document.querySelector('#title-room');
        $title_room.textContent = rooms[$select.value];
        $title_room.setAttribute('style', 'text-transform: uppercase;');
        setDefaultDate(document.querySelector('#entry-date'), document.querySelector('#exit-date'));
        setPrices();
    })
}
//***********END ROOMS SHOW***********//


//***********BEGIN SET PRICES***********//
function setPrices(){
    let $entry_date = document.querySelector('#entry-date');
    let $exit_date = document.querySelector('#exit-date');
    document.querySelector('#price-total').innerHTML = changePriceTotal($entry_date, $exit_date);
    $entry_date.addEventListener('change', () => {
        document.querySelector('#price-total').innerHTML = changePriceTotal($entry_date, $exit_date);
    })
    $exit_date.addEventListener('change', () => {
        document.querySelector('#price-total').innerHTML = changePriceTotal($entry_date, $exit_date);
    })
}

function changePriceTotal(date1, date2){
    let total_days;
    total_days = Math.floor((Date.parse(date2.value) - Date.parse(date1.value))/msToDays);
    return (total_days * parseInt(prices[document.querySelector('#select-room').value]));
}
//***********END SET PRICES***********//


//***********BEGIN CARD RESERVATION***********//
function showCardReserv(){
    let $rsv_btn = document.querySelectorAll('.reservation-btn');

    $rsv_btn.forEach((btn, index) => {
        btn.addEventListener('click', () =>{
            let $reserv_card = document.querySelector('.reservation-card__background');
            $reserv_card.setAttribute('style', 'display: flex;')
            document.querySelectorAll('option')[index].selected = true;
            let $price_room = document.querySelector('#price-room');
            $price_room.textContent = prices[index];
            let $title_room = document.querySelector('#title-room');
            $title_room.textContent = rooms[index];
            setDefaultDate(document.querySelector('#entry-date'), document.querySelector('#exit-date'));
            $title_room.setAttribute('style', 'text-transform: uppercase;');
            document.body.setAttribute('style', 'overflow: hidden;');
            setPrices();
        });
        changeSelectRooms();
    })
}

function closeCard(){
    let $btn_close = document.querySelector('#btn-close');
    $btn_close.addEventListener('click', () =>{
        document.querySelector('.reservation-card__background').setAttribute('style', 'display: none;');
        document.body.setAttribute('style', 'overflow: auto;');
    })
}
//***********END CARD RESERVATION***********//


//***********BEGIN SAVE RESERVATION***********//
function sumbitBtn(){

    let $sumbit_reserv = document.getElementById('form-reserv');
    $sumbit_reserv.onsubmit = (event) => {
        event.preventDefault();
        if(sessionStorage.getItem('Username') && sessionStorage.getItem('Password')){
            validateReserv();
        }else{
            swal({
                title: 'HOTEL PREMIUM',
                text: 'Please Log In',
                icon: 'warning'
            })
        }
    }
}

function validateReserv(){

    let room_index = document.querySelector('#select-room').value;
    let entry_date = document.querySelector('#entry-date').value;
    let exit_date = document.querySelector('#exit-date').value;
    let price = document.querySelector('#price-total').innerHTML;
    if (entry_date && exit_date){

        reservations.push(new Room(rooms[room_index], entry_date, exit_date, price));
        document.querySelector('#entry-date').value = '';
        document.querySelector('#exit-date').value = '';
        document.querySelector('#price-total').innerHTML = `0`;
        document.querySelector('.reservation-card__background').setAttribute('style', 'display: none');
        document.body.setAttribute('style', 'overflow: auto;');
        saveLocalStorage(reservations);
        swal({
            title: 'HOTEL PREMIUM',
            text: 'your reservation has been successfully saved',
            icon: 'success'
        })
    }else{
        swal({
            title: 'HOTEL PREMIUM',
            text: 'Please complete all fields',
            icon: 'warning'
        })
    }

}

function saveLocalStorage(array){
    array = JSON.stringify(array);
    localStorage.setItem('Reservations', array);
}
//***********END SAVE RESERVATION***********//


function main(){
    refreshPage();
    showLoginUser();
    showSelectRooms();
    showCardReserv();
    closeCard();
    sumbitBtn();
}

main();