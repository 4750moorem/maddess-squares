FROM oven/bun:1.3.8

WORKDIR /app

COPY package.json bun.lockb tsconfig.json prisma.config.ts ./
COPY prisma ./prisma

RUN bun install
COPY src ./src
RUN bun run prisma generate

EXPOSE 4000

CMD ["bun", "run", "start"]
