import { useState } from 'react';

import './Form.css';

export const Form = () => {
  const [formType, setFormType] = useState('login');
  const isLoginMode = formType === 'login';

  return (
    <section className="auth-form-section">
      <form className="auth-form" action="" method="post">
        <p className="auth-form__eyebrow">Account</p>
        <h1 className="auth-form__title">
          {isLoginMode ? 'Log in' : 'Create account'}
        </h1>
        <p className="auth-form__subtitle">
          {isLoginMode
            ? 'Enter your credentials to continue.'
            : 'Fill in your details to create a new account.'}
        </p>

        <div className="auth-form__fields">
          {!isLoginMode && (
            <label className="auth-form__field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                autoComplete="name"
              />
            </label>
          )}

          <label className="auth-form__field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              autoComplete="email"
            />
          </label>

          <label className="auth-form__field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete={isLoginMode ? 'current-password' : 'new-password'}
            />
          </label>

          {!isLoginMode && (
            <label className="auth-form__field">
              <span>Confirm password</span>
              <input
                type="password"
                name="password-confirm"
                placeholder="Repeat your password"
                autoComplete="new-password"
              />
            </label>
          )}
        </div>

        <button className="auth-form__submit" type="submit">
          {isLoginMode ? 'Log in' : 'Sign up'}
        </button>
      </form>

      <button
        className="auth-form__toggle"
        type="button"
        onClick={() => {
          setFormType(isLoginMode ? 'registration' : 'login');
        }}
      >
        {isLoginMode
          ? "Don't have an account? Sign up"
          : 'Already have an account? Log in'}
      </button>
    </section>
  );
};
