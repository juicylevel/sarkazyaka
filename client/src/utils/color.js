/**
 * Перевод hex-строки вида #FF0000 в rgb.
 *
 * @param hex hex-строка.
 * @param alpha alpha Значение прозрачности (от 0.0 до 1.0).
 * @param style Флаг преобразование результата в строку значения css-стиля.
 * @return Array|String
 */
export const hexToRGB = (hex, alpha, style) => {
    hex = hex.toUpperCase();
    const h = '0123456789ABCDEF';
    let rgb = [
        h.indexOf(hex[1]) * 16 + h.indexOf(hex[2]),
        h.indexOf(hex[3]) * 16 + h.indexOf(hex[4]),
        h.indexOf(hex[5]) * 16 + h.indexOf(hex[6])
    ];
    alpha && rgb.push(alpha);

    let result = rgb;

    if (style) {
        result = 'rgb' + (alpha ? 'a' : '') + '(' + rgb.join(',') + ')';
    }
    
    return result;
};