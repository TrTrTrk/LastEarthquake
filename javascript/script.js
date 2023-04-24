const keyArr = ["earthquakeOccurredTime", "epicenterName", "depth", "magnitude","hiddenLastTime"];

//1分で呼ばれる関数
function clock() {

    if (checkHiddenLastTimeVisible == false)
        return;

    let targetLastTime = hiddenLastTime.innerText;

    let time = Date.now() - new Date(targetLastTime).getTime(); //タイムスタンプで計算する  

    let sec = Math.floor(time / 1000) % 60;         //秒を求める
    let min = Math.floor(time / 1000 / 60) % 60;      //分を求める。
    let hours = Math.floor(time / 1000 / 60 / 60) % 24; //時間を求める
    let day = Math.floor(time / 1000 / 60 / 60 / 24); //日を取得

    document.querySelector("#dispTime").innerText = `${day} 日 ${hours} 時間 ${min} 分 ${sec} 秒`; // 文字列を出力

}

//時間を表示する要素が表示されているか
function checkHiddenLastTimeVisible() {

    let hiddenLastTime = document.getElementById("hiddenLastTime")

    if (hiddenLastTime === null || hiddenLastTime.innerText == '')
        return false;

    return true;

}

//引数のいずれかがnullなら
function checkNullArgs(...theArgs) {

    for (let element of theArgs) {
        if (element === null) return true;
    }
    return false;

}

//引数のInnerTextいずれかが空文字なら
function checkNullStringArgs(...theArgs) {

    for (let element of theArgs) {
        if (element.innerText === '') return true;
    }
    return false;

}

function checkAllLocalStorage() {

    for (const element of keyArr) {
        if (localStorage.getItem(element) === null || localStorage.getItem(element) === '') return false;
    }
    return true;

}

//ブラウザに保存
function setLacalStrageFromElement() {

    let earthquakeOccurredTime = document.getElementById("earthquakeOccurredTime");
    let epicenterName = document.getElementById("epicenterName");
    let depth = document.getElementById("depth");
    let magnitude = document.getElementById("magnitude");
    let hiddenLastTime = document.getElementById("hiddenLastTime");

    if (checkNullArgs(earthquakeOccurredTime, epicenterName, depth, magnitude) || checkNullStringArgs(earthquakeOccurredTime, epicenterName, depth, magnitude))
        return false;

    localStorage.setItem('earthquakeOccurredTime', earthquakeOccurredTime.innerText);
    localStorage.setItem('epicenterName', epicenterName.innerText);
    localStorage.setItem('depth', depth.innerText);
    localStorage.setItem('magnitude', magnitude.innerText);
    localStorage.setItem('hiddenLastTime', hiddenLastTime.innerText);

    return true;

}

//ブラウザに保存したデータを表示する
function setElementGetLacalStrage() {

    let earthquakeOccurredTime = localStorage.getItem('earthquakeOccurredTime');
    let epicenterName = localStorage.getItem('epicenterName');
    let depth = localStorage.getItem('depth');
    let magnitude = localStorage.getItem('magnitude');
    let hiddenLastTime = localStorage.getItem('hiddenLastTime');
    
    if (checkNullArgs(earthquakeOccurredTime, epicenterName, depth, magnitude) || checkNullStringArgs(earthquakeOccurredTime, epicenterName, depth, magnitude))
        return false;

    document.getElementById("earthquakeOccurredTime").innerText = earthquakeOccurredTime;
    document.getElementById("epicenterName").innerText = epicenterName;
    document.getElementById("depth").innerText = depth;
    document.getElementById("magnitude").innerText = magnitude;
    document.getElementById("hiddenLastTime").innerText = hiddenLastTime;

    return true;

}

//地震情報と経過時間を非表示しているclassを削除する
function removeDispNone() {

    var targetClasses = document.getElementsByClassName("dispNon");

    Array.from(targetClasses).forEach(element => {
        element.classList.remove("dispNon");
    });

}

function changeDispData() {

    var failedGetData = document.getElementById("failedGetData");
    var NoData = document.getElementById("NoData");

    if (failedGetData != null) failedGetData.classList.add("dispNon");
    if (NoData != null) NoData.classList.add("dispNon");

}


function removeAllLocalStorage(...theArgs) {

    for (const element of keyArr) {
        localStorage.removeItem(element);
    }

}

function timerMethods() {

    setInterval(clock, 1000);
    setTimeout(() => { window.location.reload(); }, 300000); //5分後にページ再読み込み → 600000に変更

}

window.addEventListener("load", function () {

    if (checkHiddenLastTimeVisible() == false && checkAllLocalStorage() == false) {
        return;
    }

    if (checkHiddenLastTimeVisible()) {

        timerMethods();
        setLacalStrageFromElement(); //localStorageにデータを保存する

    }
    else if (checkAllLocalStorage()) {

        removeDispNone();
        changeDispData();
        setElementGetLacalStrage();      
        timerMethods();

    }

});

