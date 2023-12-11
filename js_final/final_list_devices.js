var intervalId = null;


// API 시작
function Start_listing() {
invokeAPI_listing();
    emptyTable();
}

function Start_tabling() {
    invokeAPI_abling();
        emptyTable();
}
    

function Start_Logging() {
    var username = $("input[name='username']").val();
    if (username) {
        // 이전 조회 중지
        if (intervalId !== null) {
            clearInterval(intervalId);
        }

        invokeAPI_Logging(username);
        intervalId = setInterval(function () {
            invokeAPI_Logging(username);
        }, 1000);
        document.getElementById("result").innerHTML = "조회 중...";
    } else {
        alert("사용자 이름을 입력하세요.");
    }
}

function Stop_Logging() {
    if (intervalId !== null) {
        clearInterval(intervalId);
        document.getElementById("result").innerHTML = "조회 중지됨";
        intervalId = null; // intervalId 초기화
    }
}

		
var invokeAPI_listing = function() {
    
    // 디바이스 조회 URI
    // prod 스테이지 편집기의 맨 위에 있는 "호출 URL/devices"로 대체해야 함
    var API_URI = 'https://vdclitsybj.execute-api.ap-northeast-2.amazonaws.com/prod/devices'; 		        
    $.ajax(API_URI, {
        method: 'GET',
        contentType: "application/json",
            
            
        success: function (data, status, xhr) {
    
            var result = JSON.parse(data);
            setDataList(result.things);  // 성공시, 데이터 출력을 위한 함수 호출
            console.log(data);
        },
        error: function(xhr,status,e){
        //  document.getElementById("result").innerHTML="Error";
            alert("error");
        }
    });
};
		
  // 테이블 데이터 삭제
var emptyTable = function() {
    $( '#mytable > tbody').empty();
    document.getElementById("result").innerHTML="조회 중입니다.";
};
    
// 데이터 출력을 위한 함수
var setDataList = function(data){
    
    $( '#mytable > tbody').empty();
    data.forEach(function(v){
    
        var tr1 = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        td1.innerText = v.thingName;
        td2.innerText = v.thingArn;
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        $("table").append(tr1);
    })
    
    if(data.length>0){
            // 디바이스 목록 조회결과가 있는 경우 데이터가 없습니다 메시지 삭제
        document.getElementById("result").innerHTML="";
    } else if (data.length ==0) {
        document.getElementById("result").innerHTML="No Data";
    }
};

  var invokeAPI_Logging = function() {
    // 사용자 입력값을 기반으로 URI의 일부를 결정
    var username = $("input[name='username']").val(); // 사용자 입력값 가져오기

    // 입력값이 유효한지 확인하고, 그에 따라 URI 설정
    var validUsernames = ['final_MyMKRWiFi1010_2', 'final_MyMKRWiFi1010'];
    var API_URI = '';

    if (validUsernames.includes(username)) {
        API_URI = 'https://vdclitsybj.execute-api.ap-northeast-2.amazonaws.com/prod/devices/' + username;
    } else {
        // 잘못된 입력값 또는 기본값을 처리
        API_URI = 'https://vdclitsybj.execute-api.ap-northeast-2.amazonaws.com/prod/devices/default'; // 기본값 또는 오류 메시지 출력
    }

    // AJAX 호출
    $.ajax(API_URI, {
        method: 'GET',
        contentType: "application/json",
        success: function (data, status, xhr) {
            var result = JSON.parse(data);
            printData(result);  // 성공시, 데이터 출력을 위한 함수 호출
            console.log("data="+data);
        },
        error: function(xhr,status,e){
            alert("error");
        }
    });
};


// 데이터 출력을 위한 함수
// 데이터 출력을 위한 함수
var printData = function(result) {      
    var temperature = result.state.reported.temperature;
    var humidity = result.state.reported.Hummidity;
    var water = result.state.reported.water;
    var relay = result.state.reported.RELAY;

    // 결과 표시
    var resultText = "Temperature: " + temperature + "°C, " +
                     "Humidity: " + humidity + "%, " +
                     "Water Level: " + water + ", " +
                     "Relay: " + relay;

    document.getElementById("result").innerHTML = resultText;
};
