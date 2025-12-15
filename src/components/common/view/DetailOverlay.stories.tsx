import type { Meta, StoryObj } from '@storybook/react';
import DetailOverlay from './DetailOverlay';

const meta: Meta<typeof DetailOverlay> = {
  title: 'Common/DetailOverlay',
  component: DetailOverlay,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="relative min-h-screen bg-slate-100 p-10">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-2xl font-bold">배경 페이지 콘텐츠</h1>
          <p>
            이 텍스트는 오버레이 뒤에 있는 본문입니다. DetailOverlay가 이 위에
            렌더링됩니다. 오버레이가 열려있을 때 뒤쪽 콘텐츠가 어떻게 보이는지
            확인할 수 있습니다.
          </p>
          {/* 실제 스토리 렌더링 */}
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DetailOverlay>;

// 테스트용 더미 콘텐츠 컴포넌트
const DummyContent = () => (
  <div className="p-6 space-y-6 overflow-auto h-full">
    <div className="h-40 bg-blue-50 rounded-lg p-4 border border-blue-100">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">
        상세 정보 영역
      </h3>

      {Array.from({ length: 15 }).map((_, i) => (
        <p key={i}>
          반복되는 텍스트 블록 {i + 1}. 스크롤이 생기는지 확인하세요. 내용이
          길어지면 Drawer나 Modal 내부에서 스크롤이 발생해야 합니다.
        </p>
      ))}
    </div>
  </div>
);

export const Default: Story = {
  args: {
    children: <DummyContent />,
  },
};

export const InteractiveFlow: Story = {
  args: {
    children: <DummyContent />,
  },
  play: async ({ canvasElement }) => {
    // 필요하다면 이곳에 interaction test 코드 작성 가능
    // 예: 버튼 클릭하여 모드로 전환 테스트 등
  },
};
