# Numera Skills Agent Guide

This repository owns Agent Skills for operating Numera through stable,
published interfaces. It does not own spreadsheet semantics, codecs, website
UI, CLI implementation, or MCP transport.

## Rules

- Keep one focused capability per `skills/<name>/SKILL.md`.
- Start new or changed skill behavior with a failing Agent scenario, then
  forward-test the same scenario with the skill before release.
- Invoke published Numera packages or commands; never copy their parsing,
  formula, XLSX, or history implementation into a skill.
- Keep source workbooks intact and require verified, distinct outputs for
  mutation workflows.
- Write documentation and code comments in English.
- Run `just verify`, the official Skill validator, and `just skills-list`
  before claiming a skill is ready.
- Record public behavior changes in `CHANGELOG.md` and a Changeset.
