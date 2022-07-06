import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

// Executed on client while navigating from one page to another
// Executed on server on:
// 1. Hard refresh of page
// 2. Checking link from different domain
// 3. Typing URL into address bar
LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentUser');
  return data ? { currentUser: data } : { currentUser: undefined };
};

export default LandingPage;
