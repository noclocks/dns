/// @ts-check
/// <reference path="types-dnscontrol.d.ts" />

var DOMAIN = "noclocks.dev";

var DSP_PORKBUN = NewDnsProvider("porkbun");
var REG_NONE = NewRegistrar("none");

D(
  DOMAIN
  , REG_NONE

  // Setup DNS Provider: Porkbun
  , DnsProvider(DSP_PORKBUN)

  // Set the Default TTL
  , DefaultTTL(600)

  // Porkbun's default `ALIAS`/`CNAME` records
  // , ALIAS("@", "lixie.porkbun.com.")
  // , CNAME("*", "lixie.porkbun.com.")

  // Set up the root domain A records
  , A("@", "216.239.32.21")
  , A("@", "216.239.34.21")
  , A("@", "216.239.36.21")
  , A("@", "216.239.38.21")

  // Set up the root domain AAAA records
  , AAAA("@", "2001:4860:4802:32::15")
  , AAAA("@", "2001:4860:4802:34::15")
  , AAAA("@", "2001:4860:4802:36::15")
  , AAAA("@", "2001:4860:4802:38::15")

  // Set medium A records
  , A("medium", "162.159.152.4")
  , A("medium", "162.159.153.4")

  // Set MTA-STS A record
  , A("mta-sts", "34.149.121.105")

  // CNAME Records - Google Workspace
  , CNAME("ggroups", "ghs.googlehosted.com.")
  , CNAME("gmail", "ghs.googlehosted.com.")
  , CNAME("gsites", "ghs.googlehosted.com.")
  , CNAME("gcal", "ghs.googlehosted.com.")
  , CNAME("gdrive", "ghs.googlehosted.com.")

  // CNAME Records - Stripe Email
  , CNAME(
    "ad3ak4dqkd3micxscovcihwulfyajce5._domainkey",
    "ad3ak4dqkd3micxscovcihwulfyajce5.dkim.custom-email-domain.stripe.com."
  )
  , CNAME(
    "cgktxy47vh5wl4ghp5hdgk6tnmy62zbl._domainkey",
    "cgktxy47vh5wl4ghp5hdgk6tnmy62zbl.dkim.custom-email-domain.stripe.com."
  )
  , CNAME(
    "cwisojmcg2hxnv5mu6p75xj554z25eoa._domainkey",
    "cwisojmcg2hxnv5mu6p75xj554z25eoa.dkim.custom-email-domain.stripe.com."
  )
  , CNAME(
    "gkyumb4mjcb52t3ijd7ri3cvxcsn5wzd._domainkey",
    "gkyumb4mjcb52t3ijd7ri3cvxcsn5wzd.dkim.custom-email-domain.stripe.com."
  )
  , CNAME(
    "lzwub5fb3bv3v772nfrqoui6lezjdcxa._domainkey",
    "lzwub5fb3bv3v772nfrqoui6lezjdcxa.dkim.custom-email-domain.stripe.com."
  )
  , CNAME(
    "manc63vpfqdyzxpefcyuhkc6a226isin._domainkey",
    "manc63vpfqdyzxpefcyuhkc6a226isin.dkim.custom-email-domain.stripe.com."
  )

  // CNAME Records - Bounce (Stripe)
  , CNAME("bounce", "custom-email-domain.stripe.com.")

  // CNAME Records - Selfhosted (Render.com)
  , CNAME("docuseal", "docuseal-h7bm.onrender.com.")

  // CNAME Records - Selfhosted (Railway)
  , CNAME("infisical", "r0fdqqto.up.railway.app.")
  , CNAME("analytics", "ofv54ogz.up.railway.app.")

  // CNAME Records - Testimonials
  , CNAME("testimonials", "cname.testimonial.to.")

  // CNAME Records - Hubspot
  , CNAME("hub", "39843493.group43.sites.hubspot.net.")

  // CNAME Records - Hashnode
  , CNAME("blog", "hashnode.network.")

  // CNAME Records - Vercel
  , CNAME("envshare", "cname.vercel-dns.com.")

  // CNAME Records - Mailchimp
  , CNAME("k2._domainkey", "dkim2.mcsv.net.")
  , CNAME("k3._domainkey", "dkim3.mcsv.net.")

  // CNAME Records - Stripe Checkout
  , CNAME("pay", "hosted-checkout.stripecdn.com.")

  // CNAME Records - GitHub Pages
  , CNAME("docs", "noclocks.github.io.")

  // CNAME Records - Shopify
  , CNAME("store", "shops.myshopify.com.")
  , CNAME("devstore", "shops.myshopify.com.")

  // CNAME Records - Client - BastienLaw
  , CNAME("bastien", "ghs.googlehosted.com.")

  // CNAME Records - Development
  , CNAME("dev", "ghs.googlehosted.com.")

  // CNAME Records - Feedback Sub-Domain
  , CNAME("feedback", "cname.frill.co.")

  // CNAME Records - Frill Email
  , CNAME("frill12631", "u25497065.wl066.sendgrid.net.")
  , CNAME("frl._domainkey", "frl.domainkey.u25497065.wl066.sendgrid.net.")
  , CNAME("frl2._domainkey", "frl2.domainkey.u25497065.wl066.sendgrid.net.")

  , CNAME("website", "noclocks.b12sites.com.")

  , CNAME("accounts.store", "shops.myshopify.com.")

  , CNAME("documenso", "uou6ptnc.up.railway.app.")

  , CNAME("devdocs", "cname.vercel-dns.com.")

  // MX Records - Google Workspace
  , MX("@", 1, "smtp.google.com.")

  // MX Records - Amazon SES (Resend)
  , MX("send", 10, "feedback-smtp.us-east-1.amazonses.com.")

  // TXT Records - Vercel
  , TXT("_vercel", "vc-domain-verify=envshare.noclocks.dev,bf8cb3e4ff05d0d85b9d")

  // TXT Records - Stripe
  , TXT(
    "@",
    "stripe-verification=89f4a41b52e121c2857c7989fa0edea55106bec6c43be66692ce13c3fd826707"
  )

  // TXT Records - Google Workspace DKIM
  , TXT(
    "google._domainkey",
    "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnxb49YRvvMIjYWCEkGS8uRyi2jFfJYwuA4/b59aMAraFcJjeB+Xx6MvhAVpCe2/Zh/QGPtaAFbsluKJPTzW4qnddz85WVurrdIhxgVeyr417kPlYu1t8GbGQ1MQ53J4cPxs3x7beCLNbfXOF16o3wektAKb9Ap9oEioFysB9ingRLju+xGzpCii3vSFeDbYBYnheSzgPpo7fw5eQbnEN8iHu1XUQCunSxC0pOD8dWdM6pgXZ2UR3zehE+jjwtlNgz216+wUVn5E1CELk4fPqbMM0lhXFBUyAceH0sx4Zbo09ix74cOU34OlNxvdCUgQYNYCEBe7psW9hesbSiev8twIDAQAB"
  )

  // TXT Records - SPF for `@`
  , SPF_BUILDER({
    label: "@",
    // overflow: "_spf%d", // Delete this line if you don't want big strings split.
    // overhead1: "20", // There are 20 bytes of other TXT records on this domain.  Compensate for this.
    // raw: "_rawspf", // Delete this line if the default is sufficient.
    // ttl: "5m",
    parts: [
      "v=spf1",
      "include:_spf.google.com", // GSuite
      "include:servers.mcsv.net", // Mailchimp
      // "include:amazonses.com", // Amazon SES (Resend)
      // "include:stripe.com", // Stripe
      // "include:mailgun.org", // Mailgun (forwards to GSuite)
      // "include:sendgrid.net", // SendGrid
      "-all",
    ],
    // flatten: [
      // "servers.mcsv.net",
      // "amazonses.com", // Rationale: Amazon SES is used by Resend
      // "stripe.com", // Rationale: Stripe is used by custom email domains
    // ],
  })

  // TXT Records - SPF for `send`
  , SPF_BUILDER({
    label: "send",
    parts: [
      "v=spf1",
      "include:amazonses.com", // Amazon SES (Resend)
      "~all",
    ],
  })

  // TXT Records - DMARC for `@`
  , DMARC_BUILDER({
    policy: "reject",
    percent: 100,
    // alignmentSPF: "r",
    // alignmentDKIM: "strict",
    rua: [
      "mailto:w0qdgxol@ag.us.dmarcian.com", // DMARC Aggregate Reports (RUA)
    ],
    ruf: [
      "mailto:w0qdgxol@fr.us.dmarcian.com", // DMARC Forensic Reports (RUF)
    ],
    failureOptions: "1"
  })

  // TXT Records - MTA-STS
  , TXT("_mta-sts", "v=STSv1; id=20190425085703", TTL(3600))

  // TXT Records - Resend
  , TXT(
    "resend._domainkey",
    "p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbhzizp7AkDF14jqZ4ZDBe/DcgsI5vbuSrsobM/lWH82/vlYw+Xj+dCBCcy0NLO1fUZiQRetJ01lCsOsEH/n/jHp9fIsRB4psJP5X/rXmHQ4rD8p3Df7j6mhm4sNDBZpwR1UhW444Vp88BqvgzawMvzaRgu9Nstx/6tFV7trDnNwIDAQAB"
  )

  // TXT Records - OpenAI
  , TXT("@", "openai-domain-verification=dv-WDNa7wSBc2RN0lM0rlnVs25c")

  // TXT Records - Vercel
  , TXT("_vercel", "vc-domain-verify=www.noclocks.dev,2b1841e6fdcd5c8bbb74")
  , TXT("_vercel", "vc-domain-verify=noclocks.dev,a2b5da3a50a19754c1e0")

  // TXT Records - Google Search Console
  , TXT(
    "@",
    "google-site-verification=VLlDxf4pO-GZ4oe2YSGplYGhKYEoMwIeSUiHzjMJd4s"
  )
  , TXT(
    "@",
    "google-site-verification=8esyvYnZaJ9-JUcC81RlatPuElBjXcGziiqYiq8FJw8"
  )
  , TXT(
    "@",
    "google-site-verification=VkAy-7pk6nihqr1X2sF3ev2G8NxEMh6ge72Y4hQq89I"
  )

  // TXT Records - Amazon Business
  , TXT(
    "@",
    "amazon-business-verification=1229ee0236ee3c28b825288e96e890beaad42a4a461d7a0eb65537601da42912"
  )

  // TXT Records - GitHub Pages
  , TXT("_github-pages-challenge-noclocks", "8c88c3f5791a75585aedc0a0e821fb")
  , TXT(
    "_github-pages-challenge-noclocks.mta-sts",
    "1b9d8ac75aca5c5f9de35a29cbbd94"
  )

  // TXT Records - GitHub Verification
  , TXT("_github-challenge-noclocks-org", "5b7bfb8c3a")

  // TXT Records - ACME Challenge (Stripe?)
  , TXT("_acme-challenge.pay", "d9uRKsP6foqYEgijjeBA1MB50wa4KW4NNe1BQE5-EP4")
  , TXT("_acme-challenge", "duFW0ARxb60Rd6snfskR9b4db08jaoGVrM_dGY-PUcA")
  , TXT("_acme-challenge", "YfcZoPb1JoXtiwUP0k4aimMlw712-NxzrrIsxMAJJtY")

  // TXT Records - TLS Reporting
  , TXT("_smtp._tls", "v=TLSRPTv1; rua=mailto:w0qdgxol@tls.us.dmarcian.com")

  // TXT Records - Mintlify
  , TXT("_vercel", "vc-domain-verify=devdocs.noclocks.dev,afcca416a51e43d21092")
);

// DEPRECATED:
// , CNAME("dev", "ghs.googlehosted.com.")
// Redirect `testimonials.noclocks.dev` to `senja.io/p/noclocks/r/testimonials`
// , CNAME("testimonials", "senja.io.")
// ALIAS Record for the root domain
// , ALIAS("@", "hixie.porkbun.com.")
// CNAME Records - Porkbun
// , CNAME("*", "hixie.porkbun.com.")
// CAA Records - Let's Encrypt
// CAA("@", "issue", "letsencrypt.org"),
// , TXT("_dmarc", "v=DMARC1; p=quarantine; rua=mailto:w0qdgxol@ag.us.dmarcian.com.")
// , TXT("@", "v=spf1 include:_spf.google.com ~all")
// , TXT("send", "v=spf1 include:amazonses.com ~all")
