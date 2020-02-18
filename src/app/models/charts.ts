import { SeriesI } from '../models/series';

export interface ChartI {
    id: number;
    typeChart?: string;
    chartName: string;
    typeData?: string;
    unitsFormat?: string;
    color?: string;
    getFromField?: string;
    data?: null | number[];
    time: null | string[];
    dataSeries?: SeriesI[];
}
