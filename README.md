# TorchLauncher Homepage

한국어와 영어로 제공하는 TorchLauncher 공식 홈페이지입니다. 별도 프레임워크나 패키지 설치 없이 정적 HTML, CSS, JavaScript로 동작합니다.

## Pages

- `index.html`: 소개와 Studio/Launcher 기능 미리보기
- `download.html`: Windows와 Linux용 다운로드 안내
- `guide.html`: Markdown 기반 시작 가이드
- `guides/*.md`: 한국어 및 영어 가이드 원문

## Local preview

가이드 문서는 `fetch`로 읽기 때문에 저장소 루트에서 정적 파일 서버를 실행하세요. 예: `python3 -m http.server 8000` 후 `http://localhost:8000`을 엽니다.

언어 선택은 브라우저의 `localStorage`에 저장됩니다. 새 가이드는 `guides/`에 Markdown 파일로 추가한 뒤 `guide.html`에 문서 링크를 연결하면 됩니다.

UI 미리보기는 제품 사용 흐름을 소개하기 위해 HTML/CSS로 만든 예시입니다.
