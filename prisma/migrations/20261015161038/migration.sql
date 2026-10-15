-- CreateTable
CREATE TABLE "Feedbackv2" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "newsId" TEXT NOT NULL,

    CONSTRAINT "Feedbackv2_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Feedbackv2" ADD CONSTRAINT "Feedbackv2_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedbackv2" ADD CONSTRAINT "Feedbackv2_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
