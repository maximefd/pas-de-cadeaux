-- AlterTable
ALTER TABLE "list_item" ADD COLUMN "createdAt" DATETIME;

-- CreateTable
CREATE TABLE "list_visit" (
    "userId" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "visitedAt" DATETIME NOT NULL,

    PRIMARY KEY ("userId", "listId"),
    CONSTRAINT "list_visit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "list_visit_listId_fkey" FOREIGN KEY ("listId") REFERENCES "list" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "list_visit_listId_idx" ON "list_visit"("listId");
