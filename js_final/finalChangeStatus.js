// document.addEventListener('DOMContentLoaded', function() {
//     // ON 버튼에 이벤트 리스너 추가
//     document.getElementById('RelayON').addEventListener('click', function() {
//         var deviceName = document.getElementById('name_change').value;
//         console.log('RelayON clicked. Device Name:', deviceName);
//         // 여기에 ON에 대한 추가적인 작업을 추가할 수 있습니다.
//     });

//     // OFF 버튼에 이벤트 리스너 추가
//     document.getElementById('RelayOFF').addEventListener('click', function() {
//         var deviceName = document.getElementById('name_change').value;
//         console.log('RelayOFF clicked. Device Name:', deviceName);
//         // 여기에 OFF에 대한 추가적인 작업을 추가할 수 있습니다.
//     });
// });

// const fan_on = () => {
//     fetch("https://xd736nqcqk.execute-api.ap-northeast-2.amazonaws.com/prod/devices/"+, {
//         method: "PUT",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body:JSON.stringify({ tags : [ { tagName : "FAN", tagValue : "ON" } ] })
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//         });
// };

// //팬 끄는 함수
// const fan_off = () => {
//     fetch("https://xd736nqcqk.execute-api.ap-northeast-2.amazonaws.com/prod/devices/finalexam", {
//         method: 'PUT',
//         headers: {
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify({ tags : [ { tagName : "FAN", tagValue : "OFF" } ] })
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//         });
// };

document.addEventListener('DOMContentLoaded', function() {
    // ON 버튼 클릭 이벤트 리스너
    document.getElementById('RelayON').addEventListener('click', function() {
        var deviceName = document.getElementById('name_change').value;
        fan_on(deviceName); // fan_on 함수 호출
    });

    // OFF 버튼 클릭 이벤트 리스너
    document.getElementById('RelayOFF').addEventListener('click', function() {
        var deviceName = document.getElementById('name_change').value;
        fan_off(deviceName); // fan_off 함수 호출
    });
});

// 팬 켜는 함수
const fan_on = (deviceName) => {
    fetch("https://xd736nqcqk.execute-api.ap-northeast-2.amazonaws.com/prod/devices/" + deviceName, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tags: [{ tagName: "RELAY", tagValue: "ON" }] })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
};

// 팬 끄는 함수
const fan_off = (deviceName) => {
    fetch("https://xd736nqcqk.execute-api.ap-northeast-2.amazonaws.com/prod/devices/" + deviceName, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({ tags: [{ tagName: "RELAY", tagValue: "OFF" }] })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
};