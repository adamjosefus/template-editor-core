export declare function updateConfig(data: any): ConfigType;
export declare type ConfigType = ConfigType_v1;
interface ConfigType_v1 extends ConfigType_Origin {
    version: '1';
    assets: {
        fonts?: {
            family: string;
            filename: string;
            weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
            italic: boolean;
        }[];
    };
}
interface ConfigType_Origin {
    version: string;
}
export {};
