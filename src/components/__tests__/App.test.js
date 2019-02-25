import React from 'react';
import { mount } from 'enzyme';

import App from '../../App';
import FormTemplate from '../Form';

let wrapped;

beforeEach(() => {
  wrapped = mount(<App />);
});
it('shows an entry form', () => {
  expect(wrapped.find(FormTemplate).length).toEqual(1);
});

it('shows the navbar', () => {
  expect(wrapped.find('.nav').length).toEqual(1);
});
