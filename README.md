#### 本文为自己学习React-Native的过程和目标。

#### 需要学习的点和入手的地方，自己已经掌握了React技术栈，所以``React``开发的模式已经不用再去学习，主要有以下几点需要注意：

##### 个人希望``typescript``与``React-Native``结合，因为我是``typescript``重度使用者，所以这里面的坑要注意一下。``React-native``的组件使用方式，如果没有``index.d.ts``则需要自己编写。

##### 我将搭建的这个``React-native``基础框架，我希望他包含以下这几个功能

> 1.集成``react-navigation``这是RN项目的跳转组件。

> 2.集成``react-native-code-push``这是RN项目的热更新组件。

> 3.集成``tdd``测试框架。

> 4.集成``redux redux-thunk``。

##### 期望学习的点

> 1.``react-native``动画（重点）包括手势，组合动画，队列动画。

> 2.具备导出``APK IPA``的能力。

> 3.具备简单的导出原生组件的能力``暂时选型 swift 导出 ios 组件``。

##### 学习过程:

> ##### 1. 继续 [30 Days of React Native](https://github.com/fangwei716/30-days-of-react-native) 计划``15``天内完成，开始时间``7.14`` 截止日期``7.29``

##### 经验:

##### ``react native``中，图片必须明确写明大小值，不然无法显示，同时``width : '100%''``, 这种写法不支持。如果需要自适应，有几种做法：
> ##### 1.只写高度值，不写宽度值，外层容器使用flex来做好布局，再配合resizeMode实现图片自适应即可。from ``https://github.com/hugohua/react-native-demo``

```
<View style={{flex : 1,borderRightWidth : 1,borderRightColor: '#eeeeee'}}>
     <Image style={{height: 110,resizeMode: Image.resizeMode.contain}} source={{uri: 'http://gtms01.alicdn.com/tps/i1/TB1nif8HpXXXXc6XVXXAyLxZVXX-320-188.jpg'}} />
</View>
```
```
 var Dimensions = require('Dimensions');
 var { width, height } = Dimensions.get('window');
 var image = (
   <Image style={{width: width, height: 100 }} source={{uri: 'http://gtms01.alicdn.com/tps/i1/TB1nif8HpXXXXc6XVXXAyLxZVXX-320-188.jpg'}} />
 );
```

##### ``react native``中，没有``z-index``的概念，把需要上层展示的组件放在靠后的代码中。

#####  android API 是否小于 19(4.4以下)，如果是则不能使用沉浸状态栏

```
export function isLT19() {
    return Platform.OS === 'android' && Platform.Version < 19;
}
```

##### `Swiper` ---> 使用 `react-native-swiper`

##### 使用 `react-native-scrollable-tab-view`