import { Color, Fill, IRenderingLayer, IRenderable, RectangleShape } from "@templatone/kreslo";
import { IResizable } from "./IResizable.js";


export class BootingScreen implements IRenderable, IResizable {

    width: number = 0;
    height: number = 0;

    private _bars: IRenderable[] = [];

    constructor(width: number, height: number) {
        this.resize(width, height);
    }


    private _buildBars(): IRenderable[] {
        const w = this.width * 1/7;
        const h = this.height;

        const white = new Fill(Color.fromHex('#f7f7f7'));
        const yellow = new Fill(Color.fromHex('#fce010'));
        const cyan = new Fill(Color.fromHex('#1dc0f2'));
        const green = new Fill(Color.fromHex('#24c926'));
        const magenta = new Fill(Color.fromHex('#ed64bb'));
        const red = new Fill(Color.fromHex('#e02b41'));
        const blue = new Fill(Color.fromHex('#3757e6'));


        const a1 = new RectangleShape(w, h)
        a1.fill = white;
        a1.transform.position.x = w * 0;

        const a2 = new RectangleShape(w, h)
        a2.fill = yellow;
        a2.transform.position.x = w * 1;

        const a3 = new RectangleShape(w, h)
        a3.fill = cyan;
        a3.transform.position.x = w * 2;

        const a4 = new RectangleShape(w, h)
        a4.fill = green;
        a4.transform.position.x = w * 3;

        const a5 = new RectangleShape(w, h)
        a5.fill = magenta;
        a5.transform.position.x = w * 4;

        const a6 = new RectangleShape(w, h)
        a6.fill = red;
        a6.transform.position.x = w * 5;

        const a7 = new RectangleShape(w, h)
        a7.fill = blue;
        a7.transform.position.x = w * 6;

        return [
            a1, a2, a3, a4, a5, a6, a7
        ]
    }


    resize(width: number, height: number) {
        this.width = width;
        this.height = height;
        
        this._bars = this._buildBars();
    }


    render(renderingLayer: IRenderingLayer): void {
        this._bars.forEach(b => b.render(renderingLayer));
    }

}