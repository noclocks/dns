FROM ghcr.io/stackexchange/dnscontrol:4.12.5

COPY . /dns

WORKDIR /dns

ENTRYPOINT [ "dnscontrol" ]
