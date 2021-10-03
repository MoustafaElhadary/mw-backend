import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState('');

  const handleEmailLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLogin = async (phone) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ phone });
      if (error) throw error;
      alert('Check your phone for pass code');
      setPhoneSubmitted(true);
      console.log({ error, phone });
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (token) => {
    try {
      let { session, error } = await supabase.auth.verifyOTP({
        phone,
        token,
      });
      console.log({ error, session, token, phone });
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + Next.js</h1>
        <p className="description">
          Sign in via magic link with your email below
        </p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleEmailLogin(email);
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Send magic link'}</span>
          </button>
        </div>

        <p className="description">Sign in via magic link with your phone</p>
        <div>
          {phoneSubmitted ? (
            <input
              className="inputField"
              type="number"
              placeholder="Your OTP"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          ) : (
            <input
              className="inputField"
              placeholder="Your phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          )}
        </div>
        <div>
          {phoneSubmitted ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleVerifyOTP(token);
              }}
              className="button block"
              disabled={loading}
            >
              <span>{loading ? 'Loading' : 'verify otp'}</span>
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                handlePhoneLogin(phone);
              }}
              className="button block"
              disabled={loading}
            >
              <span>{loading ? 'Loading' : 'Send magic link'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
