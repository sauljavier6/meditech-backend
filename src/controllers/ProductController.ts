import Product from '../models/Product';
import Stock from '../models/Stock';
import Category from '../models/Category';
import { Op } from "sequelize";
import ImagenProduct from '../models/ImagenProduct';
import { Console } from 'console';


interface StockItem {
  ID_Stock?: number;
  Description: string;
  Amount: number;
  Saleprice: number;
  Purchaseprice: number;
  State?: boolean;
}

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


export const postProducts = async (req: any, res: any) => {
  try {
    const { Description, ID_Category, Code, StockData, Imagenes } = req.body;

    const stock = JSON.parse(StockData);

    // Crear producto
    const newProduct = await Product.create({
      Description,
      ID_Category,
      Code,
      State: true,
    });

    // Crear stock
    if (Array.isArray(stock)) {
      await Promise.all(
        stock.map((stock) =>
          Stock.create({
            ...stock,
            ID_Product: newProduct.ID_Product,
            State: stock.State ?? true,
          })
        )
      );
    }

    // Guardar imágenes si vienen archivos
    const files = req.files as Express.Multer.File[];
    console.log(' files', files)
    if (files && files.length > 0) {
      const imageData: any = { ID_Product: newProduct.ID_Product };
      files.forEach((file, index) => {
        const field = `Imagen${["Uno", "Dos", "Tres", "Cuatro", "Cinco"][index]}`;
        imageData[field] = file.filename;
      });

      await ImagenProduct.create(imageData);
    }

    res.status(201).json({
      message: "Producto, stock e imágenes registrados correctamente",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};


export const deleteproducts = async (req:any, res:any) => {
  const { ids } = req.body;

  try {


    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'No se proporcionaron IDs válidos' });
    }

    await Product.destroy({
      where: {
        ID_Product: ids
      }
    });

    res.json({ message: 'Productos eliminados correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error eliminando productos' });
  }
};

export const getProductById = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id, {
      include: [
        { model: Stock },         // Incluye detalles de stock
        { model: Category },      // Incluye detalles de categoría
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


export const updateProduct = async (req: any, res: any) => {
  const {
    ID_Product,
    Description,
    ID_Category,
    Code,
    Imagen,
    State,
    StockData
  } = req.body;

  try {
    const product = await Product.findByPk(ID_Product, {
      include: [Stock],
    });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await product.update({
      Description,
      ID_Category,
      Code,
      Imagen,
      State: State ?? true,
    });

    const stockIdsFromClient = (StockData as StockItem[]).filter(s => s.ID_Stock).map(s => s.ID_Stock);

    const existingStocks = await Stock.findAll({
      where: { ID_Product: product.ID_Product },
    });

    for (const stock of existingStocks) {
      if (!stockIdsFromClient.includes(stock.ID_Stock)) {
        await stock.destroy();
      }
    }

    for (const stockItem of StockData) {
      if (stockItem.ID_Stock) {
        const existing = await Stock.findByPk(stockItem.ID_Stock);
        if (existing) {
          await existing.update({
            Description: stockItem.Description,
            Amount: stockItem.Amount,
            Saleprice: stockItem.Saleprice,
            Purchaseprice: stockItem.Purchaseprice,
            State: stockItem.State ?? true,
          });
        }
      } else {
        await Stock.create({
          Description: stockItem.Description,
          Amount: stockItem.Amount,
          Saleprice: stockItem.Saleprice,
          Purchaseprice: stockItem.Purchaseprice,
          State: stockItem.State ?? true,
          ID_Product: ID_Product,
        });
      }
    }

    res.status(200).json({
      message: 'Producto y stocks actualizados correctamente',
      data: product,
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};


export const searchProducts = async (req: any, res: any) => {
  const { q } = req.query;
  console.log(' q', q)

  try {

    if (!isNaN(Number(q))) {
      const product = await Product.findOne({
        where: { ID_Product: Number(q) },
        include: [Stock, Category],
      });
      return res.json(product ? [product] : []);
    }

    // Buscar por nombre o código
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { Description: { [Op.iLike]: `%${q}%` } },
          { Code: { [Op.iLike]: `%${q}%` } },
        ],
      },
      include: [Stock, Category],
    });

    res.json(products);
  } catch (error) {
    console.error('Error al buscar productos:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};