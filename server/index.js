const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello World! heheheheh');
});

mongoose.connect(`mongodb+srv://DATN_WD98:${process.env.MONGO_DB}@datn98.ncugkyc.mongodb.net/?retryWrites=true&w=majority&appName=DATN98`)
.then(() => {
  console.log('Kết nối MongoDB thành công');
})
.catch((err) => {
  console.error('Lỗi kết nối MongoDB:', err);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 