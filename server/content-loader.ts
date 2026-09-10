import { readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { getCached, invalidate } from "./cache";
import type { Block, BlockId } from "./types";

const CONTENT_DIR = resolve(process.cwd(), "content/blocks");

// MDX нам нужен как "text container", не как компилируемый JSX — нам
// нужны frontmatter (структура) и body (markdown). Это и есть типичный
// контракт "плоского" контента из headless CMS.
async function listMdxFiles(): Promise<string[]> {
  const entries = await readdir(CONTENT_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => e.name)
    .sort();
}

async function readBlockFile(
  name: string,
): Promise<{ raw: string; path: string }> {
  const path = join(CONTENT_DIR, name);
  const raw = await Bun.file(path).text();
  return { raw, path };
}

function pickBlockId(filename: string): BlockId {
  // 01-hero.mdx -> hero
  const base = filename.replace(/^\d+-/, "").replace(/\.mdx$/, "");
  return base as BlockId;
}

async function parseBlock(name: string): Promise<Block> {
  const { raw, path } = await readBlockFile(name);
  const { data, content } = matter(raw);
  const bodyHtml = await marked.parse(content);

  // Валидация: id и order обязательны, остальные поля валидируются
  // по структуре (для MVP достаточно type assertion + runtime fallback).
  if (!data.id || typeof data.order !== "number") {
    throw new Error(
      `Block ${name} is missing required frontmatter (id, order). Got: ${JSON.stringify(data)}`,
    );
  }

  return {
    ...(data as Omit<Block, "bodyHtml">),
    bodyHtml,
  } as Block;
}

export async function loadAllBlocks(): Promise<Block[]> {
  const files = await getCached<string[]>(
    join(CONTENT_DIR, "__listing__"),
    async () => listMdxFiles(),
  );

  const blocks = await Promise.all(files.map((f) => parseBlock(f)));
  // Сортируем по order на всякий случай (хотя имена уже отсортированы)
  return blocks.sort((a, b) => a.order - b.order);
}

export async function reloadBlocks(): Promise<number> {
  return invalidate(join(CONTENT_DIR, "__listing__"));
}
