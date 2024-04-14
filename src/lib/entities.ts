export type DataPoint = string | number | boolean | null;

export interface XDataPoint { x: DataPoint };
export interface XYDataPoint { x: DataPoint, y: DataPoint };
export interface XYZDataPoint { x: DataPoint, y: DataPoint, z: DataPoint };

export type DataKey = string;

export interface XSeries {
    x: DataKey;
}
export interface XYSeries {
    x: DataKey;
    y: DataKey;
}
export interface XYZSeries {
    x: DataKey;
    y: DataKey;
    z: DataKey;
}

export type Series = XSeries | XYSeries | XYZSeries;

export type XData = XDataPoint[];
export type XYData = XYDataPoint[];
export type XYZData = XYZDataPoint[];
export type Data = XData | XYData | XYZData;

export type Scale = 'linear' | 'logarithmic' | 'datetime' | 'category';
export type Stroke = 'solid' | 'dashed' | 'dotted' | 'none';
export interface Label {
    enabled?: boolean;
    rotation?: number; // Degrees to rotate labels
    format?: string;
    fontSize?: string;
    fontFamily?: string;
    color?: string;
}

export interface Axis {
    title?: string;
    labels?: Label;
    scaleType?: Scale;
    gridLines?: {
        enabled?: boolean;
        style?: 'solid' | 'dotted' | 'dashed';
        color?: string;
    };
}

export interface XAxis {
    x: Axis;
}

export interface XYAxis {
    x: Axis;
    y: Axis;
}

export interface XYZAxis {
    x: Axis;
    y: Axis;
    z: Axis;
}

export interface ChartConfig {
    title?: string;
    legend?: {
        enabled?: boolean;
        position?: 'top' | 'bottom' | 'left' | 'right';
    };
    axis?: XAxis | XYAxis | XYZAxis;
    series: Series;
    data: Data;
}
