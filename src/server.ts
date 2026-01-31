import app from "./app";

const PORT = process.env.PORT || 5000;


export default function server() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}