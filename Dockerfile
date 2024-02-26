FROM ghcr.io/stackexchange/dnscontrol:4.8.2

COPY . /dns

WORKDIR /dns

ENTRYPOINT [ "dnscontrol" ]
