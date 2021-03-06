/*!
 * Copyright (c) 2014-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import PropTypes from 'prop-types';
import React from 'react';
import Modal from './modal';
import Button from './partials/button';
import t from '../i18n';

function renderError(errorMessage = '') {
  return (
    <div className="error-message">
      <p>
        {t('cliqz_modules_loading_error')}
      </p>
      <p>
        { errorMessage }
      </p>
    </div>
  );
}

const ModulesDeveloperModal = ({
  closeAction,
  error,
  isOpen,
}) => (
  <Modal
    className="toolbox-modal"
    closeAction={closeAction}
    showModal={isOpen}
  >
    <div className="modules-developer-modal">
      <Button
        className="close-form"
        onClick={closeAction}
      />

      {error
        ? renderError(error)
        : (
          <iframe
            className="modal-iframe"
            tabIndex="-1"
            src="../toolbox/index.html"
            title="Module list"
          />
        )
      }
    </div>
  </Modal>
);

ModulesDeveloperModal.propTypes = {
  closeAction: PropTypes.func,
  error: PropTypes.string,
  isOpen: PropTypes.bool,
};

export default ModulesDeveloperModal;
