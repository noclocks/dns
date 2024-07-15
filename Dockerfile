FROM ghcr.io/stackexchange/dnscontrol:4.12.4

COPY . /dns

WORKDIR /dns

ENTRYPOINT [ "dnscontrol" ]
