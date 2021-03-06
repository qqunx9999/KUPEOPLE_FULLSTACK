import React from 'react';
import { Formik, Form, Field } from 'formik';
import '../CSSsource/ChangeName.css';
import AuthService from '../service/AuthService';
import UserService from '../service/UserService';
import { useHistory } from 'react-router';

function ChangeProfileForm() {
  const history = useHistory();
  return (
    <Formik
      initialValues={{ email: localStorage.email, newName: '', newQuote: '', newPass: '', conPass: '', oldPass: '' }}
      onSubmit={async (values, actions) => {
        const userID = AuthService.getUserID();
        let changeProfileOption = {};
        let changePassOption = {};

        if (values.newName !== '') {
          if (values.newQuote !== '') {
            changeProfileOption = {
              "name": values.newName,
              "quote": values.newQuote
            };
          } else {
            changeProfileOption = {
              "name": values.newName,
            };
          }
        } else {
          if (values.newQuote !== '') {
            changeProfileOption = {
              "quote": values.newQuote,
            };
          }
        }
        if (values.newPass) {
          changePassOption = {
            "email": values.email.concat("@ku.th"),
            "oldpass": values.oldPass,
            "newpass": values.newPass,
            //"verify": values.verify,
          };
        }
        // console.log(changePassOption);
        UserService.changeName(userID, changeProfileOption);
        UserService.changePass(changePassOption);
        actions.setSubmitting(false);
        history.goBack();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="newName" className="cName_newname_input" placeholder="Type your new name... (Only characters and Numbers allowed.)"/>
          <Field type="text" name="newQuote" className="cName_newquote_input" placeholder="Type your new quote..."/>
          <Field type="text" name="newPass" className="cName_newpassword_input" placeholder="Type your new password ..." />
          <Field type="text" name="conPass" className="cName_confirm_newpassword_input" placeholder="Type confirm password..." />
          <Field type="text" name="oldPass" className="cName_oldpassword_input" placeholder="Type your old password ..." />
          <button className="cName-confirmbutton btn btn-success" disabled={isSubmitting}>Confirm</button>
        </Form>
      )}
    </Formik>
  );
}

export default ChangeProfileForm;
