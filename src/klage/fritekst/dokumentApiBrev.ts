export interface IFritekstbrevMedSignatur {
    brevFraSaksbehandler: IFritekstbrev;
    besluttersignatur?: string;
    saksbehandlersignatur: string;
    enhet?: string;
    datoPlaceholder?: string;
}

export interface IFritekstbrev {
    overskrift: string;
    avsnitt?: IAvsnitt[];
    personIdent: string;
    navn: string;
}

export interface IAvsnitt {
    deloverskrift?: string;
    innhold?: string;
}
