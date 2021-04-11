# Excalibur Client
- 온라인 비대면 강의 집중력 향상 플랫폼의 클라이언트 프로그램입니다.
# 주요 기능 (Front)
- 로그인 / 회원가입 / 대시보드 / 투명 창 UI
- 로그인 상태 관리 
  - `JWT`
- 웹캠 데이터 취득 및 전송
- 프로세스 간 통신 (IPC)
  - 실행 중 프로세스 분석

# 시스템 구조
![시스템구성도_소드마스터](https://user-images.githubusercontent.com/13795765/114305516-5bb1e080-9b13-11eb-95e6-f13530e298c1.png)
![UI State](https://user-images.githubusercontent.com/13795765/114305603-ccf19380-9b13-11eb-9f90-8ea443d5387a.png)
의 `클라이언트 어플리케이션` 저장소입니다.


# 프로젝트 구조
```
📦excalibur-frontend
 ┣ 📂assets # 아이콘 등 이미지 파일
 ┣ 📂src
 ┃ ┣ 📂main # electron의 main process 
 ┃ ┃ ┣ 📂exec # 외부 프로세스 (windows와 mac버전으로 나뉨)
 ┃ ┃ ┃ ┣ 📂processAnalysisMac
 ┃ ┃ ┃ ┃ ┣ 📜processAnalysisMac.py # 실행 중 프로세스 분석
 ┃ ┃ ┃ ┃ ┗ 📜requirements.txt # 파이썬 의존성 목록
 ┃ ┃ ┃ ┗ 📂processAnalysisWin
 ┃ ┃ ┃ ┃ ┣ 📜processAnalysisWin.py
 ┃ ┃ ┃ ┃ ┗ 📜requirements.txt
 ┃ ┃ ┣ 📜ipc.ts # electron의 main process에서 실행되는 명령 구문 (창 크기 조절, 알림, 외부 프로세스와 통신 등)
 ┃ ┃ ┗ 📜main.ts # electron App 진입점
 ┃ ┗ 📂renderer # UI(웹뷰), render process
 ┃ ┃ ┣ 📂assets # 이미지 및 폰트 파일
 ┃ ┃ ┣ 📂components # 리액트 컴포넌트 파일
 ┃ ┃ ┃ ┣ 📂atoms # Atomic Design에 의거한 Atom Component
 ┃ ┃ ┃ ┃ ┣ 📂svg
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Back.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Caution.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Circle.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Email.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ExcaliburLogo.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜GoogleLogo.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Key.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Menu.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜MiniBookmark.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜MiniSession.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜MiniTimer.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜MinimodeButton.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜RightArrow.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Setting.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Triangle.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜User.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜X.tsx
 ┃ ┃ ┃ ┃ ┣ 📜AnlysisButton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜BackButton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┃ ┃ ┣ 📜CameraBox.ts
 ┃ ┃ ┃ ┃ ┣ 📜Checkbox.ts
 ┃ ┃ ┃ ┃ ┣ 📜EscButton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Loading.tsx
 ┃ ┃ ┃ ┃ ┣ 📜LoadingAnim.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Novalid.tsx
 ┃ ┃ ┃ ┃ ┣ 📜PinButton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜QuizBox.ts
 ┃ ┃ ┃ ┃ ┣ 📜Radio.tsx
 ┃ ┃ ┃ ┃ ┗ 📜Select.tsx
 ┃ ┃ ┃ ┣ 📂complex # Atomic Design에 의거한 molecules 보다 더 복잡한 컴포넌트들
 ┃ ┃ ┃ ┃ ┣ 📜AddNewLectureContent.tsx
 ┃ ┃ ┃ ┃ ┣ 📜AddNewLectureStudentContent.tsx
 ┃ ┃ ┃ ┃ ┣ 📜AddNewQuizMD.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Aside.tsx
 ┃ ┃ ┃ ┃ ┣ 📜AsideStats.tsx
 ┃ ┃ ┃ ┃ ┣ 📜DashboardMain.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ExitAnalysisButton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Gnb.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ListLectureAnalysisContent.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ManageLectureContent.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ManageQuizTimeLineContent.tsx
 ┃ ┃ ┃ ┃ ┣ 📜QuizModal.tsx
 ┃ ┃ ┃ ┃ ┣ 📜SettingsStudent.tsx
 ┃ ┃ ┃ ┃ ┗ 📜SettingsTeacher.tsx
 ┃ ┃ ┃ ┣ 📂molecules # Atomic Design에 의거한 Molecule Component
 ┃ ┃ ┃ ┃ ┣ 📜InputText.tsx
 ┃ ┃ ┃ ┃ ┗ 📜Modal.tsx
 ┃ ┃ ┃ ┗ 📂restricted # 기타 컴포넌트
 ┃ ┃ ┃ ┃ ┣ 📜Hover.tsx
 ┃ ┃ ┃ ┃ ┗ 📜Titlebar.tsx
 ┃ ┃ ┣ 📂contexts # 모달의 상태를 제어하기 위한 context
 ┃ ┃ ┃ ┗ 📜modalContext.tsx
 ┃ ┃ ┣ 📂hocs # high order component
 ┃ ┃ ┃ ┗ 📜WaitingComponent.tsx # Suspense + lazy loading을 위한 high order component
 ┃ ┃ ┣ 📂hooks # Custom Hooks
 ┃ ┃ ┃ ┣ 📜useCamera.ts # 웹캠 데이터 취득을 위한 훅
 ┃ ┃ ┃ ┣ 📜useLocalStorage.ts # 로컬스토리지 취득을 위한 훅
 ┃ ┃ ┃ ┗ 📜useModal.ts # 모달을 띄우기 위한 훅
 ┃ ┃ ┣ 📂pages # 장면마다 나눈 컴포넌트들
 ┃ ┃ ┃ ┣ 📜AnalysisScreen.tsx 
 ┃ ┃ ┃ ┣ 📜AnalysisStudentScreen.tsx
 ┃ ┃ ┃ ┣ 📜Dashboard.tsx
 ┃ ┃ ┃ ┣ 📜Intro.tsx
 ┃ ┃ ┃ ┣ 📜Settings.tsx
 ┃ ┃ ┃ ┗ 📜SignUp.tsx
 ┃ ┃ ┣ 📂repos # API 호출 함수 (repository)
 ┃ ┃ ┃ ┣ 📜account.ts
 ┃ ┃ ┃ ┣ 📜course.ts
 ┃ ┃ ┃ ┣ 📜file.ts
 ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┣ 📜quiz.ts
 ┃ ┃ ┃ ┗ 📜session.ts
 ┃ ┃ ┣ 📂slices # redux-toolkit 기반 상태 관리를 위한 slice
 ┃ ┃ ┃ ┣ 📜accountSlice.ts
 ┃ ┃ ┃ ┣ 📜globalStateSlice.ts
 ┃ ┃ ┃ ┗ 📜uiSlice.ts
 ┃ ┃ ┣ 📂styles # 전역 스타일
 ┃ ┃ ┃ ┣ 📜color.ts
 ┃ ┃ ┃ ┣ 📜global.css
 ┃ ┃ ┃ ┗ 📜theme.ts
 ┃ ┃ ┣ 📂types # typescript Type 정의 파일들
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┗ 📂complex
 ┃ ┃ ┃ ┃ ┃ ┗ 📜QuizModal.ts
 ┃ ┃ ┃ ┣ 📂contexts
 ┃ ┃ ┃ ┃ ┗ 📜ModalType.ts
 ┃ ┃ ┃ ┣ 📜App.ts
 ┃ ┃ ┃ ┗ 📜ipc.ts
 ┃ ┃ ┣ 📂utils # 기타 유틸리티 함수
 ┃ ┃ ┃ ┣ 📜fix-webm-duration.js
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📜App.tsx # 메인 앱
 ┃ ┃ ┣ 📜index.tsx # render process 첫 화면 렌더링 진입 함수
 ┃ ┃ ┣ 📜main.html # template
 ┃ ┃ ┣ 📜rootReducer.ts # redux store에 대한 root reducer
 ┃ ┃ ┣ 📜routes.ts # 페이지마다 보여줄 컴포넌트를 정의 (lazy loading)
 ┃ ┃ ┗ 📜store.ts # redux store 설정 개발용 hot-reloading 설정
 ┣ 📜.babelrc # javascript code transpile을 위한 설정 파일 
 ┣ 📜.env # 엔드포인트 등 환경 변수 설정 값
 ┣ 📜.eslintrc.json # 코드 규칙 설정 
 ┣ 📜.gitignore # git이 관리하지 않을 파일 들 설정 
 ┣ 📜.gitmessage.txt # commit message를 정해진 규칙에 따라 작성할 수 있도록 함
 ┣ 📜README.md # 소개 파일
 ┣ 📜README_setup.md # 설치 방법에 대한 메모
 ┣ 📜package.json # 의존 성관리
 ┣ 📜tsconfig.json # 타입스크립트 설정 파일
 ┣ 📜webpack.main.config.js # electron main process에 대한 webpack 설정 파일
 ┣ 📜webpack.plugins.js # webpack 플러그인 설정 파일
 ┣ 📜webpack.renderer.config.js # electron render process에 대한 webpack 설정 파일
 ┣ 📜webpack.rules.js # 웹팩 rules (render process)
 ┗ 📜yarn.lock # 패키지 의존성 버전 잠금 파일
```

# 디자인
## figma를 통해 체계적으로 작업.
![image](https://user-images.githubusercontent.com/13795765/114304724-b2b5b680-9b0f-11eb-8537-268d89d024a3.png)
