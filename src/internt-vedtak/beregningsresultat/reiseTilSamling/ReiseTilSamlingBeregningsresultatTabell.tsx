import { OffentligTransportSamlingTabell } from './OffentligTransportSamlingTabell';
import { PrivatBilSamlingTabell } from './PrivatBilSamlingTabell';
import { BeregningsresultatReiseTilSamling } from '../../typer/beregningsresultat';

export const ReiseTilSamlingBeregningsresultatTabell: React.FC<{
    beregningsresultat: BeregningsresultatReiseTilSamling;
}> = ({ beregningsresultat }) => {
    return (
        <>
            <OffentligTransportSamlingTabell
                samlinger={beregningsresultat.offentligTransport ?? []}
            />
            <PrivatBilSamlingTabell samlinger={beregningsresultat.privatBil ?? []} />
        </>
    );
};
