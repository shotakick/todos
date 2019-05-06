import { FormikActions, FormikErrors } from 'formik';
import { Button, Form, Input } from 'formik-semantic-ui';
import React from 'react';
import Helmet from 'react-helmet';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Grid, GridColumn, Segment } from 'semantic-ui-react';
import { login } from '../../client/auth';
import { Path } from '../../routes';

const idField = 'loginUserId';
const passField = 'loginPassword';

interface FormValues {
  [idField]: string;
  [passField]: string;
}

const initialValues: FormValues = {
  [idField]: '',
  [passField]: '',
};

const validate = (values: FormValues) => {
  const errors: FormikErrors<FormValues> = {};

  if (!values[idField]) {
    errors[idField] = 'Required';
  } else if (!/^[a-z\d]{1,40}$/i.test(values[idField])) {
    errors[idField] = '半角英数字40文字以下';
  }

  if (!/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,40}$/.test(values[passField])) {
    errors[passField] = '半角英小文字大文字数字をそれぞれ1種類以上含む8文字以上40文字以下';
  }

  return errors;
};

export type LoginWindowProps = RouteComponentProps & {
  onLoggedIn: (id: string) => void;
  isAuthed: boolean;
};

// TODO: コンポーネントの中でログイン処理を実装してしまったので外に出す。
export const LoginWindow: React.FC<LoginWindowProps> = props => {
  const { onLoggedIn } = props;

  const handleSubmit = React.useCallback(
    async (values: FormValues, actions: FormikActions<FormValues>) => {
      try {
        const { id } = await login({ id: values[idField], pass: values[passField] });
        onLoggedIn(id);
      } catch (error) {
        actions.setFieldError(passField, error.message);
      }
      actions.setSubmitting(false);
    },
    [onLoggedIn],
  );

  const { from } = props.location.state || { from: { pathname: Path.root } };
  if (props.isAuthed) return <Redirect to={from} />;

  return (
    <Segment>
      <Helmet>
        <title>ログイン画面 - todos</title>
      </Helmet>
      <Form
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
        validateOnChange={true}
      >
        <Input
          label="ID"
          name={idField}
          inputProps={{
            autoFocus: true,
            autoComplete: 'off',
          }}
        />
        <Input label="Pass" name={passField} inputProps={{ type: 'password' }} />

        <Grid>
          <GridColumn textAlign="center">
            <Button.Submit>ログイン</Button.Submit>
          </GridColumn>
        </Grid>
      </Form>
    </Segment>
  );
};
export default LoginWindow;
