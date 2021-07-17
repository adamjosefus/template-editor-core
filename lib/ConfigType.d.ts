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
export declare type ConfigScemaType = ConfigSchema_v2 | ConfigSchema_v1;
interface ConfigSchema_v2 extends ConfigOriginType {
    configType: 2;
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
interface ConfigSchema_v1 extends ConfigOriginType {
    configType: 1;
    main: string;
    preview?: string;
    assets: {
        fonts?: {
            family: string;
            filename: string;
            weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
            italic: boolean;
        }[];
    };
}
interface ConfigOriginType {
    configType: number;
}
export {};
