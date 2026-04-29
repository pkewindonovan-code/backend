import { Router } from 'express';
import { createItem, deleteItem, getAll, getById, getProductosDetalle, updateItem } from '../controllers/crudController.js';

const router = Router();

router.get('/productos-detalle', getProductosDetalle);
router.get('/:entity', getAll);
router.get('/:entity/:id', getById);
router.post('/:entity', createItem);
router.put('/:entity/:id', updateItem);
router.delete('/:entity/:id', deleteItem);

export default router;
