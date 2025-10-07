import { useTradeStore } from '@/store/tradeStore';
import { ArrowUpRight, ArrowDownRight, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Holding = {
  asset: string;
  name: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
};

type PortfolioHoldingsTableProps = {
  holdings: Holding[];
};

export default function PortfolioHoldingsTable({
  holdings,
}: PortfolioHoldingsTableProps) {
  const { fetchStockDetails } = useTradeStore();
  const router = useRouter();

  const handleViewHolding = (asset: string) => () => {
    fetchStockDetails(asset);
    router.push('/trade');
  };

  return (
    <div className='bg-surface rounded-xl border border-border shadow-sm overflow-hidden'>
      <div className='p-6 border-b border-border'>
        <h2 className='text-xl font-bold text-foreground flex items-center gap-2'>
          Your Holdings
        </h2>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-background'>
            <tr>
              <th className='px-6 py-4 text-left text-xs font-bold text-muted uppercase tracking-wider'>
                Stock
              </th>
              <th className='px-6 py-4 text-right text-xs font-bold text-muted uppercase tracking-wider'>
                Quantity
              </th>
              <th className='px-6 py-4 text-right text-xs font-bold text-muted uppercase tracking-wider'>
                Avg Price
              </th>
              <th className='px-6 py-4 text-right text-xs font-bold text-muted uppercase tracking-wider'>
                Current Price
              </th>
              <th className='px-6 py-4 text-right text-xs font-bold text-muted uppercase tracking-wider'>
                Invested
              </th>
              <th className='px-6 py-4 text-right text-xs font-bold text-muted uppercase tracking-wider'>
                Current Value
              </th>
              <th className='px-6 py-4 text-right text-xs font-bold text-muted uppercase tracking-wider'>
                P/L
              </th>
              <th className='px-6 py-4 text-right text-xs font-bold text-muted uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-border'>
            {holdings.length === 0 ? (
              <tr>
                <td colSpan={8} className='px-6 py-12 text-center text-muted'>
                  Your portfolio has no holdings yet.
                </td>
              </tr>
            ) : (
              holdings.map((holding) => {
                const invested = holding.averageBuyPrice * holding.quantity;
                const currentValue = holding.currentPrice * holding.quantity;
                const pl = currentValue - invested;
                const plPercent = invested > 0 ? (pl / invested) * 100 : 0;

                return (
                  <tr
                    key={holding.asset}
                    className='hover:bg-background transition-colors'
                  >
                    <td className='px-6 py-4'>
                      <div>
                        <p className='font-bold text-foreground'>
                          {holding.asset}
                        </p>
                        <p className='text-sm text-muted'>{holding.name}</p>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <span className='font-semibold text-foreground'>
                        {holding.quantity}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <span className='font-semibold text-foreground'>
                        ₹{holding.averageBuyPrice.toFixed(2)}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <span className='font-semibold text-foreground'>
                        ₹{holding.currentPrice.toFixed(2)}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <span className='font-semibold text-foreground'>
                        ₹{invested.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <span className='font-semibold text-foreground'>
                        ₹{currentValue.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <div className='inline-flex flex-col items-end'>
                        <span
                          className={`font-bold flex items-center gap-1 ${
                            pl >= 0 ? 'text-success' : 'text-danger'
                          }`}
                        >
                          {pl >= 0 ? (
                            <ArrowUpRight className='w-3.5 h-3.5' />
                          ) : (
                            <ArrowDownRight className='w-3.5 h-3.5' />
                          )}
                          {pl >= 0 ? '' : ''}₹
                          {Math.abs(pl).toLocaleString('en-IN')}
                        </span>
                        <span
                          className={`text-xs font-semibold ${
                            pl >= 0 ? 'text-success' : 'text-danger'
                          }`}
                        >
                          ({plPercent >= 0 ? '+' : ''}
                          {plPercent.toFixed(2)}%)
                        </span>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <button
                        onClick={handleViewHolding(holding.asset)}
                        className='inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold text-sm transition-all hover:shadow-md'
                      >
                        <Eye className='w-4 h-4' /> View
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
