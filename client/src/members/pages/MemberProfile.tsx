import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Loader2,
  UserCheck
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "../components/ui/card";
import { Button } from "../components/ui/button";

// Using the correct type definitions
import { login, logout, getCurrentUser, LoginDTO, CurrentUserResponse } from "../../lib/api";

// This is the correct, simple user profile based on the '/me' endpoint
// Since the API returns a string, we will assume it is the user's email for the UI.
interface SimpleUserProfile {
  email: string;
}

const MemberProfile = () => {
  const [userProfile, setUserProfile] = useState<SimpleUserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use a state variable to handle login form data
  const [loginForm, setLoginForm] = useState<LoginDTO>({ email: '', password: '' });

  // Handle fetching the user on component mount
  useEffect(() => {
    let cancelled = false;
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await getCurrentUser();
        // Assuming the string response is a single piece of user data, like an email.
        if (!cancelled) {
          setUserProfile({ email: response });
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        if (!cancelled) {
          setError("Failed to load user profile. Please log in.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      cancelled = true;
    };
  }, []);

  // Login handler
  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const { token } = await login(loginForm);
      // The API returns a token, but the `/me` endpoint returns a string.
      // We'll immediately fetch the user data after login.
      const userEmail = await getCurrentUser();
      setUserProfile({ email: userEmail });
      console.log('Login successful! Token:', token);
    } catch (e) {
      console.error(e);
      setError("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    // Note: The `logout` function in your `api.d.ts` is `void`, so it's a local action.
    // If you need a backend call, you'd implement it here.
    logout();
    setUserProfile(null);
    setError(null);
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen text-lg">
          <Loader2 className="w-8 h-8 mr-2 animate-spin" /> Loading...
        </div>
    );
  }

  if (userProfile) {
    // Render the profile for a logged-in user
    return (
        <div className="space-y-8 p-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
              Logout
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <UserCheck className="w-5 h-5" />
                <p>You are logged in with the email: **{userProfile.email}**</p>
              </div>
              {/* Displaying other profile info is not possible with the current API */}
            </CardContent>
          </Card>
        </div>
    );
  }

  // Render the login form for a logged-out user
  return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="user@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="••••••••"
              />
            </div>
            <Button onClick={handleLogin} disabled={loading} className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Log In'}
            </Button>
          </CardContent>
        </Card>
      </div>
  );
};

export default MemberProfile;