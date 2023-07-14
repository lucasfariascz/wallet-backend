# Wallet Backend

## Run Ambiente com Docker

```bash
docker-compose -f docker-compose-dev.yml up --build
```

## Acesso ao banco local depois que rodar o Docker

```bash
host: localhost
port: 5432
database: wallet
username: postgres
password: 123
```

## Rotas da API

```
Method Get
  http://localhost:3000/list-offers
    Parametros
      - pageSize
      - pageNumber

Method Post
  http://localhost:3000/submit-offer
    Parametros
      - userId
      - currencyId
      - unitPrice
      - quantity

Method Delete
  http://localhost:3000/delete-offer
    Parametros
      - userId
      - currencyOfferId

```

## As tabelas de criação do banco de dados

```sql
-- public."Currency" definition

-- Drop table

-- DROP TABLE public."Currency";

CREATE TABLE public."Currency" (
	"Id" uuid NOT NULL,
	"CreatorId" uuid NULL,
	"CreationTime" timestamp NOT NULL DEFAULT now(),
	"LastModifierId" uuid NULL,
	"LastModificationTime" timestamp NULL DEFAULT now(),
	"DeleterId" uuid NULL,
	"DeletionTime" timestamp NULL,
	"currencyName" varchar NOT NULL,
	"contractAddress" varchar NOT NULL,
	symbol varchar NOT NULL,
	CONSTRAINT "PK_50ada9e59cb75b2ccb14977152f" PRIMARY KEY ("Id")
);


-- public."User" definition

-- Drop table

-- DROP TABLE public."User";

CREATE TABLE public."User" (
	"Id" uuid NOT NULL,
	"CreatorId" uuid NULL,
	"CreationTime" timestamp NOT NULL DEFAULT now(),
	"LastModifierId" uuid NULL,
	"LastModificationTime" timestamp NULL DEFAULT now(),
	"DeleterId" uuid NULL,
	"DeletionTime" timestamp NULL,
	"Name" varchar NULL,
	"Email" varchar NOT NULL,
	CONSTRAINT "PK_a2b5a287e6d9e8f01962cc3d630" PRIMARY KEY ("Id")
);


-- public."Balance" definition

-- Drop table

-- DROP TABLE public."Balance";

CREATE TABLE public."Balance" (
	"Id" uuid NOT NULL,
	"CreatorId" uuid NULL,
	"CreationTime" timestamp NOT NULL DEFAULT now(),
	"LastModifierId" uuid NULL,
	"LastModificationTime" timestamp NULL DEFAULT now(),
	"DeleterId" uuid NULL,
	"DeletionTime" timestamp NULL,
	balance numeric(18,8) NOT NULL,
	"userId" uuid NULL,
	"currencyId" uuid NULL,
	CONSTRAINT "PK_021c72748db249a1561f34ad7d0" PRIMARY KEY ("Id"),
	CONSTRAINT "FK_7a4527fccf38b6b37e150c53c9c" FOREIGN KEY ("currencyId") REFERENCES "Currency"("Id"),
	CONSTRAINT "FK_8d3f1e4e43e5d89150abcee47f5" FOREIGN KEY ("userId") REFERENCES "User"("Id")
);


-- public."CurrencyOffer" definition

-- Drop table

-- DROP TABLE public."CurrencyOffer";

CREATE TABLE public."CurrencyOffer" (
	"Id" uuid NOT NULL,
	"CreatorId" uuid NULL,
	"CreationTime" timestamp NOT NULL DEFAULT now(),
	"LastModifierId" uuid NULL,
	"LastModificationTime" timestamp NULL DEFAULT now(),
	"DeleterId" uuid NULL,
	"DeletionTime" timestamp NULL,
	"unitPrice" numeric(18,8) NOT NULL,
	quantity numeric(18,8) NOT NULL,
	"userId" uuid NULL,
	"currencyId" uuid NULL,
	CONSTRAINT "PK_443a4d245f9ba9318668671943d" PRIMARY KEY ("Id"),
	CONSTRAINT "FK_a8bc70ef8c08faf052f108bb34d" FOREIGN KEY ("userId") REFERENCES "User"("Id"),
	CONSTRAINT "FK_bf457190829c244f0fd40696305" FOREIGN KEY ("currencyId") REFERENCES "Currency"("Id")
);


-- public."Wallet" definition

-- Drop table

-- DROP TABLE public."Wallet";

CREATE TABLE public."Wallet" (
	"Id" uuid NOT NULL,
	"CreatorId" uuid NULL,
	"CreationTime" timestamp NOT NULL DEFAULT now(),
	"LastModifierId" uuid NULL,
	"LastModificationTime" timestamp NULL DEFAULT now(),
	"DeleterId" uuid NULL,
	"DeletionTime" timestamp NULL,
	address varchar NOT NULL,
	"userId" uuid NULL,
	"currencyId" uuid NULL,
	CONSTRAINT "PK_4542bb6916b13b7b5c8618a5eff" PRIMARY KEY ("Id"),
	CONSTRAINT "FK_2f7aa51d6746fc8fc8ed63ddfbc" FOREIGN KEY ("userId") REFERENCES "User"("Id"),
	CONSTRAINT "FK_7a35f3ae114e67ac37922d8e054" FOREIGN KEY ("currencyId") REFERENCES "Currency"("Id")
);
```

## Script para insert no banco 

```sql
-- Inserção de moedas
INSERT INTO public."Currency" ("Id", "currencyName", "contractAddress", "symbol")
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Moeda 1', '0x1234567890abcdef', 'M1'),
  ('22222222-2222-2222-2222-222222222222', 'Moeda 2', '0xabcdef1234567890', 'M2');

-- Inserção de usuários
INSERT INTO public."User" ("Id", "Name", "Email")
VALUES
  ('33333333-3333-3333-3333-333333333333', 'Usuário 1', 'usuario1@example.com'),
  ('44444444-4444-4444-4444-444444444444', 'Usuário 2', 'usuario2@example.com');

-- Inserção de saldos
INSERT INTO public."Balance" ("Id", balance, "userId", "currencyId")
VALUES
  ('55555555-5555-5555-5555-555555555555', 100, '33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111'),
  ('66666666-6666-6666-6666-666666666666', 200, '44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222');

-- Inserção de ofertas de moeda
INSERT INTO public."CurrencyOffer" ("Id", "unitPrice", quantity, "userId", "currencyId")
VALUES
  ('77777777-7777-7777-7777-777777777777', 10, 50, '33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111'),
  ('88888888-8888-8888-8888-888888888888', 20, 100, '44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222');

-- Inserção de carteiras
INSERT INTO public."Wallet" ("Id", address, "userId", "currencyId")
VALUES
  ('99999999-9999-9999-9999-999999999999', '0xwalletaddress1', '33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '0xwalletaddress2', '44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222');

```