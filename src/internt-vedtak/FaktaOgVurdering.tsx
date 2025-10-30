import React from 'react';

import { FaktaOgVurderinger, studienivåTilTekst } from './typer/vilkårperiode';
import { Vurdering } from './vilkårperioder/Vurdering';
import { notNullOrUndefined } from '../felles/nullOrUndefined';
import { Stønadstype } from '../felles/stønadstype';

export const FaktaOgVurdering: React.FC<{
    faktaOgVurderinger: FaktaOgVurderinger;
    stønadstype: Stønadstype;
}> = ({
    faktaOgVurderinger: {
        aktivitetsdager,
        prosent,
        studienivå,
        harUtgifter,
        harRettTilUtstyrsstipend,
        utgifterDekketAvAnnetRegelverk,
        medlemskap,
        lønnet,
        aldersvilkår,
    },
    stønadstype,
}) => {
    return (
        <>
            {notNullOrUndefined(aktivitetsdager) && <div>Aktivitetsdager: {aktivitetsdager}</div>}
            {notNullOrUndefined(prosent) && <div>Prosent: {prosent}</div>}
            {notNullOrUndefined(studienivå) && (
                <div>Studienivå: {studienivåTilTekst[studienivå]}</div>
            )}
            <Vurdering tittel={'Mottar bruker ordinær lønn i tiltaket?'} vurdering={lønnet} />
            <Vurdering
                tittel={mapStønadstypeTilHarUtgifterTekst(stønadstype)}
                vurdering={harUtgifter}
            />
            <Vurdering
                tittel={'Har bruker rett til utsstyrsstipend?'}
                vurdering={harRettTilUtstyrsstipend}
            />
            <Vurdering tittel={'Medlemskap i folketrygden?'} vurdering={medlemskap} />
            <Vurdering
                tittel={'Dekkes utgiftene av annet regelverk?'}
                vurdering={utgifterDekketAvAnnetRegelverk}
            />
            <Vurdering tittel={'Aldersvilkår'} vurdering={aldersvilkår} />
        </>
    );
};

function mapStønadstypeTilHarUtgifterTekst(stønadstype: Stønadstype) {
    switch (stønadstype) {
        case Stønadstype.LÆREMIDLER:
            return 'Har bruker utgifter til læremidler?';
        case Stønadstype.DAGLIG_REISE_TSO:
            return 'Har bruker nødvendige utgifter til daglig reise?';
        default:
            return `FEIL: Skal ikke være harUtgifter-vurdering for ${stønadstype}`;
    }
}
