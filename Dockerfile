FROM ghcr.io/stackexchange/dnscontrol:4.10.0

COPY . /dns

WORKDIR /dns

ENTRYPOINT [ "dnscontrol" ]
