import { Moment } from 'moment';

export interface IMaintenanceOrder {
  id?: number;
  scheduledDate?: Moment;
  equipmentId?: number;
}

export const defaultValue: Readonly<IMaintenanceOrder> = {};
