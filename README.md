# Welcome to ImmyBot Docs Github Repo

Changes made to the main branch here are pushed to https://docs.immy.bot/ automatically.

## Getting Started

Clone this repo then open the folder in VS Code.

VS Code will recommend certain extensions when opening it the first time, we recommend you install these.

You will also need to get Yarn and Vitepress installed locally.

Yarn: https://classic.yarnpkg.com/en/packages
VitePress: https://vitepress.dev/

You can do this by running the following commands in an elevated terminal, assuming that you have NPM installed locally.

```
npm -add -D vitepress
npm install --global yarn
```

To host locally, use a terminal and navigate to your GitHub repo clone
Example: CD C:\users\<username>\documents\github\ImmyBot-Documentation
Once in the root directory for the repo clone, run:

```
yarn docs:dev
```

There will be a link to the localhost URL in your terminal, by default it is: http://localhost:5175/

Save pages as you edit them, they will be automatically updated in your browser. Any changes made to /.vitepress/config.mts will cause the instance to restart locally.

## Wistia Embeds

Use the `WistiaEmbed` component to add Wistia videos or channel playlists in Markdown without page-level scripts.

Example (single video):

```
<WistiaEmbed media-id="j4jjmljlxw" />
```

Example (channel playlist):

```
<WistiaEmbed channel-id="wq8r00965n" />
```

Required props:
- `media-id` for single videos or `channel-id` for channel playlists

Optional props (video only):
- `aspect` (number or string, default `16/9`)
- `swatch` (string URL override for the preview image)

You can place multiple embeds on the same page by repeating the component with different `media-id` or `channel-id` values.

## Project Structure

```
immybot-documentation/
├── Documentation/        # Informational files for the documents website
│   ├── Administration/
│   ├── AdvancedTopics/
│   ├── CoreFeatures/
│   ├── GettingStarted/
│   ├── HowToGuides/
│   ├── Integrations/
│   ├── References/
│   ├── Templates/
│   ├── Troubleshooting/
|   └── FAQ.MD
├── .vitepress/           # Vitepress config file for navigation
│   ├── Includes/         # Source of truth for repeating information
|   └──config.MTS
└──Index.md               # Landing Page
```

## Regarding Duplicate Information
Duplicate information, or information that should have a single source of truth need to go into `.\vitepress\includes` folder as a markdown file (.md)
You can reference the information by using

`<!--@include: @/.vitepress/includes/fileName.md-->`


## Contributing
  1. Copy the appropriate template into the appropriate folder in the repo. Templates are located in /Documentation/Templates
     - The document needs to be put in the same folder that people will navigate to. IE if you're writing a howto document it needs to go into /Documentation/HowToGuides
  2. Rename this file, file extension must be .md
     - You need to name the file to the document that your writing. IE if the document is How To Log Into Immybot, you need to name it HowToLogIntoImmybot.md
  3. Edit this file with the appropriate information, processes, best practices etc
  4. Once complete save the file.
  5. Edit the file /.vitepress/Config.mts file
  6. Find the appropriate section that the document needs to be displayed in
  7. Copy and paste in that same section, and rename it accordingly
     - The 'text:' column should be the title of the document
     - The link needs to be the absolute file path without .md at of the filename
  8. Save this file
  9.  Test your changes
  10. Commit and push your changes to the PR
  11. If everything is satisfactory the changes will be merged into the main branch
