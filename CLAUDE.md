# CLAUDE.md

## Project Overview

Japanese translation documentation site for [4ms MetaModule](https://metamodule.info/).

**Target URL**: https://takazudomodular.com/pj/metamodule-doc/

**Netlify Domain**: https://takazudomodular-4ms.netlify.app/

The target URL is a custom domain that rewrites to the Netlify domain.

## Important Notes

- Conversation with AI is in English
- Documentation content is in Japanese (lang="ja")
- Original source: https://metamodule.info/docs/ (user manual, source not publicly available)
- Each translated doc includes `originalUrl` and `originalTitle` frontmatter for reference

## Project Structure

```
zmetadoc/
├── doc/                    # Docusaurus site
│   ├── docs/
│   │   └── document/       # Translated Japanese docs
│   ├── src/
│   │   ├── css/
│   │   └── theme/          # Custom Docusaurus theme overrides
│   ├── static/
│   │   └── img/
│   ├── plugins/
│   ├── scripts/
│   │   └── b4push.sh       # Pre-push validation script
│   ├── docusaurus.config.js
│   ├── sidebars.js
│   └── package.json
├── sub-packages/
│   └── mdx-formatter/      # Markdown/MDX formatter
├── .github/
│   ├── actions/
│   │   ├── build-docusaurus/
│   │   └── deploy-netlify/
│   └── workflows/
│       └── main-deploy.yml
├── .claude/
│   └── commands/
│       └── b4push.md       # /b4push command
├── package.json            # Root workspace package
└── pnpm-workspace.yaml     # pnpm workspace config
```

## Commands

- `/b4push` - Run pre-push validation (typecheck, lint, format, build)

## Development

```bash
pnpm install      # Install all workspace dependencies
cd doc
pnpm start
```

Local URL: http://zmetadoc.localhost:6737/pj/metamodule-doc/

## Building

```bash
cd doc
pnpm build
```

## Code Quality

```bash
cd doc
pnpm run check       # Run all checks
pnpm run check:fix   # Fix auto-fixable issues
```

## Writing Guidelines

### Bold Text and Japanese Quotes

Do not use Japanese quotation marks 「」 inside bold `**` markers. The CommonMark parser has issues with `**「text」**` patterns.

**Wrong:**
```markdown
**「This is quoted text」**
```

**Correct:**
```markdown
**This is bold text.**
```

If you need to quote text, use 「」 outside the bold markers or don't use bold.

## Documentation Frontmatter

Each translated document should include:

```yaml
---
title: Japanese Title
sidebar_position: N
originalTitle: English Title
originalUrl: https://metamodule.info/docs/page.html
---
```

The `originalUrl` and `originalTitle` are displayed in the DocItem component to reference the original documentation.
