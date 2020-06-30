/*!
 * Copyright (c) 2014-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const base = require('./common/system');
const urls = require('./common/urls-cliqz');
const settings = require('./common/amo-settings');
const publish = require('./common/publish');

const id = 'cliqz@cliqz.com';
const packageName = 'cliqz_nightly_';
const channel = 'browser_beta';
const artifactUrlPrefix = publish.edgeLatestUrl(channel);
const updateS3Url = `${publish.edgeLatestS3Url(channel)}updates.json`;
const updateUrl = `${artifactUrlPrefix}updates.json`;
const artifactUrl = `${artifactUrlPrefix}latest.xpi`;

module.exports = {
  platform: 'webextension',
  specific: 'browser',
  baseURL: '/modules/',
  pack: 'web-ext build -s build -a .',
  sign: `python ./xpi-sign/xpisign.py -k $CLIQZ_CERT_PATH --signer openssl --passin file:$CLIQZ_CERT_PASS_PATH ${packageName}-$VERSION.zip ${packageName}-$PACKAGE_VERSION.xpi`,
  publish: `${publish.toEdge(packageName, channel, 'xpi')} && \
     aws s3 cp build/updates.json ${updateS3Url} --acl public-read && \
     python ./fern/submitter.py -a "http://balrog-admin.10e99.net/api" -r "${channel}" --addon-id "${id}" --addon-version $VERSION --addon-url "${artifactUrl}"`,
  testsBasePath: './build/modules',
  updateURL: updateUrl,
  updateURLbeta: updateUrl,
  versionDistance: true,
  artifactUrl,
  settings: Object.assign({}, urls, settings, {
    id,
    name: 'browserAppNameNightly',
    channel: '40',
    homepageURL: 'https://cliqz.com/',
    freshTabNews: false,
    freshTabStats: true,
    helpMenus: true,
    suggestions: false,
    onboardingVersion: 4,
    onBoardingPref: 'browserOnboarding',
    ENDPOINT_ANONPATTERNSURL: 'https://cdn.cliqz.com/browser-f/patterns-anon',
    ENDPOINT_HUMAN_WEB_PATTERNS: 'https://cdn.cliqz.com/browser-f/hw-patterns.gz',
    ENDPOINT_PATTERNSURL: 'https://cdn.cliqz.com/browser-f/patterns',
    HW_CHANNEL: 'cliqz',
    ONBOARDING_URL: 'onboarding-v4/index.html',
    HISTORY_URL: 'history/home.html',
    'modules.history.search-path': '?query=',
    ICONS: {
      active: 'control-center/images/cc-active.svg',
      inactive: 'control-center/images/cc-critical.svg',
      critical: 'control-center/images/cc-critical.svg'
    },
    ATTRACK_TELEMETRY_PROVIDER: 'hpnv2',
    DISABLE_ATTRACK_TELEMETRY: true,
    ALLOWED_COUNTRY_CODES: ['de', 'at', 'ch', 'es', 'us', 'fr', 'nl', 'gb', 'it', 'se'],
    antitrackingPlaceholder: 'cliqz.com/tracking',
    antitrackingHeader: 'CLIQZ-AntiTracking',
    FRESHTAB_TITLE: 'Cliqz Tab',
    INSIGHTS_INTERNAL: true,
  }),
  default_prefs: {
    'suggestionChoice': 2,
    'modules.search.operators.addCompletion.useTitle': false,
    'modules.freshtab.customBackground': true,
    'modules.search.providers.cliqz.enabled': false,
  },
  modules: [
    'core',
    'dropdown',
    'abtests-legacy',
    'webextension-specific',
    'geolocation',
    'omnibox',
    'freshtab',
    'news',
    'antitracking',
    'webrequest-pipeline',
    'control-center',
    'adblocker',
    'https-everywhere',
    'video-downloader',
    'search',
    'insights',
    'toolbox',
    'autoconsent',
    'dat',
  ],
  bundles: [
    'core/content-script.bundle.js',
    'webextension-specific/app.bundle.js',
    'freshtab/home.bundle.js',
    'dropdown/dropdown.bundle.js',
    'dropdown/debug.bundle.js',
    'control-center/control-center-react.bundle.js',
    'toolbox/toolbox.bundle.js',
    'video-downloader/video-downloader.bundle.js',
    'search/debug.bundle.js',
    'search/inspect.bundle.js',
    'search/mixer.bundle.js',
    'webextension-specific/experimental-apis/browser-action/api.bundle.js',
    'webextension-specific/experimental-apis/cliqz/api.bundle.js',
    'webextension-specific/experimental-apis/cliqz/api-child.bundle.js',
    'webextension-specific/experimental-apis/demographics/api.bundle.js',
    'webextension-specific/experimental-apis/omnibox/api.bundle.js',
    'webextension-specific/experimental-apis/omnibox/api-child.bundle.js',
    'webextension-specific/experimental-apis/cliqzHistory/api.bundle.js',
  ],
  builderDefault: Object.assign({}, base.builderConfig, {
    externals: base.builderConfig.externals.concat('@cliqz-oss/dexie'),
    globalDeps: Object.assign({}, base.builderConfig.globalDeps, {
      '@cliqz-oss/dexie': 'Dexie'
    }),
  }),
  buildTargets: {
    firefox: 77,
  },
  PRODUCT_PREFIX: 'cliqz',
};
