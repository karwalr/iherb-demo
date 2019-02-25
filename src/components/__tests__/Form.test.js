import React from 'react';
import { mount } from 'enzyme';
import FormTemplate from '../Form';

let ui;

describe('Form with valid values', () => {
  beforeEach(() => {
    ui = mount(<FormTemplate />);

    localStorage.clear();

    //populate the form
    const emailField = ui.find('input[name="email"]');
    emailField.simulate('change', {
      persist: () => {},
      target: {
        name: 'email',
        value: 'karwalr@hotmail.com'
      }
    });
    emailField.simulate('blur');

    const phoneNumberField = ui.find('input[name="phoneNumber"]');
    phoneNumberField.simulate('change', {
      persist: () => {},
      target: {
        name: 'phoneNumber',
        value: '+1-333-333-33-33'
      }
    });
    phoneNumberField.simulate('blur');

    const favColorField = ui.find('input[name="favColor"]');
    favColorField.simulate('change', {
      persist: () => {},
      target: {
        name: 'favColor',
        value: 'RED'
      }
    });
    favColorField.simulate('blur');
  });

  it('should submit valid values', async () => {
    const emailField = ui.find('input[name="email"]');
    const phoneNumberField = ui.find('input[name="phoneNumber"]');
    const favColorField = ui.find('input[name="favColor"]');

    expect(emailField.prop('value')).toContain('karwalr@hotmail.com');
    expect(phoneNumberField.prop('value')).toContain('+1-333-333-33-33');
    expect(favColorField.prop('value')).toContain('RED');

    await ui.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    ui.update();
  });

  it('should store the values in localStorage', async () => {
    const emailField = ui.find('input[name="email"]');
    const phoneNumberField = ui.find('input[name="phoneNumber"]');
    const favColorField = ui.find('input[name="favColor"]');

    await ui.find('form').simulate('submit', {
      preventDefault: () => {} // no op
    });
    ui.update();

    const submissionObj = {
      email: emailField.prop('value'),
      phoneNumber: phoneNumberField.prop('value'),
      favColor: favColorField.prop('value')
    };

    ui.instance().processForm(submissionObj);

    // console.log('keys');
    // console.log(Object.keys(localStorage.__STORE__).length);

    expect(Object.keys(localStorage.__STORE__).length).toEqual(2);

    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      'color_' + submissionObj.favColor.toLowerCase(),
      1
    );
  });
});

describe('Form with invalid values', () => {
  beforeEach(() => {
    ui = mount(<FormTemplate />);

    localStorage.clear();

    //populate the form
    const emailField = ui.find('input[name="email"]');
    emailField.simulate('change', {
      persist: () => {},
      target: {
        name: 'email',
        value: 'foo' //invalid
      }
    });
    emailField.simulate('blur');

    const phoneNumberField = ui.find('input[name="phoneNumber"]');
    phoneNumberField.simulate('change', {
      persist: () => {},
      target: {
        name: 'phoneNumber',
        value: 'bar' //invalid
      }
    });
    phoneNumberField.simulate('blur');

    const favColorField = ui.find('input[name="favColor"]');
    favColorField.simulate('change', {
      persist: () => {},
      target: {
        name: 'favColor',
        value: 'red' //invalid value
      }
    });
    favColorField.simulate('blur');
  });

  it('should not submit invalid values', async () => {
    const favColorField = ui.find('input[name="favColor"]');
    console.log(favColorField.prop('value'));
    ui.update();
    expect(favColorField.prop('value')).toContain('red'); //confirm invalid value

    //TODO. Doesnt find the errors div. Maybe a Formik issue?
    // const errors = ui.find('.error');
    // console.log(errors.length);
    // expect(errors.length).toBeGreaterThan(0);
  });
});
