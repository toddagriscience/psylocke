// Copyright Todd LLC. All rights reserved.

import { date, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { managementZone } from './managementZones';

/** A singular analysis for a singular management zone. There isn't much data in this table, the majority of it is stored in child tables. */
export const analysis = pgTable('analysis', {
  /** Soil analysis ID in the form of XXXXXX-XXXXXX, where X is an alphanumeric character. */
  id: varchar({ length: 13 }).primaryKey().notNull(),
  /** Foreign key relationship back to given management zone */
  managementZone: serial()
    .references(() => managementZone.id)
    .notNull(),
  /** Date of the analysis */
  analysisDate: date({ mode: 'date' }).notNull(),
});
