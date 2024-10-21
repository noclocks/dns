FROM ghcr.io/stackexchange/dnscontrol:4.14.0

COPY . /dns

WORKDIR /dns

ENTRYPOINT [ "dnscontrol" ]
