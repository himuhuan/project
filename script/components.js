// noinspection JSJQueryEfficiency

/**
 * @author Himu
 * @file components.js
 * @brief 本文件描述了所有控件的行为
 */

/* According media screen to change some style */
const mScreenWidth = window.matchMedia('(max-width: 768px)');

$(document).click(function () {
    $(".home-searchbar").css("width", "250px");
    $(".bgbox").css({
        "transform": "scale(1.0)",
        "filter": "blur(0px)"
    });
    $(".daily-words").css("display", "none");
    $("#home-timer").css("display", "block");
    $(".home-sidebar").css("width", "0px");
})

$("#nav-index").click(function () {
    $(".dropdown-menu").slideDown(300);
});

/* mobile nav */
$("#nav-menu-button").click(function (event) {
    $("#nav-sidebar").css({
        "display": "flex",
        "width": "400px"
    });
    event.stopPropagation();
})

/* sidebar */
$("#nav-sidebar").mouseover(function () {
    if (!mScreenWidth.matches) {
        $("#nav-sidebar").css({
            "width": "150px",
            "height": "100vh",
            "top": "0",
            "position": "fixed"
        });
        $("#sidebar-tip").fadeOut("slow");
    }
}).mouseout(function () {
    if (!mScreenWidth.matches) {
        $("#nav-sidebar").css({
            "width": "0px",
            "height": "100%",
            "top": "0",
            "position": "fixed"
        });
    }
});

$(".dropdown-menu").mouseleave(function () {
    $(".dropdown-menu").slideUp(600);
}).mousedown(function () {
    $(".dropdown-menu").slideUp(300);
});

/**
 * daily words gen.
 * Himu 奇妙の伤感文学
 */
let dailyWords = [
    "奇迹、魔法，都是存在的",
    "要是别人说怀有希望是错误的事，不管几次我都一定会否定这句话，不管到什么时候。",
    "因为我找到了我的愿望，即使赌上性命去战斗也无所谓，我有了可以这样想的理由。",
    "无法回避的毁灭与叹息，一切都由你来颠覆即可，你具有的正是为此而生的力量。",
    `“要拯救你”这是我最初的心意，而到如今，这是最后留下的唯一路标。`,
    "我对普通的人类没有兴趣！",
    "如果樱花掉落的速度是每秒五厘米，那么两颗心要多久才能靠近？",
    "一个人要坚强的活下去，是很难的吧。",
    "自己喜欢的人的名字，不管什么状况都听得见吧！",
    "能哭的地方，只有厕所，和爸爸的怀里。",
    "将爱形容为美丽的，是不了解爱的人；将爱形容为丑陋的，是自以为了解爱的人。"
];


$("#search-bar").click(function (event) {
    if (mScreenWidth.matches) {
        $("#home-timer").css("display", "none");
    }
    $(".home-searchbar").css("width", "500px");
    $(".daily-words").fadeIn(2000)
        .text(dailyWords[Math.round(Math.random() * dailyWords.length)]);
    $(".tip-words").fadeOut("slow");
    $(".bgbox").css({
        "transform": "scale(1.1)",
        "filter": "blur(20px)"
    });
    event.stopPropagation();
}).on("keypress", function (event) {
    if (event.keyCode === 13) {
        let url = "https://cn.bing.com/search?q=";
        url += $("#search-bar").val();
        window.open(url, "_blank");
        $("#search-bar").val("");
    }
});

/* Autoplay backgrounds  */
let backgroundBoxes = document.getElementsByClassName("bgbox");
let bgIndex = 0;

function autoPlay() {
    for (let i = 1; i < backgroundBoxes.length; i++) {
        if (!backgroundBoxes[i].complete) {
            console.log(`image ${i} not load`);
            return;
        }
    }
    backgroundBoxes[bgIndex].classList.remove("bgbox-show");
    bgIndex++;
    bgIndex = bgIndex % backgroundBoxes.length;
    backgroundBoxes[bgIndex].classList.add("bgbox-show");
}

setInterval(autoPlay, 15000);

function timer() {
    let min = String(new Date().getMinutes()).padStart(2, '0');
    let hour = String(new Date().getHours()).padStart(2, '0');
    return `${hour} : ${min}`;
}

function updateTimer() {
    $("#home-timer").text(timer());
}

setInterval(updateTimer, 10000);

/* load theme according to time */
let gWebsiteThemeFlag;

function getThemeFlag() {
    if ($.cookie('theme') === undefined) {
        console.log("[User Cookie]: set to system theme.");
        const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
        $.cookie('theme', (themeMedia.matches) ? 'light' : 'dark', {expires: 7, path: '/'});
        return 0;
    } else
        return ($.cookie('theme') === 'light') ? 0 : 1;
}

function setTheme() {
    gWebsiteThemeFlag = getThemeFlag();
    console.log(gWebsiteThemeFlag);
    if (gWebsiteThemeFlag === 1) {
        console.log("[User Cookie]: set to dark theme");
        $("#main-nav").addClass("bg-dark").removeClass("bg-white")
            .removeClass("navbar-light").addClass("navbar-dark");
        $("#dropdown-list").addClass("dropdown-menu-dark");
        $(".himu-card").addClass("himu-card-dark");
        document.documentElement.style.setProperty("--bs-body-color", "#ffffff");
        document.documentElement.style.setProperty("--bs-body-bg", "#1f1f1f");
        document.documentElement.style.setProperty("--bs-secondary", "#e5e5e5");
    } else {
        console.log("[User Cookie]: set to light theme");

        $("#main-nav").addClass("bg-white").removeClass("bg-dark").addClass("opacity-85")
            .removeClass("navbar-dark").addClass("navbar-light");
        $(".himu-card").removeClass("himu-card-dark");
        $("#dropdown-list").removeClass("dropdown-menu-dark");
        document.documentElement.style.setProperty("--bs-body-color", "#000000");
        document.documentElement.style.setProperty("--bs-body-bg", "#ffffff");
        document.documentElement.style.setProperty("--bs-secondary", "#9f9f9f");
    }
    setBgBoxImage();
}

function changeTheme() {
    if (gWebsiteThemeFlag === 0) {
        $.cookie('theme', 'dark', {path: '/', expires: 7});
        gWebsiteThemeFlag = 1;
    } else {
        $.cookie('theme', 'light', {path: '/', expires: 7});
        gWebsiteThemeFlag = 0;
    }
    setTheme();
}

function setBgBoxImage() {
    for (let i = 0; i < backgroundBoxes.length; i++) {
        let src = backgroundBoxes[i].getAttribute("src");
        if (gWebsiteThemeFlag === 1) {
            backgroundBoxes[i].setAttribute("src",
                src.replace("Light", "Dark"));
        } else {
            backgroundBoxes[i].setAttribute("src",
                src.replace("Dark", "Light"));
        }
    }
}

function closeBanner(name) {
    $(name).slideUp(300);
}

function showModal(name) {
    $(name).fadeIn(500);
    setActiveModalTab("#modal-copyright-tab");
}

function hideModal(name) {
    $(name).fadeOut(300);
}

function setActiveModalTab(name) {
    $('.himu-modal-sidebar-link').removeClass("himu-active-link");
    let linkName = name + "-link";
    $(linkName).addClass("himu-active-link");
    $('.himu-modal-tab').hide();
    $(name).fadeIn(500);
}

function preloadBackground() {
    /* preload background */
    let images = [];
    function preload() {
        for (let i = 0; i < preload.arguments.length; i++) {
            images[i] = new Image();
            images[i].src = preload.arguments[i];
            console.log(`image ${preload.arguments[i]} loaded`);
        }
    }

    preload(
        "../images/backgrounds/Light/background1.jpg",
        "../images/backgrounds/Light/background2.jpg",
        "../images/backgrounds/Light/background3.jpg",
        "../images/backgrounds/Light/background4.jpg",
        "../images/backgrounds/Dark/background1.jpg",
        "../images/backgrounds/Dark/background2.jpg",
        "../images/backgrounds/Dark/background3.jpg",
        "../images/backgrounds/Dark/background4.jpg",
        "../images/backgrounds/Login/LoginBackground.jpg"
    );
}

