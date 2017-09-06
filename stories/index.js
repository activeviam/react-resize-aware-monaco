import React from 'react';

import { storiesOf } from '@storybook/react';

import Test from './Test.jsx';

const stories = storiesOf('Table', module);

stories.add('Monaco Editor', () =>  (
    <div style={{height: 'calc(100vh - 16px)'}}>
      <Test/>
    </div>
));
