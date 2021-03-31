/*

// 리더보드 데이터 샘플
var leaderboardData = [
    {
        // 기본 표시 정보
        name: "깡",
        points: 20,
        win: 5,
        lose: 0,
        draw: 0,
        bonus: 5,
        // 추가 표시 정보
        teampointstotal: 2000,
        teampointschange: 200,
        draft: 1
    },
    {
        // 기본 표시 정보
        name: "달",
        points: 14,
        win: 4,
        lose: 1,
        draw: 0,
        bonus: 3,
        // 추가 표시 정보
        teampointstotal: 5000,
        teampointschange: -200,
        draft: 2
    },
    {
        // 기본 표시 정보
        name: "놉",
        points: 14,
        win: 4,
        lose: 1,
        draw: 0,
        bonus: 3,
        // 추가 표시 정보
        teampointstotal: 5000,
        teampointschange: -200,
        draft: 3
    },
    {
        // 기본 표시 정보
        name: "비",
        points: 14,
        win: 4,
        lose: 1,
        draw: 0,
        bonus: 3,
        // 추가 표시 정보
        teampointstotal: 5000,
        teampointschange: 200,
        draft: 4
    },
    {
        // 기본 표시 정보
        name: "쌤",
        points: 14,
        win: 4,
        lose: 1,
        draw: 0,
        bonus: 3,
        // 추가 표시 정보
        teampointstotal: 5000,
        teampointschange: -200,
        draft: 5
    },
    {
        // 기본 표시 정보
        name: "요",
        points: 14,
        win: 4,
        lose: 1,
        draw: 0,
        bonus: 3,
        // 추가 표시 정보
        teampointstotal: 5000,
        teampointschange: -200,
        draft: 6
    }
]

function createLeaderboardLineDefault(n) {
    var innerHTMLString = '<th scope="row">' + n + '</th><td>' + leaderboardData[n-1]["name"] + '</td><td>' + leaderboardData[n-1]["points"] + '</td><td>' + leaderboardData[n-1]["win"] + '</td><td>' + leaderboardData[n-1]["lose"] + '</td><td>' + leaderboardData[n-1]["draw"] + '</td><td>' + leaderboardData[n-1]["bonus"] + '회</td>';
    return innerHTMLString;
}

function createLeaderboardLineAdvanced(n) {
    var innerHTMLString = '<th scope="row">' + n + '</th><td>' + leaderboardData[n-1]["name"] + '</td><td>' + leaderboardData[n-1]["teampointstotal"]  + '</td><td>';
    if(leaderboardData[n-1]["teampointschange"] >= 0) {
        innerHTMLString = innerHTMLString + '<span style="color:red;">&#9650;' + leaderboardData[n-1]["teampointschange"] + '</span></td><td>';
    } else {
        innerHTMLString = innerHTMLString + '<span style="color:blue;">&#9660;' + (-1 * Number(leaderboardData[n-1]["teampointschange"])) + '</span></td><td>';
    }
    innerHTMLString = innerHTMLString + leaderboardData[n-1]["draft"] + '위</td>';
    return innerHTMLString;
}

function refreshPage() {
    leaderboardDefaultLine1.innerHTML = createLeaderboardLineDefault(1);
    leaderboardDefaultLine2.innerHTML = createLeaderboardLineDefault(2);
    leaderboardDefaultLine3.innerHTML = createLeaderboardLineDefault(3);
    leaderboardDefaultLine4.innerHTML = createLeaderboardLineDefault(4);
    leaderboardDefaultLine5.innerHTML = createLeaderboardLineDefault(5);
    leaderboardDefaultLine6.innerHTML = createLeaderboardLineDefault(6);
    leaderboardAdvancedLine1.innerHTML = createLeaderboardLineAdvanced(1);
    leaderboardAdvancedLine2.innerHTML = createLeaderboardLineAdvanced(2);
    leaderboardAdvancedLine3.innerHTML = createLeaderboardLineAdvanced(3);
    leaderboardAdvancedLine4.innerHTML = createLeaderboardLineAdvanced(4);
    leaderboardAdvancedLine5.innerHTML = createLeaderboardLineAdvanced(5);
    leaderboardAdvancedLine6.innerHTML = createLeaderboardLineAdvanced(6);
}

leaderboardDefault.addEventListener("click", function() {
    this.hidden = true;
    leaderboardAdvanced.hidden = false;
})

leaderboardAdvanced.addEventListener("click", function() {
    this.hidden = true;
    leaderboardDefault.hidden = false;
})

*/

window.onload = function() {
    // refreshPage();
    window.location = "http://54.245.222.63:8000/kbofantasy/";
}