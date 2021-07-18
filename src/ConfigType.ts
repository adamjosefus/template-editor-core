export function processConfig(schema: ConfigScemaType, templateRootUrl: string): ConfigType {
    function clearPath(path: string): string {
        if (path.startsWith('https:')) path.replace('https:', '');
        if (path.startsWith('http:')) path.replace('http:', '');
        if (path.startsWith('//')) path.replace('//', '');
        if (path.startsWith('..')) path.replace('..', '');
        if (path.startsWith('.')) path.replace('.', '');
        if (path.startsWith('/')) path.replace('/', '');

        return path;
    }


    return {
        main: schema.main,
        preview: schema.preview ?? null,
        fonts: ((arr) => arr.map(font => {
            const file = clearPath(font.file);

            return {
                id: font.id ?? null,
                family: font.family,
                file: file,
                url: `${templateRootUrl}/${file}`,
                weight: font.weight ?? 400,
                italic: font.italic ?? false,
            }
        }))(schema.fonts ?? []),
        assets: ((arr) => arr.map(font => {
            const file = clearPath(font.file);

            return {
                id: font.id ?? null,
                file: file,
                url: `${templateRootUrl}/${file}`,
            }
        }))(schema.assets ?? []),
    };
}


export type ConfigType = {
    main: string,
    preview: string | null,
    fonts?: {
        id: string | null,
        family: string,
        file: string,
        url: string,
        weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
        italic: boolean
    }[],
    assets?: {
        id: string | null,
        file: string,
        url: string,
    }[],
};


interface ConfigScemaType {
    doctype: number,
    main: string,
    preview?: string | null,
    fonts?: {
        id?: string | null,
        family: string,
        file: string,
        weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
        italic?: boolean
    }[]
    assets?: {
        id?: string | null,
        file: string,
    }[]
}