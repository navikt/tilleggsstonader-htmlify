export interface FritekstbrevMedSignatur {
    brevFraSaksbehandler: Fritekstbrev;
    besluttersignatur?: string;
    saksbehandlersignatur: string;
    enhet?: string;
    datoPlaceholder?: string;
}

export interface Fritekstbrev {
    overskrift: string;
    avsnitt?: Avsnitt[];
    personIdent: string;
    navn: string;
}

export interface Avsnitt {
    deloverskrift?: string;
    innhold?: string;
}
