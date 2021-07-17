export function processConfig(schema: ConfigScemaType, templateRootUrl: string): ConfigType {
    function clearPath(path: string): string {
        if (path.startsWith('https:')) path.replace('https:', '');
        if (path.startsWith('http:')) path.replace('http:', '');
        if (path.startsWith('//')) path.replace('//', '');
        if (path.startsWith('..')) path.replace('..', '');
        if (path.startsWith('.')) path.replace('.', '');
        if (path.startsWith('/')) path.replace('/', '');

        return path
    }


    function upgrade1to2(schema: ConfigSchema_v1): ConfigSchema_v2 {
        return {
            configType: 2,
            main: schema.main,
            preview: schema.preview ?? null,
            assets: {
                fonts: (schema.assets.fonts ?? []).map(f => {
                    return {
                        family: f.family,
                        file: f.filename,
                        weight: f.weight,
                        italic: f.italic
                    }
                })
            }
        }
    }


    if (schema.configType === 1) {
        schema = upgrade1to2(schema);
    }


    return {
        main: schema.main,
        preview: schema.preview ?? null,
        assets: {
            fonts: ((arr) => arr.map(font => {
                const file = clearPath(font.file);

                return {
                    family: font.family,
                    file: file,
                    url: `${templateRootUrl}/${file}`,
                    weight: font.weight ?? 400,
                    italic: font.italic ?? false,
                }
            }))(schema.assets?.fonts ?? []),
        }
    };
}


export type ConfigType = {
    main: string,
    preview: string | null,
    assets: {
        fonts: {
            family: string,
            file: string,
            url: string,
            weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
            italic: boolean
        }[]
    }
};



export type ConfigScemaType = ConfigSchema_v2 | ConfigSchema_v1;


interface ConfigSchema_v2 extends ConfigOriginType {
    configType: 2,
    main: string,
    preview?: string | null,
    assets?: {
        fonts?: {
            family: string,
            file: string,
            weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
            italic?: boolean
        }[]
    }
}


interface ConfigSchema_v1 extends ConfigOriginType {
    configType: 1,
    main: string,
    preview?: string,
    assets: {
        fonts?: {
            family: string,
            filename: string,
            weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
            italic: boolean
        }[]
    }
}


interface ConfigOriginType {
    configType: number,
}