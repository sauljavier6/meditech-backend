import Category from "../../models/Category";
import ImagenProduct from "../../models/ImagenProduct";
import Product from "../../models/Product";
import Stock from "../../models/Stock";

export const getProducts = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { rows: products, count } = await Product.findAndCountAll({
      include: [
        {
          model: Category,
          attributes: ['ID_Category', 'Description'],
        },
        {
          model: Stock,
          attributes: ['ID_Stock', 'Description', 'Amount', 'Saleprice', 'Purchaseprice'],
        },
        {
          model: ImagenProduct,
          attributes: ['ID_ImagenProduct', 'ImagenUno', 'ImagenDos', 'ImagenTres', 'ImagenCuatro', 'ImagenCinco'],
        },
      ],
      order: [['ID_Product', 'DESC']],
      offset,
      limit,
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      data: products,
      currentPage: page,
      totalPages,
      totalItems: count,
      hasMore: page < totalPages,
      message: 'Lista de productos obtenida correctamente',
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const getProductById = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id, {
      include: [
        { model: Stock },
        { model: Category },
        { model: ImagenProduct },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};