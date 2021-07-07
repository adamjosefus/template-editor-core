export declare class Files {
    static readAsDataURL(file: File): Promise<string>;
    static readAsArrayBuffer(file: File): Promise<ArrayBuffer>;
    static readAsText(file: File, encoding?: string): Promise<string>;
    static readAsBinaryString(file: File): Promise<string>;
}
