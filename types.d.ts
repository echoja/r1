import { ColumnMetaData } from 'tedious';
import type {enumSearchGroup} from '@const';

export interface TestInterface {
  test: string;
}

// export interface ColumnValue<ValueType> {
//   metadata: ColumnMetaData;
//   value: ValueType;
// }

export type searchGroupKey = typeof enumSearchGroup[number];
