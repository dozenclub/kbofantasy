// 타자 데이터 샘플
var rosterHitterData = [
    ["김상수", "C", "깡", 400, -20, 30, 0.96, 0.300, 1,2,3,4,5,6,7,8,9,10,11,12],
    ["찬물택", "1B", "달", 420, -20, 30, 0.96, 0.300, 1,2,3,4,5,6,7,8,9,10,11,12],
    ["눕동님", "2B", "놉", 430, -20, 30, 0.96, 0.300, 1,2,3,4,5,6,7,8,9,10,11,12],
    ["김도망", "SS", "비", 450, -20, 30, 0.96, 0.300, 1,2,3,4,5,6,7,8,9,10,11,12],
    ["양준혁", "C", "쌤", 400, -20, 30, 0.96, 0.300, 1,2,3,4,5,6,7,8,9,10,11,12],
    ["벤치성", "C", "쌤", 480, -20, 30, 0.96, 0.300, 1,2,3,4,5,6,7,8,9,10,11,12],
    ["벤치성", "C", "요", 480, -20, 30, 0.96, 0.300, 1,2,3,4,5,6,7,8,9,10,11,12],
    ["김타자", "C", "FA", 480, -20, 30, 0.96, 0.300, 1,2,3,4,5,6,7,8,9,10,11,12],
    ["박타자", "C", "FA", 480, -20, 30, 0.96, 0.300, 1,2,3,4,5,6,7,8,9,10,11,12],
]
var rosterPitcherData = [
    ["박찬호", "P", "깡", 430, 10, 20, 0.94, 1.20, 0.45, 1,2,3,4,5,6,7, 2.17, 1,2,3,4],
    ["안지만", "P", "달", 430, 10, 20, 0.94, 1.20, 0.45, 1,2,3,4,5,6,7, 2.17, 1,2,3,4],
    ["오승환", "P", "놉", 430, 10, 20, 0.94, 1.20, 0.45, 1,2,3,4,5,6,7, 2.17, 1,2,3,4],
    ["벤치성", "P", "놉", 430, 10, 20, 0.94, 1.20, 0.45, 1,2,3,4,5,6,7, 2.17, 1,2,3,4],
    ["배영수", "P", "요", 430, 10, 20, 0.94, 1.20, 0.45, 1,2,3,4,5,6,7, 2.17, 1,2,3,4],
    ["정투수", "P", "FA", 430, 10, 20, 0.94, 1.20, 0.45, 1,2,3,4,5,6,7, 2.17, 1,2,3,4],
    ["조투수", "P", "FA", 430, 10, 20, 0.94, 1.20, 0.45, 1,2,3,4,5,6,7, 2.17, 1,2,3,4]
]

// 전역 변수
var hitterDefaultIndexRange   = [0,  6];
var hitterAdvancedIndexRange  = [7, 19];
var pitcherDefaultIndexRange  = [0,  6];
var pitcherAdvancedIndexRange = [7, 20];
var hitterAdvancedDataDecimals = [3,0,0,0,0,0,0,0,0,0,0,0,0];
var pitcherAdvancedDataDecimals = [2,2,0,0,0,0,0,0,0,2,0,0,0,0];
var hitterPositionAll = ["C", "1B", "2B", "3B", "SS", "LF", "RF", "CF", "RF", "DH"];

var currentTeamSelection = [];
var currentPosition = 0;
var currentHitterPositionSelection = [];

function updateTeamSelection(string) {

    // toggle selection
    if(currentTeamSelection.includes(string) == true) {
        currentTeamSelection = currentTeamSelection.filter(e => e != string);
        $('#team'+string).removeClass("btn-primary").addClass("btn-outline-primary");
    } else {
        currentTeamSelection.push(string);
        $('#team'+string).removeClass("btn-outline-primary").addClass("btn-primary");
    }

    // refresh page
    refreshPlayerList();
}

function updatePosition(n) {

    // highlight and un-highlight buttons
    if(currentPosition > 0) {
        $('#position'+currentPosition).removeClass("btn-primary").addClass("btn-outline-primary");
    }
    $('#position'+n).removeClass("btn-outline-primary").addClass("btn-primary");
    currentPosition = n;

    // initialize table status
    rosterHitterDefault.hidden = true;
    rosterHitterAdvanced.hidden = true;
    rosterPitcherDefault.hidden = true;
    rosterPitcherAdvanced.hidden = true;

    // display default table for the position
    if(currentPosition == 1) {
        rosterHitterDefault.hidden = false;
        hitterPositionSelectionBar.hidden = false;
        updateHitterPositionSelection('All');
    } else {
        rosterPitcherDefault.hidden = false;
        hitterPositionSelectionBar.hidden = true;
    }

    // refresh page
    refreshPlayerList();

}

function updateHitterPositionSelection(string) {

    // auxiliary variables
    var i;

    // if all, select all. Else, apply selection
    if(string == 'All') {
        // first undo all selection
        for(i=0; i<currentHitterPositionSelection.length; i++) {
            $('#hitterPosition'+currentHitterPositionSelection[i]).removeClass("btn-primary").addClass("btn-outline-primary");
        }
        // then select all
        for(i=0; i<hitterPositionAll.length; i++) {
            currentHitterPositionSelection.push(hitterPositionAll[i]);
            $('#hitterPosition'+hitterPositionAll[i]).removeClass("btn-outline-primary").addClass("btn-primary");
        }
    } else {
        // toggle selection
        if(currentHitterPositionSelection.includes(string)) {
            currentHitterPositionSelection = currentHitterPositionSelection.filter(e => e != string);
            $('#hitterPosition'+string).removeClass("btn-primary").addClass("btn-outline-primary");
        } else {
            currentHitterPositionSelection.push(string);
            $('#hitterPosition'+string).removeClass("btn-outline-primary").addClass("btn-primary");
        }
    }

    // refresh page
    refreshPlayerList();

}

function createRosterLineDefault(stringArray) {
    var innerHTMLString = '<tr><th scope="row">' + stringArray[0] + '</th><td>' + stringArray[1] + '</td><td>' + stringArray[2] + '</td><td>' + stringArray[3] + '</td><td>';
    if(stringArray[2] >= 0) {
        innerHTMLString = innerHTMLString + '<span style="color:red;">&#9650;' + stringArray[4] + '</span></td><td>';
    } else {
        innerHTMLString = innerHTMLString + '<span style="color:blue;">&#9660;' + (-1 * Number(stringArray[4])) + '</span></td><td>';
    }
    if(stringArray[3] >= 0) {
        innerHTMLString = innerHTMLString + '<span style="color:red;">&#9650;' + stringArray[5] + '</span></td><td>';
    } else {
        innerHTMLString = innerHTMLString + '<span style="color:blue;">&#9660;' + (-1 * Number(stringArray[5])) + '</span></td><td>';
    }
    innerHTMLString = innerHTMLString + (100 * Number(stringArray[6]).toFixed(2)) + '%</td></tr>';
    return innerHTMLString;
}

function refreshPlayerList() {

    // initialize
    var playerList = [];
    var i;
    var j;
    
    // if hitter is selected
    if(currentPosition == 1) {

        // filter hitters
        for(i=0; i<rosterHitterData.length; i++) {
            // check team selection
            if(currentTeamSelection.includes(rosterHitterData[i][2])) {
                // check position selection
                if(currentHitterPositionSelection.includes(rosterHitterData[i][1])) {
                    playerList.push(rosterHitterData[i]);
                }
            }
        }

        ///// update hitter tables /////
        // initialize
        rosterHitterDefaultBody.innerHTML   = '';
        rosterHitterAdvancedBody.innerHTML  = '';
        // create hitter data lines if not null
        if(playerList.length > 0) {
            for(j=0; j<playerList.length; j++) {
                // read hitter data
                innerHTMLStringArray = playerList[j];
                // update default hitter roster table
                rosterHitterDefaultBody.innerHTML = rosterHitterDefaultBody.innerHTML + createRosterLineDefault(innerHTMLStringArray);
                ///// update advanced hitter roster table /////
                innerHTMLString = '<tr><th scope="row">' + innerHTMLStringArray[0] + '</th><td>' + innerHTMLStringArray[1] + '</td><td>' + innerHTMLStringArray[2] + '</td><td>';
                // specify decimals for each data
                innerHTMLData = innerHTMLStringArray.slice(hitterAdvancedIndexRange[0], hitterAdvancedIndexRange[1]+1);
                for(i=0; i<innerHTMLData.length; i++) {
                    innerHTMLData[i] = Number(innerHTMLData[i]).toFixed(hitterAdvancedDataDecimals[i]);
                }
                // write line to advanced hitter roster table
                innerHTMLString = innerHTMLString + innerHTMLData.join('</td><td>') + '</td></tr>';
                rosterHitterAdvancedBody.innerHTML = rosterHitterAdvancedBody.innerHTML + innerHTMLString;
            }
        }

    }

    // filter pitchers if pitcher is selected
    if(currentPosition == 2) {

        // filter pitchers
        for(i=0; i<rosterPitcherData.length; i++) {
            // check team selection
            if(currentTeamSelection.includes(rosterPitcherData[i][2])) {
                playerList.push(rosterPitcherData[i]);
            }
        }

        ///// update pitcher tables /////
        // initialize
        rosterPitcherDefaultBody.innerHTML  = '';
        rosterPitcherAdvancedBody.innerHTML = '';
        // create pitcher data lines if not null
        if(playerList.length > 0) {
            for(j=0; j<playerList.length; j++) {
                // read pitcher data
                innerHTMLStringArray = playerList[j];
                // update default pitcher roster table
                rosterPitcherDefaultBody.innerHTML = rosterPitcherDefaultBody.innerHTML + createRosterLineDefault(innerHTMLStringArray);
                ///// update advanced pitcher roster table /////
                innerHTMLString = '<tr><th scope="row">' + innerHTMLStringArray[0] + '</th><td>' + innerHTMLStringArray[1] + '</td><td>' + innerHTMLStringArray[2] + '</td><td>';
                // specify decimals for each data
                innerHTMLData = innerHTMLStringArray.slice(pitcherAdvancedIndexRange[0], pitcherAdvancedIndexRange[1]+1);
                for(i=0; i<innerHTMLData.length; i++) {
                    innerHTMLData[i] = Number(innerHTMLData[i]).toFixed(pitcherAdvancedDataDecimals[i]);                    
                }
                // write line to advanced pitcher roster table
                innerHTMLString = innerHTMLString + innerHTMLData.join('</td><td>') + '</td></tr>';
                rosterPitcherAdvancedBody.innerHTML = rosterPitcherAdvancedBody.innerHTML + innerHTMLString;
            }
        }

    }
}

rosterHitterDefault.addEventListener("click", function() {
    rosterHitterDefault.hidden = true;
    rosterHitterAdvanced.hidden = false;
})

rosterPitcherDefault.addEventListener("click", function() {
    rosterPitcherDefault.hidden = true;
    rosterPitcherAdvanced.hidden = false;
})

rosterHitterAdvanced.addEventListener("click", function() {
    rosterHitterDefault.hidden = false;
    rosterHitterAdvanced.hidden = true;
})

rosterPitcherAdvanced.addEventListener("click", function() {
    rosterPitcherDefault.hidden = false;
    rosterPitcherAdvanced.hidden = true;
})

window.onload = function() {

    updateTeamSelection('FA');
    updatePosition(1);
    updateHitterPositionSelection('All');
}