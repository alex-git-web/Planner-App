import {LocaleConfig} from 'react-native-calendars';

export const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September',  'October', 'November', 'December']
export const yearNames = ['2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030',  '2031', '2032', '2033']

LocaleConfig.locales['en'] = {
    formatAccessibilityLabel: "dddd d 'of' MMMM 'of' yyyy",
    monthNames: monthNames,
    monthNamesShort: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
    dayNames: dayNames,
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
// numbers: ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] // number localization example
};
LocaleConfig.defaultLocale = 'en';