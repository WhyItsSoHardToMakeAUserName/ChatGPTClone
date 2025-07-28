import 'dotenv/config'
import dotenv from "dotenv";
import app from './framework/express/server';

dotenv.config();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
