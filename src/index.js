import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const checkAccessToken = () => {
    if (localStorage.getItem(`loginData`)) {
        return;
    }
    const url = 'https://startup-summer-proxy-production.up.railway.app/2.0/oauth2/password/' +
        '?login=sergei.stralenia@gmail.com' +
        '&password=paralect123' +
        '&client_id=2356' +
        '&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948' +
        '&hr=0';

    const getAccessToken = async () => {
        let response = await fetch(url, {
            method: `GET`,
            headers: {
                'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
                'X-Secret-Key': 'GEU4nvd3rej*jeh.eqp',
            }
        });
        let loginData = await response.json();
        localStorage.setItem(`loginData`, JSON.stringify(loginData));
    };
    getAccessToken();
}
checkAccessToken();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
