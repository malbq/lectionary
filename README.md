# Lectionary

All Mass readings on YAML and JSON format.

Edit text on YAML files (it's easiear because of line breaks) and then use these commands to generate JSON files.

## Build

To do the whole process at once, just run:
```bash
npm run build
```

## Or

Generate JSON schema from `types/Lectionary.ts`:
```bash
npm run schema:gen
```

Assert that the generated schema is valid:
```bash
npm run schema:validate
```

Convert YAML file to JSON:
```bash
npm run json:gen
```

Validate converted JSON file with the generated schema:  
_**TODO** This command should validate all localized files._
```bash
npm run json:validate
```

Extract liturgy keys from converted JSON file to a new file:
```bash
npm run keys:gen
```

## Check lectionary completeness status

```bash
npm run status:s  # summarized status
npm run status:d  # detailed - show status for incomplete liturgies
npm run status:da # detailed - show status for all liturgies
npm run status    # defaults to status:s
```