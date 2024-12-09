import React from 'react';

import {
    AktivitetBarnetilsynFaktaOgVurderingerDto,
    AktivitetLæremidlerFaktaOgVurderingerDto,
    Vilkårperiode,
} from './typer/vilkårperiode';
import { Vurdering } from './Vurdering';
import { notNullOrUndefined } from '../felles/nullOrUndefined';
import { Stønadstype } from '../felles/stønadstype';

export const FaktaOgVurderingerAktivitet: React.FC<{
    aktivitet: Vilkårperiode;
    stønadstype: Stønadstype;
}> = ({ aktivitet, stønadstype }) => {
    switch (stønadstype) {
        case Stønadstype.BARNETILSYN: {
            const { aktivitetsdager, lønnet } =
                aktivitet.faktaOgVurderinger as AktivitetBarnetilsynFaktaOgVurderingerDto;
            return (
                <>
                    {notNullOrUndefined(aktivitetsdager) && (
                        <div>Aktivitetsdager: {aktivitetsdager}</div>
                    )}
                    <Vurdering navn={'Mottar bruker ordinær lønn i tiltaket?'} vurdering={lønnet} />
                </>
            );
        }
        case Stønadstype.LÆREMIDLER: {
            const { prosent, studienivå, harUtgifter, harRettTilUtstyrsstipend } =
                aktivitet.faktaOgVurderinger as AktivitetLæremidlerFaktaOgVurderingerDto;
            return (
                <>
                    {notNullOrUndefined(prosent) && <div>Prosent: {prosent}</div>}
                    {notNullOrUndefined(studienivå) && <div>Studienivå: {studienivå}</div>}
                    <Vurdering navn={'Har utgifter'} vurdering={harUtgifter} />
                    <Vurdering
                        navn={'Har rett til utstyrsstipend'}
                        vurdering={harRettTilUtstyrsstipend}
                    />
                </>
            );
        }
    }
};
