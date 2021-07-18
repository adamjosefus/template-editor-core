export declare function processConfig(schema: ConfigScemaType, templateRootUrl: string): ConfigType;
export declare type ConfigType = {
    main: string;
    preview: string | null;
    fonts?: {
        id: string | null;
        family: string;
        file: string;
        url: string;
        weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
        italic: boolean;
    }[];
    assets?: {
        id: string | null;
        file: string;
        url: string;
    }[];
};
interface ConfigScemaType {
    doctype: number;
    main: string;
    preview?: string | null;
    fonts?: {
        id?: string | null;
        family: string;
        file: string;
        weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
        italic?: boolean;
    }[];
    assets?: {
        id?: string | null;
        file: string;
    }[];
}
export {};
