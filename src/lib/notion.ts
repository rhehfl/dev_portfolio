import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

export async function getDatabaseData() {
  const response = await notion.databases.retrieve({
    database_id: DATABASE_ID,
  });
  return response.object;
}

export async function getPageBlocks(pageId: string) {
  const response = await notion.blocks.children.list({ block_id: pageId });
  return response.results;
}
