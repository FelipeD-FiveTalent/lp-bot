# LP-Bot

## Setup

### Env Variables

Add environment variables to function

- LP_API_BASE_URL = https://app.liquidplanner.com/api/v1/workspaces/{workspaceNumber}
- LP_API_TOKEN = {LP API TOKEN}

### Github Webhooks

Once the function is deployed add its endpoint to the repo's Webhooks in Settings

## Requirements

In one of the commit messages for the branch add the Liquid Planner id number.

ie. '374921 - Add submit button to login page'

The function will use that id to make changes to the Custom Fields of that task

## Workfow

When a branch is merged the function will look for the base branch to know what status to set and the commit messages to know what ids to modify.

| Base Branch | Status                                                         |
| ----------- | -------------------------------------------------------------- |
| master      | { Status: 'Passed - Code Review', Environment: 'Development' } |
| testing     | { Status: 'QA', Environment: 'Testing' }                       |
| staging     | { Status: 'Passed - QA', Environment: 'Staging' }              |
| production  | { Status: 'Production', Environment: 'Production' }            |
