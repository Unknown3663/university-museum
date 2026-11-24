# GitHub issue tracker

Issues and specs live in GitHub Issues for `Unknown3663/university-museum`. Run `gh` from this clone so it can infer the repository from the Git remote.

## Issue operations

- Publish tickets and specs with `gh issue create --title "..." --body-file <file>`. Use `--body "..."` for a short, single-line body.
- Read a ticket with `gh issue view <number> --json number,title,body,labels,comments,state,url`. Use `--jq` when you need specific fields or comments.
- List tickets with `gh issue list --state open --json number,title,body,labels,comments`. Use `--label` and `--state` as needed.
- Comment with `gh issue comment <number> --body-file <file>`.
- Apply or remove labels with `gh issue edit <number> --add-label <label>` or `--remove-label <label>`.
- Close an issue with `gh issue close <number>`. Add `--comment "..."` when a short closing message is needed.

## Pull requests as a triage surface

**PRs as a request surface: no.**

If this setting is enabled, use the same triage labels and states for external PRs.

- Read a PR with `gh pr view <number> --comments` and inspect its diff with `gh pr diff <number>`.
- List open PRs with `gh api --paginate 'repos/{owner}/{repo}/pulls?state=open'`. Keep records whose `author_association` is `CONTRIBUTOR`, `FIRST_TIME_CONTRIBUTOR`, or `NONE`. [GitHub pull request API](https://docs.github.com/en/rest/pulls/pulls#list-pull-requests)
- Use `gh pr comment`, `gh pr edit --add-label` or `--remove-label`, and `gh pr close` for triage actions.

GitHub shares issue and PR numbering. When a reference could be either, try `gh pr view <number>` and fall back to `gh issue view <number>` if the number has no matching PR.

## Wayfinding

- Create the map as an issue labeled `wayfinder:map` with Notes, Decisions-so-far, and Fog sections.
- Create each decision ticket as a sub-issue with `gh issue create --parent <map-number>` and a `wayfinder:<type>` label. The types are `research`, `prototype`, `grilling`, and `task`. If sub-issues are unavailable, add the child to a task list in the map and include `Part of #<map>` at the top of the child body.
- Record dependencies with `gh issue edit <child-number> --add-blocked-by <blocker-number>`. If native dependencies are unavailable, record `Blocked by: #<number>` at the top of the child body. A ticket is unblocked when every blocker is closed.
- Work on the first open, unassigned, unblocked child in map order. Claim it with `gh issue edit <number> --add-assignee @me` before making other writes for that ticket.
- Resolve a ticket by commenting with the answer, closing the issue, and adding a summary and link to the map's Decisions-so-far section.
