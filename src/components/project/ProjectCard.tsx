import Carousel from '@/components/common/Carousel';

export default function ProjectCard() {
  return (
    <article className="flex flex-col rounded-2xl">
      <Carousel axis="x">
        <div>컨텐츠1</div>
        <div>컨텐츠2</div>
        <div>컨텐츠3</div>
        <div>컨텐츠4</div>
      </Carousel>
    </article>
  );
}
