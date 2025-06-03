# GAMEET Front-End

## 프로젝트 실행 방법

```bash
pnpm install // 패키지 설치
pnpm dev // 프로젝트 실행 (localhost:8000)
pnpm storybook // 스토리북 실행
```

## 기술 스택

|        범주         |                   기술                    |
| :-----------------: | :---------------------------------------: |
|    **Language**     |          JavaScript, TypeScript           |
|    **FrameWork**    |                  Next.js                  |
|     **Styling**     |            Tailwind CSS, HeroUI           |
|      **State**      |          Zustand, TanStack Query          |
|      **Form**       |              React Hook Form              |
|   **Lint/Format**   | ESLint (`next/core-web-vitals`), Prettier |
| **Package Manager** |                   pnpm                    |
|      **Test**       |                 Storybook                 |

## 폴더 구조

```
📦 GAMEET-FE
┣ 📂 .storybook
┣ 📂 node_modules
┣ 📂 public
┃ ┣ 📂 fonts
┃ ┣ 📂 icons
┃ ┗ 📂 images
┣ 📂 src
┃ ┣ 📂 app
┃ ┃ ┣ 📂 api
┃ ┃ ┣ 📂 find-password
┃ ┃ ┣ 📂 login
┃ ┃ ┣ 📂 match
┃ ┃ ┣ 📂 profile
┃ ┃ ┣ 📂 signup
┃ ┃ ┣ 📜 layout.tsx
┃ ┃ ┣ 📜 page.tsx
┃ ┣ 📂 components
┃ ┃ ┣ 📂 common
┃ ┃ ┣ 📂 form
┃ ┃ ┣ 📂 layout
┃ ┃ ┣ 📂 nav
┃ ┃ ┣ 📂 pages
┃ ┃ ┗ 📂 socket
┃ ┣ 📂 constants
┃ ┣ 📂 hooks
┃ ┣ 📂 store
┃ ┣ 📂 stories
┃ ┣ 📂 styles
┃ ┣ 📂 types
┃ ┗ 📂 utils
```

## 커밋/브랜치 컨벤션

| 타입       | 설명                                  | 예시                                    |
| :--------- | :------------------------------------ | :-------------------------------------- |
| `Feat`     | 새로운 기능 추가                      | `Feat: 회원가입 기능 구현`              |
| `Fix`      | 버그 수정                             | `Fix: 로그인 시 인증 오류 수정`         |
| `Remove`   | 기능/코드/파일 삭제                   | `Remove: README.md 삭제`                |
| `Refactor` | 코드 리팩토링                         | `Refactor: 컴포넌트 props 구조 정리`    |
| `Style`    | 코드 스타일 수정                      | `Style: 세미콜론 제거 및 줄 정리`       |
| `Docs`     | 문서 작성 및 수정                     | `Docs: README에 기술 스택 추가`         |
| `Test`     | 테스트 코드 추가 및 수정              | `Test: 로그인 테스트 케이스 추가`       |
| `Chore`    | 기타 변경사항 (패키지, 설정, 빌드 등) | `Chore: ESLint 설정 및 패키지 업데이트` |

### 브랜치 컨벤션

```bash
git branch // main 브랜치인지 확인
git checkout -b "Docs/1" ("커밋컨벤션/이슈번호")
```

### 커밋 메시지 예시

```bash
git commit -m "Feat: 기능 추가"
git commit -m "Fix: 레이아웃 깨지는 이슈 수정"
git commit -m "Docs: README에 프로젝트 구조 설명 추가"
```

## 문제 상황(해결 여부)
