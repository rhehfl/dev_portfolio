import Carousel from '@/components/common/Carousel';

export default function ProjectCard() {
  return (
    <article className="flex flex-col rounded-2xl border border-gray-800 h-80">
      <div className="w-full flex flex-col h-full justify-center items-center">
        <div className="flex items-center justify-center w-full h-50 p-3 m-3">
          <Carousel images={['/window.svg']} size={'200px'} />
        </div>
        <div className="bg-gray-300 w-full flex-1 rounded-b-2xl border-t border-t-gray-800"></div>
      </div>
    </article>
  );
}
