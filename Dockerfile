FROM node:22-slim

RUN apt update && \
    apt install --no-install-recommends -y fonts-ipafont chromium && \
    apt clean && \
    rm -rf /var/lib/apt/lists/* && \
    fc-cache -f

COPY ./crossnote/ /app/

WORKDIR /app
RUN npm ci && rm -rf /root/.npm

ENTRYPOINT [ "node", "index.js" ]
