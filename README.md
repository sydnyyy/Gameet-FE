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
|     **Styling**     |              Tailwind CSS, HeroUI         |
|      **State**      |          Zustand, TanStack Query          |
|      **Form**       |              React Hook Form              |
|   **Lint/Format**   | ESLint (`next/core-web-vitals`), Prettier |
| **Package Manager** |                   pnpm                    |
|      **Test**       |                 Storybook                 |

## 폴더 구조

```
📁 gameet-fe
 ┗ 📁 public
 ┗ 📁 src
   ┣ 📁 app
   ┃ ┣ 📁 api             # axios 인스턴스, 공통 API 연결 로직, 소켓 연결 로직
   ┃ ┣ 📁 chat
   ┃ ┣ 📁 find-password
   ┃ ┣ 📁 login
   ┃ ┣ 📁 match
   ┃ ┣ 📁 profile
   ┃ ┣ 📁 signup         
   ┃ ┣ ⚙️ layout.tsx      # 최상위 layout
   ┃ ┣ ⚙️ page.tsx
   ┃ ┗ ⚙️ providers.tsx
   ┃ ┗ 📁 components      # 재사용 가능한 UI 컴포넌트
   ┃ ┃ ┣ 📁 auth        # 인증 컴포넌트
   ┃ ┃ ┣ 📁 common      # 공통 컴포넌트
   ┃ ┃ ┣ 📁 form        # 폼 컴포넌트
   ┃ ┃ ┣ 📁 layout      # 레이아웃 컴포넌트
   ┃ ┃ ┣ 📁 nav         # 네비게이션 컴포넌트
   ┃ ┃ ┗ 📁 pages       # 페이지 별 컴포넌트
   ┃ ┃ ┃ ┣ 📁 appointment
   ┃ ┃ ┃ ┣ 📁 chat
   ┃ ┃ ┃ ┣ 📁 findPassword
   ┃ ┃ ┃ ┣ 📁 login
   ┃ ┃ ┃ ┣ 🏠 main
   ┃ ┃ ┃ ┣ 📁 mannerEvaluation
   ┃ ┃ ┃ ┣ 📁 match
   ┃ ┃ ┃ ┣ 📁 profile
   ┃ ┃ ┃ ┣ 📁 report
   ┃ ┃ ┃ ┗ 📁 signup
   ┣ 📁 constants         # 전역 상수
   ┣ 📁 hooks             # 커스텀 React Hooks
   ┣ 📁 store             # Zustand 전역 상태 관리
   ┣ 📁 stories           # Storybook 공통 스토리
   ┣ 📁 styles            # tailwind 공통 스타일
   ┣ 📁 types             # TypeScript 타입
   ┗ 📁 utils             # 그 외 유틸리티
 ┗ 📄 .env.local
 ┗ 📄 .eslintrc.js
 ┗ 📄 .gitignore
 ┗ 📄 .npmrc
 ┗ 📄 .prettierrc.js
 ┗ 📄 next.config.ts
 ┗ 📄 package.json
 ┗ 📄 pnpm-lock.yaml
 ┗ 📄 tailwind.config.ts
```