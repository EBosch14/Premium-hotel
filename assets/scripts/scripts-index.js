//Begin Carrousel-background
const $slider = document.querySelector("#carrousel");
let $sliderSection = document.querySelectorAll(".gallery-background__mobile__section");
let $sliderSectionLast = $sliderSection[$sliderSection.length -1];

const btnLeft = document.querySelector("#buttom-left");
const btnRight = document.querySelector("#buttom-right");

$slider.insertAdjacentElement("afterbegin", $sliderSectionLast);

function Next(){
    let $sliderSectionFrist = document.querySelectorAll(".gallery-background__mobile__section")[0];
    $slider.style.marginLeft = "-200%";
    $slider.style.transition = "all 1s";
    setTimeout(function(){
        $slider.style.transition = "none";
        $slider.insertAdjacentElement("beforeend", $sliderSectionFrist)
        $slider.style.marginLeft = "-100%";
    }, 1000);
}

btnRight.addEventListener("click", function(){
    Next();
})

function Prev(){
    let $sliderSection = document.querySelectorAll(".gallery-background__mobile__section");
    let $sliderSectionLast = $sliderSection[$sliderSection.length -1];
    $slider.style.marginLeft = "0";
    $slider.style.transition = "all 1s";
    setTimeout(function(){
        $slider.style.transition = "none";
        $slider.insertAdjacentElement("afterbegin", $sliderSectionLast)
        $slider.style.marginLeft = "-100%";
    }, 1000);
}

btnLeft.addEventListener("click", function(){
    Prev();
})

setInterval(function(){
    Next();
}, 6000)

//End carrousel-background
//
//
