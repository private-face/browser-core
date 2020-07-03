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
const packageName = 'cliqz_next_';
const channel = 'browser_beta';
const artifactUrlPrefix = publish.edgeLatestUrl(channel);
const updateS3Url = `${publish.edgeLatestS3Url(channel)}updates.json`;
const updateUrl = `${artifactUrlPrefix}updates.json`;
const artifactUrl = `${artifactUrlPrefix}latest.xpi`;

module.exports = {
  platform: 'webextension',
  specific: 'next',
  baseURL: '/modules/',
  pack: 'web-ext build -s build -a . --overwrite-dest',
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
    name: 'browserAppNameNext',
    channel: '40',
    homepageURL: 'https://github.com/private-face/browser-core',
    freshTabNews: false,
    freshTabStats: false,
    suggestions: false,
    onboardingVersion: 4,
    onBoardingPref: 'browserOnboarding',
    ICONS: {
      active: 'control-center/images/cc-active.svg',
      inactive: 'control-center/images/cc-critical.svg',
      critical: 'control-center/images/cc-critical.svg'
    },
    FRESHTAB_TITLE: 'Cliqz Tab',
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
    'webextension-specific',
    'geolocation',
    'omnibox',
    'freshtab',
    'news',
    'webrequest-pipeline',
    'control-center',
    'video-downloader',
    'search',
    'autoconsent',
    'dat',
  ],
  bundles: [
    'core/content-script.bundle.js',
    'webextension-specific/app.bundle.js',
    'freshtab/home.bundle.js',
    'dropdown/dropdown.bundle.js',
    'control-center/control-center-react.bundle.js',
    'video-downloader/video-downloader.bundle.js',
    'search/mixer.bundle.js',
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
