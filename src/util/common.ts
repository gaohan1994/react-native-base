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
    inputHeight: 34,
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
    },

    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },

    input: {
        height: 33,
        borderRadius: 17,
        backgroundColor: defaultTheme.defaultBackgroundColor,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 10,
        textAlignVertical: 'center',
    }
});

/**
 * @todo 传入颜色 返回 border 颜色
 * @param color string
 */
const getBorderColor = (color: string): object => {
    return {
        borderTopColor: color,
        borderRightColor: color,
        borderBottomColor: color,
        borderLeftColor: color,
    };
}

/**
 * 传入 image url 返回正确的高度 目前失败
 * 
 * @param imageUrl 
 */
const getImageHeight = (imageUrl: string): number => {

    /**
     * default height
     */
    let imgHeight: number = 230;

    Image.getSize(
        imageUrl, 
        (width, height) => {
            // console.log('screenWidth: ', screenWidth);
            // console.log('width: ', width);
            // console.log('height: ', height);
            // imgHeight = Math.floor(screenWidth / width * height);
            imgHeight = Math.floor(screenWidth * height / width);
            console.log('getsize imgHeight : ', imgHeight);
        },
        (error) => {
            console.log('error getimagesize ', error);
        }
    );
    // console.log('imgHeight: ', imgHeight);

    return imgHeight;
};

const trimNewLines = (text: string): string => {
    if (!text) {
        return '';
    } else {
        return text.replace(/(\r\n|\n|\r)/gm, '');
    }
}

export {
    common,
    defaultTheme,
    getImageHeight,
    getBorderColor,
};