# Research-S

## 개발 환경 세팅

### 프로그램 설치

본 프로젝트는 Node.js 기반이므로 관련된 개발 환경을 설치해야 합니다. 또한 Docker 를 활용하여 배포하므로 docker 또한 설치되어 있어야 합니다. 아래는 프로그램과 버전에 대한 정보입니다.

- node.js (v14.16.0)
- npm (7.14.0)
- docker (Docker version 20.10.7, build f0df350)
- docker-compose (docker-compose version 1.28.5, build c4eb3a1f)

### 프론트엔드

- 의존성 패키지 설치

  ```bash
  cd client
  npm install
  ```

- dev-server (vite) 구동

  ```bash
  cd client
  npm run dev
  ```

### 백엔드

- 환경 변수 설정

  `server/.env-example` 파일을 참고하여 `server/.env` 파일을 생성하세요. 데이터베이스 접속 관련 정보를 설정합니다.

- 의존성 패키지 설치

    ```bash
  cd server
  npm install
  ```

- 개발용 서버 구동

  ```bash
  cd server
  npm run dev
  ```

- tsc 구동 (문법 체크)

  ```bash
  cd server
  npm run watch
  ```

## 빌드 (로컬 or 구동 서버)

빌드를 하게 되면 도커 이미지가 생성되어 허브에 저장됩니다. 서버에 무리가 가지 않도록 로컬에서 빌드하는 걸 권장하지만, 구동 서버에서도 빌드를 할 수 있습니다.

- 사용법

  1. 먼저 working directory 를 프로젝트의 root 폴더로 둡니다.
  1. 아래 명령을 실행합니다.

     ```bash
     bash build-push.sh {version}
     ```

- 예제

  ```bash
  bash build-push.sh 0.2.2
  ```

> 윈도우라서 구동되지 않는다면 `build-push.sh` 내부에서 `sudo` 를 모두 없애고 진행해주세요.

## 서버 재가동 (구동 서버)

실제 구동 서버에서는 빌드된 이미지를 불러와 다시 구동하는 과정이 필요합니다.

- 사용법

  ```bash
  sudo docker-compose down
  sudo docker pull eszqsc112/research-s:latest
  sudo docker-compose up -d
  ```

- 제대로 구동되는지 확인하기 위해 `sudo docker-compose logs -f` 로 로그를 확인할 수 있습니다. (종료는 <kbd>Ctrl</kbd> + <kbd>C</kbd>)
