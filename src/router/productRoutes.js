import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'

export default {
  path: '/product',
  children: [
    {
      path: 'list',
      component: ProductList
    },
    {
      path: ':id',
      component: ProductDetail
    }
  ]
}
