import { useAuth } from "../contexts/authContext";

const Home = () => {
  const { user, isLoading, isLoggedIn, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div>
      <div>
        <h1>Home</h1>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <p>{isLoading ? "Loading..." : isLoggedIn ? `Welcome, ${user.email}` : "Please log in."}</p>
    </div>
  );
};

export default Home;
