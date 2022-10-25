import fs from 'fs'
import path from 'path'
import http from 'http'

const server = http.createServer((request, responce)=>{
  const main = fs.readFileSync('index.html', (err)=>{
    if(err)throw err
  })
  if (request.method === "GET"){
    responce.statusCode = 200;
    responce.setHeader('Content-Type', 'text/html')
    responce.end(main)
  } else if (request.method === 'POST'){
    let body = "";
    request.on('data', (data)=>{
      body += data
      data = data.toString('utf8')
      console.log(data, "this is first event")
    })
    request.on('end', ()=>{
      console.log(body, "this is last event")

      responce.statusCode = 200
      responce.setHeader('Content-Type', 'text/html')
      responce.end(main)
    })
  }
})
server.listen(3574, () => {
  console.log('server running')
})