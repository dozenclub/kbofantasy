var currentRoster = 1;

rosterHitterDefault.addEventListener("click", function() {
    rosterHitterDefault.hidden = true;
    rosterPitcherDefault.hidden = true;
    rosterHitterAdvanced.hidden = false;
    rosterPitcherAdvanced.hidden = false;
})

rosterPitcherDefault.addEventListener("click", function() {
    rosterHitterDefault.hidden = true;
    rosterPitcherDefault.hidden = true;
    rosterHitterAdvanced.hidden = false;
    rosterPitcherAdvanced.hidden = false;
})

rosterHitterAdvanced.addEventListener("click", function() {
    rosterHitterDefault.hidden = false;
    rosterPitcherDefault.hidden = false;
    rosterHitterAdvanced.hidden = true;
    rosterPitcherAdvanced.hidden = true;
})

rosterPitcherAdvanced.addEventListener("click", function() {
    rosterHitterDefault.hidden = false;
    rosterPitcherDefault.hidden = false;
    rosterHitterAdvanced.hidden = true;
    rosterPitcherAdvanced.hidden = true;
})

function displayRoster(n) {
    $('#team'+currentRoster).removeClass("btn-primary").addClass("btn-outline-primary");
    $('#team'+n).removeClass("btn-outline-primary").addClass("btn-primary");
    currentRoster = n;
}