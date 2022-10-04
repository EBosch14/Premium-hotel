//Begin Reservations-rooms

class Room{
    constructor(room, entry_date, exit_date, price){
        this.room = room;
        this.entry_date = entry_date;
        this.exit_date = exit_date;
        this.price = price;
    }
}

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

const msToDays = 1000 * 60 * 60 * 24;

function showSelectRooms(){
    let $select = document.querySelector('#select-room')
    rooms.forEach((ev, index) =>{
        let $option = document.createElement('option');
        $option.value = `${index}`;
        $option.innerHTML = `${ev}`;
        $select.appendChild($option);
    })
}

function changeSelectRooms(){
    let $select = document.querySelector('#select-room');
    $select.addEventListener('change', () =>{
        let $price_room = document.querySelector('#price-room');
        $price_room.textContent = prices[$select.value];
        let $title_room = document.querySelector('#title-room');
        $title_room.textContent = rooms[$select.value];
        $title_room.setAttribute('style', 'text-transform: uppercase;');
        let $entry_date = document.querySelector('#entry-date');
        $entry_date.value = '';
        let $exit_date = document.querySelector('#exit-date');
        $exit_date.value = '';
        let $price_total = document.querySelector('#price-total');
        $price_total.innerHTML = 0;
    })
    
}


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
            $title_room.setAttribute('style', 'text-transform: uppercase;');
            document.body.setAttribute('style', 'overflow: hidden;')
        });
    })
}

function sumbitBtn(){

    let $sumbit_reserv = document.querySelector('#form-reserv');
    let $select = document.querySelector('#select-room');
    let $entry_date = document.querySelector('#entry-date');
    let $exit_date = document.querySelector('#exit-date');

    restringInputDates($entry_date, $exit_date);
    setDatesAndPrices($entry_date, $exit_date);
    
}

function setDatesAndPrices(date1, date2){
    let entry_date;
    let exit_date;
    let total_days;
    date1.addEventListener('change', () =>{
        entry_date = date1.value;
    })
    date2.addEventListener('change', () =>{
        exit_date = date2.value;
        total_days = Math.floor((Date.parse(exit_date) - Date.parse(entry_date))/msToDays);
        //console.log(total_days);
        const $price_room = document.querySelector('#price-room');
        let $price_total = document.querySelector('#price-total');
        $price_total.innerHTML = `${total_days * parseInt($price_room.innerHTML)}`;
    })
}

function restringInputDates(date1, date2){
    let today = new Date();
    today = today.toISOString().split('T')[0];
    let one_year = new Date(Date.parse(today) + 31536000000);
    one_year = one_year.toISOString().split('T')[0];
    date1.setAttribute('min', `${today}`);
    date1.setAttribute('max', `${one_year}`);
    date2.setAttribute('min', `${today}`);
    date2.setAttribute('max', `${one_year}`);
}

function main(){
    showCardReserv();
    showSelectRooms();
    changeSelectRooms();
    sumbitBtn();
}

main();