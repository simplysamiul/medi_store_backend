// src/app.ts
import express4 from "express";
import cors from "cors";

// src/modules/medicine/medicine.router.ts
import express from "express";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.4.0",
  "engineVersion": "ab56fe763f921d033a6c195e7ddeb3e255bdbb57",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\n// medicine model\n\nmodel Medicine {\n  id             String   @id @default(uuid())\n  med_name       String   @db.VarChar(50)\n  med_des        String   @db.Text\n  manufacturer   String   @db.VarChar(30)\n  stock_quantity String   @db.VarChar(5)\n  expiry_date    DateTime\n  image_url      String\n  seller_id      String\n  category_id    String\n  price          String?\n  category       Category @relation(fields: [category_id], references: [id])\n  is_active      Boolean  @default(true)\n  created_at     DateTime @default(now())\n  updated_at     DateTime @updatedAt\n  reviews        Review[]\n\n  @@index([med_name])\n  @@index([manufacturer])\n  @@index([category_id])\n  @@map("medicines")\n}\n\n// category model \n\nmodel Category {\n  id            String     @id @default(uuid())\n  category_name String     @db.VarChar(50)\n  descripting   String     @db.Text\n  created_at    DateTime   @default(now())\n  updated_at    DateTime   @updatedAt\n  medicines     Medicine[]\n\n  @@index([category_name])\n  @@map("Categories")\n}\n\n// Order model\n\nmodel Order {\n  id               String        @id @default(uuid())\n  customer_id      String\n  total_amount     String\n  shipping_address Json\n  orderItems       Json\n  payment_method   PaymentMethod @default(Cash_On_Delivery)\n  status           OrderStatus   @default(placed)\n  created_at       DateTime      @default(now())\n  updated_at       DateTime      @updatedAt\n\n  @@index([customer_id])\n  @@index([status])\n  @@map("orders")\n}\n\n// Order model enum\n\nenum PaymentMethod {\n  Cash_On_Delivery\n  sslcommerz\n  bkash\n  nagad\n  rocket\n}\n\nenum OrderStatus {\n  placed\n  processing\n  shipped\n  delivered\n  cancelled\n}\n\n// Reviews \n\nmodel Review {\n  id          String   @id @default(uuid())\n  medicine_id String\n  medicine    Medicine @relation(fields: [medicine_id], references: [id])\n  customer_id String\n  rating      String\n  comment     String\n  created_at  DateTime @default(now())\n\n  @@index([medicine_id])\n  @@index([customer_id])\n  @@map("reviews")\n}\n\nenum UserRole {\n  CUSTOMER\n  SELLER\n  ADMIN\n}\n\n// Auth models\n\nmodel User {\n  id            String    @id\n  name          String\n  email         String\n  emailVerified Boolean   @default(false)\n  image         String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n\n  role   UserRole @default(CUSTOMER)\n  phone  String?\n  status String?  @default("ACTIVE")\n\n  @@unique([email])\n  @@map("user")\n}\n\n// Session model\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\n// Account model\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\n// Verification model\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Medicine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"med_name","kind":"scalar","type":"String"},{"name":"med_des","kind":"scalar","type":"String"},{"name":"manufacturer","kind":"scalar","type":"String"},{"name":"stock_quantity","kind":"scalar","type":"String"},{"name":"expiry_date","kind":"scalar","type":"DateTime"},{"name":"image_url","kind":"scalar","type":"String"},{"name":"seller_id","kind":"scalar","type":"String"},{"name":"category_id","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMedicine"},{"name":"is_active","kind":"scalar","type":"Boolean"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"reviews","kind":"object","type":"Review","relationName":"MedicineToReview"}],"dbName":"medicines"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"category_name","kind":"scalar","type":"String"},{"name":"descripting","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"CategoryToMedicine"}],"dbName":"Categories"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customer_id","kind":"scalar","type":"String"},{"name":"total_amount","kind":"scalar","type":"String"},{"name":"shipping_address","kind":"scalar","type":"Json"},{"name":"orderItems","kind":"scalar","type":"Json"},{"name":"payment_method","kind":"enum","type":"PaymentMethod"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"}],"dbName":"orders"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"medicine_id","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToReview"},{"name":"customer_id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"String"},{"name":"comment","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"}],"dbName":"reviews"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","medicines","_count","category","medicine","reviews","Medicine.findUnique","Medicine.findUniqueOrThrow","Medicine.findFirst","Medicine.findFirstOrThrow","Medicine.findMany","data","Medicine.createOne","Medicine.createMany","Medicine.createManyAndReturn","Medicine.updateOne","Medicine.updateMany","Medicine.updateManyAndReturn","create","update","Medicine.upsertOne","Medicine.deleteOne","Medicine.deleteMany","having","_min","_max","Medicine.groupBy","Medicine.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Order.findUnique","Order.findUniqueOrThrow","Order.findFirst","Order.findFirstOrThrow","Order.findMany","Order.createOne","Order.createMany","Order.createManyAndReturn","Order.updateOne","Order.updateMany","Order.updateManyAndReturn","Order.upsertOne","Order.deleteOne","Order.deleteMany","Order.groupBy","Order.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","user","sessions","accounts","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","Account.groupBy","Account.aggregate","Verification.findUnique","Verification.findUniqueOrThrow","Verification.findFirst","Verification.findFirstOrThrow","Verification.findMany","Verification.createOne","Verification.createMany","Verification.createManyAndReturn","Verification.updateOne","Verification.updateMany","Verification.updateManyAndReturn","Verification.upsertOne","Verification.deleteOne","Verification.deleteMany","Verification.groupBy","Verification.aggregate","AND","OR","NOT","id","identifier","value","expiresAt","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","accountId","providerId","userId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt","scope","password","token","ipAddress","userAgent","name","email","emailVerified","image","UserRole","role","phone","status","every","some","none","medicine_id","customer_id","rating","comment","created_at","total_amount","shipping_address","orderItems","PaymentMethod","payment_method","OrderStatus","updated_at","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","category_name","descripting","med_name","med_des","manufacturer","stock_quantity","expiry_date","image_url","seller_id","category_id","price","is_active","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany"]'),
  graph: "jANEgAESBQAAiwIAIAcAAIwCACCRAQAAigIAMJIBAAADABCTAQAAigIAMJQBAQAAAAHBAUAA2wEAIcgBQADbAQAh0QEBANoBACHSAQEA2gEAIdMBAQDaAQAh1AEBANoBACHVAUAA2wEAIdYBAQDaAQAh1wEBANoBACHYAQEA2gEAIdkBAQDuAQAh2gEgAO0BACEBAAAAAQAgEgUAAIsCACAHAACMAgAgkQEAAIoCADCSAQAAAwAQkwEAAIoCADCUAQEA2gEAIcEBQADbAQAhyAFAANsBACHRAQEA2gEAIdIBAQDaAQAh0wEBANoBACHUAQEA2gEAIdUBQADbAQAh1gEBANoBACHXAQEA2gEAIdgBAQDaAQAh2QEBAO4BACHaASAA7QEAIQMFAADzAgAgBwAA9AIAINkBAACSAgAgAwAAAAMAIAEAAAQAMAIAAAEAIAEAAAADACAKBgAAiQIAIJEBAACIAgAwkgEAAAcAEJMBAACIAgAwlAEBANoBACG9AQEA2gEAIb4BAQDaAQAhvwEBANoBACHAAQEA2gEAIcEBQADbAQAhAQYAAPICACAKBgAAiQIAIJEBAACIAgAwkgEAAAcAEJMBAACIAgAwlAEBAAAAAb0BAQDaAQAhvgEBANoBACG_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_AQEAAAABwAEBAAAAAcEBQAAAAAEBDQAAWgAwAQ0AAFoAMAcGAADGAgAglAEBAJACACG9AQEAkAIAIb4BAQCQAgAhvwEBAJACACHAAQEAkAIAIcEBQACRAgAhAgAAAAkAIA0AAF0AIAaUAQEAkAIAIb0BAQCQAgAhvgEBAJACACG_AQEAkAIAIcABAQCQAgAhwQFAAJECACECAAAABwAgDQAAXwAgAgAAAAcAIA0AAF8AIAMAAAAJACAUAABYACAVAABdACABAAAACQAgAQAAAAcAIAMEAADDAgAgGgAAxQIAIBsAAMQCACAJkQEAAPYBADCSAQAAZgAQkwEAAPYBADCUAQEA0gEAIb0BAQDSAQAhvgEBANIBACG_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_AQEA0gEAIcABAQDSAQAhwQFAANMBACEMkQEAAPcBADCSAQAAUAAQkwEAAPcBADCUAQEA0gEAIbkBAAD6AcgBIr4BAQDSAQAhwQFAANMBACHCAQEA0gEAIcMBAAD4AQAgxAEAAPgBACDGAQAA-QHGASLIAUAA0wEAIQ8EAADVAQAgGgAA_wEAIBsAAP8BACCaAYAAAAABnQGAAAAAAZ4BgAAAAAGfAYAAAAABoAGAAAAAAaEBgAAAAAHJAQEAAAABygEBAAAAAcsBAQAAAAHMAYAAAAABzQGAAAAAAc4BgAAAAAEHBAAA1QEAIBoAAP4BACAbAAD-AQAgmgEAAADGAQKbAQAAAMYBCJwBAAAAxgEIoQEAAP0BxgEiBwQAANUBACAaAAD8AQAgGwAA_AEAIJoBAAAAyAECmwEAAADIAQicAQAAAMgBCKEBAAD7AcgBIgcEAADVAQAgGgAA_AEAIBsAAPwBACCaAQAAAMgBApsBAAAAyAEInAEAAADIAQihAQAA-wHIASIEmgEAAADIAQKbAQAAAMgBCJwBAAAAyAEIoQEAAPwByAEiBwQAANUBACAaAAD-AQAgGwAA_gEAIJoBAAAAxgECmwEAAADGAQicAQAAAMYBCKEBAAD9AcYBIgSaAQAAAMYBApsBAAAAxgEInAEAAADGAQihAQAA_gHGASIMmgGAAAAAAZ0BgAAAAAGeAYAAAAABnwGAAAAAAaABgAAAAAGhAYAAAAAByQEBAAAAAcoBAQAAAAHLAQEAAAABzAGAAAAAAc0BgAAAAAHOAYAAAAABDJEBAACAAgAwkgEAAD0AEJMBAACAAgAwlAEBANoBACG5AQAAgwLIASK-AQEA2gEAIcEBQADbAQAhwgEBANoBACHDAQAAgQIAIMQBAACBAgAgxgEAAIICxgEiyAFAANsBACEMmgGAAAAAAZ0BgAAAAAGeAYAAAAABnwGAAAAAAaABgAAAAAGhAYAAAAAByQEBAAAAAcoBAQAAAAHLAQEAAAABzAGAAAAAAc0BgAAAAAHOAYAAAAABBJoBAAAAxgECmwEAAADGAQicAQAAAMYBCKEBAAD-AcYBIgSaAQAAAMgBApsBAAAAyAEInAEAAADIAQihAQAA_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_AgAg3QEAAP0CACDeAQAA_gIAIOMBAAABACADFAAA_AIAIN0BAAD9AgAg4wEAAAEAIAAAAAHgAQAAAMYBAgHgAQAAAMgBAgAAAAsUAADRAgAwFQAA1gIAMN0BAADSAgAw3gEAANMCADDfAQAA1AIAIOABAADVAgAw4QEAANUCADDiAQAA1QIAMOMBAADVAgAw5AEAANcCADDlAQAA2AIAMA0HAADqAgAglAEBAAAAAcEBQAAAAAHIAUAAAAAB0QEBAAAAAdIBAQAAAAHTAQEAAAAB1AEBAAAAAdUBQAAAAAHWAQEAAAAB1wEBAAAAAdkBAQAAAAHaASAAAAABAgAAAAEAIBQAAOkCACADAAAAAQAgFAAA6QIAIBUAANsCACABDQAA-wIAMBIFAACLAgAgBwAAjAIAIJEBAACKAgAwkgEAAAMAEJMBAACKAgAwlAEBAAAAAcEBQADbAQAhyAFAANsBACHRAQEA2gEAIdIBAQDaAQAh0wEBANoBACHUAQEA2gEAIdUBQADbAQAh1gEBANoBACHXAQEA2gEAIdgBAQDaAQAh2QEBAO4BACHaASAA7QEAIQIAAAABACANAADbAgAgAgAAANkCACANAADaAgAgEJEBAADYAgAwkgEAANkCABCTAQAA2AIAMJQBAQDaAQAhwQFAANsBACHIAUAA2wEAIdEBAQDaAQAh0gEBANoBACHTAQEA2gEAIdQBAQDaAQAh1QFAANsBACHWAQEA2gEAIdcBAQDaAQAh2AEBANoBACHZAQEA7gEAIdoBIADtAQAhEJEBAADYAgAwkgEAANkCABCTAQAA2AIAMJQBAQDaAQAhwQFAANsBACHIAUAA2wEAIdEBAQDaAQAh0gEBANoBACHTAQEA2gEAIdQBAQDaAQAh1QFAANsBACHWAQEA2gEAIdcBAQDaAQAh2AEBANoBACHZAQEA7gEAIdoBIADtAQAhDJQBAQCQAgAhwQFAAJECACHIAUAAkQIAIdEBAQCQAgAh0gEBAJACACHTAQEAkAIAIdQBAQCQAgAh1QFAAJECACHWAQEAkAIAIdcBAQCQAgAh2QEBAJYCACHaASAAogIAIQ0HAADcAgAglAEBAJACACHBAUAAkQIAIcgBQACRAgAh0QEBAJACACHSAQEAkAIAIdMBAQCQAgAh1AEBAJACACHVAUAAkQIAIdYBAQCQAgAh1wEBAJACACHZAQEAlgIAIdoBIACiAgAhCxQAAN0CADAVAADiAgAw3QEAAN4CADDeAQAA3wIAMN8BAADgAgAg4AEAAOECADDhAQAA4QIAMOIBAADhAgAw4wEAAOECADDkAQAA4wIAMOUBAADkAgAwBZQBAQAAAAG-AQEAAAABvwEBAAAAAcABAQAAAAHBAUAAAAABAgAAAAkAIBQAAOgCACADAAAACQAgFAAA6AIAIBUAAOcCACABDQAA-gIAMAoGAACJAgAgkQEAAIgCADCSAQAABwAQkwEAAIgCADCUAQEAAAABvQEBANoBACG-AQEA2gEAIb8BAQDaAQAhwAEBANoBACHBAUAA2wEAIQIAAAAJACANAADnAgAgAgAAAOUCACANAADmAgAgCZEBAADkAgAwkgEAAOUCABCTAQAA5AIAMJQBAQDaAQAhvQEBANoBACG-AQEA2gEAIb8BAQDaAQAhwAEBANoBACHBAUAA2wEAIQmRAQAA5AIAMJIBAADlAgAQkwEAAOQCADCUAQEA2gEAIb0BAQDaAQAhvgEBANoBACG_AQEA2gEAIcABAQDaAQAhwQFAANsBACEFlAEBAJACACG-AQEAkAIAIb8BAQCQAgAhwAEBAJACACHBAUAAkQIAIQWUAQEAkAIAIb4BAQCQAgAhvwEBAJACACHAAQEAkAIAIcEBQACRAgAhBZQBAQAAAAG-AQEAAAABvwEBAAAAAcABAQAAAAHBAUAAAAABDQcAAOoCACCUAQEAAAABwQFAAAAAAcgBQAAAAAHRAQEAAAAB0gEBAAAAAdMBAQAAAAHUAQEAAAAB1QFAAAAAAdYBAQAAAAHXAQEAAAAB2QEBAAAAAdoBIAAAAAEEFAAA3QIAMN0BAADeAgAw3wEAAOACACDjAQAA4QIAMAQUAADRAgAw3QEAANICADDfAQAA1AIAIOMBAADVAgAwAAAAAAUUAAD1AgAgFQAA-AIAIN0BAAD2AgAg3gEAAPcCACDjAQAAIQAgAxQAAPUCACDdAQAA9gIAIOMBAAAhACADBQAA8wIAIAcAAPQCACDZAQAAkgIAIAEDAADsAgAgAAWUAQEAAAABwQFAAAAAAcgBQAAAAAHPAQEAAAAB0AEBAAAAAQIAAAAhACAUAAD1AgAgAwAAACQAIBQAAPUCACAVAAD5AgAgBwAAACQAIA0AAPkCACCUAQEAkAIAIcEBQACRAgAhyAFAAJECACHPAQEAkAIAIdABAQCQAgAhBZQBAQCQAgAhwQFAAJECACHIAUAAkQIAIc8BAQCQAgAh0AEBAJACACEFlAEBAAAAAb4BAQAAAAG_AQEAAAABwAEBAAAAAcEBQAAAAAEMlAEBAAAAAcEBQAAAAAHIAUAAAAAB0QEBAAAAAdIBAQAAAAHTAQEAAAAB1AEBAAAAAdUBQAAAAAHWAQEAAAAB1wEBAAAAAdkBAQAAAAHaASAAAAABDgUAAPECACCUAQEAAAABwQFAAAAAAcgBQAAAAAHRAQEAAAAB0gEBAAAAAdMBAQAAAAHUAQEAAAAB1QFAAAAAAdYBAQAAAAHXAQEAAAAB2AEBAAAAAdkBAQAAAAHaASAAAAABAgAAAAEAIBQAAPwCACADAAAAAwAgFAAA_AIAIBUAAIADACAQAAAAAwAgBQAA8AIAIA0AAIADACCUAQEAkAIAIcEBQACRAgAhyAFAAJECACHRAQEAkAIAIdIBAQCQAgAh0wEBAJACACHUAQEAkAIAIdUBQACRAgAh1gEBAJACACHXAQEAkAIAIdgBAQCQAgAh2QEBAJYCACHaASAAogIAIQ4FAADwAgAglAEBAJACACHBAUAAkQIAIcgBQACRAgAh0QEBAJACACHSAQEAkAIAIdMBAQCQAgAh1AEBAJACACHVAUAAkQIAIdYBAQCQAgAh1wEBAJACACHYAQEAkAIAIdkBAQCWAgAh2gEgAKICACEHlAEBAAAAAZcBQAAAAAGYAUAAAAABmQFAAAAAAa8BAQAAAAGwAQEAAAABsQEBAAAAAQyUAQEAAAABmAFAAAAAAZkBQAAAAAGlAQEAAAABpgEBAAAAAagBAQAAAAGpAQEAAAABqgEBAAAAAasBQAAAAAGsAUAAAAABrQEBAAAAAa4BAQAAAAELUAAAvwIAIJQBAQAAAAGYAUAAAAABmQFAAAAAAbIBAQAAAAGzAQEAAAABtAEgAAAAAbUBAQAAAAG3AQAAALcBArgBAQAAAAG5AQEAAAABAgAAAGkAIBQAAIMDACADAAAAdgAgFAAAgwMAIBUAAIcDACANAAAAdgAgDQAAhwMAIFAAAKUCACCUAQEAkAIAIZgBQACRAgAhmQFAAJECACGyAQEAkAIAIbMBAQCQAgAhtAEgAKICACG1AQEAlgIAIbcBAACjArcBIrgBAQCWAgAhuQEBAJYCACELUAAApQIAIJQBAQCQAgAhmAFAAJECACGZAUAAkQIAIbIBAQCQAgAhswEBAJACACG0ASAAogIAIbUBAQCWAgAhtwEAAKMCtwEiuAEBAJYCACG5AQEAlgIAIQtPAAC-AgAglAEBAAAAAZgBQAAAAAGZAUAAAAABsgEBAAAAAbMBAQAAAAG0ASAAAAABtQEBAAAAAbcBAAAAtwECuAEBAAAAAbkBAQAAAAECAAAAaQAgFAAAiAMAIAMAAAB2ACAUAACIAwAgFQAAjAMAIA0AAAB2ACANAACMAwAgTwAApAIAIJQBAQCQAgAhmAFAAJECACGZAUAAkQIAIbIBAQCQAgAhswEBAJACACG0ASAAogIAIbUBAQCWAgAhtwEAAKMCtwEiuAEBAJYCACG5AQEAlgIAIQtPAACkAgAglAEBAJACACGYAUAAkQIAIZkBQACRAgAhsgEBAJACACGzAQEAkAIAIbQBIACiAgAhtQEBAJYCACG3AQAAowK3ASK4AQEAlgIAIbkBAQCWAgAhAwQABQUAAgcKBAIDBQEEAAMBAwYAAQYAAQEHCwAAAQUAAgEFAAIDBAAKGgALGwAMAAAAAwQAChoACxsADAAAAwQAERoAEhsAEwAAAAMEABEaABIbABMAAAADBAAZGgAaGwAbAAAAAwQAGRoAGhsAGwEGAAEBBgABAwQAIBoAIRsAIgAAAAMEACAaACEbACIDBAAnT24lUHImAU4AJAFOACQCT3MAUHQAAAADBAArGgAsGwAtAAAAAwQAKxoALBsALQFOACQBTgAkAwQAMhoAMxsANAAAAAMEADIaADMbADQBTgAkAU4AJAMEADkaADobADsAAAADBAA5GgA6GwA7AAAAAwQAQRoAQhsAQwAAAAMEAEEaAEIbAEMIAgEJDAEKDQELDgEMDwEOEQEPEwYQFAcRFgESGAYTGQgWGgEXGwEYHAYcHwkdIA0eIgIfIwIgJgIhJwIiKAIjKgIkLAYlLQ4mLwInMQYoMg8pMwIqNAIrNQYsOBAtORQuOxUvPBUwPxUxQBUyQRUzQxU0RQY1RhY2SBU3SgY4Sxc5TBU6TRU7TgY8URg9Uhw-UwQ_VARAVQRBVgRCVwRDWQREWwZFXB1GXgRHYAZIYR5JYgRKYwRLZAZMZx9NaCNRaiRSdSRTeCRUeSRVeiRWfCRXfgZYfyhZgQEkWoMBBluEASlchQEkXYYBJF6HAQZfigEqYIsBLmGMASVijQElY44BJWSPASVlkAElZpIBJWeUAQZolQEvaZcBJWqZAQZrmgEwbJsBJW2cASVunQEGb6ABMXChATVxogEmcqMBJnOkASZ0pQEmdaYBJnaoASZ3qgEGeKsBNnmtASZ6rwEGe7ABN3yxASZ9sgEmfrMBBn-2ATiAAbcBPIEBuQE9ggG6AT2DAb0BPYQBvgE9hQG_AT2GAcEBPYcBwwEGiAHEAT6JAcYBPYoByAEGiwHJAT-MAcoBPY0BywE9jgHMAQaPAc8BQJAB0AFE"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/medicine/medicine.service.ts
var postMedicine = async (data, userId) => {
  const result = await prisma.medicine.create({
    data: {
      ...data,
      seller_id: userId
    }
  });
  return result;
};
var getAllMedicine = async (payload) => {
  const search = payload.search?.trim();
  const result = await prisma.medicine.findMany({
    ...search && {
      where: {
        OR: [
          {
            med_name: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            manufacturer: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            seller_id: {
              contains: search,
              mode: "insensitive"
            }
          }
        ]
      }
    }
  });
  return result;
};
var getMedicineById = async (id) => {
  const result = await prisma.medicine.findUnique({
    where: {
      id
    }
  });
  return result;
};
var updateMedicineById = async (id, data, userId) => {
  const medicine = await prisma.medicine.findUniqueOrThrow({
    where: {
      id
    },
    select: {
      id: true,
      seller_id: true
    }
  });
  if (medicine.seller_id !== userId) {
    throw new Error("You are not the seller of this medicine");
  }
  return prisma.medicine.update({
    where: {
      id
    },
    data
  });
};
var deleteMedicineById = async (id, sellerId) => {
  const medicine = await prisma.medicine.findUniqueOrThrow({
    where: {
      id
    },
    select: {
      id: true,
      seller_id: true
    }
  });
  if (medicine.seller_id !== sellerId) {
    throw new Error("You are not the seller of this medicine");
  }
  const result = await prisma.medicine.delete({
    where: {
      id
    }
  });
  return result;
};
var medicineService = {
  postMedicine,
  getAllMedicine,
  getMedicineById,
  updateMedicineById,
  deleteMedicineById
};

// src/modules/medicine/medicine.controler.ts
var postMedicine2 = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        error: "Unauthorized access ..!"
      });
    }
    const result = await medicineService.postMedicine(req.body, req.user.id);
    res.status(201).json({
      success: true,
      message: "Medicine inserted successfully..!",
      data: result,
      error: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Medicine inserted failed..!",
      data: null,
      error
    });
  }
};
var getAllMedicine2 = async (req, res) => {
  try {
    const { search } = req.query;
    const result = await medicineService.getAllMedicine(
      typeof search === "string" ? { search } : {}
    );
    res.status(201).json({
      success: true,
      message: "Medicine retrive  successfully..!",
      data: result,
      error: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Medicine retrive failed..!",
      data: null,
      error
    });
  }
};
var getMedicineById2 = async (req, res) => {
  try {
    const { medicineId } = req.params;
    const result = await medicineService.getMedicineById(medicineId);
    res.status(201).json({
      success: true,
      message: "Medicine retrive  successfully..!",
      data: result,
      error: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Medicine retrive failed..!",
      data: null,
      error
    });
  }
};
var updateMedicineById2 = async (req, res) => {
  try {
    const result = await medicineService.updateMedicineById(
      req.params.medicineId,
      req.body,
      req.user?.id
    );
    res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
      data: result,
      error: null
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update medicine",
      data: null,
      error: error.message
    });
  }
};
var deleteMedicineById2 = async (req, res) => {
  try {
    const { medicineId } = req.params;
    const result = await medicineService.deleteMedicineById(medicineId, req.user?.id);
    res.status(201).json({
      success: true,
      message: "Medicine deleted  successfully..!",
      data: result,
      error: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Medicine deleted failed..!",
      data: null,
      error
    });
  }
};
var medicineController = {
  postMedicine: postMedicine2,
  getAllMedicine: getAllMedicine2,
  getMedicineById: getMedicineById2,
  updateMedicineById: updateMedicineById2,
  deleteMedicineById: deleteMedicineById2
};

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: [process.env.CLIENT_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
      // 5 minutes
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false
    },
    disableCSRFCheck: true
    // Allow requests without Origin header (Postman, mobile apps, etc.)
  }
});

// src/middleware/auth.middleware.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const seassion = await auth.api.getSession({
        headers: req.headers
      });
      if (!seassion) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized"
        });
      }
      req.user = {
        id: seassion.user.id,
        email: seassion.user.email,
        name: seassion.user.name,
        role: seassion.user.role,
        emailVerified: seassion.user.emailVerified
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(401).json({
          success: false,
          message: "Forbidden access! You don't have permisson to access this resourches..!"
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
var auth_middleware_default = auth2;

// src/modules/medicine/medicine.router.ts
var medicineRouter = express.Router();
medicineRouter.post("/", auth_middleware_default("SELLER" /* SELLER */), medicineController.postMedicine);
medicineRouter.get("/", medicineController.getAllMedicine);
medicineRouter.get("/:medicineId", medicineController.getMedicineById);
medicineRouter.patch("/:medicineId", auth_middleware_default("SELLER" /* SELLER */), medicineController.updateMedicineById);
medicineRouter.delete("/:medicineId", auth_middleware_default("SELLER" /* SELLER */), medicineController.deleteMedicineById);
var medicine_router_default = medicineRouter;

// src/modules/category/category.route.ts
import { Router } from "express";

// src/modules/category/category.service.ts
var createCategory = async (data) => {
  return prisma.category.create({
    data
  });
};
var getAllCategories = async (payload) => {
  return prisma.category.findMany({
    where: {
      category_name: {
        contains: payload.search,
        mode: "insensitive"
      }
    },
    orderBy: { created_at: "desc" }
  });
};
var getCategoryById = async (id) => {
  return prisma.category.findUnique({
    where: { id }
  });
};
var updateCategory = async (id, payload) => {
  return prisma.category.update({
    where: { id },
    data: payload
  });
};
var deleteCategory = async (id) => {
  return prisma.category.delete({
    where: { id }
  });
};
var CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};

// src/modules/category/category.controller.ts
var createCategory2 = async (req, res) => {
  try {
    const result = await CategoryService.createCategory(req.body);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
      error: null
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create category",
      data: null,
      error: error.message
    });
  }
};
var getAllCategories2 = async (req, res) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : void 0;
    const result = await CategoryService.getAllCategories({ search: searchString });
    res.status(200).json({
      success: true,
      message: "Categories retrive successfully",
      data: result,
      error: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrive categories",
      data: null,
      error: error.message
    });
  }
};
var getCategoryById2 = async (req, res) => {
  try {
    const result = await CategoryService.getCategoryById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Category retrive successfully",
      data: result,
      error: null
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Category not found",
      data: null,
      error: error.message
    });
  }
};
var updateCategory2 = async (req, res) => {
  try {
    const result = await CategoryService.updateCategory(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
      error: null
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update category",
      data: null,
      error: error.message
    });
  }
};
var deleteCategory2 = async (req, res) => {
  try {
    await CategoryService.deleteCategory(req.params.id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: null,
      error: null
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete category",
      data: null,
      error: error.message
    });
  }
};
var CategoryController = {
  createCategory: createCategory2,
  getAllCategories: getAllCategories2,
  getCategoryById: getCategoryById2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/modules/category/category.route.ts
var CategoryRouter = Router();
CategoryRouter.post("/", CategoryController.createCategory);
CategoryRouter.get("/", CategoryController.getAllCategories);
CategoryRouter.get("/:id", CategoryController.getCategoryById);
CategoryRouter.patch("/:id", auth_middleware_default("ADMIN" /* ADMIN */), CategoryController.updateCategory);
CategoryRouter.delete("/:id", auth_middleware_default("ADMIN" /* ADMIN */), CategoryController.deleteCategory);

// src/modules/review/review.router.ts
import { Router as Router2 } from "express";

// src/modules/review/review.service.ts
var createReview = async (data) => {
  return prisma.review.create({
    data
  });
};
var getAllReviews = async () => {
  return prisma.review.findMany({
    orderBy: { created_at: "desc" }
  });
};
var getReviewById = async (id) => {
  return prisma.review.findUnique({
    where: { id }
  });
};
var deleteReviewById = async (id) => {
  return prisma.review.delete({
    where: { id }
  });
};
var ReviewService = {
  createReview,
  getAllReviews,
  getReviewById,
  deleteReviewById
};

// src/modules/review/review.controller.ts
var createReview2 = async (req, res) => {
  try {
    const result = await ReviewService.createReview(req.body);
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result,
      error: null
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Review creation failed",
      data: null,
      error: error.message
    });
  }
};
var getAllReviews2 = async (_req, res) => {
  try {
    const result = await ReviewService.getAllReviews();
    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: result,
      error: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      data: null,
      error: error.message
    });
  }
};
var getReviewById2 = async (req, res) => {
  try {
    const result = await ReviewService.getReviewById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      data: result,
      error: null
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Review not found",
      data: null,
      error: error.message
    });
  }
};
var deleteReviewById2 = async (req, res) => {
  try {
    await ReviewService.deleteReviewById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: null,
      error: null
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Review deletion failed",
      data: null,
      error: error.message
    });
  }
};
var ReviewController = {
  createReview: createReview2,
  getAllReviews: getAllReviews2,
  getReviewById: getReviewById2,
  deleteReviewById: deleteReviewById2
};

// src/modules/review/review.router.ts
var ReviewRoutes = Router2();
ReviewRoutes.post("/", ReviewController.createReview);
ReviewRoutes.get("/", ReviewController.getAllReviews);
ReviewRoutes.get("/:id", ReviewController.getReviewById);
ReviewRoutes.delete("/:id", ReviewController.deleteReviewById);

// src/app.ts
import { toNodeHandler } from "better-auth/node";

// src/modules/user/user.router.ts
import express2 from "express";

// src/modules/user/user.service.ts
var getUsers = async () => {
  const result = await prisma.user.findMany();
  return result;
};
var getUserById = async (userId) => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  return result;
};
var updateUserById = async (payload, userId) => {
  const result = await prisma.user.update({
    where: {
      id: userId
    },
    data: payload
  });
  return result;
};
var deleteUserById = async (userId) => {
  const result = await prisma.user.delete({
    where: {
      id: userId
    }
  });
  return result;
};
var userService = {
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById
};

// src/modules/user/user.controller.ts
var getUsers2 = async (req, res) => {
  try {
    const user = await userService.getUsers();
    res.status(200).json({
      success: true,
      message: "Users retrive successfully..!",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Users retrive failed..!",
      data: null,
      error
    });
  }
};
var getUserById2 = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.status(500).json({
        success: false,
        message: "Please provide valid useer id..!",
        data: null
      });
    }
    const user = await userService.getUserById(userId);
    res.status(200).json({
      success: true,
      message: "User retrive successfully..!",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User retrive failed..!",
      data: null,
      error
    });
  }
};
var updateUserById2 = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.status(500).json({
        success: false,
        message: "Please provide valid useer id..!",
        data: null
      });
    }
    const user = await userService.updateUserById(req.body, userId);
    res.status(200).json({
      success: true,
      message: "User delete successfully..!",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User delete failed..!",
      data: null,
      error
    });
  }
};
var deleteUserById2 = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.status(500).json({
        success: false,
        message: "Please provide valid useer id..!",
        data: null
      });
    }
    const user = await userService.deleteUserById(userId);
    res.status(200).json({
      success: true,
      message: "User delete successfully..!",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User delete failed..!",
      data: null,
      error
    });
  }
};
var userController = {
  getUsers: getUsers2,
  getUserById: getUserById2,
  deleteUserById: deleteUserById2,
  updateUserById: updateUserById2
};

// src/modules/user/user.router.ts
var userRouter = express2.Router();
userRouter.get("/", auth_middleware_default("ADMIN" /* ADMIN */), userController.getUsers);
userRouter.get("/:id", auth_middleware_default("ADMIN" /* ADMIN */, "CUSTOMER" /* CUSTOMER */, "SELLER" /* SELLER */), userController.getUserById);
userRouter.patch("/:id", userController.updateUserById);
userRouter.delete("/:id", auth_middleware_default("ADMIN" /* ADMIN */), userController.deleteUserById);

// src/modules/order/order.router.ts
import express3 from "express";

// src/modules/order/order.services.ts
var createOrder = async (data) => {
  const result = await prisma.order.create({
    data
  });
  return result;
};
var getAllOrder = async () => {
  const result = await prisma.order.findMany();
  return result;
};
var getOrderById = async (customerId) => {
  const result = await prisma.order.findMany({
    where: {
      customer_id: customerId
    }
  });
  return result;
};
var updateOrder = async (orderId, status) => {
  console.log(orderId, status?.status);
  const result = await prisma.order.update({
    where: {
      id: orderId
    },
    data: {
      status: status.status
    }
  });
  return result;
};
var orderService = {
  createOrder,
  getAllOrder,
  updateOrder,
  getOrderById
};

// src/modules/order/order.controller.ts
var createOrder2 = async (req, res) => {
  try {
    const order = req.body;
    const confirmOrder = {
      customer_id: order.customer_id,
      total_amount: order.total_amount?.toString(),
      shipping_address: order.shipping_address,
      orderItems: order.orderItems
    };
    const result = await orderService.createOrder(confirmOrder);
    res.status(201).json({
      success: true,
      message: "Order created successfully..!",
      data: result,
      error: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order created failed..!",
      data: null,
      error
    });
  }
};
var getAllOrder2 = async (req, res) => {
  try {
    const result = await orderService.getAllOrder();
    res.status(201).json({
      success: true,
      message: "Order retrive successfully..!",
      data: result,
      error: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order retrive failed..!",
      data: null,
      error
    });
  }
};
var getOrderById2 = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const result = await orderService.getOrderById(customerId);
    res.status(201).json({
      success: true,
      message: "Order retrive successfully..!",
      data: result,
      error: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order retrive failed..!",
      data: null,
      error
    });
  }
};
var UpdateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const status = req.body;
    const result = await orderService.updateOrder(orderId, status);
    res.status(201).json({
      success: true,
      message: "Order update successfully..!",
      data: result,
      error: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order update failed..!",
      data: null,
      error
    });
  }
};
var orderController = {
  createOrder: createOrder2,
  getAllOrder: getAllOrder2,
  UpdateOrder,
  getOrderById: getOrderById2
};

// src/modules/order/order.router.ts
var orderRouter = express3.Router();
orderRouter.post("/", orderController.createOrder);
orderRouter.get("/", auth_middleware_default("ADMIN" /* ADMIN */), orderController.getAllOrder);
orderRouter.get("/:customerId", orderController.getOrderById);
orderRouter.patch("/:id", auth_middleware_default("ADMIN" /* ADMIN */), orderController.UpdateOrder);

// src/app.ts
var app = express4();
var allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL
  // Production frontend URL
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express4.json());
app.get("/", (req, res) => {
  res.send("Welcome to MediStore Backend!");
});
app.use("/api/medicines", medicine_router_default);
app.use("/api/categories", CategoryRouter);
app.use("/api/review", ReviewRoutes);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
