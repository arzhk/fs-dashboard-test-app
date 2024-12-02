if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}

console.log("JWT_SECRET is configured:", !!process.env.JWT_SECRET);

export const config = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "24h",
  },
};
