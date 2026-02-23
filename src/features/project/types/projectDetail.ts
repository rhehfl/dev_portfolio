export type SectionContent =
  | { type: 'text'; value: string }
  | { type: 'code'; value: string; language?: string }
  | { type: 'metrics'; items: MetricItem[] }
  | { type: 'figure'; src: string; caption?: string }
  | { type: 'blogLink'; title: string; description?: string; href: string };

export interface Section {
  title: string;
  dotColor?: string;
  contents: SectionContent[];
}

export interface MetricItem {
  name: string;
  before: string | number;
  after: string | number;
  rate?: string;
}

export interface ProjectDetailData {
  id: string;
  header: string;
  link?: string;
  sections: Section[];
  result: string;
}
