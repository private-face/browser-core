/*!
 * Copyright (c) 2014-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Button from './button';

function AsideElement({
  condition,
  href,
  id,
  isAndOperator,
  isButton,
  label,
  onClick,
  title,
}) {
  const returnedEl = isButton
    ? (
      <Button
        className="aside-button"
        id={id}
        label={label}
        onClick={onClick}
        title={title}
      />
    )
    : (
      <a
        className="aside-button"
        href={href}
        id={id}
        onClick={onClick}
        title={title}
        tabIndex="-1"
      >
        {label}
      </a>
    );

  return isAndOperator
    ? condition && returnedEl
    : condition || returnedEl;
}

AsideElement.propTypes = {
  condition: PropTypes.bool,
  href: PropTypes.string,
  id: PropTypes.string,
  isAndOperator: PropTypes.bool,
  isButton: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

AsideElement.defaultProps = {
  isAndOperator: true,
  isButton: false,
};

export default AsideElement;
