import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const { kakao } = window;

const Mapview = styled.div`
    width: calc(100vw - 400px);
    height: auto;
`;
// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
}

const MapContainer = () => {

    useEffect(() => {
        const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
		};
        const map = new kakao.maps.Map(container, options);

        if (navigator.geolocation) {
    
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function(position) {
                
                let lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도
                
                let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                    message = '<div style="padding:5px;">현재위치</div>'; // 인포윈도우에 표시될 내용입니다
                
                // 마커와 인포윈도우를 표시합니다
                displayMarker(locPosition, message);
                    
              });
            
        } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            
            let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
                message = 'geolocation을 사용할수 없어요..'
                
            displayMarker(locPosition, message);
        }
        
        // 지도에 마커와 인포윈도우를 표시하는 함수입니다
        function displayMarker(locPosition, message) {
        
            // 마커를 생성합니다
            let marker = new kakao.maps.Marker({  
                map: map, 
                position: locPosition
            }); 
            
            let iwContent = message, // 인포윈도우에 표시할 내용
                iwRemoveable = true;
        
            // 인포윈도우를 생성합니다
            let infowindow = new kakao.maps.InfoWindow({
                content : iwContent,
                removable : iwRemoveable
            });
            
            // 인포윈도우를 마커위에 표시합니다 
            infowindow.open(map, marker);
            
            // 지도 중심좌표를 접속위치로 변경합니다
            map.setCenter(locPosition);      
        }


        axios.get('/api/getClusterMarkers').then(res => {
            let imageSize = new kakao.maps.Size(30, 30); 
            // let imageSrc = "https://cdn2.iconfinder.com/data/icons/map-locations-filled-pixel-perfect/64/pin-map-location-26-512.png"; 
            let imageSrc = "https://cdn4.iconfinder.com/data/icons/placeholder-6/64/parking-car_parking-maps-location-placeholder-pin-1024.png"; 
                // 마커 이미지를 생성합니다    
            let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);


            let clusterer = new kakao.maps.MarkerClusterer({
                map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
                averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
                minLevel: 7 // 클러스터 할 최소 지도 레벨 
            });
            
            let markers = res.data.map(function(position, i) {
                //마커를 하나 새로 만드는데, 위치값을 지정하고 클릭이 가능하게 설정함.
                let marker = new kakao.maps.Marker({
                    position : new kakao.maps.LatLng(position.lat, position.lng),
                    image: markerImage
                });
               
               //띄울 인포윈도우 정의
              let iwContent =   '<div class="wrap">' + 
                                '    <div class="info">' + 
                                '        <div class="title">' + 
                                            position.name +
                                '        </div>' + 
                                '        <div class="body">' + 
                                '            <div class="img">' +
                                '                <img src="https://cdn.crowdpic.net/detail-thumb/thumb_d_8E0C6DA4D5430782CF73A8E25A202E96.jpg" width="73" height="70">' +
                                '           </div>' + 
                                '            <div class="desc">' + 
                                '                <div class="addr ellipsis">'+ position.addr +'</div>' + 
                                '                <div class="jibun ellipsis">요금정보: '+ position.isFree +'</div>' + 
                                '                <div class="jibun ellipsis">주차가능면수: '+ position.lot +'</div>' + 
                                '                <div class="jibun ellipsis">기본시간: '+ position.time +'</div>' + 
                                '                <div class="jibun ellipsis">기본요금: '+ position.fee +'</div>' + 
                                '                <div class="jibun ellipsis">추가시간: '+ position.addtime +'</div>' + 
                                '                <div class="jibun ellipsis">추가요금: '+ position.addfee +'</div>' + 
                                '                <div class="jibun ellipsis">결제수단: '+ position.pay +'</div>' + 
                                '                <div class="jibun ellipsis">월정기권: '+ position.monthfee +'</div>' + 
                                '            </div>' + 
                                '        </div>' + 
                                '    </div>' +    
                                '</div>';// 인포윈도우에 표출될 내용

                // 인포윈도우를 생성합니다
                let infowindow = new kakao.maps.InfoWindow({
                    content : iwContent
                });
               
                // 마커에 클릭이벤트를 등록합니다
                kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
                kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
               
                //생성된 마커를 반환합니다.
               return marker;
            });
            clusterer.addMarkers(markers);
        }).catch();
    }, []);

    return (
        <Mapview id='myMap'></Mapview>
    );

}


export default MapContainer; 