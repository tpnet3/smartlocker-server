# 서버 실행

nodejs 의존성 파일 설치

```bash
npm install
```

서버는 3000 포트로 실행됩니다.

```bash
node app.js
```

# 



# API

## 파일 업로드

### request:

`POST /upload` 주소로 file 필드에 exe 파일을 선택해 전송합니다.

```html
<form method="POST" action="/upload" enctype='multipart/form-data'>
    <input type="file" name="file">
    <input type="submit" value="업로드">
</form>
```

### response:

`id` 는 업로드된 파일의 고유 아이디입니다.

`filename` 은 업로드된 파일의 이름입니다.

`zip` 은 암호화된 exe 파일과 key 파일이 압축된 zip 파일을 다운로드 받는 경로입니다. (주의: 암호화된 exe 파일을 보안 프로그램이 바이러스로 인식할 수 있습니다.)

`exe` 는 암호화된 exe 파일을 다운로드 받는 경로입니다. (주의: 암호화된 exe 파일을 보안 프로그램이 바이러스로 인식할 수 있습니다.)

`key` 는 프로그램 실행을 위한 라이선스 파일입니다.

```
{
    "id": "08326e48-0e0d-4b8a-89d3-6f59e499b453",
    "filename": "HelloWorld.exe",
    "zip": "/download/08326e48-0e0d-4b8a-89d3-6f59e499b453/download.zip",
    "exe": "/download/08326e48-0e0d-4b8a-89d3-6f59e499b453/HelloWorld.exe",
    "key": "/download/08326e48-0e0d-4b8a-89d3-6f59e499b453/license.key"
}
```

## 파일 전송 후 redirect

### request:

`POST /upload?redirect=http://example.com/` 주소에 redirect 쿼리 값으로 URL 을 전송하면,
파일 업로드가 완료된 후 해당 주소로 redirect 됩니다.

```html
<form method="POST" action="/upload?redirect=http://example.com/" enctype='multipart/form-data'>
    <input type="file" name="file">
    <input type="submit" value="업로드">
</form>
```

### response:

redirect 된 주소의 query string 으로 다음과 같이 정보가 전달됩니다.

```
http://example.com/
    ?id=08326e48-0e0d-4b8a-89d3-6f59e499b453
    &filename=HelloWorld.exe
    &zip=/download/08326e48-0e0d-4b8a-89d3-6f59e499b453/download.zip
    &exe=/download/08326e48-0e0d-4b8a-89d3-6f59e499b453/HelloWorld.exe
    &key=/download/08326e48-0e0d-4b8a-89d3-6f59e499b453/license.key
```
