CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE "user_gender_enum" AS ENUM ('m', 'f', 'u');

CREATE TABLE IF NOT EXISTS public."User"
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name character varying(30) COLLATE pg_catalog."default",
    username character varying(15) COLLATE pg_catalog."default",
    email character varying(40) COLLATE pg_catalog."default",
    age integer,
    password character varying(255) COLLATE pg_catalog."default",
    gender user_gender_enum,
    CONSTRAINT "User_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."User"
    OWNER to root;
