const currentBoard = document.querySelector('#current-board').value

if (currentBoard) {
  const board = document.querySelector(`.${currentBoard}`)
  board.classList.add('active')
} else {
  const 반려동물동반식당 = document.querySelector('.반려동물동반식당')
  반려동물동반식당.classList.add('active')
}



// 마커를 담을 배열입니다
var markers = [];

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();  

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

// 키워드로 장소를 검색합니다
searchPlaces();

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    var keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch( keyword, placesSearchCB); 
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList'), 
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';
    
    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    for ( var i=0; i<places.length; i++ ) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i), 
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // console.log(places[i])
        // console.log('주소', places[i].address_name)
        // console.log('카테고리명', places[i].category_name)
        // console.log('폰번', places[i].phone)
        // console.log('이름', places[i].place_name)
        // console.log('가게url', places[i].place_url)
        // console.log('가게주소', places[i].road_address_name)


        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(marker, place_name, address_name, category_name, phone, place_url, road_address_name) {
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, place_name, address_name, category_name, phone, place_url, road_address_name);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });

            kakao.maps.event.addListener(marker, 'click', function() {
              infowindow.close();
              window.open(place_url);
            });

            
            // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
            // kakao.maps.event.addListener(marker, 'click', function() {
            //   infowindow.close();
            //   displayInfowindowAfterClick(marker, place_name, address_name, category_name, phone, place_url, road_address_name);
            // });



            itemEl.onmouseover =  function () {
                displayInfowindow(marker, place_name, address_name, category_name, phone, place_url, road_address_name);
            };

            itemEl.onmouseout =  function () {
                infowindow.close();
            };
        })(marker, places[i].place_name, places[i].address_name, places[i].category_name, places[i].phone, places[i].place_url, places[i].road_address_name);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address_name  + '</span>'; 
    }
                 
      itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i; 

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, place_name, address_name, category_name, phone, place_url, road_address_name) {
    var content = 
    `
    <div style="width:15rem;height:8rem;padding:5px;">
      <div style="padding:5px 5px 0 5px;z-index:1;font-weight:700;color:#EB7D80;">${place_name}</div>
      <div style="padding:0 5px 5px 5px;z-index:1;font-size:0.7rem;color:#D9D9D9;">${category_name}</div>
      <div style="padding:0 5px;z-index:1;">주소: ${address_name}</div>
      <div style="padding:0 5px;z-index:1;">번호: ${phone? phone:'없음'}</div>
      <p style="padding:5px;z-index:1;color:#D0ACBF;font-weight:700;">마커를 클릭하면 해당 url로 이동합니다</ㅔ>
    </div>
    `
    // <a href="${place_url}" style="display:block;padding:5px;z-index:1;color:blue;text-decoration:underline;">${place_url}</a>

    infowindow.setContent(content);
    infowindow.open(map, marker);

}


// 마커 클릭 시, 인포윈도우 뜨게
function displayInfowindowAfterClick(marker, place_name, address_name, category_name, phone, place_url, road_address_name) {
  // 마커 위에 커스텀오버레이를 표시합니다
  // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
  var content = 
    `
    <div class="wrap">
      <div class="info">
        <div class="title">
          <div style="padding:5px 5px 0 5px;z-index:2;font-weight:700;color:#EB7D80;">${place_name}</div>
          <div class="close" onclick="closeOverlay()" title="닫기"></div>
        </div>
        <div class="body">
          <div class="desc">
            <div style="padding:0 5px 5px 5px;z-index:2;font-size:0.7rem;color:#D9D9D9;">${category_name}</div>
            <div style="padding:0 5px;z-index:2;">주소: ${address_name}</div>
            <div style="padding:0 5px;z-index:2;">번호: ${phone? phone:'없음'}</div>
            <a href="${place_url}" style="display:block;padding:5px;z-index:2;color:blue;text-decoration:underline;">${place_url}</a>
          </div>
        </div>
      </div>
    </div>
    `
    
  var overlay = new kakao.maps.CustomOverlay({
    content: content,
    map: map,
    position: marker.getPosition()       
  });

  console.log(overlay)

  overlay.setMap(map);
}


 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}

// 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
function closeOverlay() {
  overlay.setMap(null);     
}