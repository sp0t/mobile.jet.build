import { getLocal, saveLocal } from './common';

const THEME = 'theme';

export const getTheme = () => getLocal(THEME);

export const saveTheme = (theme: any) => saveLocal(THEME, theme);
