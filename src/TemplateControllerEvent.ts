import { ITemplateData } from "./ITemplateData.js";


const enum EVENT_TYPE {
    READY = 'templateEditor-controller-ready',
    DATA_UPDATE = 'templateEditor-controller-dataUpdate',
}


export class TemplateControllerEvent<CONTROLLER_DATA extends ITemplateData> extends CustomEvent<{
    data: CONTROLLER_DATA,
    valid: boolean,
}> {

    static READY = EVENT_TYPE.READY;
    static DATA_UPDATE = EVENT_TYPE.DATA_UPDATE;

    constructor(typeArg: EVENT_TYPE, data: CONTROLLER_DATA, valid: boolean ) {
        super(typeArg, {
            detail: {
                data,
                valid,
            }
        })
    }
}