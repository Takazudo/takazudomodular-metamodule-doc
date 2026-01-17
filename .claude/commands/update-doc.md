# Update MetaModule Documentation

When this command is triggered, perform the following steps:

## 1. Update Git Submodule

Pull the latest changes from the metamodule repository:

```bash
git submodule update --remote vendor/metamodule
```

## 2. Check for Documentation Changes

Check if there are any changes in the `vendor/metamodule/docs/` directory by comparing with the previous commit:

```bash
git -C vendor/metamodule diff HEAD~1..HEAD --name-only -- docs/
```

If no changes are detected in the docs directory, report that there are no updates and stop.

## 3. Identify Changed Files

For each changed/new markdown file in `vendor/metamodule/docs/`:

- List the files that have been added or modified
- Compare the content with existing translations in `doc/docs/document/`

## 4. Copy New/Updated Files

For new or significantly updated files:

1. Copy the file to `doc/docs/document/` with kebab-case naming
2. Copy any new images to `doc/docs/document/images/`
3. If the file exists and has significant changes, backup the old translation

File naming convention mapping:
- `Setup.md` → `setup.md`
- `Plugins.md` → `plugins.md`
- `BasicVCVPatching.md` → `basic-vcv-patching.md`
- `Firmware-Boot.md` → `firmware-boot.md`
- `firmware-building.md` → `firmware-building.md`
- `firmware-debugging.md` → `firmware-debugging.md`
- `firmware-loading.md` → `firmware-loading.md`
- `user-firmware-update.md` → `user-firmware-update.md`
- `simulator-building.md` → `simulator-building.md`
- `simulator-usage.md` → `simulator-usage.md`
- `simulator-ext-plugins.md` → `simulator-ext-plugins.md`
- `Porting.md` → `porting.md`

## 5. Update Sidebar

If new files are added, update `doc/sidebars.js` to include them:

```javascript
const sidebars = {
  documentSidebar: [
    'document/index',
    'document/setup',
    'document/plugins',
    // ... add new entries here
  ],
};
```

## 6. Report Results

Report:
- Which files were updated
- Which files are new
- Any image files that were copied
- Reminder to translate the content to Japanese

## Translation Guidelines

When translating content to Japanese:

1. Keep code blocks unchanged
2. Keep command-line examples unchanged
3. Translate headings, descriptions, and explanatory text
4. Use appropriate Japanese technical terminology
5. Maintain the original Markdown structure
6. Keep links to external resources unchanged
7. Add translator notes if the original is ambiguous
