import { expect, test } from "bun:test";

const skill = await Bun.file(
  `${import.meta.dir}/../skills/numera-workbook-automation/SKILL.md`,
).text();

test("skill is discoverable and preserves explicit-output safety", () => {
  expect(skill).toStartWith("---\nname: numera-workbook-automation\n");
  expect(skill).toContain("numera inspect");
  expect(skill).toContain("numera get");
  expect(skill).toContain("--output");
  expect(skill).toContain("Never pass the input path to `--output`");
});
