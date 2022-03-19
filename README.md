# Lectionary

All Mass readings on JSON format

## npm commands

Generate JSON schema from `types/Lectionary.ts`:
```bash
npm run schema:gen
```

Validate `data/pt_BR.json` with Lectionary schema:
```bash
npm run schema:validate
```
_**TODO** This command should validate all localized files._