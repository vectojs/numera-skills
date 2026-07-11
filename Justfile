default:
    @just --list

verify:
    bun run verify

skills-list:
    skills add . --list --full-depth
