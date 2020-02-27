import { SeriesI } from '../models/series';

export interface ChartI {
    name: string;
    id: number;
    typeData?: string;
    unitsFormat?: string;
    getFromField?: string;
    comparing?: boolean;
    settings?: {
        typeChart?: string;
        color?: string;
        data?: null | number[];
        time: null | string[];
        dataSeries?: SeriesI[];
    }
}
