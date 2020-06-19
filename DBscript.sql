-- Table: "user"


DROP TABLE IF EXISTS recommendation;
DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS "user";

DROP DATABASE IF EXISTS newsdb;

CREATE DATABASE newsdb;

\c newsdb;


CREATE TABLE "user"
(
  id serial NOT NULL,
  email character varying NOT NULL,
  username character varying NOT NULL,
  password character varying NOT NULL,
  "isActive" boolean NOT NULL DEFAULT true,
  "entryDate" timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);

-- Table: article

CREATE TABLE article
(
  id serial NOT NULL,
  url character varying NOT NULL,
  "entryDate" timestamp without time zone NOT NULL DEFAULT now(),
  "userId" integer,
  CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY (id),
  CONSTRAINT "FK_636f17dadfea1ffb4a412296a28" FOREIGN KEY ("userId")
      REFERENCES "user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);


-- Table: recommendation

CREATE TABLE recommendation
(
  id serial NOT NULL,
  url character varying NOT NULL,
  "entryDate" timestamp without time zone NOT NULL DEFAULT now(),
  "userId" integer,
  "referralId" integer,
  CONSTRAINT "PK_17cb51984a6627ef2ce7370e23c" PRIMARY KEY (id),
  CONSTRAINT "FK_61298a446857ac96c88d0a09fd0" FOREIGN KEY ("userId")
      REFERENCES "user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT "FK_8b41af6b454b79ed85c9fd67005" FOREIGN KEY ("referralId")
      REFERENCES "user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);


INSERT INTO "user"(
             email, username, password, "isActive", "entryDate")
    VALUES ('admin@admin.com','admin', 'admin', true, now());