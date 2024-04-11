FROM ghcr.io/stackexchange/dnscontrol:4.9.0

COPY . /dns

WORKDIR /dns

ENTRYPOINT [ "dnscontrol" ]
