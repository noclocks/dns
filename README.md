# No Clocks, LLC Domain Name System Records

> [!NOTE]
> This repository manages the DNS Records for No Clocks.


## Contents

## Overview

No Clocks, LLC utilizes [Porkbun](https://porkbun.com/) as our DNS Provider and Registrar.

This repository serves as our *DNS as Code* (as opposed to infrastructure as code) leveraging the [dnscontrol](https://github.com/StackExchange/dnscontrol/) tool by StackOverflow.

## DNSControl

DNSControl is a system for maintaining DNS zones. It has two parts: a domain specific language (DSL) for describing
DNS zones plus software that processes the DSL and pushes the resulting zones to DNS providers.

It can send the same DNS records to multiple providers.

It even generates the most beautiful `BIND` zone files.

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

## GitHub Actions

This repository is configured to run the `dnscontrol` commands using GitHub Actions.

The defined DNS records are deployed to the DNS Provider using the GitHub action when a commit is pushed to the `main` branch.

The GitHub Action is defined in the [`.github/workflows/dnscontrol.yml`](.github/workflows/dnscontrol.yml) file.

```yaml
name: Check

on: pull_request

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: DNSControl check
        uses: koenrh/dnscontrol-action@v3
        with:
          args: check

          # Optionally, if your DNSConfig files are in a non-default location,
          # you could specify the paths to the config and credentials file.
          config_file: 'dns/dnsconfig.js'

## Configuration

The configuration for `dnscontrol` is stored in the following files:

- `creds.json`
- `dnsconfig.js`

plus an additional, but optional, TypeScript definition file:

- `types-dnscontrol.d.ts`


### creds.json

The `creds.json` file is used to store the credentials for the DNS Provider.

See the [creds.example.json](creds.example.json) file for an example of the format.

```json
{
    "porkbun": {
        "TYPE": "PORKBUN",
        "api_key": "<porkbun-api-key>",
        "secret_key": "<porkbun-secret-key>"
    }
}
```

### dnsconfig.js

The core file used by dnscontrol is the [dnsconfig.js](dnsconfig.js) configuration file written in JavaScript.

This file contains the DNS records for the No Clocks, LLC domain.

```javascript
// @ts-check
// <reference path="types-dnscontrol.d.ts" />

var REG_NONE = NewRegistrar("none");
var REG_PORKBUN = NewRegistrar("porkbun");
var DSP_PORKBUN = NewDnsProvider("porkbun");

D("noclocks.dev", REG_PORKBUN, DnsProvider(DSP_PORKBUN),
    ALIAS("@", "pixie.porkbun.com."),
    CNAME("*", "pixie.porkbun.com."),
    CNAME("www", "noclocks.dev."),
    CNAME("docs", "noclocks.github.io."),
    TXT("_github-pages-challenge-noclocks", "8c88c3f5791a75585aedc0a0e821fb")
);
```

## DNS Records

| Type  |                     Host                      |             Value              | TTL | Options |              Notes              |
|:-----:|:---------------------------------------------:|:------------------------------:|:---:|:-------:|:-------------------------------:|
| ALIAS |                 noclocks.dev                  |       pixie.porkbun.com        | 60  |         |                                 |
| CNAME |                *.noclocks.dev                 |       pixie.porkbun.com        | 600 |         |                                 |
| CNAME |               docs.noclocks.dev               |      noclocks.github.io.       | 600 |         | `CNAME` record for GitHub Pages |
|  TXT  | _github-pages-challenge-noclocks.noclocks.dev | 8c88c3f5791a75585aedc0a0e821fb | 600 |         |   GitHub Domain Verification    |
