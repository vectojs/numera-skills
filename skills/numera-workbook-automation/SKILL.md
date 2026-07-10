---
name: numera-workbook-automation
description: Use when inspecting, reading, or safely changing local Numera, CSV, or XLSX workbooks with the Numera CLI, especially for spreadsheet ranges, formulas, and automation.
---

# Numera Workbook Automation

Use the published Numera CLI for local workbook work. It owns file codecs and
atomic output behavior; do not reimplement spreadsheet parsing or use browser
automation for an offline file operation.

## Procedure

1. Inspect before changing anything:

   ```bash
   numera inspect workbook.xlsx
   ```

2. Read the exact sheet and range before deriving a formula or edit:

   ```bash
   numera get workbook.xlsx "Budget" A1:C10
   ```

3. Write one explicit value mode to a distinct output path:

   ```bash
   numera set workbook.xlsx "Budget" B2 --formula "A2*1.2" --output workbook-edited.xlsx
   ```

4. Read the output to verify raw source and display value:

   ```bash
   numera get workbook-edited.xlsx "Budget" B2
   ```

## Value modes

| Intent  | Flag        | Example                  |
| ------- | ----------- | ------------------------ |
| Text    | `--text`    | `--text "Q3 plan"`       |
| Number  | `--number`  | `--number 42.5`          |
| Boolean | `--boolean` | `--boolean true`         |
| Formula | `--formula` | `--formula "SUM(A1:A4)"` |

## Safety rules

- Never pass the input path to `--output`; Numera rejects it deliberately.
- Keep the original file until the output has been inspected.
- Use exact sheet names and A1 addresses. An invalid sheet, cell, or range is
  an error to correct, not a reason to guess.
- CSV represents one worksheet only. Use JSON or XLSX for multi-sheet state or
  formatting.
- Do not handle cloud credentials, remote URLs, macros, encrypted workbooks,
  or collaboration data through this skill.
