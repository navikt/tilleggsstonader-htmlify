import React from 'react';

import { tekstEllerFeil } from '../../felles/tekstutils';
import IkkeOppfylt from '../../ikoner/IkkeOppfylt';
import InfoIkon from '../../ikoner/InfoIkon';
import OppfyltIkon from '../../ikoner/OppfyltIkon';
import SlettetIkon from '../../ikoner/SlettetIkon';
import {
    ResultatVilkårperiode,
    Vilkårperiode,
    vilkårperiodeTypeTilTekst,
} from '../typer/vilkårperiode';

export const TypeOgResultat = (props: { periode: Vilkårperiode }) => (
    <div className={'vilkaarperiode-type'}>
        <strong>{tekstEllerFeil(vilkårperiodeTypeTilTekst, props.periode.type)}</strong>
        <div className={'vilkaarperiode-resultat'}>{resultatIkon(props.periode.resultat)}</div>
    </div>
);

const resultatIkon = (resultat: ResultatVilkårperiode) => {
    switch (resultat) {
        case ResultatVilkårperiode.OPPFYLT:
            return <OppfyltIkon heigth={24} width={24} />;
        case ResultatVilkårperiode.IKKE_OPPFYLT:
            return <IkkeOppfylt heigth={24} width={24} />;
        case ResultatVilkårperiode.IKKE_VURDERT:
            return <InfoIkon heigth={24} width={24} />;
        case ResultatVilkårperiode.SLETTET:
            return <SlettetIkon heigth={24} width={24} />;
        default:
            throw Error(`Har ikke mappet ${resultat}`);
    }
};
