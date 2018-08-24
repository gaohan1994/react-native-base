import { 
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const defaultTheme = {
    defaultBackgroundColor: '#f8f8f8',
    fontColor: '#24292e',
    selectedFontColor: '#717171',
    normalFont: 17,
    smallFont: 12,
    borderColor: '#dddddd',
    themeRed: '#d81e06',
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
    },
    
    dashBtn: {
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
    },

    redBtn: {
        borderTopColor: defaultTheme.themeRed,
        borderRightColor: defaultTheme.themeRed,
        borderBottomColor: defaultTheme.themeRed,
        borderLeftColor: defaultTheme.themeRed,
    }
});

const getImageHeight = (imageUrl: string): number => {

    /**
     * default height
     */
    let imgHeight = 230;

    Image.getSize(
        imageUrl, 
        (width, height) => {
            // console.log('screenWidth: ', screenWidth);
            // console.log('width: ', width);
            // console.log('height: ', height);
            // imgHeight = Math.floor(screenWidth / width * height);
            imgHeight = Math.floor(screenWidth * height / width);
        },
        (error) => {
            console.log('error getimagesize ', error);
        }
    );
    // console.log('imgHeight: ', imgHeight);

    return imgHeight;
};

export {
    common,
    defaultTheme,
    getImageHeight,
};