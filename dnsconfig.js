// @ts-check
// <reference path="types-dnscontrol.d.ts" />

// var REG_PORKBUN = NewRegistrar("porkbun");

var REG_NONE = NewRegistrar("none");
var DSP_PORKBUN = NewDnsProvider("porkbun");

var MXTTL = TTL(600);
var TXTTTL = TTL(300);

D("noclocks.dev", REG_NONE, DnsProvider(DSP_PORKBUN),
    DefaultTTL(600),
    ALIAS("@", "pixie.porkbun.com."),
    CNAME("*", "pixie.porkbun.com."),
    CNAME("www", "noclocks.dev."),
    CNAME("docs", "noclocks.github.io."),
    TXT("_github-pages-challenge-noclocks", "8c88c3f5791a75585aedc0a0e821fb", TTL(600),
    CNAME("blog", "39843493.group43.sites.hubspot.net."),
    MX("@", 10, "fwd1.porkbun.com", MXTTL),
    MX("@", 20, "f2d2.porkbun.com", MXTTL),
    TXT("@", "v=spf1 include:_spf.porkbun.com ~all", TXTTTL),
    TXT("default._domainkey", "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5wVNukpz+fpCVe3pTPph5GNNgljwTdL43ykZ2P4Vm/HiwFqsGGpuZaMhbVJtmmnItAAjdQfCqITYvMbQFU0DYAZpJencyelIU4bznlZM8NvwPlFo9so2C1zDfUs2Y9rgF71+4V/fyu3tXa0r8l8r6STpYGB0GsmL6idTZy3PJKQIDAQAB", TXTTTL),
    TXT("_dmarc", "v=DMARC1; p=quarantine; rua=mailto:25f8c5e6@mxtoolbox.dmarc-report.com; ruf=mailto:25f8c5e6@forensics.dmarc-report.com; fo=1", TXTTTL)    
);
