import { 
    StyleSheet,
} from 'react-native';

const defaultTheme = {
    defaultBackgroundColor: '#f8f8f8',
    fontColor: '#24292e',
    selectedFontColor: '#717171',
    normalFont: 17,
    smallFont: 12,
    borderColor: '#dddddd',
};

const common = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defaultTheme.defaultBackgroundColor,
    },
    
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    border: {
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderTopColor: defaultTheme.selectedFontColor,
        borderRightColor: defaultTheme.selectedFontColor,
        borderBottomColor: defaultTheme.selectedFontColor,
        borderLeftColor: defaultTheme.selectedFontColor,
    }
});

export {
    common,
    defaultTheme,
};