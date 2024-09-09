FROM ghcr.io/stackexchange/dnscontrol:4.13.0

COPY . /dns

WORKDIR /dns

ENTRYPOINT [ "dnscontrol" ]
