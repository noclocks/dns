FROM ghcr.io/stackexchange/dnscontrol:4.12.2

COPY . /dns

WORKDIR /dns

ENTRYPOINT [ "dnscontrol" ]
