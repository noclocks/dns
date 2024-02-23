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
    TXT("_github-pages-challenge-noclocks", "8c88c3f5791a75585aedc0a0e821fb"),
    CNAME("blog", "39843493.group43.sites.hubspot.net")
);
