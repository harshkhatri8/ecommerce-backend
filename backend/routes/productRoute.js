import express from 'express'
const router = express.Router()
import {getAllProduct,createProduct,updateProduct,deleteProduct, getProductDetail} from '../controllers/productController.js'
import  {isAuthenticatedUser, authorizeRoles } from '../middleware/auth.js'

router.get('/product/:id',getProductDetail)
router.get('/products' , getAllProduct)
router.post('/product/new', isAuthenticatedUser,authorizeRoles("admin"),createProduct)
router.put('/product/:id', isAuthenticatedUser,authorizeRoles("admin"), updateProduct)
router.delete('/product/:id', isAuthenticatedUser,authorizeRoles("admin"), deleteProduct)

export default router