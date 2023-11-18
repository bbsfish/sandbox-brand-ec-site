const elem = document.querySelector("#wallpaper"); // IMG:wallpaper

const allHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
);

const imgHeight = elem.offsetHeight;
// const maxScrollVolume = elemHeight - window.innerHeight;
const rate = imgHeight/allHeight;
console.log(allHeight);
console.log(rate);
document.addEventListener("scroll", function(){
    const currentScrollVolume = window.pageYOffset || document.documentElement.scrollTop;
    // console.log(currentScrollVolume);
    elem.style.top = (currentScrollVolume * rate) + "px";
});