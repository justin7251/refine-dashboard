import { AuthBindings } from "@refinedev/core";

export const TOKEN_KEY = "user-auth";
export const END_POINT = 'http://localhost:8080/api/v1';

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      const response = await fetch(`${END_POINT}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem(TOKEN_KEY, JSON.stringify(data.user));

        return {
          success: true,
          redirectTo: "/"
        };
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to login.");
      }
    } catch (error) {
      // Handle any errors that occur during login
      console.error("Error logging in:", error.message);
      return {
        success: false,
        error: {
          name: "LoginError",
          message: error.message || "Failed to login."
        }
      };
    }
  },
  register:  async ({ email, password }) => {
    if (email && password) {
      try {
        const response = await fetch(`${END_POINT}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        if (response.ok) {
          const data = await response.json();
          return {
            success: true,
            redirectTo: "/login" // Redirect to login page after successful registration
          };
        } else {
          // If the request failed, parse the error response and throw an error
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to register user.");
        }
      } catch (error) {
        // Handle any errors that occur during registration
        console.error("Error registering user:", error.message);
        return {
          success: false,
          error: {
            name: "RegistrationError",
            message: error.message || "Failed to register user."
          }
        };
      }

      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid username or password",
        },
      };
    }
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,


  getIdentity: async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const response = await fetch(`${END_POINT}/users/` , {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const userData = await response.json();
        const { id, name, avatar } = userData;
        return {
          id,
          name,
          avatar
        };
      } else {
        throw new Error("Failed to get user identity.");
      }
    } catch (error) {
      console.error("Error getting user identity:", error.message);
      return null;
    }
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
