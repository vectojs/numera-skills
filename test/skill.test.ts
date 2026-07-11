import { expect, test } from "bun:test";

const skillPath = `${import.meta.dir}/../skills/numera-workbook-automation`;
const skill = await Bun.file(`${skillPath}/SKILL.md`).text();
const openAiMetadata = await Bun.file(`${skillPath}/agents/openai.yaml`).text();

test("frontmatter is discoverable and limited to the required fields", () => {
  const frontmatter = skill.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
  expect(frontmatter).toContain("name: numera-workbook-automation");
  expect(frontmatter).toContain("description: Use when");
  expect(frontmatter).not.toContain("allowed-tools:");
});

test("workflow counters the unsafe baseline behavior", () => {
  const requiredInOrder = [
    "numera inspect",
    "numera get",
    "numera set",
    "--output",
    "Read the output",
  ];
  let cursor = -1;
  for (const phrase of requiredInOrder) {
    const next = skill.indexOf(phrase, cursor + 1);
    expect(next).toBeGreaterThan(cursor);
    cursor = next;
  }
  expect(skill).toContain("Never pass the source path to `--output`");
  expect(skill).toContain("Do not rename");
  expect(skill).toContain("Do not substitute `openpyxl`");
});

test("OpenAI interface metadata is concise and invokes the skill explicitly", () => {
  expect(openAiMetadata).toContain(
    'display_name: "Numera Workbook Automation"',
  );
  expect(openAiMetadata).toContain(
    'short_description: "Safely inspect and edit local Numera workbooks"',
  );
  expect(openAiMetadata).toContain("$numera-workbook-automation");
});
