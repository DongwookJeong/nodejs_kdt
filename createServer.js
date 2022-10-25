import http from 'http';
import fs from 'fs'
// root directory에
// DI 셋팅, command : npm init
// 진행후
// 생성된 package.json에
// "type" : "module"이라는 내용을 기입하면,
// module js 방식, 즉 mjs 방식을 사용 할 수 있다.
http.createServer(function(request, responce){
  // http 객체에 어떤 키와 메서드가 있는지 확인 할 것
  const data = fs.readFileSync('index.html')
  // 접미사로 Sync가 작성되어있다면 '동기적(synchronously)'으로 처리하는 메서드가 된다.
  // fs객체에 어떤 키와 메서드가 있는지 확인 할 것
  responce.writeHead(200, {'content-type': "text/html; charset = utf8"})
  // writeHead 메서드는 '일련의 통신 규약'과 같은 약속으로, 200이면 정상적으로 작동할 때를 이야기 한다.
  // 404에러 같은 것이 대표적인 에러형 비정상 응답 내용중 하나
  responce.write(data)
  // 읽어낸 파일을 data로 "write(작성)" 한다
  responce.end()
  // 작성이 완료되면 말 그대로 end, 종료한다.
}).listen(6545, function(){
  // 포트(컴퓨터가 인터넷에 연결하는 세부적인 연결통로)는 임의로 9876으로 정하였다.
  console.log('서버가 작동되고 있습니다.')
})
// 이 과정을 카페로 상상하면 기타 다양한 '요청'이 없으므로
// 손님이 오면 바로 기본커피(index.html)만 바로 만들어 준 것과 같은 이치가 된다.