FROM ghcr.io/stackexchange/dnscontrol:4.12.0

COPY . /dns

WORKDIR /dns

ENTRYPOINT [ "dnscontrol" ]
