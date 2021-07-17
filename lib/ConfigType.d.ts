export declare function processConfig(schema: ConfigScemaType, templateRootUrl: string): ConfigType;
export declare type ConfigType = {
    main: string;
    preview: string | null;
    assets: {
        fonts: {
            family: string;
            file: string;
            url: string;
            weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
            italic: boolean;
        }[];
    };
};
interface ConfigScemaType {
    main: string;
    preview?: string | null;
    assets?: {
        fonts?: {
            family: string;
            file: string;
            weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
            italic?: boolean;
        }[];
    };
}
export {};
