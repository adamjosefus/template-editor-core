import { weight } from "../utils/WebFontLoader.js";


export interface ITemplateConfig extends IConfig__v1_0_0 { };


interface IConfig__v1_0_0 {
    version: '1.0.0',
    assets: {
        fonts?: {
            family: string,
            filename: string,
            weight: weight,
            italic: boolean
        }[]
    }
}