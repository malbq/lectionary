# Lectionary

All Mass readings on JSON format

## npm commands

Edit the texts on YAML files (it's easiear because of line breaks) and then use this command to generate JSON files:
```bash
npm run json:gen
```

---

Generate JSON schema from `types/Lectionary.ts`:
```bash
npm run schema:gen
```

---

Validate JSON data with generated schema:
```bash
npm run schema:validate
```
_**TODO** This command should validate all localized files._

---

Check lectionary completeness status:
```bash
npm run status:s  # summarized status
npm run status:d  # detailed - show status for incomplete liturgies
npm run status:da # detailed - show status for all liturgies
npm run status    # defaults to status:s
```