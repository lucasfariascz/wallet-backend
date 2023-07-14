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
	"Password" varchar NOT NULL,
	"City" varchar NOT NULL,
	"State" varchar NOT NULL,
	CONSTRAINT "PK_a2b5a287e6d9e8f01962cc3d630" PRIMARY KEY ("Id")
);