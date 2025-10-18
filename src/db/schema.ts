// Copyright Todd LLC. All rights reserved.

import {
  boolean,
  date,
  numeric,
  pgEnum,
  pgTable,
  point,
  serial,
  text,
  varchar,
} from 'drizzle-orm/pg-core';

/**
 * Initial database schema was written by Oscar Gaske (oscar.gaske.cs@gmail.com)
 *
 * "Client" may refer to the owner of a given business involved with Todd Agriscience or a representative.
 *
 * Generally speaking, lengths are a *very* overestimated guess of how long a entry could potentially be.
 *
 * Any field/table with a "???" above it is, naturally, undocumented. Refer directly to Vincent or Oscar Gaske for questions about these fields.
 */

/** The "top" table (see schema for a better explanation of this statement). A given client's core information. */
export const client = pgTable('client', {
  /** Auto increment id */
  id: serial().primaryKey().notNull(),
  /** Name of the business */
  businessName: varchar({ length: 200 }).notNull(),
  /** Client's first name */
  firstName: varchar({ length: 200 }).notNull(),
  /** Client's last name */
  lastName: varchar({ length: 200 }).notNull(),
  /** Client's email/business' main email */
  email: varchar({ length: 200 }).notNull(),
  /** Phone number in E164 format */
  phone: varchar({ length: 15 }).notNull(),
});

/** The current risk of contimination for a given management zone, calculated from other metrics. */
export const contaminationRisk = pgEnum('contamination_risk', [
  'low',
  'med',
  'high',
]);

/** A management zone. For the majority of the time, you may think of this as a field. */
export const managementZone = pgTable('management_zone', {
  /** Auto increment id -- no specific format for IDs for management zones */
  id: serial().primaryKey().notNull(),
  /** Foreign key relationship back to the client */
  clientId: varchar({ length: 13 })
    .references(() => client.id)
    .notNull(),
  /** The location of the management zone (longitude, latitude). The exact location where this was measured from *does not matter*. It is only used for audits, since most management zones don't have an address. */
  location: point({ mode: 'tuple' }),
  /** The formal name of a given management zone */
  name: varchar({ length: 200 }),
  /** The date when a crops are intended to switch (ex. lettuce in the summer, carrots in the winter) */
  rotationYear: date({ mode: 'date' }),
  /** NPK is a synthetic fertilizer made from inorganic Nitrogen, Phosphorus and K potassium. It's very damaging to soil and environmental health. This field represents if NPK has been used within a certain period of time (see npk_last_used). */
  npk: boolean(),
  /** The last date that NPK had been used on a field. See the npk field for more information. */
  npkLastUsed: date({ mode: 'date' }),
  /** Does this management zone have access to water? */
  irrigation: boolean(),
  /** Some areas have aqueducts that feed to fields -- if this is false, the farm is either receiving plenty of water or has enough runoff to feed back into the aqueduct. If this field is true, the aqueduct is currently being restricted.  */
  waterConvservation: boolean(),
  /** The evaluated contimation risk of the zone. See the documentation of the enum for more details. */
  contaminationRisk: contaminationRisk(),
});

/** Client location data. This table *should* be internationally compatible, and all fields that aren't documented should be completely self explanatory. */
export const clientLocation = pgTable('client_location', {
  /** Foreign key relationship back to the client */
  clientId: varchar({ length: 13 })
    .references(() => client.id)
    .notNull()
    .primaryKey(),
  /** The literal longitude/latitude position of the client. The exact location from where these coordinates were taken *does not matter.* */
  farmLocation: point({ mode: 'tuple' }),
  address1: varchar({ length: 200 }).notNull(),
  address2: varchar({ length: 200 }),
  address3: varchar({ length: 200 }),
  postalCode: varchar({ length: 20 }).notNull(),
  state: varchar({ length: 100 }).notNull(),
  country: varchar({ length: 200 }).notNull(),
});

/** Some farms have certain certificates that require them to act and/or behave in a certain manner, and in some scenarios, Todd has to adjust their practices to accomdate these requirements. These certificates may be abbreviated as NOP, DEM, GAP, and LFI respectively. */
export const certificateType = pgEnum('certificate_type', [
  'National Organic Program',
  'Demeter',
  'Good Agriculture Practices',
  'Local/Facility Inspection',
]);

/** Any certificates that the client's business/farm has. See the certificateType enum for more info. */
export const clientCertificate = pgTable('client_certificate', {
  /** Auto increment id -- no specific format for IDs for client certificates */
  id: serial().primaryKey().notNull(),
  /** Foreign key relationship back to the client */
  clientId: varchar({ length: 13 })
    .references(() => client.id)
    .notNull()
    .primaryKey(),
  /** The kind of certificate. See the certificateType enum for more info. */
  kind: certificateType().notNull(),
  /** The date this certificate was granted/initialized */
  date: date({ mode: 'date' }).notNull(),
  /** The date this certificate expires */
  expDate: date({ mode: 'date' }).notNull(),
});

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

/** Represents a crop for a given field. */
export const crop = pgTable('crop', {
  /** Auto increment id -- no specific format for IDs for crops */
  id: serial().primaryKey().notNull(),
  /** Foreign key relationship back to given management zone */
  managementZone: serial()
    .references(() => managementZone.id)
    .notNull(),
  /** The name of the crop -- realistically, a maximum length of 50 characters would be appropriate, but there's likely some obscure crop that has an extremely long name/variant. */
  name: varchar({ length: 200 }).notNull(),
  /** The date this crop was planted. */
  planted: date({ mode: 'date' }).notNull(),
  /** The date this crop was picked (or collected)/is intended to be picked. Optional. */
  picked: date({ mode: 'date' }),
  /** Is this crop a covercrop? (A covercrop is a crop that is planted not with the intent of being harvested, but with the intent of helping the soil) */
  isCovercrop: boolean(),
  /** Generic notes for each crop (a given client might want to list their reasoning behind using this crop, etc.) */
  notes: text(),
});

/** Represents a fertilizer that was used on a field */
export const fertilizer = pgTable('fertilizer', {
  /** Auto increment id -- no specific format for IDs for fertilizer */
  id: serial().primaryKey().notNull(),
  /** Foreign key relationship back to given management zone */
  managementZone: serial()
    .references(() => managementZone.id)
    .notNull(),
  /** The name of the fertilizer */
  name: varchar({ length: 200 }),
  /** The date that the fertilizer was initially used */
  initial_use: date({ mode: 'date' }).notNull(),
  /** The date that the fertilizer was last used */
  last_used: date({ mode: 'date' }).notNull(),
  /** Generic notes for each livestock */
  notes: text(),
});

/** Describes some animal/group of animals living on or spending the majority of their time on a given management zone. Also details when this animal/group of animals is "deployed" (when they're in the management zone). */
export const livestock = pgTable('livestock', {
  /** Auto increment id -- no specific format for IDs for livestock */
  id: serial().primaryKey().notNull(),
  /** Foreign key relationship back to given management zone */
  managementZone: serial()
    .references(() => managementZone.id)
    .notNull(),
  /** The name/description of the animal currently deployed at a management zone */
  animal: varchar({ length: 200 }),
  /** The date this group of animals was initially deployed. */
  initialDeployment: date({ mode: 'date' }).notNull(),
  /** The date this group of animals was taken out of a management zone. Optional. */
  undeployment: date({ mode: 'date' }),
  /** Is this animal currently deployed? */
  currentlyDeployed: boolean().notNull(),
  /** Generic notes for each livestock */
  notes: text(),
});

/** The type of pest, either an insect or a disease. */
export const pestType = pgEnum('pest_type', ['Insect', 'Disease']);

/** Describes a pest -- this "pest" can either be a disease or an insect. */
export const pest = pgTable('pest', {
  /** Auto increment id -- no specific format for IDs for pests */
  id: serial().primaryKey().notNull(),
  /** Foreign key relationship back to given management zone */
  managementZone: serial()
    .references(() => managementZone.id)
    .notNull(),
  /** The formal name of this pest (which may either be a disease or an insect) */
  name: varchar({ length: 200 }).notNull(),
  /** The first time this pest was spotted. */
  initialEncounter: date({ mode: 'date' }).notNull(),
  /** The most recent sighting/occurence of this pest. */
  mostRecentEncounter: date({ mode: 'date' }),
  /** The type of pest. See the pestType enum for more information. */
  type: pestType().notNull(),
  /** Generic notes for each pest */
  notes: text(),
});

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

/** A "brief" overview of the level of a given mineral. See the mineral table for more context. */
export const mineralLevel = pgEnum('mineral_level', ['Low', 'Med', 'High']);

/** A table that describes a single mineral and its values for a given analysis. */
export const mineral = pgTable('mineral', {
  /** Auto increment id -- no specific format for IDs for minerals */
  id: serial().primaryKey().notNull(),
  /** Foreign key relationship back to given analysis */
  analysisId: varchar({ length: 13 })
    .references(() => analysis.id)
    .notNull(),
  /** The name of the mineral in reference. */
  name: varchar({ length: 200 }).notNull(),
  /** The real value of the mineral (see the unit field for units) */
  real_value: numeric({ precision: 9, scale: 4 }).notNull(),
  /** The ideal value of the mineral (see the unit field for units) */
  ideal_value: numeric({ precision: 9, scale: 4 }).notNull(),
  /** A general tag (is this value low, high, etc.) */
  tag: mineralLevel(),
  /** This field set to true refers to a severe soil quality issue. Specifically, it refers to a state where the soil is "inactive" (refer to Vincent for more details). The trigger for this field being true is all 4 of the generic minerals (calcium, magnesium, sodium, and potassium) being low at the same time.*/
  four_lows: boolean().notNull(),
  /** The unit which this mineral is being measured in. */
  units: varchar({ length: 100 }).notNull(),
});

/** A general tag for solubility. See the mineral table for more context. */
export const solubilityLevel = pgEnum('solubility_level', [
  'Low',
  'Med',
  'High',
]);

/** The solubility metric for an analysis. */
export const solubility = pgTable('solubility', {
  /** Auto increment id -- no specific format for IDs for solubility */
  id: serial().primaryKey().notNull(),
  /** Foreign key relationship back to given analysis */
  analysisId: varchar({ length: 13 })
    .references(() => analysis.id)
    .notNull(),
  /** The real value of the mineral (see the unit field for units) */
  real_value: numeric({ precision: 9, scale: 4 }).notNull(),
  /** The ideal value of the mineral (see the unit field for units) */
  ideal_value: numeric({ precision: 9, scale: 4 }).notNull(),
  /** A general tag (is this value low, high, etc.) */
  tag: solubilityLevel(),
  /** The unit which this mineral is being measured in. */
  units: varchar({ length: 100 }).notNull(),
});

/** A general tag for the oxidation rate of a given analysis. */
export const oxidationRateTag = pgEnum('oxidation_rate_tag', [
  'Slow',
  'Mixed',
  'Ideal',
  'High',
]);

/** The oxidation rate for a given analysis. */
export const oxidationRate = pgTable('oxidation_rate', {
  /** Auto increment id -- no specific format for IDs for oxidation rate */
  id: serial().primaryKey().notNull(),
  /** Foreign key relationship back to given analysis */
  analysisId: varchar({ length: 13 }).references(() => analysis.id),
  /** The measured calcium to potassium ratio (read as Ca/K) */
  real_caK: numeric({ precision: 9, scale: 4 }).notNull(),
  /** The ideal calcium to potassium ratio (read as Ca/K) */
  ideal_caK: numeric({ precision: 9, scale: 4 }).notNull(),
  /** The measured sodium to magnesium ratio (read as Na/Mg)*/
  real_NaMg: numeric({ precision: 9, scale: 4 }).notNull(),
  /** The ideal sodium to magnesium ratio (read as Na/Mg)*/
  ideal_NaMg: numeric({ precision: 9, scale: 4 }).notNull(),
  /** A general tag for the oxidation rate. See the enum for more info. */
  tag: oxidationRateTag(),
  /** The unit which this mineral is being measured in. */
  units: varchar({ length: 100 }).notNull(),
});

/** A general tag for the ph of a given analysis */
export const phTag = pgEnum('ph_tag', ['Low', 'Med', 'High']);

/** The ph data for a given analysis. */
export const ph = pgTable('ph', {
  /** Auto increment id -- no specific format for IDs for oxidation rate */
  id: serial().primaryKey().notNull(),
  /** Foreign key relationship back to given analysis */
  analysisId: varchar({ length: 13 })
    .references(() => analysis.id)
    .notNull(),
  /** The real ph value */
  realValue: numeric({ precision: 9, scale: 4 }).notNull(),
  /** The ideal upper value (ex. the ph value should be between idealValueLower and idealValueUpper) */
  idealValueLower: numeric({ precision: 9, scale: 4 }).notNull(),
  /** The ideal lower value (ex. the ph value should be between idealValueLower and idealValueUpper) */
  idealValueUpper: numeric({ precision: 9, scale: 4 }).notNull(),
  /** The value that, if the real ph value is lower than, warrants a tag of "low" */
  low: numeric({ precision: 9, scale: 4 }).notNull(),
  /** The value that, if the real ph value is greater than, warrants a tag of "high" */
  high: numeric({ precision: 9, scale: 4 }).notNull(),
  /** A general tag for the results of a ph analysis */
  tag: phTag(),
});
