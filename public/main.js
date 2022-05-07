function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


const img2 = document.getElementById('img-2');
const el2 = document.getElementById('section2-1');
const hiddenDiv2 = document.getElementById('hidden-2');
el2.addEventListener('mouseover', function handleMouseOver() {
    hiddenDiv2.style.display = 'block';
    // img2.style.filter = "brightness(50%)";
    // img2.style.filter = "blur(5px)";
    img2.style["-webkit-filter"] = "blur(5px) brightness(50%)";
    
});
el2.addEventListener('mouseout', function handleMouseOut() {
    hiddenDiv2.style.display = 'none';
    // img2.style.filter = "blur(0px)";
    // img2.style.filter = "brightness(100%)";
    img2.style["-webkit-filter"] = "blur(0px) brightness(100%)";
});


const img3 = document.getElementById('img-3');
const el3 = document.getElementById('div-img-3');
const hiddenDiv3 = document.getElementById('hidden-3');
el3.addEventListener('mouseover', function handleMouseOver() {
    hiddenDiv3.style.display = 'block';
    img3.style["-webkit-filter"] = "blur(5px) brightness(50%)";
});
el3.addEventListener('mouseout', function handleMouseOut() {
    hiddenDiv3.style.display = 'none';
    img3.style["-webkit-filter"] = "blur(0px) brightness(100%)";
});


const img4 = document.getElementById('img-4');
const el4 = document.getElementById('div-img-4');
const hiddenDiv4 = document.getElementById('hidden-4');
el4.addEventListener('mouseover', function handleMouseOver() {
    hiddenDiv4.style.display = 'block';
    img4.style["-webkit-filter"] = "blur(5px) brightness(50%)";

});
el4.addEventListener('mouseout', function handleMouseOut() {
    hiddenDiv4.style.display = 'none';
    img4.style["-webkit-filter"] = "blur(0px) brightness(100%)";
});


const img5 = document.getElementById('img-5');
const el5 = document.getElementById('div-img-5');
const hiddenDiv5 = document.getElementById('hidden-5');
el5.addEventListener('mouseover', function handleMouseOver() {
    hiddenDiv5.style.display = 'block';
    img5.style["-webkit-filter"] = "blur(5px) brightness(50%)";
});
el5.addEventListener('mouseout', function handleMouseOut() {
    hiddenDiv5.style.display = 'none';
    img5.style["-webkit-filter"] = "blur(0px) brightness(100%)";
});


const img6 = document.getElementById('img-6');
const el6 = document.getElementById('div-img-6');
const hiddenDiv6 = document.getElementById('hidden-6');
el6.addEventListener('mouseover', function handleMouseOver() {
    hiddenDiv6.style.display = 'block';
    img6.style["-webkit-filter"] = "blur(5px) brightness(50%)";
});
el6.addEventListener('mouseout', function handleMouseOut() {
    hiddenDiv6.style.display = 'none';
    img6.style["-webkit-filter"] = "blur(0px) brightness(100%)";
});


const img7 = document.getElementById('img-7');
const el7 = document.getElementById('div-img-7');
const hiddenDiv7 = document.getElementById('hidden-7');
el7.addEventListener('mouseover', function handleMouseOver() {
    hiddenDiv7.style.display = 'block';
    img7.style["-webkit-filter"] = "blur(5px) brightness(50%)";
});
el7.addEventListener('mouseout', function handleMouseOut() {
    hiddenDiv7.style.display = 'none';
    img7.style["-webkit-filter"] = "blur(0px) brightness(100%)";
});


const img8 = document.getElementById('img-8');
const el8 = document.getElementById('div-img-8');
const hiddenDiv8 = document.getElementById('hidden-8');
el8.addEventListener('mouseover', function handleMouseOver() {
    hiddenDiv8.style.display = 'block';
    img8.style["-webkit-filter"] = "blur(5px) brightness(50%)";
});
el8.addEventListener('mouseout', function handleMouseOut() {
    hiddenDiv8.style.display = 'none';
    img8.style["-webkit-filter"] = "blur(0px) brightness(100%)";
});


const img9 = document.getElementById('img-9');
const el9 = document.getElementById('section2-4');
const hiddenDiv9 = document.getElementById('hidden-9');
el9.addEventListener('mouseover', function handleMouseOver() {
    hiddenDiv9.style.display = 'block';
    img9.style["-webkit-filter"] = "blur(5px) brightness(50%)";
});
el9.addEventListener('mouseout', function handleMouseOut() {
    hiddenDiv9.style.display = 'none';
    img9.style["-webkit-filter"] = "blur(0px) brightness(100%)";
});

