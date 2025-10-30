import React from 'react';

import { NonBreakingDiv } from './felles';
import {
    resultatTilTekst,
    Vilkår,
    VilkårFaktaType,
    Vilkårsresultat,
    Vurdering,
    vilkårtypeTilTekst,
    vilkårFaktaTypeTilTeXt,
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
                    <h2>{tekstEllerFeil(vilkårtypeTilTekst, førsteVilkår.type)}</h2>
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
                            {vilkår.fakta && (
                                <p>Type: {vilkårFaktaTypeTilTeXt[vilkår.fakta?.type]}</p>
                            )}
                            <KommentarSlettet data={vilkår} />
                            <Delvilkår vilkår={vilkår} />
                            {vilkår.fakta && <Fakta fakta={vilkår.fakta} />}
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
                <NonBreakingDiv>
                    <h4 style={{ marginBottom: '0.3em' }}>Fakta offentlig transport</h4>
                    <div className="fakta-vilkår">
                        <p>Reisedager per uke: {fakta.reisedagerPerUke}</p>
                        {fakta.prisEnkelbillett != null && (
                            <p>Pris enkelbillett: {fakta.prisEnkelbillett} kr</p>
                        )}
                        {fakta.prisSyvdagersbillett != null && (
                            <p>Pris 7-dagersbillett: {fakta.prisSyvdagersbillett} kr</p>
                        )}
                        {fakta.prisTrettidagersbillett != null && (
                            <p>Pris 30-dagersbillett: {fakta.prisTrettidagersbillett} kr</p>
                        )}
                    </div>
                </NonBreakingDiv>
            );

        case VilkårFaktaType.DAGLIG_REISE_PRIVAT_BIL:
            return (
                <NonBreakingDiv>
                    <h4 style={{ marginBottom: '0.3em' }}>Fakta privat bil</h4>
                    <p>Reisedager per uke: {fakta.reisedagerPerUke}</p>
                    <p>Reiseavstand én vei: {fakta.reiseavstandEnVei} km</p>
                    {fakta.prisBompengerPerDag != null && (
                        <p>Bompenger per dag: {fakta.prisBompengerPerDag} kr</p>
                    )}
                    {fakta.prisFergekostandPerDag != null && (
                        <p>Fergekostnad per dag: {fakta.prisFergekostandPerDag} kr</p>
                    )}
                </NonBreakingDiv>
            );

        default:
            return null;
    }
};
