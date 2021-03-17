function updateMatchDetail(n) {

    // 구현을 위한 임시 데이터
    var matchData = [
        {
            home:"깡",
            away:"달"
        },
        {
            home:"놉",
            away:"비"
        },
        {
            home:"쌤",
            away:"요"
        }
    ];

    ind = Number(n)-1;

    matchDetailHeaderTitle.innerHTML = "제" + Number(n) + "경기";
    matchDetailHeaderHome.innerHTML = '<h1>' + matchData[ind]["home"] + '</h1>';
    matchDetailHeaderAway.innerHTML = '<h1>' + matchData[ind]["away"] + '</h1>';
    matchDetailBodyRowHome.innerHTML = '<th scope="row">'+matchData[ind]["home"]+'</th>' + '<td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td>';
    matchDetailBodyRowAway.innerHTML = '<th scope="row">'+matchData[ind]["away"]+'</th>' + '<td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td>';

}

function updateMatchWeek(n) {
    if(n == 6) {
        matchWeekButton.innerHTML = '<b>' + n + '주차 경기 (현재)</b>';
    } else {
        matchWeekButton.innerHTML = '<b>' + n + '주차 경기</b>';
    }
    $('#history').modal('hide');
}