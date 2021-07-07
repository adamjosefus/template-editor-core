export type ExportDataType = {
    items: Array<{
        /**
         * @deprecated Use 'name' porperty
         */
        filename: string,
        /**
         * @deprecated Use 'file' porperty
         */
        dataURL: string,
        string: string,
        file: File,
    }>
}