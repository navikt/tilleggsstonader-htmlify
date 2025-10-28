import React from 'react';

import { NonBreakingDiv } from './felles';
import {
    vilkårTitle,
    resultatTilTekst,
    Vilkår,
    VilkårFaktaType,
    Vilkårsresultat,
    Vurdering,
} from './typer/vilkår';
import { formaterNorskDato } from '../felles/datoFormat';
import { tekstEllerFeil } from '../felles/tekstutils';
import IkkeOppfylt from '../ikoner/IkkeOppfylt';
import { IkkeVurdert } from '../ikoner/IkkeVurdert';
import InfoIkon from '../ikoner/InfoIkon';
import OppfyltIkon from '../ikoner/OppfyltIkon';
import SlettetIkon from '../ikoner/SlettetIkon';
import { KommentarSlettet } from './felles/KommentarSlettet';

const resultatIkon = (resultat: Vilkårsresultat) => {
    switch (resultat) {
        case Vilkårsresultat.OPPFYLT:
            return <OppfyltIkon heigth={24} width={24} />;
        case Vilkårsresultat.IKKE_OPPFYLT:
            return <IkkeOppfylt heigth={24} width={24} />;
        case Vilkårsresultat.SKAL_IKKE_VURDERES:
            return <InfoIkon heigth={24} width={24} />;
        case Vilkårsresultat.SLETTET:
            return <SlettetIkon heigth={24} width={24} />;
        default:
            return <IkkeVurdert heigth={24} width={24} />;
    }
};

const formaterDatoMedUtgift = (vilkår: Vilkår): string => {
    let str = '';
    if (vilkår.fom && vilkår.tom) {
        str = `${formaterNorskDato(vilkår.fom)} til ${formaterNorskDato(vilkår.tom)}`;
        if (Number.isInteger(vilkår.utgift)) {
            str = ` - ${str} ${vilkår.utgift}kr`;
        }
    }
    return str;
};

const grupperPerTypeOgBarn = (vilkårsett: Vilkår[]): Record<string, Vilkår[]> => {
    return vilkårsett.reduce(
        (acc, vilkår) => {
            const key = `${vilkår.type}-${vilkår.fødselsdatoBarn}`;
            acc[key] = [...(acc[key] || []), vilkår];
            return acc;
        },
        {} as Record<string, Vilkår[]>
    );
};

export const VilkårContent: React.FC<{
    vilkårsett: Vilkår[];
}> = ({ vilkårsett }) => (
    <NonBreakingDiv>
        {Object.values(grupperPerTypeOgBarn(vilkårsett)).map((liste, indexVilkår) => {
            const førsteVilkår = liste[0];
            return (
                <NonBreakingDiv key={indexVilkår}>
                    <h2>{vilkårTitle(førsteVilkår)}</h2>
                    {førsteVilkår.fødselsdatoBarn && (
                        <div>
                            Barn med fødselsdato: {formaterNorskDato(førsteVilkår.fødselsdatoBarn)}
                        </div>
                    )}
                    {liste.map((vilkår, index) => (
                        <NonBreakingDiv key={index} className={'vilkar-rad-content'}>
                            <h4>
                                Vilkårsvurdering:{' '}
                                {tekstEllerFeil(resultatTilTekst, vilkår.resultat)}
                            </h4>
                            <div>Periode: {formaterDatoMedUtgift(vilkår)}</div>
                            <KommentarSlettet data={vilkår} />
                            <Delvilkår vilkår={vilkår} />
                        </NonBreakingDiv>
                    ))}
                </NonBreakingDiv>
            );
        })}
    </NonBreakingDiv>
);

const Delvilkår: React.FC<{ vilkår: Vilkår }> = ({ vilkår }) => (
    <>
        {vilkår.delvilkår.map((delvilkår, indexDelvilkår) => (
            <React.Fragment key={indexDelvilkår}>
                <NonBreakingDiv>
                    <strong>Delvilkår</strong>:{' '}
                    {tekstEllerFeil(resultatTilTekst, delvilkår.resultat)}{' '}
                    <div className={'vilkårsresultat-ikon'}>
                        <span style={{ paddingBottom: '20%' }}>
                            {resultatIkon(delvilkår.resultat)}
                        </span>
                    </div>
                </NonBreakingDiv>
                <Vurderinger vurderinger={delvilkår.vurderinger} />
            </React.Fragment>
        ))}

        {vilkår.fakta && <Fakta fakta={vilkår.fakta} />}
    </>
);

const Vurderinger: React.FC<{ vurderinger: Vurdering[] }> = ({ vurderinger }) =>
    vurderinger.map((vurdering, indexVurdering) => {
        return (
            <NonBreakingDiv key={indexVurdering}>
                <div>
                    {vurdering.regel} {vurdering.svar ?? 'Ikke besvart'}
                </div>
                {vurdering.begrunnelse && (
                    <div>
                        Begrunnelse:{' '}
                        <p style={{ whiteSpace: 'pre-wrap' }}>{vurdering.begrunnelse}</p>
                    </div>
                )}
            </NonBreakingDiv>
        );
    });

const Fakta: React.FC<{ fakta: Vilkår['fakta'] }> = ({ fakta }) => {
    if (!fakta) return null;

    switch (fakta.type) {
        case VilkårFaktaType.DAGLIG_REISE_OFFENTLIG_TRANSPORT:
            return (
                <NonBreakingDiv className="fakta-section">
                    <h4>Fakta Offentlig transport</h4>
                    <div>Reisedager per uke: {fakta.reisedagerPerUke}</div>
                    {fakta.prisEnkelbillett != null && (
                        <div>Pris enkelbillett: {fakta.prisEnkelbillett} kr</div>
                    )}
                    {fakta.prisSyvdagersbillett != null && (
                        <div>Pris 7-dagersbillett: {fakta.prisSyvdagersbillett} kr</div>
                    )}
                    {fakta.prisTrettidagersbillett != null && (
                        <div>Pris 30-dagersbillett: {fakta.prisTrettidagersbillett} kr</div>
                    )}
                </NonBreakingDiv>
            );

        case VilkårFaktaType.DAGLIG_REISE_PRIVAT_BIL:
            return (
                <NonBreakingDiv className="fakta-section">
                    <h4>Fakta – Privat bil</h4>
                    <div>Reisedager per uke: {fakta.reisedagerPerUke}</div>
                    <div>Reiseavstand én vei: {fakta.reiseavstandEnVei} km</div>
                    {fakta.prisBompengerPerDag != null && (
                        <div>Bompenger per dag: {fakta.prisBompengerPerDag} kr</div>
                    )}
                    {fakta.prisFergekostandPerDag != null && (
                        <div>Fergekostnad per dag: {fakta.prisFergekostandPerDag} kr</div>
                    )}
                </NonBreakingDiv>
            );

        default:
            return null;
    }
};
