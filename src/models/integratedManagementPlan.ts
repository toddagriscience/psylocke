// Copyright Todd LLC. All rights reserved.

import { date, pgTable, text, serial, varchar } from 'drizzle-orm/pg-core';
import { managementZone } from './managementZones';
import { analysis } from './analysis';

/** Informally referred to as an IMP, an integrated management plan specifies how Todd reccomends a field be handled based off of a given analysis. There are no specific fields for reccomendations -- just a "plan" field. */
export const integratedManagementPlan = pgTable('integrated_management_plan', {
  /** Auto increment id -- no specific format for IDs for IMPs */
  id: serial().primaryKey().notNull(),
  /** Foreign key relationship back to given management zone */
  managementZone: serial()
    .references(() => managementZone.id)
    .notNull(),
  /** Foreign key relationship to the given analysis */
  analysis: varchar({ length: 13 })
    .primaryKey()
    .notNull()
    .references(() => analysis.id),
  /** Written plan for management zone */
  plan: text(),
  /** The date this plan was written */
  initialized: date({ mode: 'date' }).notNull(),
  /** The date this plan was updated, if it ever was */
  updated: date({ mode: 'date' }),
});
