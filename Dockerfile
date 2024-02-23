FROM ghcr.io/stackexchange/dnscontrol

COPY . /dns

WORKDIR /dns

ENTRYPOINT [ "dnscontrol" ]
