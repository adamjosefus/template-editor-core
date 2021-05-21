import { IRenderingLayer, IRenderable } from "@templatone/kreslo";
import { IResizable } from "./IResizable.js";
export declare class BootingScreen implements IRenderable, IResizable {
    width: number;
    height: number;
    private _bars;
    constructor(width: number, height: number);
    private _buildBars;
    resize(width: number, height: number): void;
    render(renderingLayer: IRenderingLayer): void;
}
