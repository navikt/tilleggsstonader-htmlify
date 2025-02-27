import DateTimeFormatOptions = Intl.DateTimeFormatOptions;

export const datoFormat: DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
};
/**
 * TODO denne burde bli erstattet med at man sender tidspunkt i requesten
 */
export const dagensDatoFormatert = (): string => new Date().toLocaleDateString('no-NO', datoFormat);
