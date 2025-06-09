export async function authenticateUser({ email, password }) {

  return new Promise((resolve, reject) => {
 
      if (email === "user@example.com" && password === "password123") 
      {
        resolve(
        {
          user: { email },
          token: "mock-token",
        });
      } 
      else 
      {
        reject("Invalid credentials");
      }
 
  });
}
