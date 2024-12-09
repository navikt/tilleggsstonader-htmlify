import React from 'react';

import { formaterPeriode } from '../../felles/datoFormat';
import { tekstEllerFeil } from '../../felles/tekstutils';
import IkkeOppfylt from '../../ikoner/IkkeOppfylt';
import InfoIkon from '../../ikoner/InfoIkon';
import OppfyltIkon from '../../ikoner/OppfyltIkon';
import SlettetIkon from '../../ikoner/SlettetIkon';
import { Begrunnelse, KommentarSlettet, NonBreakingDiv } from '../felles';
import {
    kildeVilkårperiodeTilTekst,
    ResultatVilkårperiode,
    typeStønadsperiodeTilTekst,
    Vilkårperiode,
} from '../typer/vilkårperiode';

export const VilkårperiodeRad: React.FC<{
    periode: Vilkårperiode;
    faktaOgVurderinger: React.ReactNode;
}> = ({ periode, faktaOgVurderinger }) => {
    return (
        <NonBreakingDiv className={'vilkaarperiode-rad'}>
            <div className={'vilkaarperiode-type'}>
                <strong>{tekstEllerFeil(typeStønadsperiodeTilTekst, periode.type)}</strong>
                <div className={'vilkaarperiode-resultat'}>{resultatIkon(periode.resultat)}</div>
            </div>
            <div>Periode: {formaterPeriode(periode)}</div>
            <div className={'vilkaarperiode-rad-content'}>
                {faktaOgVurderinger}
                <div>Kilde: {tekstEllerFeil(kildeVilkårperiodeTilTekst, periode.kilde)}</div>
                <Begrunnelse begrunnelse={periode.begrunnelse} />
                <KommentarSlettet data={periode} />
            </div>
        </NonBreakingDiv>
    );
};

function resultatIkon(resultat: ResultatVilkårperiode) {
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
}
