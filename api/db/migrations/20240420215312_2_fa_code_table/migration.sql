-- CreateTable
CREATE TABLE "TwoFactorCode" (
    "userEmail" TEXT NOT NULL,
    "Code" INTEGER NOT NULL,

    CONSTRAINT "TwoFactorCode_pkey" PRIMARY KEY ("userEmail")
);

-- AddForeignKey
ALTER TABLE "TwoFactorCode" ADD CONSTRAINT "TwoFactorCode_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
