export const tekstEllerFeil = <T extends string>(
    mapping: Record<T, string>,
    kode?: T
): string | undefined => {
    if (kode) {
        const tekst = mapping[kode];
        if (!tekst) {
            throw Error(`Finner ikke mapping av ${kode}`);
        }
        return tekst;
    }
    return undefined;
};

const harTallverdi = (verdi: number | undefined | null | string): verdi is number =>
    verdi !== undefined && verdi !== null;

const tallMedTusenSkille = (verdi?: number): string | undefined =>
    harTallverdi(verdi) ? Number(verdi).toLocaleString('no-NO', { currency: 'NOK' }) : undefined;

export const kronerMedTusenSkilleEllerStrek = (tall: number | undefined): string =>
    tallMedTusenSkille(tall) ? `${tallMedTusenSkille(tall)} kr` : '-';

export const formaterTall = (verdi: number) => Number(verdi).toLocaleString('no-NO');
