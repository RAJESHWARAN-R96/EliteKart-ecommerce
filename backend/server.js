import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import contactRouter from './routes/contactRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000

// Initialize Database and Cloudinary
connectDB()
connectCloudinary()

// Middlewares
app.use(express.json())
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token']
}))

// API Endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/contact', contactRouter)

app.get('/', (req, res) => {
    res.send('EliteKart API is running...')
})

// Listen locally or on standalone server (Vercel invokes the exported app as a serverless function)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(port, () => console.log('Server started on PORT : ' + port))
}

export default app

