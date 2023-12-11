// API 호출하여 디바이스 목록 시작
function Start_listing() {
    invokeAPIForListing();
    clearTable();
}

// 디바이스 목록을 위한 API 호출
var invokeAPIForListing = function() {
    // 디바이스 조회 URI (prod 스테이지 URL로 대체 필요)
    var apiUri = 'https://xd736nqcqk.execute-api.ap-northeast-2.amazonaws.com/prod/devices'; 		        
    
    $.ajax(apiUri, {
        method: 'GET',
        contentType: "application/json",
        success: function (data, status, xhr) {
            var resultListing = JSON.parse(data);
            populateTable(resultListing.things);  // 성공 시, 테이블 데이터 세팅
            console.log(data);
        },
        error: function(xhr, status, e){
            alert("error");
        }
    });
};

// 테이블 데이터 초기화
var clearTable = function() {
    $('#mytable > tbody').empty();
    document.getElementById("result_Listing").innerHTML = "조회 중입니다.";
};

// 테이블에 데이터 세팅
var populateTable = function(data) {
    $('#mytable > tbody').empty();
    data.forEach(function(v) {
        var row = $("<tr></tr>");
        row.append($("<td></td>").text(v.thingName));
        row.append($("<td></td>").text(v.thingArn));
        $("#mytable tbody").append(row);
    });

    // 데이터 유무에 따른 메시지 처리
    var message = data.length > 0 ? "" : "No Data";
    document.getElementById("result_Listing").innerHTML = message;
};
