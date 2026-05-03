import { FormEvent, useState } from 'react';
import { AuthUser } from '../../types/auth';
import './ProfilePage.css';

type Props = {
  user: AuthUser;
};

export const ProfilePage = ({ user }: Props) => {
  const [message, setMessage] = useState('Profile update endpoints are not connected yet.');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('Profile update endpoints are not connected yet.');
  };

  return (
    <section className="profile-page">
      <div className="profile-page__hero">
        <p className="profile-page__eyebrow">Profile</p>
        <h1 className="profile-page__title">{user.name}</h1>
        <p className="profile-page__subtitle">
          Manage your public info, password and email settings.
        </p>
      </div>

      <div className="profile-page__grid">
        <form className="profile-card" onSubmit={handleSubmit}>
          <h2 className="profile-card__title">Change name</h2>
          <label className="profile-card__field">
            <span>Name</span>
            <input name="name" type="text" defaultValue={user.name} minLength={3} required />
          </label>
          <button className="profile-card__submit" type="submit">
            Save name
          </button>
        </form>

        <form className="profile-card" onSubmit={handleSubmit}>
          <h2 className="profile-card__title">Change password</h2>
          <label className="profile-card__field">
            <span>Old password</span>
            <input name="oldPassword" type="password" autoComplete="current-password" required />
          </label>
          <label className="profile-card__field">
            <span>New password</span>
            <input name="newPassword" type="password" autoComplete="new-password" minLength={8} required />
          </label>
          <label className="profile-card__field">
            <span>Confirm new password</span>
            <input
              name="confirmNewPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>
          <button className="profile-card__submit" type="submit">
            Update password
          </button>
        </form>

        <form className="profile-card" onSubmit={handleSubmit}>
          <h2 className="profile-card__title">Change email</h2>
          <label className="profile-card__field">
            <span>Current email</span>
            <input value={user.email} readOnly type="email" />
          </label>
          <label className="profile-card__field">
            <span>New email</span>
            <input name="newEmail" type="email" autoComplete="email" required />
          </label>
          <label className="profile-card__field">
            <span>Password confirmation</span>
            <input name="emailPassword" type="password" autoComplete="current-password" required />
          </label>
          <button className="profile-card__submit" type="submit">
            Request email change
          </button>
        </form>
      </div>

      <p className="profile-page__note">{message}</p>
    </section>
  );
};
