/// @ts-check
/// <reference path="types-dnscontrol.d.ts" />

var DSP_PORKBUN = NewDnsProvider("porkbun");
var REG_NONE = NewRegistrar("none");

D("noclocks.dev", REG_NONE
  , DnsProvider(DSP_PORKBUN)
  , DefaultTTL(600)
  , A("medium", "162.159.152.4")
	, A("medium", "162.159.153.4")
	// Comment out Porkbun's default `ALIAS`/`CNAME` records
	// , ALIAS("@", "lixie.porkbun.com.")
	// , CNAME("*", "lixie.porkbun.com.")
	, A("@", "216.239.32.21")
	, A("@", "216.239.34.21")
	, A("@", "216.239.36.21")
	, A("@", "216.239.38.21")
	, AAAA("@", "2001:4860:4802:32::15")
	, AAAA("@", "2001:4860:4802:34::15")
	, AAAA("@", "2001:4860:4802:36::15")
	, AAAA("@", "2001:4860:4802:38::15")
	, CNAME("dev", "ghs.googlehosted.com.")
	, CNAME("ad3ak4dqkd3micxscovcihwulfyajce5._domainkey", "ad3ak4dqkd3micxscovcihwulfyajce5.dkim.custom-email-domain.stripe.com.")
	, CNAME("cgktxy47vh5wl4ghp5hdgk6tnmy62zbl._domainkey", "cgktxy47vh5wl4ghp5hdgk6tnmy62zbl.dkim.custom-email-domain.stripe.com.")
	, CNAME("cwisojmcg2hxnv5mu6p75xj554z25eoa._domainkey", "cwisojmcg2hxnv5mu6p75xj554z25eoa.dkim.custom-email-domain.stripe.com.")
	, CNAME("gkyumb4mjcb52t3ijd7ri3cvxcsn5wzd._domainkey", "gkyumb4mjcb52t3ijd7ri3cvxcsn5wzd.dkim.custom-email-domain.stripe.com.")
	, CNAME("lzwub5fb3bv3v772nfrqoui6lezjdcxa._domainkey", "lzwub5fb3bv3v772nfrqoui6lezjdcxa.dkim.custom-email-domain.stripe.com.")
	, CNAME("manc63vpfqdyzxpefcyuhkc6a226isin._domainkey", "manc63vpfqdyzxpefcyuhkc6a226isin.dkim.custom-email-domain.stripe.com.")
	// Redirect `testimonials.noclocks.dev` to `senja.io/p/noclocks/r/testimonials`
	// , CNAME("testimonials", "senja.io.")
	, CNAME("testimonials", "cname.testimonial.to.")
	, CNAME("bounce", "custom-email-domain.stripe.com.")
	, CNAME("hub", "39843493.group43.sites.hubspot.net.")
	, CNAME("blog", "hashnode.network.")
	, CNAME("k2._domainkey", "dkim2.mcsv.net.")
	, CNAME("k3._domainkey", "dkim3.mcsv.net.")
	, CNAME("pay", "hosted-checkout.stripecdn.com.")
	, CNAME("docs", "noclocks.github.io.")
	, CNAME("store", "shops.myshopify.com.")
	, CNAME("gcal", "ghs.googlehosted.com.")
	, CNAME("gdrive", "ghs.googlehosted.com.")
	, CNAME("gmail", "ghs.googlehosted.com.")
	, CNAME("ggroups", "ghs.googlehosted.com.")
	, CNAME("gsites", "ghs.googlehosted.com.")
	, CNAME("bastien", "ghs.googlehosted.com.")
	, CNAME("envshare", "cname.vercel-dns.com.")
	, CNAME("infisical", "r0fdqqto.up.railway.app.")
  	, CNAME("analytics", "ofv54ogz.up.railway.app.")
  	, CNAME("docuseal", "docuseal-h7bm.onrender.com.")
	, MX("@", 1, "smtp.google.com.")
	, MX("send", 10, "feedback-smtp.us-east-1.amazonses.com.")
	, TXT("@", "v=spf1 include:_spf.google.com amazonses.com stripe.com ~all")
	, TXT("_dmarc", "v=DMARC1; p=none;")
	, TXT("send", "v=spf1 include:amazonses.com ~all")
	, TXT("resend._domainkey", "p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbhzizp7AkDF14jqZ4ZDBe/DcgsI5vbuSrsobM/lWH82/vlYw+Xj+dCBCcy0NLO1fUZiQRetJ01lCsOsEH/n/jHp9fIsRB4psJP5X/rXmHQ4rD8p3Df7j6mhm4sNDBZpwR1UhW444Vp88BqvgzawMvzaRgu9Nstx/6tFV7trDnNwIDAQAB")
	, TXT("@", "stripe-verification=89f4a41b52e121c2857c7989fa0edea55106bec6c43be66692ce13c3fd826707")
	, TXT("google._domainkey", "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnxb49YRvvMIjYWCEkGS8uRyi2jFfJYwuA4/b59aMAraFcJjeB+Xx6MvhAVpCe2/Zh/QGPtaAFbsluKJPTzW4qnddz85WVurrdIhxgVeyr417kPlYu1t8GbGQ1MQ53J4cPxs3x7beCLNbfXOF16o3wektAKb9Ap9oEioFysB9ingRLju+xGzpCii3vSFeDbYBYnheSzgPpo7fw5eQbnEN8iHu1XUQCunSxC0pOD8dWdM6pgXZ2UR3zehE+jjwtlNgz216+wUVn5E1CELk4fPqbMM0lhXFBUyAceH0sx4Zbo09ix74cOU34OlNxvdCUgQYNYCEBe7psW9hesbSiev8twIDAQAB")
	, TXT("@", "openai-domain-verification=dv-WDNa7wSBc2RN0lM0rlnVs25c")
	, TXT("_vercel", "vc-domain-verify=www.noclocks.dev,2b1841e6fdcd5c8bbb74")
	, TXT("@", "google-site-verification=VLlDxf4pO-GZ4oe2YSGplYGhKYEoMwIeSUiHzjMJd4s")
	, TXT("_vercel", "vc-domain-verify=noclocks.dev,a2b5da3a50a19754c1e0")
	, TXT("@", "google-site-verification=8esyvYnZaJ9-JUcC81RlatPuElBjXcGziiqYiq8FJw8")
	, TXT("@", "amazon-business-verification=1229ee0236ee3c28b825288e96e890beaad42a4a461d7a0eb65537601da42912")
	, TXT("_github-challenge-noclocks-org", "5b7bfb8c3a")
	, TXT("_acme-challenge.pay", "d9uRKsP6foqYEgijjeBA1MB50wa4KW4NNe1BQE5-EP4")
	, TXT("_acme-challenge", "YfcZoPb1JoXtiwUP0k4aimMlw712-NxzrrIsxMAJJtY")
	, TXT("_acme-challenge", "duFW0ARxb60Rd6snfskR9b4db08jaoGVrM_dGY-PUcA")
	, TXT("_github-pages-challenge-noclocks", "8c88c3f5791a75585aedc0a0e821fb")
	, TXT("_vercel", "vc-domain-verify=envshare.noclocks.dev,bf8cb3e4ff05d0d85b9d")
)
