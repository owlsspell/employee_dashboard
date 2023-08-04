-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "client_id" TEXT,
    "client_secret" TEXT,
    "role" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
