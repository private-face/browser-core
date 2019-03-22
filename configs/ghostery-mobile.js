/* eslint-disable */

'use strict';

const urls = require('./common/urls-ghostery');
const publish = require('./common/publish');
const base = require('./common/system');

module.exports = {
  "platform": "webextension",
  "brocfile": "Brocfile.ghostery-mobile.js",
  "baseURL": "/cliqz/",
  "pack": "npm pack",
  "publish": publish.toEdge('browser-core', 'ghostery-mobile'),
  "sourceMaps": false,
  "versionPrefix": "7",
  "isMobile": true,
  "settings": Object.assign({}, urls, {
    "channel": "MA50",
    "MSGCHANNEL": "web-extension",
    "OFFERS_CHANNEL": "ghostery",
    "ATTRACK_TELEMETRY_PROVIDER": "hpnv2",
    "HW_CHANNEL": "ghostery",
    "ALLOWED_COUNTRY_CODES": ["de", "at", "ch", "es", "us", "fr", "nl", "gb", "it", "be", "se", "dk", "fi", "cz", "gr", "hu", "ro", "no", "ca", "au", "ru", "ua", "in", "pl", "jp", "br", "mx", "cn", "ar"],
    "antitrackingPlaceholder": "ghostery",
    "antitrackingHeader": "Ghostery-AntiTracking",
    // mobile cards
    "RESULTS_TIMEOUT": 3000,
    "RESULTS_PROVIDER_ORDER": ["calculator", "history", "cliqz", "querySuggestions", "instant"],
    "CLEAR_RESULTS_AT_SESSION_START": false,
    "THROTTLE_QUERIES": 50
  }),
  "default_prefs": {
    "modules.antitracking.enabled": true,
    "modules.adblocker.enabled": true,
    "modules.insights.enabled": false,
    "modules.webextension-specific.enabled": false,
    "showConsoleLogs": false,
    "cliqz-adb": 1,
    "cliqz-adb-abtest": true,
    "attrackBloomFilter": false,
    "humanWeb": false,
    "attrackTelemetryMode": 0,
    "attrackDefaultAction": "placeholder",
    "sendAntiTrackingHeader": false,
    "telemetry": false,
    "attrackCookieTrustReferers": true,
  },
  "bundles": [
    "core/content-script.bundle.js",
    "cliqz-android/cliqz-search-engines.bundle.js",
    "cliqz-android/cliqz-native-bridge.bundle.js",
    "cliqz-android/cliqz-app-constants.bundle.js",
    "webextension-specific/experimental-apis/cliqz/api.bundle.js",
    "webextension-specific/experimental-apis/cliqzSynchronous/api.bundle.js",
  ],
  "modules": [
    "core",
    "antitracking",
    "webrequest-pipeline",
    "static",
    "adblocker",
    "anolysis",
    // mobile cards
    "core-cliqz",
    "abtests-legacy",
    "cliqz-android",
    "webextension-specific",
    "telemetry",
  ],
  system: Object.assign({}, base.systemConfig, {
    map: Object.assign({}, base.systemConfig.map, {
      "@cliqz-oss/dexie": "node_modules/@cliqz-oss/dexie/dist/dexie.min.js",
      "math-expression-evaluator": "node_modules/math-expression-evaluator/dist/browser/math-expression-evaluator.min.js",
      "react-native-view-shot": "modules/mobile-cards/external-libs/react-native-view-shot.js",
      "react-dom/unstable-native-dependencies": "node_modules/react-dom/unstable-native-dependencies.js",
    }),
    "packages": Object.assign({}, base.systemConfig.packages, {
      "is-obj": {
        "main": "./index.js"
      },
      "array-find-index": {
        "main": "./index.js"
      },
      "object-assign": {
        "main": "./index.js"
      },
      "process": {
        "main": "./browser.js"
      },
      "react-native-web": {
        "map": {
          "./dist/cjs/exports/ART": "./dist/cjs/exports/ART/index.js",
          "./dist/cjs/exports/AccessibilityInfo": "./dist/cjs/exports/AccessibilityInfo/index.js",
          "./dist/cjs/exports/ActivityIndicator": "./dist/cjs/exports/ActivityIndicator/index.js",
          "./dist/cjs/exports/Alert": "./dist/cjs/exports/Alert/index.js",
          "./dist/cjs/exports/Animated": "./dist/cjs/exports/Animated/index.js",
          "./dist/cjs/exports/AppRegistry": "./dist/cjs/exports/AppRegistry/index.js",
          "./dist/cjs/exports/AppState": "./dist/cjs/exports/AppState/index.js",
          "./dist/cjs/exports/AsyncStorage": "./dist/cjs/exports/AsyncStorage/index.js",
          "./dist/cjs/exports/BackHandler": "./dist/cjs/exports/BackHandler/index.js",
          "./dist/cjs/exports/Button": "./dist/cjs/exports/Button/index.js",
          "./dist/cjs/exports/CheckBox": "./dist/cjs/exports/CheckBox/index.js",
          "./dist/cjs/exports/Clipboard": "./dist/cjs/exports/Clipboard/index.js",
          "./dist/cjs/exports/ColorPropType": "./dist/cjs/exports/ColorPropType/index.js",
          "./dist/cjs/exports/DeviceInfo": "./dist/cjs/exports/DeviceInfo/index.js",
          "./dist/cjs/exports/Dimensions": "./dist/cjs/exports/Dimensions/index.js",
          "./dist/cjs/exports/Easing": "./dist/cjs/exports/Easing/index.js",
          "./dist/cjs/exports/EdgeInsetsPropType": "./dist/cjs/exports/EdgeInsetsPropType/index.js",
          "./dist/cjs/exports/FlatList": "./dist/cjs/exports/FlatList/index.js",
          "./dist/cjs/exports/I18nManager": "./dist/cjs/exports/I18nManager/index.js",
          "./dist/cjs/exports/Image": "./dist/cjs/exports/Image/index.js",
          "./dist/cjs/exports/ImageBackground": "./dist/cjs/exports/ImageBackground/index.js",
          "./dist/cjs/exports/InteractionManager": "./dist/cjs/exports/InteractionManager/index.js",
          "./dist/cjs/exports/Keyboard": "./dist/cjs/exports/Keyboard/index.js",
          "./dist/cjs/exports/KeyboardAvoidingView": "./dist/cjs/exports/KeyboardAvoidingView/index.js",
          "./dist/cjs/exports/LayoutAnimation": "./dist/cjs/exports/LayoutAnimation/index.js",
          "./dist/cjs/exports/Linking": "./dist/cjs/exports/Linking/index.js",
          "./dist/cjs/exports/ListView": "./dist/cjs/exports/ListView/index.js",
          "./dist/cjs/exports/Modal": "./dist/cjs/exports/Modal/index.js",
          "./dist/cjs/exports/NativeEventEmitter": "./dist/cjs/exports/NativeEventEmitter/index.js",
          "./dist/cjs/exports/NativeModules": "./dist/cjs/exports/NativeModules/index.js",
          "./dist/cjs/exports/NetInfo": "./dist/cjs/exports/NetInfo/index.js",
          "./dist/cjs/exports/PanResponder": "./dist/cjs/exports/PanResponder/index.js",
          "./dist/cjs/exports/Picker": "./dist/cjs/exports/Picker/index.js",
          "./dist/cjs/exports/PixelRatio": "./dist/cjs/exports/PixelRatio/index.js",
          "./dist/cjs/exports/Platform": "./dist/cjs/exports/Platform/index.js",
          "./dist/cjs/exports/PointPropType": "./dist/cjs/exports/PointPropType/index.js",
          "./dist/cjs/exports/ProgressBar": "./dist/cjs/exports/ProgressBar/index.js",
          "./dist/cjs/exports/RefreshControl": "./dist/cjs/exports/RefreshControl/index.js",
          "./dist/cjs/exports/SafeAreaView": "./dist/cjs/exports/SafeAreaView/index.js",
          "./dist/cjs/exports/ScrollView": "./dist/cjs/exports/ScrollView/index.js",
          "./dist/cjs/exports/SectionList": "./dist/cjs/exports/SectionList/index.js",
          "./dist/cjs/exports/Share": "./dist/cjs/exports/Share/index.js",
          "./dist/cjs/exports/Slider": "./dist/cjs/exports/Slider/index.js",
          "./dist/cjs/exports/StatusBar": "./dist/cjs/exports/StatusBar/index.js",
          "./dist/cjs/exports/StyleSheet": "./dist/cjs/exports/StyleSheet/index.js",
          "./dist/cjs/exports/SwipeableFlatList": "./dist/cjs/exports/SwipeableFlatList/index.js",
          "./dist/cjs/exports/SwipeableListView": "./dist/cjs/exports/SwipeableListView/index.js",
          "./dist/cjs/exports/Switch": "./dist/cjs/exports/Switch/index.js",
          "./dist/cjs/exports/Text": "./dist/cjs/exports/Text/index.js",
          "./dist/cjs/exports/TextInput": "./dist/cjs/exports/TextInput/index.js",
          "./dist/cjs/exports/TextPropTypes": "./dist/cjs/exports/TextPropTypes/index.js",
          "./dist/cjs/exports/Touchable": "./dist/cjs/exports/Touchable/index.js",
          "./dist/cjs/exports/TouchableHighlight": "./dist/cjs/exports/TouchableHighlight/index.js",
          "./dist/cjs/exports/TouchableNativeFeedback": "./dist/cjs/exports/TouchableNativeFeedback/index.js",
          "./dist/cjs/exports/TouchableOpacity": "./dist/cjs/exports/TouchableOpacity/index.js",
          "./dist/cjs/exports/TouchableWithoutFeedback": "./dist/cjs/exports/TouchableWithoutFeedback/index.js",
          "./dist/cjs/exports/UIManager": "./dist/cjs/exports/UIManager/index.js",
          "./dist/cjs/exports/Vibration": "./dist/cjs/exports/Vibration/index.js",
          "./dist/cjs/exports/View": "./dist/cjs/exports/View/index.js",
          "./dist/cjs/exports/ViewPropTypes": "./dist/cjs/exports/ViewPropTypes/index.js",
          "./dist/cjs/exports/VirtualizedList": "./dist/cjs/exports/VirtualizedList/index.js",
          "./dist/cjs/exports/YellowBox": "./dist/cjs/exports/YellowBox/index.js",
          "./dist/cjs/exports/createElement": "./dist/cjs/exports/createElement/index.js",
          "./dist/cjs/exports/findNodeHandle": "./dist/cjs/exports/findNodeHandle/index.js",
          "./dist/cjs/exports/processColor": "./dist/cjs/exports/processColor/index.js",
          "./dist/cjs/exports/render": "./dist/cjs/exports/render/index.js",
          "./dist/cjs/exports/unmountComponentAtNode": "./dist/cjs/exports/unmountComponentAtNode/index.js",
          "./dist/cjs/modules/AccessibilityUtil": "./dist/cjs/modules/AccessibilityUtil/index.js",
          "./dist/cjs/modules/AnimationPropTypes": "./dist/cjs/modules/AnimationPropTypes/index.js",
          "./dist/cjs/modules/AssetRegistry": "./dist/cjs/modules/AssetRegistry/index.js",
          "./dist/cjs/modules/BorderPropTypes": "./dist/cjs/modules/BorderPropTypes/index.js",
          "./dist/cjs/modules/ImageLoader": "./dist/cjs/modules/ImageLoader/index.js",
          "./dist/cjs/modules/InteractionPropTypes": "./dist/cjs/modules/InteractionPropTypes/index.js",
          "./dist/cjs/modules/LayoutPropTypes": "./dist/cjs/modules/LayoutPropTypes/index.js",
          "./dist/cjs/modules/NativeMethodsMixin": "./dist/cjs/modules/NativeMethodsMixin/index.js",
          "./dist/cjs/modules/ReactNativePropRegistry": "./dist/cjs/modules/ReactNativePropRegistry/index.js",
          "./dist/cjs/modules/ResponderEventPlugin": "./dist/cjs/modules/ResponderEventPlugin/index.js",
          "./dist/cjs/modules/ScrollResponder": "./dist/cjs/modules/ScrollResponder/index.js",
          "./dist/cjs/modules/ShadowPropTypes": "./dist/cjs/modules/ShadowPropTypes/index.js",
          "./dist/cjs/modules/StyleSheetPropType": "./dist/cjs/modules/StyleSheetPropType/index.js",
          "./dist/cjs/modules/TextInputState": "./dist/cjs/modules/TextInputState/index.js",
          "./dist/cjs/modules/TransformPropTypes": "./dist/cjs/modules/TransformPropTypes/index.js",
          "./dist/cjs/modules/UnimplementedView": "./dist/cjs/modules/UnimplementedView/index.js",
          "./dist/cjs/modules/applyLayout": "./dist/cjs/modules/applyLayout/index.js",
          "./dist/cjs/modules/applyNativeMethods": "./dist/cjs/modules/applyNativeMethods/index.js",
          "./dist/cjs/modules/createDOMProps": "./dist/cjs/modules/createDOMProps/index.js",
          "./dist/cjs/modules/createStrictShapeTypeChecker": "./dist/cjs/modules/createStrictShapeTypeChecker/index.js",
          "./dist/cjs/modules/dismissKeyboard": "./dist/cjs/modules/dismissKeyboard/index.js",
          "./dist/cjs/modules/ensureComponentIsNative": "./dist/cjs/modules/ensureComponentIsNative/index.js",
          "./dist/cjs/modules/flattenArray": "./dist/cjs/modules/flattenArray/index.js",
          "./dist/cjs/modules/hydrate": "./dist/cjs/modules/hydrate/index.js",
          "./dist/cjs/modules/isWebColor": "./dist/cjs/modules/isWebColor/index.js",
          "./dist/cjs/modules/mapKeyValue": "./dist/cjs/modules/mapKeyValue/index.js",
          "./dist/cjs/modules/multiplyStyleLengthValue": "./dist/cjs/modules/multiplyStyleLengthValue/index.js",
          "./dist/cjs/modules/normalizeColor": "./dist/cjs/modules/normalizeColor/index.js",
          "./dist/cjs/modules/normalizeNativeEvent": "./dist/cjs/modules/normalizeNativeEvent/index.js",
          "./dist/cjs/modules/prefixStyles": "./dist/cjs/modules/prefixStyles/index.js",
          "./dist/cjs/modules/requestIdleCallback": "./dist/cjs/modules/requestIdleCallback/index.js",
          "./dist/cjs/modules/unitlessNumbers": "./dist/cjs/modules/unitlessNumbers/index.js",
          "./dist/cjs/vendor/hash": "./dist/cjs/vendor/hash/index.js",
          "./dist/cjs/vendor/react-dom/dangerousStyleValue": "./dist/cjs/vendor/react-dom/dangerousStyleValue/index.js",
          "./dist/cjs/vendor/react-dom/setValueForStyles": "./dist/cjs/vendor/react-dom/setValueForStyles/index.js",
          "./dist/cjs/vendor/react-dom/warnValidStyle": "./dist/cjs/vendor/react-dom/warnValidStyle/index.js",
          "./dist/cjs/vendor/react-native/Animated": "./dist/cjs/vendor/react-native/Animated/index.js",
          "./dist/cjs/vendor/react-native/Batchinator": "./dist/cjs/vendor/react-native/Batchinator/index.js",
          "./dist/cjs/vendor/react-native/FillRateHelper": "./dist/cjs/vendor/react-native/FillRateHelper/index.js",
          "./dist/cjs/vendor/react-native/FlatList": "./dist/cjs/vendor/react-native/FlatList/index.js",
          "./dist/cjs/vendor/react-native/JSEventLoopWatchdog": "./dist/cjs/vendor/react-native/JSEventLoopWatchdog/index.js",
          "./dist/cjs/vendor/react-native/LayoutAnimation": "./dist/cjs/vendor/react-native/LayoutAnimation/index.js",
          "./dist/cjs/vendor/react-native/ListView": "./dist/cjs/vendor/react-native/ListView/index.js",
          "./dist/cjs/vendor/react-native/NativeEventEmitter": "./dist/cjs/vendor/react-native/NativeEventEmitter/index.js",
          "./dist/cjs/vendor/react-native/PanResponder": "./dist/cjs/vendor/react-native/PanResponder/index.js",
          "./dist/cjs/vendor/react-native/PooledClass": "./dist/cjs/vendor/react-native/PooledClass/index.js",
          "./dist/cjs/vendor/react-native/SectionList": "./dist/cjs/vendor/react-native/SectionList/index.js",
          "./dist/cjs/vendor/react-native/StaticContainer": "./dist/cjs/vendor/react-native/StaticContainer/index.js",
          "./dist/cjs/vendor/react-native/StaticRenderer": "./dist/cjs/vendor/react-native/StaticRenderer/index.js",
          "./dist/cjs/vendor/react-native/SwipeableFlatList": "./dist/cjs/vendor/react-native/SwipeableFlatList/index.js",
          "./dist/cjs/vendor/react-native/SwipeableListView": "./dist/cjs/vendor/react-native/SwipeableListView/index.js",
          "./dist/cjs/vendor/react-native/SwipeableRow": "./dist/cjs/vendor/react-native/SwipeableRow/index.js",
          "./dist/cjs/vendor/react-native/TouchHistoryMath": "./dist/cjs/vendor/react-native/TouchHistoryMath/index.js",
          "./dist/cjs/vendor/react-native/ViewabilityHelper": "./dist/cjs/vendor/react-native/ViewabilityHelper/index.js",
          "./dist/cjs/vendor/react-native/VirtualizeUtils": "./dist/cjs/vendor/react-native/VirtualizeUtils/index.js",
          "./dist/cjs/vendor/react-native/VirtualizedList": "./dist/cjs/vendor/react-native/VirtualizedList/index.js",
          "./dist/cjs/vendor/react-native/VirtualizedSectionList": "./dist/cjs/vendor/react-native/VirtualizedSectionList/index.js",
          "./dist/cjs/vendor/react-native/emitter": "./dist/cjs/vendor/react-native/emitter/index.js",
          "./dist/cjs/vendor/react-native/infoLog": "./dist/cjs/vendor/react-native/infoLog/index.js",
          "./dist/cjs/vendor/react-native/isEmpty": "./dist/cjs/vendor/react-native/isEmpty/index.js",
        }
      }

    }),
  }),
  builderDefault: base.builderConfig,
  "babelPlugins": [
    ["react-native-web", { commonjs: true }]
  ]
}
