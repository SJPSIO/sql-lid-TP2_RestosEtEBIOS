import { ebios } from "./ebios";
import { restos } from "./restos";

export type DbColumnAttributeType = "PK" | "FK";

export interface DbColumnAttributeRef {
  table: DbTable["name"];
  column: DbColumn["name"];
}

export interface DbColumnAttribute {
  type: DbColumnAttributeType;
  reference?: DbColumnAttributeRef;
}

export interface DbColumn {
  name: string;
  attributes: DbColumnAttribute[];
}

export interface DbTable {
  name: string;
  columns: DbColumn[];
}

export interface Database {
  name: string;
  initSql?: string;
}

export type DatabaseId = "ebios"|"restos";
export const databases: { [_ in DatabaseId]: Database } = { ebios,restos };
