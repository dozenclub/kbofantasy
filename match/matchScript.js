// 매치 요약 데이터 샘플
var matchSummaryData = [
    {
        home:"깡",
        away:"달",
        // 전일누적
        cumulhome:194,
        cumulaway:128,
        // 금일
        todayhome:11,
        todayaway:-11,
        // 합계
        totalhome:205,
        totalaway:117
    },
    {
        home:"놉",
        away:"비",
        cumulhome:193,
        cumulaway:128,
        todayhome:11,
        todayaway:-11,
        totalhome:204,
        totalaway:117
    },
    {
        home:"쌤",
        away:"요",
        cumulhome:192,
        cumulaway:128,
        todayhome:11,
        todayaway:-11,
        totalhome:203,
        totalaway:117
    }
]

// 매치 상세 데이터 샘플
var matchDetailData = [
    {
        home:"깡",
        away:"달",
        // 월요일 포지션별 포인트
        monhome: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        monaway: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        // 화요일 포지션별 포인트
        tuehome: [18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1],
        tueaway: [18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1],
        // 수요일 포지션별 포인트
        wedhome: null,
        wedaway: null,
        // 목요일 포지션별 포인트
        thuhome: null,
        thuaway: null,
        // 금요일 포지션별 포인트
        frihome: null,
        friaway: null,
        // 토요일 포지션별 포인트
        sathome: null,
        sataway: null,
        // 일요일 포지션별 포인트
        sunhome: null,
        sunaway: null
    },
    {
        home:"놉",
        away:"비",
        monhome: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        monaway: [18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1],
        tuehome: [18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1],
        tueaway: [18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1],
        wedhome: null,
        wedaway: null,
        thuhome: null,
        thuaway: null,
        frihome: null,
        friaway: null,
        sathome: [18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1],
        sataway: [18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1],
        sunhome: null,
        sunaway: null
    },
    {
        home:"쌤",
        away:"요",
        monhome: null,
        monaway: null,
        tuehome: [18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1],
        tueaway: [18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1],
        wedhome: null,
        wedaway: null,
        thuhome: null,
        thuaway: null,
        frihome: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        friaway: [18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1],
        sathome: [18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1],
        sataway: [18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1],
        sunhome: [18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1],
        sunaway: [18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]
    }
]

// 매치 주차 정보 샘플
var matchWeeksData = [
    1,
    3,
    5,
    6
]

// 전역 변수
var matchIndex = 0;
var matchDetailIsHidden = true;
var matchDetailIndex = 0;
var matchDetailDayDictionaryCap = {1:"Mon", 2:"Tue", 3:"Wed", 4:"Thu", 5:"Fri", 6:"Sat", 7:"Sun"};
var matchDetailDayDictionaryLow = {1:"mon", 2:"tue", 3:"wed", 4:"thu", 5:"fri", 6:"sat", 7:"sun"};

function createMatchSummaryLine(n) {
    var innerHTMLString = '<th scope="row">' + matchSummaryData[n-1]["home"] + '<div>VS</div>' + matchSummaryData[n-1]["away"] + '</th><td>' + matchSummaryData[n-1]["cumulhome"] + '<div>&#8194;</div>' + matchSummaryData[n-1]["cumulaway"] + '</td><td>' + matchSummaryData[n-1]["todayhome"] + '<div>&#8194;</div>' + matchSummaryData[n-1]["todayaway"] + '</td><td>' + matchSummaryData[n-1]["totalhome"] + '<div>&#8194;</div>' + matchSummaryData[n-1]["totalaway"] + '</td>';
    return innerHTMLString;
}

function updateSummaryPage() {
    // update match summary
    matchSummaryLine1.innerHTML = createMatchSummaryLine(1);
    matchSummaryLine2.innerHTML = createMatchSummaryLine(2);
    matchSummaryLine3.innerHTML = createMatchSummaryLine(3);
    // hide match details until refresh
    matchDetailHeader.hidden = true;
    matchDetailTab.hidden = true;
    matchDetailBody.hidden = true;
    matchDetailIsHidden = true;
}

function updateMatchDetailHeader(n) {

    // display match detail table if hidden
    if(matchDetailIsHidden == true) {
        matchDetailHeader.hidden = false;
        matchDetailTab.hidden = false;
        matchDetailBody.hidden = false;
        matchDetailIsHidden = false;
    }
    
    // update header
    matchDetailHeaderTitle.innerHTML = "제" + Number(n) + "경기";
    matchDetailHeaderHome.innerHTML = '<h1>' + matchSummaryData[n-1]["home"] + '</h1>';
    matchDetailHeaderAway.innerHTML = '<h1>' + matchSummaryData[n-1]["away"] + '</h1>';
    matchDetailBodyRowHome.innerHTML = '<th scope="row">' + matchSummaryData[n-1]["home"] + '</th>';
    matchDetailBodyRowAway.innerHTML = '<th scope="row">' + matchSummaryData[n-1]["away"] + '</th>';
    
    // record current match index
    matchIndex = n;
    
    // initialize match details
    if(matchDetailIndex > 0) {
        $('#matchDetailButton' + matchDetailDayDictionaryCap[matchDetailIndex]).removeClass("btn-primary").addClass("btn-outline-primary");
    }
    matchDetailIndex = 0;
    matchDetailBodyRowHome.innerHTML = '';
    matchDetailBodyRowAway.innerHTML = '';
}

function updateMatchDetailBody(n) {

    // highlight and un-highlight match day buttons
    if(matchDetailIndex > 0) {
        $('#matchDetailButton' + matchDetailDayDictionaryCap[matchDetailIndex]).removeClass("btn-primary").addClass("btn-outline-primary");
    }
    $('#matchDetailButton' + matchDetailDayDictionaryCap[n]).removeClass("btn-outline-primary").addClass("btn-primary");
    matchDetailIndex = n;

    // update match detail
    var matchDetailHome = matchDetailData[matchIndex-1][matchDetailDayDictionaryLow[n] + "home"];
    var matchDetailAway = matchDetailData[matchIndex-1][matchDetailDayDictionaryLow[n] + "away"];
    if(matchDetailHome == null) {
        matchDetailBodyRowHome.innerHTML = '';
    } else {
        matchDetailBodyRowHome.innerHTML = '<th scope="row">' + matchSummaryData[matchIndex-1]["home"] + '</th><td>' + matchDetailHome.join("</td><td>") + '</td>';
    }
    if(matchDetailAway == null) {
        matchDetailBodyRowAway.innerHTML = '';
    } else {
        matchDetailBodyRowAway.innerHTML = '<th scope="row">' + matchSummaryData[matchIndex-1]["away"] + '</th><td>' + matchDetailAway.join("</td><td>") + '</td>';
    }
}

function updateMatchWeek(n) {

    // update button string
    var currentWeek = Math.max(...matchWeeksData);
    if(n == currentWeek) {
        matchWeekButton.innerHTML = '<b>' + n + '주차 경기 (현재)</b>';
    } else {
        matchWeekButton.innerHTML = '<b>' + n + '주차 경기</b>';
    }

    ////////////////////////////////////////////////////////////////////
    // NEED TO UPDATE matchSummaryData AND matchDetailData ACCORDINGLY
    ////////////////////////////////////////////////////////////////////

    // update match summary
    updateSummaryPage();

    // close dialog if open
    $('#history').modal('hide');
}

window.onload = function() {
    // set match week to current
    var currentWeek = Math.max(...matchWeeksData);
    updateMatchWeek(currentWeek);
    // create match week dialog
    var WeekDialogInnerHTML = '';
    for(var i=0; i<matchWeeksData.length; i++) {
        WeekDialogInnerHTML = '<button class="btn btn-outline-dark btn-block" onclick="updateMatchWeek(' + matchWeeksData[i] + ')">' + matchWeeksData[i] + '주차</b></button>' + WeekDialogInnerHTML;
    }
    matchWeeksTab.innerHTML = WeekDialogInnerHTML;
}