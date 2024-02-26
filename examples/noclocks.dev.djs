var DSP_PORKBUN = NewDnsProvider("porkbun");
var REG_NONE = NewRegistrar("none");

D("noclocks.dev", REG_NONE
	, DnsProvider(DSP_PORKBUN)
	, DefaultTTL(600)
	, ALIAS("@", "lixie.porkbun.com.")
	, CNAME("*", "lixie.porkbun.com.")
	, CNAME("blog", "39843493.group43.sites.hubspot.net.")
	, CNAME("docs", "noclocks.github.io.")
	, MX("@", 1, "fwd1.porkbun.com.")
	, MX("@", 1, "fwd2.porkbun.com.")
	, TXT("@", "v=spf1 include:_spf.porkbun.com ~all", TTL(300))
	, TXT("default._domainkey", "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD23fAyoPbewQ6QAdP6FN30wbbEtWfpSvee3SR1CGqZc3YREGfXwPVi6R5cyR+qwx0DdJUuo5yOlFJ6rXyJUI6PSJ63sq5eNqKU+n6cqLlDaN4VxjS/NmLw+6szGeH52PhfrwRSyI2yMAnSszqvIO8YvN/bieqhIzcQjt8lQtWkJQIDAQAB", TTL(300))
	, TXT("_dmarc", "v=DMARC1; p=quarantine; rua=mailto:25f8c5e6@mxtoolbox.dmarc-report.com; ruf=mailto:25f8c5e6@forensics.dmarc-report.com; fo=1", TTL(300))
	, TXT("_acme-challenge", "YfcZoPb1JoXtiwUP0k4aimMlw712-NxzrrIsxMAJJtY")
	, TXT("_acme-challenge", "duFW0ARxb60Rd6snfskR9b4db08jaoGVrM_dGY-PUcA")
	, TXT("_github-pages-challenge-noclocks", "8c88c3f5791a75585aedc0a0e821fb")
)
