/**
 * @author Himu
 * @brief 本文件描述了index.html载入时的行为
 */

$(document).ready(function () {
    preloadBackground();
    updateTimer();
    setTheme();
    setActiveSubPageTab('#home-tab');
    setTimeout(function () { $('#start-tip').slideDown('slow'); }, 3000);
});
