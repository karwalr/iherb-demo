import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { FormGroup, Button } from 'reactstrap';

const initialValues = {
  email: '',
  phoneNumber: '',
  favColor: ''
};

const phoneRegex = /^\+\d{1}-\d{3}-\d{3}-\d{2}-\d{2}$/;
const favColorAlphaRegex = /^[A-Z]+$/;
const favColorsRegex = /^\bBLACK$|\bBLUE$|\bRED$|\bGREEN$/;

class FormTemplate extends React.Component {
  processForm({ email, phoneNumber, favColor }) {
    //set local storage flag to control nav link status
    localStorage.setItem('reports', true);

    //store to local storage
    const colorKey = 'color_' + favColor.toLowerCase();

    let currentCount = localStorage.getItem(colorKey)
      ? parseInt(localStorage.getItem(colorKey))
      : 0;

    localStorage.setItem(colorKey, currentCount + 1);

    //parent callback to update the UI links
    if (this.props.UpdateNavigation) this.props.UpdateNavigation();

    //navigate to report
    if (this.props.history) this.props.history.push('/report');
  }

  render() {
    //localStorage.setItem('test', 'test');
    //console.log(this.props);
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          email: Yup.string().required('This is a required field'),
          phoneNumber: Yup.string()
            .required('This is a required field')
            .matches(
              phoneRegex,
              'Invalid phonenumber. Expecting +1-XXX-XXX-XX-XX'
            ),
          favColor: Yup.string()
            .required('This is a required field')
            .matches(
              favColorAlphaRegex,
              'Colors must contain only Uppercase alphabet'
            )
            .matches(
              favColorsRegex,
              'Must be one of these colours. BLACK, BLUE, RED, GREEN'
            )
        })}
        onSubmit={values => {
          this.processForm(values);
        }}
        render={({ status, handleSubmit, isSubmitting, errors }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Field
                name="email"
                type={'email'}
                placeholder="Email"
                id="email"
              />
              <ErrorMessage name="email">
                {msg => <div className="error">{msg}</div>}
              </ErrorMessage>
            </FormGroup>
            <FormGroup>
              <Field
                name="phoneNumber"
                type={'text'}
                placeholder="Phone Number"
              />
              <ErrorMessage name="phoneNumber">
                {msg => <div className="error">{msg}</div>}
              </ErrorMessage>
            </FormGroup>
            <FormGroup>
              <Field
                name="favColor"
                type={'text'}
                placeholder="Favourite Color"
              />

              <ErrorMessage name="favColor">
                {msg => <div className="error">{msg}</div>}
              </ErrorMessage>
            </FormGroup>

            {status && status.msg && <div>{status.msg}</div>}
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      />
    );
  }
}

export default FormTemplate;
