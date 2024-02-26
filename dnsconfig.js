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
