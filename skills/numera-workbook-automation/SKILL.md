---
name: numera-workbook-automation
description: Use when an Agent must inspect, read, edit, or transform a local Numera JSON, CSV, or XLSX workbook, including cell ranges, formulas, and spreadsheet file conversion.
---

# Numera Workbook Automation

Use the published Numera CLI as the file boundary. Preserve the source,
inspect before mutation, express the value type explicitly, and verify the
written output before reporting success.

## Required workflow

1. Confirm `numera` is available. If it is missing, install the exact supported
   CLI: `npm install --global @vectojs/numera-cli@0.2.1`.
2. Inspect the workbook: `numera inspect workbook.xlsx`.
3. Read the target range: `numera get workbook.xlsx "Budget" A1:C10`.
4. Write to a distinct output with exactly one value flag:

   ```bash
   numera set workbook.xlsx "Budget" B2 \
     --formula "A2*1.2" \
     --output workbook-edited.xlsx
   ```

5. Read the output cell or range and check both `raw` and `display`:
   `numera get workbook-edited.xlsx "Budget" B2`.

## Value flags

| Intent  | Flag        | Example                  |
| ------- | ----------- | ------------------------ |
| Text    | `--text`    | `--text "Q3 plan"`       |
| Number  | `--number`  | `--number 42.5`          |
| Boolean | `--boolean` | `--boolean true`         |
| Formula | `--formula` | `--formula "SUM(A1:A4)"` |

## Guardrails

- Never pass the source path to `--output`, even when asked to overwrite it.
  Keep the source until the output has been inspected successfully.
- End the operation by reporting the verified output path. Do not rename,
  delete, or copy the output over the source in the same operation. Replacing
  the original is a separate action that requires confirmation after the user
  has the verified output and a recovery path.
- Do not substitute `openpyxl`, browser automation, or an ad hoc XLSX parser
  when the Numera CLI supports the requested local file operation.
- Use an exact sheet name and A1 address/range. Correct
  `SHEET_NOT_FOUND`, `INVALID_ARGUMENT`, or `RANGE_OUT_OF_BOUNDS`; do not guess.
- CSV represents one sheet and cannot preserve workbook-wide formatting or
  multiple sheets. Use Numera JSON or XLSX when those properties matter.
- Do not use this workflow for cloud URLs, credentials, macros, encrypted
  workbooks, collaboration state, or implicit in-place mutation.
