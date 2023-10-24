import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const port = 4000;

app.get("/test", (req, res) => {
  res.send("Hello, Express!");
});

app.post("/register", (req, res) => {
  const { first, last, email, password } = req.body;
  res.json({ first, last, email, password });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
