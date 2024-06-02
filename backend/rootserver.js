// require("dotenv").config();
const cors = require("cors");
const express = require('express')
const connectDb = require("./utils/db");
const mainRoutes = require('./Routes/main-route')
const userRoutes = require('./Routes/user-routes')
const accountRoutes = require('./Routes/account-routes')

// MAIN MOtive IS TO MAKE THIS ROOTSERVER PAGE CLEAN 
const app = express()
const port = 8000

// CORS
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
// app.get will set two arguments first is the location, here / define the root locstion where the
//  server will run and other is the call back function telling what we have to show on that server\
// andbreq and res are the requests and response
app.get('/', (req, res) => {
    res.send('Hello World!aaaaaaaaaaaaaaaaaaaaaaa')
  })


  app.use('/graytm/main', mainRoutes)
  app.use('/graytm/user', userRoutes)
  app.use('/graytm/account',accountRoutes)

// app.get('/register', (req, res) => {
//     res.send('Welcome to the registration page')
//   })


// This is a Router method to route different pages where the address below (here /auth ) will come first
// then the address defined in the routers

// app.use("/auth", authRoutes);
// app.use("/auth/form" , contactRoutes);
// app.use("/auth",serviceRoutes);
// app.use("/admin",adminRoutes);


// // global catch middleware
// app.use(errorMiddleware);


//DATABASE connection
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)    
  });

})




