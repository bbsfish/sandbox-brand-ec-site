const allHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
);
// const imgHeight = elem.offsetHeight;
const imgHeight = 1000;
// const maxScrollVolume = elemHeight - window.innerHeight;
const rate = imgHeight/allHeight;
console.log(allHeight);
console.log(rate);
document.addEventListener("scroll", function(){
    const currentScrollVolume = window.pageYOffset || document.documentElement.scrollTop;
    document.body.style.backgroundPositionY = -1 * Math.floor(currentScrollVolume * rate * 0.5) + "px";
});