import React from 'react';

import { NonBreakingDiv } from '../felles';
import { VilkårperiodeRad } from './VilkårperiodeRad';
import { Vurdering } from './Vurdering';
import { notNullOrUndefined } from '../../felles/nullOrUndefined';
import { Stønadstype } from '../../felles/stønadstype';
import {
    AktivitetBarnetilsynFaktaOgVurderingerDto,
    AktivitetLæremidlerFaktaOgVurderingerDto,
    Vilkårperiode,
} from '../typer/vilkårperiode';

export const Aktiviteter: React.FC<{
    aktiviteter: Vilkårperiode[];
    stønadstype: Stønadstype;
}> = ({ aktiviteter, stønadstype }) => {
    return (
        <NonBreakingDiv className={'vilkaarperiode'}>
            <h2>Aktiviteter</h2>
            {aktiviteter.map((periode, index) => (
                <VilkårperiodeRad
                    key={index}
                    periode={periode}
                    faktaOgVurderinger={
                        <FaktaOgVurderingerAktivitet
                            aktivitet={periode}
                            stønadstype={stønadstype}
                        />
                    }
                />
            ))}
        </NonBreakingDiv>
    );
};

const FaktaOgVurderingerAktivitet: React.FC<{
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
