// 共有定数
const SRVURL = location.protocol + "//" + location.hostname + ":" + location.port;
console.log(SRVURL);
// const SRVURL = "https://yskliveserverpwrdbyggl.on.drv.tw/online/html_servers/rumble.com/";

{
    // 使用言語選択
    // const userlang = navigator.language;
    const userlang = "en";
    console.log(userlang);
    setUseLang(userlang);
}

// 言語設定
function setUseLang(lang) {
    const ja_span = document.getElementsByClassName("lang_ja");
    const en_span = document.getElementsByClassName("lang_en");
    if (ja_span.length == 0) { return; }
    if (ja_span.length == 0) { return; }
    switch (lang) {
        case "ja":
            for (let i = 0; i < ja_span.length; i++) {
                ja_span[i].classList.remove("invisible");
                en_span[i].classList.add("invisible");
            }
            break;
            
        case "en":
        default:
            for (let i = 0; i < ja_span.length; i++) {
                ja_span[i].classList.add("invisible");
                en_span[i].classList.remove("invisible");
            }
            break;
    }
}

function changelang(lang) {
    console.log("changed to " + lang);
    setUseLang(lang);
}

// Get URL Params
function getprm(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


// Element
const bgmenuBtn = document.getElementById("barger-menu-btn");
const bgmenuList = document.getElementById("barger-menu-list");
const bgmenuListItems = document.getElementsByClassName("h-nav-list-item");

// Click Event
document.addEventListener('click', (event) => {
    event.preventDefault();
    const tg = event.target;
    if (tg.closest('.barger-menu-btn')) {
        // btnクリックでメニュー展開
        bgmenuBtn.classList.toggle("active");
        bgmenuList.classList.toggle("panelactive");
    } else if(!tg.closest('.barger-menu-list') && !tg.closest('.barger-menu-btn')) {
        // barger-menu-list, barger-menu-btn外をクリック
        if (bgmenuBtn.className.split(" ").includes("active")) {
            // バーガーメニューが展開されているとき格納
            bgmenuBtn.classList.remove("active");
            bgmenuList.classList.remove("panelactive");
        } else if (tg.closest('a')) {
            // クリック対象が,その他のaタグの時
            let href = tg.closest('a').getAttribute("href");
            console.log(href);
            if (href.match(/^#./)) {
                // ページ内リンクの時
                // スムーズ スクロール
                let linked_id = document.getElementById(href.replace('#', ''));
                const rect = linked_id.getBoundingClientRect().top;
                const offset = window.pageYOffset;
                const position = rect + offset;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            } else {
                // 外部リンクの時
                window.location.href = tg.closest('a').getAttribute("href");
            }
        }
    }
}, false);

for (let i = 0; i < bgmenuListItems.length; i++) {
    const element = bgmenuListItems[i].lastElementChild;
    element.addEventListener("click", () => {
        // メニューバーのリンククリックでメニュー格納 & 遷移
        bgmenuBtn.classList.remove("active");
        bgmenuList.classList.remove("panelactive");
        window.location.href = element.getAttribute('href');
    });
}

// セキュリティ
const imgtags = document.getElementsByTagName("img");
for (let imgtag of imgtags) {
    imgtag.oncontextmenu = function(){ return false; }
    // imgtags[i].oncontextmenu = function(){ return false; }
    // imgtags[i].onselectstart = function(){ return false; };
    // imgtags[i].onmousedown = function(){ return false; };
}
// document.body.oncontextmenu = function(){ return false; }
// document.body.onselectstart = function(){ return false; };
// document.body.onmousedown = function(){ return false; };
document.getElementsByTagName("img").oncontextmenu = function(){ return false; }
