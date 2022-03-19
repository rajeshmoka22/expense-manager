import * as React from 'react';
import labels from '../../utils/labels.json';

export default function Profile() {
  return (
    <div className="p-3">
      <div className="page-heading">{labels.Profile}</div>
      <h2 className="m-5 text-muted">{labels.ComingSoon}</h2>
    </div>
  )
}