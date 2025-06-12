import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import initPrisma from "../dbinit";

const prisma = await initPrisma();
const JWT_SECRET = process.env.JWT_SECRET 

// SIGNUP
export const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: "Missing fields" });

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(409).json({ error: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({ message: "User created", userId: newUser.id });
};

// SIGNIN
export const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id, email: user.email,role: user.role }, JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
};

export const signout = async (req, res) => {
  res.json({ message: "Sign out successful" });
};
