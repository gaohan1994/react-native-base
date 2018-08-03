import { 
    StyleSheet,
} from 'react-native';

const defaultTheme = {
    defaultBackgroundColor: '#f8f8f8',
    fontColor: '#24292e',
    selectedFontColor: '#717171',
    normalFont: 17,
    smallFont: 12,
};

const common = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export {
    common,
    defaultTheme,
};