const express=require('express');
const dotenv=require('dotenv');
dotenv.config({path:'./config/.env'});
const app=express();
const connectDB=require('./config/db');

connectDB();
const morgan=require('morgan');
const cors=require('cors');
const PORT=process.env.PORT;
const routes=require('./routes/contact');
const eventRoutes=require('./routes/event');
const galleryRoutes=require('./routes/gallery');
const noticeRoutes=require('./routes/notice');
const teacherRoutes=require('./routes/teacher');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(eventRoutes)
app.use(galleryRoutes)
app.use(noticeRoutes)
app.use(teacherRoutes)

app.get('/',(req,res)=>{
  res.send('Hello World');
})

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})