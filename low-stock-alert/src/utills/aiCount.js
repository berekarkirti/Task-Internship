export function predictLowStock(item) 
{
  const dailySales = item.dailySales || 1;
  const daysLeft = item.quantity / dailySales;
  const result = 
  {
    ...item,
    dailySales: parseFloat(dailySales.toFixed(2)),
    daysLeft: Math.floor(daysLeft),
    isLowStock: daysLeft <= 3,
  };
  // console.log(`Predicting for ${item.name}: quantity=${item.quantity}, dailySales=${dailySales}, daysLeft=${daysLeft}, isLowStock=${result.isLowStock}`);
  return result;
}