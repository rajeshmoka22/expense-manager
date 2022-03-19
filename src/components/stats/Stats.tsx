import * as React from 'react';
import labels from '../../utils/labels.json';

export default function Stats() {
  return (
    <div>
      <div className="page-heading">{labels.Statistics}</div>
      <h2 className="m-5 text-muted">{labels.ComingSoon}</h2>
    </div>
  )
}