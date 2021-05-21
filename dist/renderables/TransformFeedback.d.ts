import { IRenderingLayer, IRenderable, Vector, Angle } from "@templatone/kreslo";
import { IResizable } from "./IResizable.js";
export declare class TransformFeedback implements IRenderable, IResizable {
    private _width;
    private _height;
    private _distance;
    private _margin;
    private _pivot;
    get position(): Vector;
    set position(v: Vector);
    get scale(): Vector;
    set scale(v: Vector);
    get rotation(): Angle;
    set rotation(v: Angle);
    private _grid;
    private _clipArea;
    private _gridItems;
    constructor(width: number, height: number);
    private static _createGridItems;
    private _clearStyles;
    private _computeCenterOfGrid;
    private _renderDot;
    private _renderPivot;
    private _renderDotGrid;
    resize(width: number, height: number): void;
    render(renderingLayer: IRenderingLayer): void;
}
