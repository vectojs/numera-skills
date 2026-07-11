# Numera Skills

Shared Agent Skills for safe local-first Numera workbook automation.

The repository packages focused instructions, not a second spreadsheet model.
Skills invoke the published `@vectojs/numera-cli` and preserve its explicit
output-path safety rule. They are designed for Codex, Claude Code, Cursor,
Copilot, KiloCode, and compatible Agent Skills hosts.

## Included skills

- `numera-workbook-automation`: inspect, read, and transform local JSON, CSV,
  and XLSX workbooks safely.

## Install

Install all skills for every detected Agent host:

```bash
skills add vectojs/numera-skills --all
```

Or install only the workbook automation skill:

```bash
skills add vectojs/numera-skills --skill numera-workbook-automation --agent '*'
```

The skill currently targets `@vectojs/numera-cli@0.2.1`. Install the CLI with
`npm install --global @vectojs/numera-cli@0.2.1` before running workbook
commands.

## Verify

```bash
just verify
just skills-list
```

## License

[MIT](./LICENSE) © 2026 Xuepoo
