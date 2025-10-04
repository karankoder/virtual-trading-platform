import { TrendingUp, ArrowRight } from 'lucide-react';

type NavbarProps = {
  appName: string;
};

const Navbar: React.FC<NavbarProps> = ({ appName }) => {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/90 border-b border-border/50'>
      <nav className='container mx-auto px-4 md:px-6'>
        <div className='flex justify-between items-center h-16'>
          <a href='/' className='flex items-center gap-2 group'>
            <div className='w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform'>
              <TrendingUp className='w-5 h-5 text-white' />
            </div>
            <span className='text-lg font-bold text-foreground hidden sm:block'>
              {appName}
            </span>
          </a>

          <div className='flex items-center gap-2 sm:gap-4'>
            <a
              href='/login'
              className='text-muted hover:text-foreground transition-colors text-sm font-medium px-3 py-2'
            >
              Log In
            </a>
            <a
              href='/register'
              className='bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 sm:px-6 rounded-lg text-sm transition-all flex items-center gap-2 hover:shadow-lg hover:shadow-primary/20'
            >
              Get Started
              <ArrowRight className='w-4 h-4 hidden sm:block' />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
