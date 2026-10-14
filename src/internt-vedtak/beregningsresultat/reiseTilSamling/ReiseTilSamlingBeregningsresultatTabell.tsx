import { OffentligTransportSamlingTabell } from './OffentligTransportSamlingTabell';
import { PrivatBilSamlingTabell } from './PrivatBilSamlingTabell';
import { BeregningsresultatReiseTilSamling } from '../../typer/beregningsresultat';

export const ReiseTilSamlingBeregningsresultatTabell: React.FC<{
    beregningsresultat: BeregningsresultatReiseTilSamling;
}> = ({ beregningsresultat }) => {
    const offentligTransport = (beregningsresultat.offentligTransport ?? []).filter(
        (samling) => !samling.fraTidligereVedtak
    );
    const privatBil = (beregningsresultat.privatBil ?? []).filter(
        (samling) => !samling.fraTidligereVedtak
    );

    return (
        <>
            <OffentligTransportSamlingTabell samlinger={offentligTransport} />
            <PrivatBilSamlingTabell samlinger={privatBil} />
        </>
    );
};
