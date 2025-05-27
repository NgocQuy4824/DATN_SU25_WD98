const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const routers = require('./src/routes');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());

routers(app);

mongoose.connect(`${process.env.MONGO_DB}`)
.then(() => {
  console.log('Kết nối MongoDB thành công');
})
.catch((err) => {
  console.error('Lỗi kết nối MongoDB:', err);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 