# No Clocks, LLC Domain Name System Records

> [!NOTE]
> This repository manages the DNS Records for No Clocks.

## Badges


<!-- BADGES:START -->
[![DNSControl](https://github.com/noclocks/dns/actions/workflows/dnscontrol.yml/badge.svg)](https://github.com/noclocks/dns/actions/workflows/dnscontrol.yml)
[![Preview DNS Changes](https://github.com/noclocks/dns/actions/workflows/pull-request.yml/badge.svg)](https://github.com/noclocks/dns/actions/workflows/pull-request.yml)
[![Rollback DNS Configuration](https://github.com/noclocks/dns/actions/workflows/rollback.yml/badge.svg)](https://github.com/noclocks/dns/actions/workflows/rollback.yml)

[![Automate Changelog](https://github.com/noclocks/dns/actions/workflows/changelog.yml/badge.svg)](https://github.com/noclocks/dns/actions/workflows/changelog.yml)
[![Deploy GitHub Pages](https://github.com/noclocks/dns/actions/workflows/jekyll-gh-pages.yml/badge.svg)](https://github.com/noclocks/dns/actions/workflows/jekyll-gh-pages.yml)
[![pages-build-deployment](https://github.com/noclocks/dns/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/noclocks/dns/actions/workflows/pages/pages-build-deployment)
<!-- BADGES:END -->

## Contents

- [No Clocks, LLC Domain Name System Records](#no-clocks-llc-domain-name-system-records)
  - [Badges](#badges)
  - [Contents](#contents)
  - [Overview](#overview)
  - [DNSControl](#dnscontrol)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Docker](#docker)
    - [GitHub Actions](#github-actions)
  - [Configuration](#configuration)
    - [creds.json](#credsjson)
    - [dnsconfig.js](#dnsconfigjs)
  - [DNS Records](#dns-records)
  - [Useful Commands](#useful-commands)

## Overview

No Clocks, LLC utilizes [Porkbun](https://porkbun.com/) as our DNS Provider and Registrar.

This repository serves as our *DNS as Code* (as opposed to infrastructure as code) leveraging the [dnscontrol](https://github.com/StackExchange/dnscontrol/) tool by StackOverflow.

## DNSControl

DNSControl is a system for maintaining DNS zones. It has two parts: a domain specific language (DSL) for describing
DNS zones plus software that processes the DSL and pushes the resulting zones to DNS providers.

It can send the same DNS records to multiple providers.

It runs anywhere Go runs (Linux, macOS, Windows).

The provider model is extensible, so more providers can be added.

## Installation

`dnscontrol` can be installed locally or run in a Docker container.

See [the official documentation](https://docs.dnscontrol.org/getting-started/getting-started#1-install-the-software) for more information.

To install `dnscontrol` on your local machine using Homebrew, run the following command:

```bash
brew install dnscontrol
```

To use `dnscontrol` in a Docker container, run the following command:

```bash
docker run --rm -it -v "$(pwd):/dns"  ghcr.io/stackexchange/dnscontrol preview
```

## Usage

To preview the changes that will be made to the DNS records, run the following command:

```bash
dnscontrol preview
```

To push the changes to the DNS Provider, run the following command:

```bash
dnscontrol push
```

### Docker

```bash
docker run --rm -it -v "$(pwd):/dns"  ghcr.io/stackexchange/dnscontrol preview
```

### GitHub Actions

This repository is configured to run the `dnscontrol` commands using GitHub Actions.

The defined DNS records are deployed to the DNS Provider using the GitHub action when a commit is pushed to the `main` branch.

The GitHub Action is defined in the [`.github/workflows/dnscontrol.yml`](.github/workflows/dnscontrol.yml) file.

<details><summary>View Code</summary><p>

```yaml
name: DNSControl

on:
  push:
    branches:
      - main
    paths:
      - 'dnsconfig.js'
      - '.github/workflows/dnscontrol.yml'
      - 'creds.example.json'
  workflow_dispatch:

env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  PORKBUN_API_KEY: ${{ secrets.PORKBUN_API_KEY }}
  PORKBUN_API_SECRET: ${{ secrets.PORKBUN_API_SECRET }}
  SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
  CONFIG_FILE: 'dnsconfig.js'
  CREDS_FILE: 'creds.example.json'

jobs:
  dnscontrol-check:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Check
        id: dnscontrol_check
        uses: is-cool-me/dnscontrol-action@v4.7.3
        with:
          args: check
          config_file: 'dnsconfig.js'
          creds_file: 'creds.example.json'

  dnscontrol-preview:
    runs-on: ubuntu-latest
    needs: dnscontrol-check

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Preview
        id: dnscontrol_preview
        uses: is-cool-me/dnscontrol-action@v4.7.3
        with:
          args: preview --notify
          config_file: 'dnsconfig.js'
          creds_file: 'creds.example.json'

  dnscontrol-push:
    runs-on: ubuntu-latest
    needs: dnscontrol-preview
    permissions:
      contents: write

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Get Date
        id: get_date
        run: echo "REPORT_DATE=$(date +'%Y-%m-%d')" >> $GITHUB_ENV

      - name: Get File Name
        id: get_file_name
        env:
          REPORT_DATE: ${{ env.REPORT_DATE }}
        run: echo "REPORT_FILE=./reports/$REPORT_DATE-Report.txt" >> $GITHUB_ENV

      - name: Test Echo Date
        env:
          REPORT_DATE: ${{ env.REPORT_DATE }}
          REPORT_FILE: ${{ env.REPORT_FILE }}
        run: |
          echo "$REPORT_DATE"
          echo "$REPORT_FILE"

      - name: Push
        id: dnscontrol_push
        uses: is-cool-me/dnscontrol-action@v4.7.3
        with:
          args: push --notify --report ${{ env.REPORT_FILE }}
          config_file: 'dnsconfig.js'
          creds_file: 'creds.example.json'

      - name: Git Pull
        id: git_pull
        run: git pull

      - name: Commit and Push Changes
        id: git_commit_push
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_user_email: 'github-actions[bot]@users.noreply.github.com'
          commit_user_name: 'github-actions[bot]'
          commit_message: 'chore: github action dnscontrol - $REPORT_DATE'
```

</p></details>

## Configuration

The configuration for `dnscontrol` is stored in the following files:

- `creds.json` (not included in the repository)
- `dnsconfig.js`

plus an additional, but optional, TypeScript definition file:

- `types-dnscontrol.d.ts`


### creds.json

The `creds.json` file is used to store the credentials for the DNS Provider.

See the [creds.example.json](creds.example.json) file for an example of the format.

Note that the following environment variables are required to use the `creds.example.json` file:

- `PORKBUN_API_KEY`: The API Key for the Porkbun DNS Provider
- `PORKBUN_API_SECRET`: The API Secret for the Porkbun DNS Provider
- `SLACK_WEBHOOK_URL`: The Webhook URL for the Slack Notifications

```json
{
    "porkbun": {
        "TYPE": "PORKBUN",
        "api_key": "$PORKBUN_API_KEY",
        "secret_key": "$PORKBUN_API_SECRET"
    },
    "notifications": {
      "TYPE": "SLACK",
      "slack_url": "$SLACK_WEBHOOK_URL"
    }
}
```

### dnsconfig.js

The core file used by dnscontrol is the [dnsconfig.js](dnsconfig.js) configuration file written in JavaScript.

This file contains the DNS records for the No Clocks, LLC domain.

<details><summary>View Code</summary><p>

```javascript
// @ts-check
// <reference path="types-dnscontrol.d.ts" />

var REG_NONE = NewRegistrar("none");
var DSP_PORKBUN = NewDnsProvider("porkbun");

D("noclocks.dev", REG_NONE, DnsProvider(DSP_PORKBUN),
    NAMESERVER("curitiba.ns.porkbun.com."),
    NAMESERVER("fortaleza.ns.porkbun.com."),
    NAMESERVER("maceio.ns.porkbun.com."),
    NAMESERVER("salvador.ns.porkbun.com."),
    ALIAS("@", "pixie.porkbun.com."),
    CNAME("www", "noclocks.dev."),
    CNAME("blog", "39843493.group43.sites.hubspot.net."),
    CNAME("*", "pixie.porkbun.com."),
    CNAME("docs", "noclocks.github.io."),
    MX("@", 10, "fwd1.porkbun.com.", TTL(600)),
    MX("@", 20, "fwd2.porkbun.com.", TTL(600)),
    TXT("@", "v=spf1 include:_spf.porkbun.com ~all", TTL(300)),
    TXT("default._domainkey", "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5wVNukpz+fpCVe3pTPph5GNNgljwTdL43ykZ2P4Vm/HiwFqsGGpuZaMhbVJtmmnItAAjdQfCqITYvMbQFU0DYAZpJencyelIU4bznlZM8NvwPlFo9so2C1zDfUs2Y9rgF71+4V/fyu3tXa0r8l8r6STpYGB0GsmL6idTZy3PJKQIDAQAB", TTL(300)),
    TXT("_dmarc", "v=DMARC1; p=quarantine; rua=mailto:25f8c5e6@mxtoolbox.dmarc-report.com; ruf=mailto:25f8c5e6@forensics.dmarc-report.com; fo=1", TTL(300)),
    TXT("_acme-challenge", "YfcZoPb1JoXtiwUP0k4aimMlw712-NxzrrIsxMAJJtY", TTL(600)),
    TXT("_acme-challenge", "duFW0ARxb60Rd6snfskR9b4db08jaoGVrM_dGY-PUcA", TTL(600)),
    TXT("_github-pages-challenge-noclocks", "8c88c3f5791a75585aedc0a0e821fb", TTL(600))
);
```

</p></details>

## DNS Records

*As of 2024-02-23:*

|  Type   |                Host                |                     Value                     | TTL |                     Notes                     |
|:-------:|:----------------------------------:|:---------------------------------------------:|:---:|:---------------------------------------------:|
| `ALIAS` |                `@`                 |             `pixie.porkbun.com.`              | 60  |        `ALIAS` record for root domain         |
| `CNAME` |                `*`                 |             `pixie.porkbun.com.`              | 600 |     `CNAME` record for wildcard subdomain     |
| `CNAME` |               `www`                |                `noclocks.dev.`                | 600 |      `CNAME` record for "www" subdomain       |
| `CNAME` |               `hub`                |     `39843493.group43.sites.hubspot.net`      | 600 |     `CNAME` record for HubSpot subdomain      |
| `CNAME` |               `docs`               |             `noclocks.github.io.`             | 600 |        `CNAME` record for GitHub Pages        |
| `CNAME` |               `blog`               |              `hashnode.network.`              | 600 | `CNAME` record for blog subdomain on Hashnode |
| `CNAME` |              `store`               |            `shops.myshopify.com.`             | 600 |  `CNAME` record for Shopify store subdomain   |
| `CNAME` |          `k2._domainkey`           |               `dkim2.mcsv.net.`               | 600 |   `CNAME` record for Mailchimp DKIM record    |
| `CNAME` |          `k3._domainkey`           |               `dkim3.mcsv.net.`               | 600 |   `CNAME` record for Mailchimp DKIM record    |
|  `MX`   |                `@`                 |              `fwd1.porkbun.com.`              | 600 |       `MX` record for email forwarding        |
|  `MX`   |                `@`                 |              `fwd2.porkbun.com.`              | 600 |       `MX` record for email forwarding        |
|  `TXT`  |                `@`                 |    `v=spf1 include:_spf.porkbun.com ~all`     | 300 |       `SPF` record for email forwarding       |
|  `TXT`  |        `default._domainkey`        |             `v=DKIM1; k=rsa; ...`             | 300 |      `DKIM` record for email forwarding       |
|  `TXT`  |              `_dmarc`              |         `v=DMARC1; p=quarantine; ...`         | 300 |      `DMARC` record for email forwarding      |
|  `TXT`  |         `_acme-challenge`          | `YfcZoPb1JoXtiwUP0k4aimMlw712-NxzrrIsxMAJJtY` | 600 |       Let's Encrypt Domain Verification       |
|  `TXT`  |         `_acme-challenge`          | `duFW0ARxb60Rd6snfskR9b4db08jaoGVrM_dGY-PUcA` | 600 |       Let's Encrypt Domain Verification       |
|  `TXT`  | `_github-pages-challenge-noclocks` |       `8c88c3f5791a75585aedc0a0e821fb`        | 600 |          GitHub Domain Verification           |
|  `TXT`  |  `_github-challenge-noclocks-org`  |                 `5b7bfb8c3a`                  | 600 |          GitHub Domain Verification           |
|  `TXT`  |                `@`                 |        `google-site-verification=...`         | 600 |          Google Domain Verification           |
|  `TXT`  |                `@`                 |      `amazon-business-verification=...`       | 600 |          Amazon Domain Verification           |

## Name Servers

```bash
curitiba.ns.porkbun.com
fortaleza.ns.porkbun.com
maceio.ns.porkbun.com
salvador.ns.porkbun.com
```

## Useful Commands

```bash
# check configuration validity:
dnscontrol check

# apply formatting to configuration
dnscontrol fmt dnsconfig.js

# preview what changes would be made
dnscontrol preview

# full preview
dnscontrol preview --full

# preview with a notification hook (slack)
dnscontrol preview --notify

# check credentials against Porkbun API:
dnscontrol check-creds porkbun

# push DNS record changes
dnscontrol push

# push and notify (slack)
dnscontrol push --notify

# push and output a text report
mkdir reports
dnscontrol push --report "./reports/$(date '+%Y-%m-%d')-Report.txt"

# import / retrieve current records via a 'zone' file
dnscontrol get-zones --format=zone porkbun - noclocks.dev

# import / retrieve current records via a 'zone' file with output
mkdir zones
dnscontrol get-zones --format=zone porkbun - noclocks.dev > zones/noclocks.dev.zone

# get zones (names only)
dnscontrol get-zones --format=nameonly porkbun - noclocks.dev

# get zones (zone file format using the BIND provider)
dnscontrol get-zones --format=zone bind - noclocks.dev

# get zones (table format)
dnscontrol get-zones --format=tsv porkbun - noclocks.dev

# get zones (table format and output to CSV/TSV data file)
dnscontrol get-zones --format=tsv porkbun - noclocks.dev > reports/noclocks.dev.csv

# get zones formatted with `djs` (JavaScript with leading commas)
dnscontrol get-zones --format=djs porkbun - noclocks.dev

# get zones formatted with `djs` (JavaScript with leading commas) & output to file
dnscontrol get-zones --format=djs porkbun - noclocks.dev > noclocks.dev.js

# get zones formatted as JavaScript
dnscontrol get-zones --format=js porkbun - noclocks.dev

# get zones formatted as JavaScript and output to file
dnscontrol get-zones --format=js porkbun - noclocks.dev > noclocks.dev.js

# utilize dnsutils 'dig' to check DNS record propogation, etc.
sudo apt install dnsutils
dig noclocks.dev
dig +short noclocks.dev
```

***

No Clocks, LLC | 2024
