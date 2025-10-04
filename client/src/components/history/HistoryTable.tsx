import {
  ShoppingCart,
  ShoppingBag,
  Calendar,
  Search,
  History,
} from 'lucide-react';

type Trade = {
  id: string;
  type: 'BUY' | 'SELL';
  symbol: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  time: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
};

type HistoryTableProps = {
  trades: Trade[];
};

export default function HistoryTable({ trades }: HistoryTableProps) {
  return (
    <div className='bg-surface rounded-xl border border-border shadow-sm overflow-hidden'>
      <div className='p-6 border-b border-border'>
        <h2 className='text-xl font-bold text-foreground flex items-center gap-2'>
          <History className='w-5 h-5 text-primary' />
          Transactions ({trades.length})
        </h2>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-background'>
            <tr>
              <th className='px-6 py-4 text-left text-xs font-bold text-muted uppercase tracking-wider'>
                Transaction ID
              </th>
              <th className='px-6 py-4 text-left text-xs font-bold text-muted uppercase tracking-wider'>
                Type
              </th>
              <th className='px-6 py-4 text-left text-xs font-bold text-muted uppercase tracking-wider'>
                Stock
              </th>
              <th className='px-6 py-4 text-right text-xs font-bold text-muted uppercase tracking-wider'>
                Quantity
              </th>
              <th className='px-6 py-4 text-right text-xs font-bold text-muted uppercase tracking-wider'>
                Price
              </th>
              <th className='px-6 py-4 text-right text-xs font-bold text-muted uppercase tracking-wider'>
                Total
              </th>
              <th className='px-6 py-4 text-left text-xs font-bold text-muted uppercase tracking-wider'>
                Date & Time
              </th>
              <th className='px-6 py-4 text-center text-xs font-bold text-muted uppercase tracking-wider'>
                Status
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-border'>
            {trades.length === 0 ? (
              <tr>
                <td colSpan={8} className='px-6 py-12 text-center'>
                  <div className='flex flex-col items-center gap-3'>
                    <div className='w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center'>
                      <Search className='w-8 h-8 text-muted' />
                    </div>
                    <p className='text-muted font-medium'>
                      No trades found matching your filters
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              trades.map((trade) => (
                <tr
                  key={trade.id}
                  className='hover:bg-background transition-colors'
                >
                  <td className='px-6 py-4'>
                    <span className='font-mono text-sm font-semibold text-muted'>
                      {trade.id}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${
                        trade.type === 'BUY'
                          ? 'bg-success/20 text-success'
                          : 'bg-danger/20 text-danger'
                      }`}
                    >
                      {trade.type === 'BUY' ? (
                        <ShoppingCart className='w-3.5 h-3.5' />
                      ) : (
                        <ShoppingBag className='w-3.5 h-3.5' />
                      )}
                      {trade.type}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <div>
                      <p className='font-bold text-foreground'>
                        {trade.symbol}
                      </p>
                      <p className='text-sm text-muted'>{trade.name}</p>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <span className='font-semibold text-foreground'>
                      {trade.quantity}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <span className='font-semibold text-foreground'>
                      ₹{trade.price.toFixed(2)}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <span className='font-bold text-foreground'>
                      ₹{trade.total.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-2 text-sm text-muted'>
                      <Calendar className='w-4 h-4' />
                      <div>
                        <p className='font-semibold'>{trade.date}</p>
                        <p className='text-xs'>{trade.time}</p>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <span className='inline-block px-3 py-1 rounded-full text-xs font-bold bg-success/20 text-success'>
                      {trade.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {trades.length > 0 && (
        <div className='p-6 border-t border-border flex items-center justify-between'>
          <p className='text-sm text-muted'>
            Showing {trades.length} of {trades.length} transactions
          </p>
          <div className='flex gap-2'>
            <button className='px-4 py-2 rounded-lg bg-background border border-border text-muted hover:text-foreground font-semibold text-sm transition-all'>
              Previous
            </button>
            <button className='px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm transition-all hover:bg-primary-hover'>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
