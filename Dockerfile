FROM ghcr.io/stackexchange/dnscontrol:4.11.0

COPY . /dns

WORKDIR /dns

ENTRYPOINT [ "dnscontrol" ]
