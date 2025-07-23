// @/controllers/SaleController.ts
import Category from "../models/Category";
import Product from "../models/Product";
import Sale from "../models/Sale";
import Stock from "../models/Stock";
import { Op } from "sequelize";
import User from "../models/User";
import PaymentSale from "../models/PaymentSale";
import ProductSale from "../models/SaleProduct";

export const getListSale = async (req: any, res: any) => {
  try {
    const sales = await Sale.findAll({
      order: [['ID_Sale', 'DESC']],
    });

    res.status(200).json({
        data: sales,
        message: 'Lista de ventas obtenida correctamente',
    });
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const createSale = async (req: any, res: any) => {
  const t = await Sale.sequelize?.transaction();
  try {
    const {
      ID_User,
      Total,
      Balance_Total,
      ID_State,
      Payment,
      ID_Operador,
      Lote,
      State, 
      items
    } = req.body;

    // 1. Crear la venta
    const newSale = await Sale.create({
      ID_User,
      Total,
      Balance_Total,
      ID_State,
      ID_Operador,
      Batch: Lote,
      State: State ?? true,
    }, { transaction: t });

    // 2. Crear pagos si existen
    if (Array.isArray(Payment) && Payment.length > 0) {
      const paymentSales = Payment.map((p) => ({
        ID_Sale: newSale.ID_Sale,
        ID_Payment: p.ID_Payment,
        Description: p.Description,
        Monto: p.Monto,
        ReferenceNumber: p.ReferenceNumber,
        State: true
      }));

      await PaymentSale.bulkCreate(paymentSales, { transaction: t });
    }

    // 3. Crear ProductSales y actualizar stock
    if (Array.isArray(items) && items.length > 0) {
      const productSales = items.map((item) => ({
        ID_Sale: newSale.ID_Sale,
        ID_Product: item.productId,
        ID_Stock: item.stockId,
        Quantity: item.quantity,
        State: true,
      }));

      await ProductSale.bulkCreate(productSales, { transaction: t });

      // 4. Restar del stock
      for (const item of items) {
        const stock = await Stock.findByPk(item.stockId, { transaction: t });
        if (!stock) {
          throw new Error(`No se encontró stock con ID ${item.stockId}`);
        }

        if (stock.Amount < item.quantity) {
          throw new Error(`Stock insuficiente para el producto ${item.productId}`);
        }

        stock.Amount -= item.quantity;
        await stock.save({ transaction: t });
      }
    }

    await t?.commit();

    res.status(201).json({
      message: 'Venta completada con pagos, productos y stock actualizado',
      data: newSale
    });

  } catch (error) {
    await t?.rollback();
    console.error('Error al crear la venta:', error);
    res.status(500).json({
      message: 'Error al crear la venta',
      error
    });
  }
};


export const searchProducts = async (req: any, res: any) => {
  const { q } = req.query;
  console.log(' q', q);

  try {
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { Description: { [Op.iLike]: `%${q}%` } },
          { Code: { [Op.iLike]: `%${q}%` } },
        ],
      },
      include: [
        {
          model: Stock,
          where: {
            Amount: {
              [Op.gt]: 0, // Solo stock mayor a 0
            },
          },
          required: true, // Asegura que el producto solo se incluya si hay Stock asociado
        },
      ],
    });

    res.json(products);
  } catch (error) {
    console.error('Error al buscar productos:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};


export const createCustomerSale = async (req: any, res: any) => {
  console.log('entro a la api del back')
  try {
    const {
      nombre,
      telefono,
      correo,
      razonSocial,
      codigoPostal,
      rfc,
      regimenFiscal,
    } = req.body;

    const newSale = await User.create({
      Name: nombre,
      ID_Rol: 2,
      ID_Email: 1,
      Imagen:'',
      Password: '',
      State: true,
    });

    res.status(201).json({
      message: 'Registro Completado',
      data: newSale
    });
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({
      message: 'Error al crear cliente',
      error
    });
  }
};