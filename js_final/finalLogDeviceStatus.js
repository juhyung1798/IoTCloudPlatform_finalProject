// 중지를 위한 Interval ID 저장
var intervalId = null;

// 상태 조회 시작
function Start_Status() {
    var username = $("input[name='username']").val();
    if (!username) {
        alert("사용자 이름을 입력하세요.");
        return;
    }
    
    // 이전 조회 중지
    if (intervalId) {
        clearInterval(intervalId);
    }

    intervalId = setInterval(function () {
        invokeAPI_Status(username);
    }, 1000);

    document.getElementById("result_Status").innerHTML = "조회 중...";
    invokeAPI_Status(username); // 즉시 첫 조회 실행
}

// 상태 조회 중지
function Stop_Status() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null; // intervalId 먼저 초기화
        clearStatusTable(); // 이제 표 내용을 비움
        document.getElementById("result_Status").innerHTML = "조회 중지됨";

    }
}

// 표 내용을 비우는 함수
function clearStatusTable() {
    var row = document.getElementById("statusRow");
    row.innerHTML = "<td colspan='4'>조회가 중지되었습니다.</td>";
}


// 상태 정보 조회 API 호출
function invokeAPI_Status(username) {
    // 유효한 사용자 이름 확인
    var validUsernames = ['final_MyMKRWiFi1010_2', 'final_MyMKRWiFi1010'];
    var apiUri = validUsernames.includes(username) ?
        'https://xd736nqcqk.execute-api.ap-northeast-2.amazonaws.com/prod/devices/' + username :
        'https://xd736nqcqk.execute-api.ap-northeast-2.amazonaws.com/prod/devices/default'; // 기본값 또는 오류 메시지 출력

    $.ajax(apiUri, {
        method: 'GET',
        contentType: "application/json",
        success: function (data, status, xhr) {
            var result_Status = JSON.parse(data);
            printData_Status(result_Status);
        },
        error: function (xhr, status, e) {
            alert("error");
        }
    });
}

// 결과 데이터 출력
// 결과 데이터를 표로 출력
function printData_Status(result_Status) {
    var temperature = result_Status.state.reported.temperature;
    var humidity = result_Status.state.reported.Hummidity;
    var water = result_Status.state.reported.water;
    var relay = result_Status.state.reported.RELAY;

    var row = document.getElementById("statusRow");
    row.innerHTML = `
        <td>${temperature}°C</td>
        <td>${humidity}%</td>
        <td>${water}</td>
        <td>${relay}</td>
    `;
}
