import { Colors } from './types'

export const baseColors = {
  failure: '#ED4B9E',
  //primary: '#c20619',
  primary: '#c2374f',
  primaryBright: '#53DEE9',
  primaryDark: '#0098A1',
  secondary: '#7645D9',
  success: '#31D0AA',
  warning: '#FFB237',
}

export const additionalColors = {
  binance: '#F0B90B',
  overlay: '#452a7a4d',
  gold: '#FFC700',
  silver: '#B2B2B2',
  bronze: '#E7974D',
}

export const lightColors: Colors = {
  ...baseColors,
  ...additionalColors,
  background: '#FAF9FA',
  backgroundDisabled: '#E9EAEB',
  backgroundAlt: '#FFFFFF',
  cardBorder: '#E7E3EB',
  contrast: '#191326',
  dropdown: '#F6F6F6',
  dropdownDeep: '#EEEEEE',
  invertedContrast: '#FFFFFF',
  input: '#FAF1EA',
  inputSecondary: '#d7caec',
  tertiary: '#EFF4F5',
  text: '#432645',
  textDisabled: '#BDC2C4',
  textSubtle: '#432645',
  disabled: '#E9EAEB',
  gradients: {
    cardHeader: 'linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)',
    blue: 'linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)',
    violet: 'linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)',
    violetAlt: 'linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)',
    gold: 'linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)',
  },
  toggle: '#756072',
}

export const darkColors: Colors = {
  ...baseColors,
  ...additionalColors,
  secondary: '#9A6AFF',
  background: '#212529',
  backgroundDisabled: '#33393e',
  backgroundAlt: '#212529',
  cardBorder: '#432975',
  contrast: '#FFFFFF',
  dropdown: '#1E1D20',
  dropdownDeep: '#100C18',
  invertedContrast: '#191326',
  input: '#33393e',
  inputSecondary: '#262130',
  primaryDark: '#0098A1',
  tertiary: '#3f4347',
  //text: '#432645',
  text: '#fff',
  textDisabled: '#4d5864',
  textSubtle: '#fff',
  disabled: '#524B63',
  gradients: {    
    cardHeader: 'linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)',
    blue: 'linear-gradient(180deg, #00707F 0%, #19778C 100%)',
    violet: 'linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)',
    violetAlt: 'linear-gradient(180deg, #434575 0%, #66578D 100%)',
    gold: 'linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)',
  },
  toggle: '#756072',
}
