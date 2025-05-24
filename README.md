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

## Creating an issue

Find the url for the repo you created. It should be `[your account]/mcp-demo`. You'll need that.

Prompt the following to your agent:

```
Read the file package.json. Create a new GitHub issue in '[your account]/mcp-demo' to review the versions of the dependencies to make sure they are the latest stable and have no serious warnings. Include a checklist of current dependencies with their currently listed versions. Print a link to the new issue.
```

That should churn for a bit. Hopefully it was successful :)

## MCP Time

This project is itself an MCP Server. There is one tool in it. 'time_now'.

Run the node build:

```shell
npm run build
```

That should complete fine. If not, ask for help.

Go back to your MCP config json and add the following:

```json
"my-mcp": {
  "command": "node",
  "args": ["/Users/[you]/[repo path]/dist/index.js"]
}
```

Replace "you" and "repo path" with your user and the path to where you cloned the repo.

You should see 'my-mcp' in the list of MCP servers. Click "refresh" again.

Now, prompt your model with:

```
Call my-mcp to get the current time
```

It will churn for a bit, then should print the current date/time.

If you look at `index.ts`, here's what's happening.

1. We create an instance of McpServer
2. We add a tool 'time_now'
3. When that tool is called, it runs `date` on the terminal
4. It returns the result

That's it. Is it a basic MCP tool? About as basic as it can get. But, these are basic things. MCP is so popular in part because it is so simple (for simple things).

### Add a new tool

We're going to add a new tool. We're vibe-coding. I added a terminal command tool because coding agents work *much* better if they have something functional to look at.

In your agent, add 'LLM-Context.md' to your agent's context. In Cursor, and most VSCode-based agents, that means dragging it into the agent window. Or, just prompt "Load LLM-Context.md". That should work pretty much anywhere.

Then prompt with:

```
We're going to add another tool. It will open a file. The tool should be called 'open_file'. It should take one parameter 'file_path', which is the absolute path to the file we want to open. When called, the tool should execute 'open [file_path]' on the terminal.
```

Cross your fingers...