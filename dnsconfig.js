// @ts-check
// <reference path="config/types-dnscontrol.d.ts" />

var DSP_PORKBUN = NewDnsProvider("porkbun");
var REG_NONE = NewRegistrar("none");

D("noclocks.dev", REG_NONE
	, DnsProvider(DSP_PORKBUN)
	, ALIAS("@", "lixie.porkbun.com.")
	, CNAME("*", "lixie.porkbun.com.")
	, CNAME("hub", "39843493.group43.sites.hubspot.net.")
	, CNAME("docs", "noclocks.github.io.")
	, CNAME("k2._domainkey", "dkim2.mcsv.net.")
	, CNAME("k3._domainkey", "dkim3.mcsv.net.")
	, CNAME("blog", "hashnode.network.")
    , CNAME("store", "shops.myshopify.com.")
	, MX("@", 1, "fwd1.porkbun.com.")
	, MX("@", 1, "fwd2.porkbun.com.")
	, TXT("@", "v=spf1 include:_spf.porkbun.com ~all")
	, TXT("_dmarc", "v=DMARC1; p=none;")
	, TXT("default._domainkey", "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD23fAyoPbewQ6QAdP6FN30wbbEtWfpSvee3SR1CGqZc3YREGfXwPVi6R5cyR+qwx0DdJUuo5yOlFJ6rXyJUI6PSJ63sq5eNqKU+n6cqLlDaN4VxjS/NmLw+6szGeH52PhfrwRSyI2yMAnSszqvIO8YvN/bieqhIzcQjt8lQtWkJQIDAQAB")
	, TXT("_acme-challenge", "YfcZoPb1JoXtiwUP0k4aimMlw712-NxzrrIsxMAJJtY")
	, TXT("_acme-challenge", "duFW0ARxb60Rd6snfskR9b4db08jaoGVrM_dGY-PUcA")
	, TXT("_github-pages-challenge-noclocks", "8c88c3f5791a75585aedc0a0e821fb")
	, TXT("_github-challenge-noclocks-org", "5b7bfb8c3a")
	, TXT("@", "google-site-verification=8esyvYnZaJ9-JUcC81RlatPuElBjXcGziiqYiq8FJw8")
	, TXT("@", "amazon-business-verification=1229ee0236ee3c28b825288e96e890beaad42a4a461d7a0eb65537601da42912")
);
