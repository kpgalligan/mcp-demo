# MCP Workshop Repo

## GitHub Setup

You need a GitHub Personal Access Token (PAT). This lets code call the GitHub API for you.

Settings > Developer Settings > Personal Access Tokens > Tokens (classic)

(Kevin walks you through finding it)

Generate new token > Generate new token (classic)

Give it a name. Whatever you want. "MCP Demo" is good so you remember what this was for.

Just select the "repo" section. If you want to do more stuff with the MCP later, you'll probably need to have more permissions, but let's keep it simple.

Copy the token and paste it somewhere right now. Once it's gone, you cannot get the value again.

Make sure Docker is running. You don't need to do anything to it. Just make sure it is there.

### MCP Config

We need to tell your agent about the MCP Server. Open Cursor > Settings > Cursor Settings, then find "MCP" and click "Add new global MCP server".

You will see json. If you are using a different agent, this file is accessed in a different way, but it is the same format.

Add the following to the list of servers (if you have any):

```json
"github": {
  "command": "docker",
  "args": [
    "run",
    "-i",
    "--rm",
    "-e",
    "GITHUB_PERSONAL_ACCESS_TOKEN",
    "ghcr.io/github/github-mcp-server"
  ],
  "env": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": "[your token]"
  }
},
```

This tells your agent that it should run docker with a set of arguments, and passes in an environment variable. Replace `[your token]` with the token you created.

If you have no servers, you can copy/paste the full file. It will look like this:

```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "[your token]"
      }
    }
  }
}
```

Save (if needed?). Then go back to the Cursor Settings/MCP tab. You should see `github` in the list. Click the little refresh icon.

If you do not see a green indicator to the left of `github`, you will need some help.

Back to the workshop...