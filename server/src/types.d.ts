import { ColumnMetaData } from "tedious";

export interface ColumnValue<ValueType> {
  metadata: ColumnMetaData;
  value: ValueType;
}
