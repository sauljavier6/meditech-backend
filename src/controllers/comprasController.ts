// src/controllers/compras.controller.ts
// src/controllers/compras.controller.ts
import { Sequelize } from "sequelize";
import Compras from "../models/Compras";
import ComprasProduct from "../models/ComprasProducts";
import PaymentCompra from "../models/paymentCompra";
import Stock from "../models/Stock";
import User from "../models/User";
import { Console } from "console";

export const createCompra = async (req: any, res: any) => {
  try {
    const { ID_Proveedor, Total, ID_Operador, items, Payments } = req.body;
    console.log('dentro del endpoint:', ID_Proveedor, Total, ID_Operador);

    if (!Total || !ID_Operador) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const totalPayments = Payments?.reduce(
      (sum: number, p: { Monto: number }) => sum + p.Monto,
      0
    ) || 0;

    const BalanceTotal = Total - totalPayments;
    console.log('BalanceTotal', BalanceTotal, 'Total', Total, 'totalPayments', totalPayments);

    const compra = await Compras.create({
      ID_Proveedor: ID_Proveedor || null,
      Total,
      Balance_Total: BalanceTotal,
      ID_Operador,
      State: true,
    });

    if (items && Array.isArray(items)) {
    const productosPromises = items.map(async (item: any) => {
        await ComprasProduct.create({
        ID_Compra: compra.ID_Compras,
        ID_Product: item.productId,
        ID_Stock: item.id,
        Quantity: item.quantity,
        State: true,
        });

        const stock = await Stock.findByPk(item.id);

        if (stock) {
        await stock.update({
            Amount: stock.Amount + item.quantity,
            Saleprice: item.saleprice,
            Purchaseprice: item.purchaseprice,
        });
        }

    });

    await Promise.all(productosPromises);
    }

    // Registrar pagos
    if (Payments && Array.isArray(Payments)) {
      await Promise.all(Payments.map((p: any) =>
        PaymentCompra.create({
          ID_Compra: compra.ID_Compras,
          ID_Payment: p.ID_Payment,
          Description: p.Description,
          Monto: p.Monto,
          ReferenceNumber: p.ReferenceNumber,
          State: true,
        })
      ));
    }

    return res.status(201).json({message: "Compra creada correctamente", data: compra});
  } catch (error: any) {
    console.error("Error al crear compra:", error);
    return res.status(500).json({
      message: "Error al crear la compra",
      error: error.message,
    });
  }
};


export const listCompras = async (req: any, res: any) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Compras.findAndCountAll({
      limit,
      offset,
      order: [['ID_Compras', 'DESC']],
      include: [
        { model: ComprasProduct, as: 'ComprasProductos' },
      ],
    });

    const comprasConUsuarios = await Promise.all(
      rows.map(async (compra) => {
        const proveedor = compra.ID_Proveedor
          ? await User.findByPk(compra.ID_Proveedor)
          : null;

        const operador = compra.ID_Operador
          ? await User.findByPk(compra.ID_Operador)
          : null;

        return {
          ...compra.toJSON(),
          Proveedor: proveedor,
          Operador: operador,
        };
      })
    );

    return res.status(200).json({
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      data: comprasConUsuarios,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error al listar las compras",
      error: error.message,
    });
  }
};

export const deleteCompra = async (req: any, res: any) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Debes enviar un array de IDs" });
    }

    for (const id of ids) {
      const compra = await Compras.findByPk(id);
      if (!compra) continue;

      const productos = await ComprasProduct.findAll({ where: { ID_Compra: id } });

      for (const prod of productos) {
        const stock = await Stock.findByPk(prod.ID_Stock);
        if (stock) {
          await stock.update({
            Amount: stock.Amount - prod.Quantity,
          });
        }
      }

      await ComprasProduct.destroy({ where: { ID_Compra: id } });
      await PaymentCompra.destroy({ where: { ID_Compra: id } });
      await compra.destroy();
    }

    return res.status(200).json({ message: "Compras eliminadas correctamente" });
  } catch (error: any) {
    console.error("Error al eliminar compras:", error);
    return res.status(500).json({
      message: "Error al eliminar las compras",
      error: error.message,
    });
  }
};
