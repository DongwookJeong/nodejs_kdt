// http 모듈의 createServer() 메서드 콜백함수 두번째 파라미터 Response

// 1. node.js에서 http는 모듈이다.Response
// 2. createServer()라는 함수는 "메서드"로 부르는 것으로 "인스턴스"임을 알 수 있다.
// 3. 함수를 호출하면서 원하는 형태로 알고리즘을 넣을 수 있는 콜백 구조라는 것을 알 수 있다.
// 4. 인자가 전달 받는 개념과 개발자가 작성하지 않았지만, 이미 존재하는 Response라는 매개변수를 예상할 수 있다.

// GET요청과 다르게 POST요청은 말 그대로 "보낸다"라는 의도
// GET은 URL, queryString이라는 형태로 원하는 것을 "가져온다"라는 의미
// GET은 주소창이 변경되면서 마치 URL이 바뀌는 형태로 원하는 데이터를 처리하지만,
// POST는 URL과 관련이 없음 그래서 외부로 보여지면 안되는 특정 데이터를에서 자주 사용되는데, 따로 데이터를 받아내는 일련의 형태가 존재

// 서버측에서는 POST 요청을 '이벤트'로 받아오는 형태로 취하고 있습니다. node.js는 '켜짐'이란 의미의 on메서드를 지원, "데이터가 도착했을 때"를 이벤트로 봄

// 예제에서는 하나의 POST 요청을 두개의 이벤트로 처리한 것을 발견 가능

// 패킷 교환 방식인 http 규약 특징 때문에, "end"라는 이벤트도 따로 마련되어있는 점이 특이, 처리 방식이 다를뿐 get요청과 post요청 둘다 원하는 서비스의 응답을 할 수 있기 때문에 유형에 따라 서빙을 해낼 수 있다.

if (request.method === "POST"){

  let body = ""

  request.on('data', (data)=>{
    body += data;
    console.log(data, "this is first event")
    const test = new URLSearchParams(body)
    console.log(test)
    const timeData = new Date()
    console.log(timeData)
    // new Data() 인스턴스를 활용한 날짜 데이터 get
    const stemp = timeData.getFullYear()+""+"0"+(timeData.getMonth()+1)+timeData.getData()+"-" +timeData.getHours()+"-"+timeData.getMinutes()
    for(const [key, value] of test){
      console.log(key, "그리고", value)
      FileSystem.writeFile(`..save/${stemp}-${key}.txt`, value, (err)=>{
        if (err) throw err
      })
    }
  })
  request.on('end', ()=>{
    console.log(body, "this is last event")
    Response.statusCode = 200;
    Response.setHeader('Content-Type', 'text/html')
    Response.end(main)
  })
}