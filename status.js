// get request từ server ("http://sv-procon.uet.vnu.edu.vn:3000/matches") 
const url = 'http://sv-procon.uet.vnu.edu.vn:3000/matches/230';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVhbTIyIiwiaWF0IjoxNTcwOTc0OTE5LCJleHAiOjE1NzA5ODIxMTl9.X-a9PEOkDUQgCbxcMIwR-q-y8rXXT7mTosMKOTaPUaE';

function getRequest() {
    fetch(url, {
        method: "GET",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    }).then(response => {

        response.text().then(body => {
            var json = body;
            json = JSON.parse(json);
            console.log(json);
            var points = json.points;
            var tiled = json.tiled;
            var agentsTeam1 = json.teams[0].agents;
            var teamID1 = json.teams[0].teamID;
            var agentsTeam2 = json.teams[1].agents;
            var teamID2 = json.teams[1].teamID;

            var pointTeam1 = document.getElementById(pointTeam1);
            pointTeam1.textContent = json.teams[0].tilePoint;
            var pointTeam2 = document.getElementById(pointTeam2);
            pointTeam2.textContent = json.teams[1].tilePoint;
            var tiled_element = document.createElement('section');
            tiled_element.id = 'game-board';
            document.body.appendChild(tiled_element);
            for (var y = 0; y < tiled.length; y++) {
                for (var x = 0; x < tiled[y].length; x++) {
                    var square = document.createElement('div');
                    square.classList.add('square');
                    tiled_element.appendChild(square);

                    var checker = document.createElement('div');
                    checker.textContent = (points[y][x]);
                    checker.classList.add('checker');
                    if (tiled[y][x] === teamID1) {
                        checker.classList.add('checker-' + 'red');
                        square.appendChild(checker);
                    } else if (tiled[y][x] === teamID2) {
                        checker.classList.add('checker-' + 'blue');
                        square.appendChild(checker);
                    } else {
                        checker.classList.add('checker-' + 'null');
                        square.appendChild(checker);
                    }
                    for (var i = 0; i < agentsTeam1.length; i++) {
                        if (y === agentsTeam1[i].y - 1 && x === agentsTeam1[i].x - 1) {
                            checker.classList.add('checker-red-' + 'strong');
                            square.appendChild(checker);
                        }
                    }
                    for (var i = 0; i < agentsTeam2.length; i++) {
                        if (y === agentsTeam2[i].y - 1 && x === agentsTeam2[i].x - 1) {
                            checker.classList.add('checker-blue-' + 'strong');
                            square.appendChild(checker);
                        }
                    }
                }
            }
        })
    })
}

// sau khi lấy request từ trận đấu ta sẽ thu được một file json thể hiện trạng thái trận đấu
// lấy ra ma trận points(điểm số), ma trận tiled(thể hiện trạng thái 2 đội thi đấu), agents(vị trí các agent của 2 đội)




// function setup() {


// }

// setup();