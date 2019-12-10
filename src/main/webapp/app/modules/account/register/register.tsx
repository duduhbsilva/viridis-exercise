import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Alert, Button } from 'reactstrap';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';

export type IRegisterProps = DispatchProps;

export const RegisterPage = (props: IRegisterProps) => {
  const [password, setPassword] = useState('');

  useEffect(() => () => props.reset(), []);

  const handleValidSubmit = (event, values) => {
    props.handleRegister(values.username, values.email, values.firstPassword);
    event.preventDefault();
  };

  const updatePassword = event => setPassword(event.target.value);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="register-title">Cadastro</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <AvForm id="register-form" onValidSubmit={handleValidSubmit}>
            <AvField
              name="username"
              label="Nome de Usuário"
              placeholder={'Nome de Usuário'}
              validate={{
                required: { value: true, errorMessage: 'Este campo é obrigatório.' },
                pattern: { value: '^[_.@A-Za-z0-9-]*$', errorMessage: 'Seu nome de usuário pode conter apenas letras e dígitos.' },
                minLength: { value: 1, errorMessage: 'É necessário que seu nome de usuário tenha pelo menos 1 caractere.' },
                maxLength: { value: 50, errorMessage: 'Seu nome de usuário não pode ter mais de 50 caracteres.' }
              }}
            />
            <AvField
              name="email"
              label="E-mail"
              placeholder={'E-mail'}
              type="email"
              validate={{
                required: { value: true, errorMessage: 'Este campo é obrigatório.' },
                minLength: { value: 5, errorMessage: 'É necessário que seu e-mail tenha no mínimo 5 caracteres.' },
                maxLength: { value: 254, errorMessage: 'O seu e-mail não pode ter mais de 50 caracteres.' }
              }}
            />
            <AvField
              name="firstPassword"
              label="Senha"
              placeholder={'Senha'}
              type="password"
              onChange={updatePassword}
              validate={{
                required: { value: true, errorMessage: 'Este campo é obrigatório.' },
                minLength: { value: 4, errorMessage: 'Sua senha deve ter pelo menos 4 caracteres.' },
                maxLength: { value: 50, errorMessage: 'Sua senha não pode ter mais de 50 caracteres.' }
              }}
            />
            <PasswordStrengthBar password={password} />
            <AvField
              name="secondPassword"
              label="Confirmar Senha"
              placeholder="Confirmar Senha"
              type="password"
              validate={{
                required: { value: true, errorMessage: 'Este campo é obrigatório.' },
                minLength: { value: 4, errorMessage: 'É necessário que sua senha de confirmação tenha no mínimo 4 caracteres.' },
                maxLength: { value: 50, errorMessage: 'Sua senha de confirmação não pode ter mais de 50 caracteres.' },
                match: { value: 'firstPassword', errorMessage: 'A senha e sua confirmação não coincidem!' }
              }}
            />
            <Button id="register-submit" color="primary" type="submit">
              Cadastrar
            </Button>
          </AvForm>
        </Col>
      </Row>
    </div>
  );
};

const mapDispatchToProps = { handleRegister, reset };
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  null,
  mapDispatchToProps
)(RegisterPage);
