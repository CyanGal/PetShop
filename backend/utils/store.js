const Product = require('../models/card');
const taxConfig = require('../config/tax');

exports.disableProducts = products => {
  let bulkOptions = products.map(item => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { isActive: false }
      }
    };
  });

  Product.bulkWrite(bulkOptions);
};

// calculate order tax amount
exports.calculateItemsSalesTax = items => {
  // const taxRate = taxConfig.stateTaxRate;

  const products = items.map(item => {
    const price = item.purchasePrice || (item?.product?.price ?? 0);
    const quantity = item.quantity;

    item.totalPrice = parseFloat((price * quantity).toFixed(2));

    // if (item.taxable) {
    //   const taxAmount = price * (taxRate / 100) * quantity;

    //   item.totalTax = parseFloat(taxAmount.toFixed(2));
    //   item.priceWithTax = parseFloat((item.totalPrice + item.totalTax).toFixed(2));
    // } else {
    //   item.totalTax = 0;
    //   item.priceWithTax = item.totalPrice;
    // }

    return item;
  });

  return products;
};
exports.caculateOrderTotal = order => {
  const total = order.products
    .filter(item => item.status !== 'Cancelled')
    .reduce((sum, current) => sum + current.totalPrice, 0);

  return total;
};

// calculate order tax amount
exports.caculateItemsSalesTax = items => {
  const taxRate = taxConfig.stateTaxRate;

  const products = items.map(item => {
    item.priceWithTax = 0;
    item.totalPrice = 0;
    item.totalTax = 0;
    item.purchasePrice = item.price;

    const price = item.purchasePrice;
    const quantity = item.quantity;
    item.totalPrice = parseFloat(Number((price * quantity).toFixed(2)));

    if (item.taxable) {
      const taxAmount = price * (taxRate / 100) * 100;

      item.totalTax = parseFloat(Number((taxAmount * quantity).toFixed(2)));
      item.priceWithTax = parseFloat(
        Number((item.totalPrice + item.totalTax).toFixed(2))
      );
    }

    return item;
  });

  return products;
};

exports.formatOrders = orders => {
  const newOrders = orders.map(order => {
    return {
      _id: order._id,
      total: parseFloat(Number(order.total.toFixed(2))),
      created: order.created,
      products: order?.cart?.products
    };
  });

  return newOrders.map(order => {
    return order?.products ? this.caculateTaxAmount(order) : order;
  });
};
