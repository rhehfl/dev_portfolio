export const MODERN_KIT = `## 🌐 Open Source Contributions

### **modern-kit** | React Utility Library ([GitHub](https://github.com/modern-agile-team/modern-kit))

- **useScrollRestoration: SPA 스크롤 복원 자동화 훅 구현**
    - 여러 프로젝트에서 반복되는 스크롤 복원 로직을 범용 유틸리티로 추상화하여 기여.
    - **핵심 로직**: \`History API\`의 \`state\`에 고유 ID를 주입하고 \`Session Storage\`와 연동하여, 동일 URL 진입 시에도 개별적인 스크롤 위치를 추적하는 **State-Keyed Storage** 방식 설계.
    -  \`history.scrollRestoration = 'manual'\` 제어 및 비동기 렌더링 대응 옵션을 통해 SPA의 고질적인 UX 문제 해결.
    - [PR #1027](https://github.com/modern-agile-team/modern-kit/pull/1027) | [PR #1023](https://github.com/modern-agile-team/modern-kit/pull/1023)

- **Core Hooks & Utils: 런타임 안정성 및 유틸리티 강화**
    - **\`useCallbackOnce\`**: 컴포넌트 생명주기 내 최초 1회 실행을 보장하여 초기화 로직의 안정성 확보.
    - **\`isRegExp\`, \`isSet\`**: TypeScript **Custom Type Guard**를 구현하여 런타임 객체 판별 및 타입 안정성 강화.
    - **\`truncate\`**: UI 대응을 위한 문자열 절삭 유틸리티 구현.
    - [PR #799](https://github.com/modern-agile-team/modern-kit/pull/799) | [PR #785](https://github.com/modern-agile-team/modern-kit/pull/785) | [PR #776](https://github.com/modern-agile-team/modern-kit/pull/776)`;
