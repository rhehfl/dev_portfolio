// features/project/components/ProjectDetailRenderer.tsx

import MarkDownWrapper from '@/components/common/MarkDownWrapper';
import ProjectDetail from '@/features/project/components/ProjectDetail';
import {
  SectionContent,
  ProjectDetailData,
} from '@/features/project/types/projectDetail';

const SectionContentRenderer = ({ content }: { content: SectionContent }) => {
  switch (content.type) {
    case 'text':
      return <MarkDownWrapper>{content.value}</MarkDownWrapper>;
    case 'code':
      return (
        <ProjectDetail.Code language={content.language}>
          {content.value}
        </ProjectDetail.Code>
      );
    case 'metrics':
      return (
        <ProjectDetail.Metrics>
          {content.items.map((item) => (
            <ProjectDetail.MetricItem key={item.name} {...item} />
          ))}
        </ProjectDetail.Metrics>
      );
    case 'figure':
      return (
        <ProjectDetail.Figure
          src={content.src}
          alt=""
          caption={content.caption}
        />
      );
    case 'blogLink':
      return <ProjectDetail.BlogLink {...content} />;
  }
};

export default function ProjectDetailRenderer({
  data,
}: {
  data: ProjectDetailData;
}) {
  return (
    <ProjectDetail>
      <ProjectDetail.Header link={data.link}>
        {data.header}
      </ProjectDetail.Header>
      <ProjectDetail.Body>
        {data.sections.map((section) => (
          <ProjectDetail.Section
            key={section.title}
            title={section.title}
            dotColor={section.dotColor}
          >
            {section.contents.map((content, i) => (
              <SectionContentRenderer key={i} content={content} />
            ))}
          </ProjectDetail.Section>
        ))}
        <ProjectDetail.Result>{data.result}</ProjectDetail.Result>
      </ProjectDetail.Body>
    </ProjectDetail>
  );
}
