// 타자 데이터 샘플
var tradeHitterData = [
    ["김상수", "C", "깡", 400, -20, 0.300, 1,2,3,4,5,6,7,8,9,10,11,12],
    ["찬물택", "1B", "달", 420, -20, 0.300, 1,2,3,4,5,6,7,8,9,10,11,12],
    ["눕동님", "2B", "놉", 430, -20, 0.300, 1,2,3,4,5,6,7,8,9,10,11,12],
    ["김도망", "SS", "비", 450, -20, 0.300, 1,2,3,4,5,6,7,8,9,10,11,12],
    ["양준혁", "C", "쌤", 400, -20, 0.300, 1,2,3,4,5,6,7,8,9,10,11,12],
    ["벤치성", "C", "쌤", 480, -20, 0.300, 1,2,3,4,5,6,7,8,9,10,11,12],
    ["벤치성", "C", "요", 480, -20, 0.300, 1,2,3,4,5,6,7,8,9,10,11,12],
    ["김타자", "C", "FA", 480, -20, 0.300, 12,11,10,9,8,7,6,5,4,3,2,1],
    ["박타자", "C", "FA", 480, -20, 0.300, 1,2,3,4,5,6,7,8,9,10,11,12],
]
var tradePitcherData = [
    ["박찬호", "P", "깡", 430, 10, 1.20, 0.45, 1,2,3,4,5,6,7, 2.17, 1,2,3,4],
    ["안지만", "P", "달", 430, 10, 1.20, 0.45, 1,2,3,4,5,6,7, 2.17, 1,2,3,4],
    ["오승환", "P", "놉", 430, 10, 1.20, 0.45, 1,2,3,4,5,6,7, 2.17, 1,2,3,4],
    ["벤치성", "P", "놉", 430, 10, 1.20, 0.45, 1,2,3,4,5,6,7, 2.17, 1,2,3,4],
    ["배영수", "P", "요", 430, 10, 1.20, 0.45, 1,2,3,4,5,6,7, 2.17, 1,2,3,4],
    ["정투수", "P", "FA", 430, 10, 1.20, 0.45, 1,2,3,4,5,6,7, 2.17, 1,2,3,4],
    ["조투수", "P", "FA", 430, 10, 1.20, 0.45, 7,6,5,4,3,2,1, 2.17, 4,3,2,1]
]

// 전역 변수
var hitterBodyIndexRange    = [5, 17];
var pitcherBodyIndexRange   = [5, 18];
var hitterBodyDataDecimals  = [3,0,0,0,0,0,0,0,0,0,0,0,0];
var pitcherBodyDataDecimals = [2,2,0,0,0,0,0,0,0,2,0,0,0,0];
var hitterPositionAll           = ["C", "1B", "2B", "3B", "SS", "LF", "RF", "CF", "RF", "DH"];
var hitterBodySortOrder     = [1,1,1,1,1,
                               1,1,1,1,1,
                               1,1,1,0,0]; // 0 = ascending, 1 = descending
var pitcherBodySortOrder    = [1,1,0,0,1,
                               1,1,0,1,1,
                               1,1,0,0,0,
                               1]; // 0 = ascending, 1 = descending

var currentTeamSelection = ["FA"];
var currentPosition = 2;
var currentHitterPositionSelection = [];
var currentSortIndex = 0;
var currentPlayerIndices = [];

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
    updateCurrentPlayerList();
    writePlayerTable();
}

function updatePosition(n) {

    // highlight and un-highlight buttons
    if(currentPosition > 0) {
        $('#position'+currentPosition).removeClass("btn-primary").addClass("btn-outline-primary");
    }
    $('#position'+n).removeClass("btn-outline-primary").addClass("btn-primary");
    currentPosition = n;

    // initialize table status
    rosterHitterFrame.hidden = true;
    rosterPitcherFrame.hidden = true;

    // display default table for the position
    if(currentPosition == 1) {
        rosterHitterFrame.hidden = false;
        hitterPositionSelectionBar.hidden = false;
        updateHitterPositionSelection('All');
    } else {
        rosterPitcherFrame.hidden = false;
        hitterPositionSelectionBar.hidden = true;
    }

    // refresh page
    updateCurrentPlayerList();
    writePlayerTable();
}

function updateHitterPositionSelection(string) {

    // auxiliary variables
    var i;

    // if all, select all. Else, apply selection
    if(string == 'All') {
        // first undo all selection
        for(i=0; i<currentHitterPositionSelection.length; i++) {
            $('#hitterPosition'+currentHitterPositionSelection[i]).removeClass("btn-dark").addClass("btn-outline-dark");
        }
        currentHitterPositionSelection = [];
        // then select all
        for(i=0; i<hitterPositionAll.length; i++) {
            currentHitterPositionSelection.push(hitterPositionAll[i]);
            $('#hitterPosition'+hitterPositionAll[i]).removeClass("btn-outline-dark").addClass("btn-dark");
        }
    } else {
        // toggle selection
        if(currentHitterPositionSelection.includes(string)) {
            currentHitterPositionSelection = currentHitterPositionSelection.filter(e => e != string);
            $('#hitterPosition'+string).removeClass("btn-dark").addClass("btn-outline-dark");
        } else {
            currentHitterPositionSelection.push(string);
            $('#hitterPosition'+string).removeClass("btn-outline-dark").addClass("btn-dark");
        }
    }

    // update hitter position button text
    if(currentHitterPositionSelection.length == 10) {
        // if all are selected, print "전부"
        hitterPositionButton.innerHTML = "포지션: 전부";
    } else {
        hitterPositionButton.innerHTML = "포지션: " + currentHitterPositionSelection.join(", ");
    }

    // refresh page
    updateCurrentPlayerList();
    writePlayerTable();
}

function updateCurrentPlayerList() {
    
    // auxiliary variables
    var i;
    var sortType = 0;
    var currentPlayerArray = [];

    // filter player indices
    if(currentPosition == 1) { // if hitter
        for(i=0; i<tradeHitterData.length; i++) {
            if(currentTeamSelection.includes(tradeHitterData[i][2])) { // check team selection condition
                if(currentHitterPositionSelection.includes(tradeHitterData[i][1])) { // check hitter position selection condition
                    currentPlayerArray.push([i, tradeHitterData[i][3+currentSortIndex]]); // record player index and value for sorting
                }
            }
        }
        sortType = hitterBodySortOrder[currentSortIndex]; // record sort order
    } else { // if pitcher
        for(i=0; i<tradePitcherData.length; i++) {
            if(currentTeamSelection.includes(tradePitcherData[i][2])) { // check team selection condition
                currentPlayerArray.push([i, tradePitcherData[i][3+currentSortIndex]]); // record player index and value for sorting
            }
        }
        sortType = pitcherBodySortOrder[currentSortIndex]; // record sort order
    }

    // sort player indices
    if(sortType == 0) {
        currentPlayerArray = currentPlayerArray.sort(function(a,b) {return a[1]-b[1]});
    } else {
        currentPlayerArray = currentPlayerArray.sort(function(a,b) {return b[1]-a[1]});
    }
    
    // replace current player indices
    currentPlayerIndices = [];
    for(i=0; i<currentPlayerArray.length; i++) {
        currentPlayerIndices.push(currentPlayerArray[i][0]);
    }
}

function updateSortingVariable(n) {
    currentSortIndex = n;
    updateCurrentPlayerList();
    writePlayerTable();
}

function writePlayerTable() {

    // initialize
    var i;
    var j;
    var innerHTMLString;
    var innerHTMLStringArray;
    var innerHTMLStringArraySlice;
    rosterHitterTableBody.innerHTML   = '';
    rosterPitcherTableBody.innerHTML   = '';

    if(currentPosition == 1) {
        // update hitter tables
        for(j=0; j<currentPlayerIndices.length; j++) {
            // read hitter data
            innerHTMLStringArray = tradeHitterData[currentPlayerIndices[j]];
            // create a line if not null
            if(innerHTMLStringArray != null) {
                ///// prepare hitter main /////
                innerHTMLString = '<td>' + innerHTMLStringArray[3] + '</td><td>';
                if(innerHTMLStringArray[4] >= 0) {
                    innerHTMLString = innerHTMLString + '<span style="color:red;">&#9650;' + innerHTMLStringArray[4] + '</span></td><td>';
                } else {
                    innerHTMLString = innerHTMLString + '<span style="color:blue;">&#9660;' + (-1 * Number(innerHTMLStringArray[4])) + '</span></td><td>';
                }
                // slice main body data
                innerHTMLStringArraySlice = innerHTMLStringArray.slice(hitterBodyIndexRange[0], hitterBodyIndexRange[1]+1);
                // specify decimals
                for(i=0; i<innerHTMLStringArraySlice.length; i++) {
                    innerHTMLStringArraySlice[i] = Number(innerHTMLStringArraySlice[i]).toFixed(hitterBodyDataDecimals[i]);
                }
                // write hitter head and main
                rosterHitterTableBody.innerHTML = rosterHitterTableBody.innerHTML + '<tr><th scope="row">' + innerHTMLStringArray[0] + '</th><td>' + innerHTMLStringArray[1] + '</td><td>' + innerHTMLStringArray[2] + '</td>' + innerHTMLString + innerHTMLStringArraySlice.join('</td><td>') + '</td></tr>';
            }
        }
    }
    if(currentPosition == 2) {
        // update pitcher tables
        for(j=0; j<currentPlayerIndices.length; j++) {
            // read pitcher data
            innerHTMLStringArray = tradePitcherData[currentPlayerIndices[j]];
            // create a line if not null
            if(innerHTMLStringArray != null) {
                ///// update pitcher main /////
                innerHTMLString = '<td>' + innerHTMLStringArray[3] + '</td><td>';
                if(innerHTMLStringArray[4] >= 0) {
                    innerHTMLString = innerHTMLString + '<span style="color:red;">&#9650;' + innerHTMLStringArray[4] + '</span></td><td>';
                } else {
                    innerHTMLString = innerHTMLString + '<span style="color:blue;">&#9660;' + (-1 * Number(innerHTMLStringArray[4])) + '</span></td><td>';
                }
                // slice main body data
                innerHTMLStringArraySlice = innerHTMLStringArray.slice(pitcherBodyIndexRange[0], pitcherBodyIndexRange[1]+1);
                // specify decimals
                for(i=0; i<innerHTMLStringArraySlice.length; i++) {
                    innerHTMLStringArraySlice[i] = Number(innerHTMLStringArraySlice[i]).toFixed(pitcherBodyDataDecimals[i]);
                }
                // write pitcher head and main
                rosterPitcherTableBody.innerHTML = rosterPitcherTableBody.innerHTML + '<tr><th scope="row">' + innerHTMLStringArray[0] + '</th><td>' + innerHTMLStringArray[1] + '</td><td>' + innerHTMLStringArray[2] + '</td>' + innerHTMLString + innerHTMLStringArraySlice.join('</td><td>') + '</td></tr>';
            }
        }
    }
}

window.onload = function() {

    // updateTeamSelection('FA');
    // updatePosition(2);
    updateCurrentPlayerList();
    writePlayerTable();
}