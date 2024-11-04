FROM ghcr.io/stackexchange/dnscontrol:4.14.1

COPY . /dns

WORKDIR /dns

ENTRYPOINT [ "dnscontrol" ]
